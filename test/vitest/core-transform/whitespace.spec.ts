import type { Element, Root } from "hast";
import { createCoreTransform, createHighlighter } from "impasto";
import common from "impasto/lang/common";
import { expect, it } from "vitest";

const space: Element = {
  type: "element",
  tagName: "span",
  properties: { className: ["imp-s"] },
  children: [{ type: "text", value: " " }],
};

const tab: Element = {
  type: "element",
  tagName: "span",
  properties: { className: ["imp-t"] },
  children: [{ type: "text", value: "\t" }],
};

const lineNumber = (n: number): Element => ({
  type: "element",
  tagName: "div",
  properties: { className: ["imp-n"] },
  children: [{ type: "text", value: String(n) }],
});

const lineNumbers = (n: number): Element => ({
  type: "element",
  tagName: "div",
  properties: { className: ["imp-ln"] },
  children: Array.from({ length: n }, (_, i) => lineNumber(i + 1)),
});

it("trims trailing whitespace from lines", async () => {
  const tree: Root = {
    type: "root",
    children: [
      { type: "text", value: " " },
      { type: "text", value: "1" },
      { type: "text", value: " " },
      { type: "text", value: "\n" },
      { type: "text", value: "  " },
      { type: "text", value: "2 " },
      { type: "text", value: " " },
      { type: "text", value: "\n" },
    ],
  };
  const coreTransform = createCoreTransform();
  coreTransform(tree);

  expect(tree).toEqual({
    type: "root",
    children: [
      {
        type: "element",
        tagName: "pre",
        properties: { className: ["imp-cb"] },
        children: [
          lineNumbers(2),
          {
            type: "element",
            tagName: "code",
            properties: {},
            children: [
              {
                type: "element",
                tagName: "div",
                properties: { className: ["imp-l"] },
                children: [
                  space,
                  { type: "text", value: "1" },
                  { type: "text", value: "\n" },
                ],
              },
              {
                type: "element",
                tagName: "div",
                properties: { className: ["imp-l"] },
                children: [
                  space,
                  space,
                  { type: "text", value: "2" },
                  { type: "text", value: "\n" },
                ],
              },
            ],
          },
        ],
      },
    ],
  });
});

it("wraps spaces", async () => {
  const highlighter = await createHighlighter(common);
  const tree = highlighter.highlight("  a  b", undefined);
  const coreTransform = createCoreTransform();
  coreTransform(tree);

  expect(tree).toEqual({
    type: "root",
    children: [
      {
        type: "element",
        tagName: "pre",
        properties: { className: ["imp-cb"] },
        children: [
          lineNumbers(1),
          {
            type: "element",
            tagName: "code",
            properties: {},
            children: [
              {
                type: "element",
                tagName: "div",
                properties: { className: ["imp-l"] },
                children: [
                  space,
                  space,
                  { type: "text", value: "a" },
                  space,
                  space,
                  { type: "text", value: "b" },
                  { type: "text", value: "\n" },
                ],
              },
            ],
          },
        ],
      },
    ],
  });
});

it("wraps tabs", async () => {
  const highlighter = await createHighlighter(common);
  const tree = highlighter.highlight("\t\ta\t\tb", undefined);
  const coreTransform = createCoreTransform();
  coreTransform(tree);

  expect(tree).toEqual({
    type: "root",
    children: [
      {
        type: "element",
        tagName: "pre",
        properties: { className: ["imp-cb"] },
        children: [
          lineNumbers(1),
          {
            type: "element",
            tagName: "code",
            properties: {},
            children: [
              {
                type: "element",
                tagName: "div",
                properties: { className: ["imp-l"] },
                children: [
                  tab,
                  tab,
                  { type: "text", value: "a" },
                  tab,
                  tab,
                  { type: "text", value: "b" },
                  { type: "text", value: "\n" },
                ],
              },
            ],
          },
        ],
      },
    ],
  });
});

it("wraps whitespace in code", async () => {
  const highlighter = await createHighlighter(common);
  const tree = highlighter.highlight('" \t1"', "source.js");
  const coreTransform = createCoreTransform();
  coreTransform(tree);

  expect(tree).toEqual({
    type: "root",
    children: [
      {
        type: "element",
        tagName: "pre",
        properties: { className: ["imp-cb"] },
        children: [
          lineNumbers(1),
          {
            type: "element",
            tagName: "code",
            properties: {},
            children: [
              {
                type: "element",
                tagName: "div",
                properties: { className: ["imp-l"] },
                children: [
                  {
                    type: "element",
                    tagName: "span",
                    properties: { className: ["pl-s"] },
                    children: [
                      {
                        type: "element",
                        tagName: "span",
                        properties: { className: ["pl-pds"] },
                        children: [{ type: "text", value: '"' }],
                      },
                      space,
                      {
                        type: "element",
                        tagName: "span",
                        properties: { className: ["imp-t"] },
                        children: [{ type: "text", value: "	" }],
                      },
                      { type: "text", value: "1" },
                      {
                        type: "element",
                        tagName: "span",
                        properties: { className: ["pl-pds"] },
                        children: [{ type: "text", value: '"' }],
                      },
                    ],
                  },
                  { type: "text", value: "\n" },
                ],
              },
            ],
          },
        ],
      },
    ],
  });
});
