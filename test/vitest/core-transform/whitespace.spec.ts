import type { Root } from "hast";
import { coreTransform, createHighlighter } from "impasto";
import common from "impasto/lang/common";
import { expect, it } from "vitest";

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
  coreTransform(tree);

  expect(tree).toMatchObject({
    type: "root",
    children: [
      {
        type: "element",
        tagName: "pre",
        properties: { className: ["imp-cb"] },
        children: [
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
                    properties: { className: ["imp-s"] },
                    children: [{ type: "text", value: " " }],
                  },
                  { type: "text", value: "1" },
                  { type: "text", value: "\n" },
                ],
              },
              {
                type: "element",
                tagName: "div",
                properties: { className: ["imp-l"] },
                children: [
                  {
                    type: "element",
                    tagName: "span",
                    properties: { className: ["imp-s"] },
                    children: [{ type: "text", value: " " }],
                  },
                  {
                    type: "element",
                    tagName: "span",
                    properties: { className: ["imp-s"] },
                    children: [{ type: "text", value: " " }],
                  },
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
  coreTransform(tree);

  expect(tree).toMatchObject({
    type: "root",
    children: [
      {
        type: "element",
        tagName: "pre",
        properties: { className: ["imp-cb"] },
        children: [
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
                    properties: { className: ["imp-s"] },
                    children: [{ type: "text", value: " " }],
                  },
                  {
                    type: "element",
                    tagName: "span",
                    properties: { className: ["imp-s"] },
                    children: [{ type: "text", value: " " }],
                  },
                  { type: "text", value: "a" },
                  {
                    type: "element",
                    tagName: "span",
                    properties: { className: ["imp-s"] },
                    children: [{ type: "text", value: " " }],
                  },
                  {
                    type: "element",
                    tagName: "span",
                    properties: { className: ["imp-s"] },
                    children: [{ type: "text", value: " " }],
                  },
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
  coreTransform(tree);

  expect(tree).toMatchObject({
    type: "root",
    children: [
      {
        type: "element",
        tagName: "pre",
        properties: { className: ["imp-cb"] },
        children: [
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
                    properties: { className: ["imp-t"] },
                    children: [{ type: "text", value: "\t" }],
                  },
                  {
                    type: "element",
                    tagName: "span",
                    properties: { className: ["imp-t"] },
                    children: [{ type: "text", value: "\t" }],
                  },
                  { type: "text", value: "a" },
                  {
                    type: "element",
                    tagName: "span",
                    properties: { className: ["imp-t"] },
                    children: [{ type: "text", value: "\t" }],
                  },
                  {
                    type: "element",
                    tagName: "span",
                    properties: { className: ["imp-t"] },
                    children: [{ type: "text", value: "\t" }],
                  },
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
  coreTransform(tree);

  expect(tree).toMatchObject({
    type: "root",
    children: [
      {
        type: "element",
        tagName: "pre",
        properties: { className: ["imp-cb"] },
        children: [
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
                      {
                        type: "element",
                        tagName: "span",
                        properties: { className: ["imp-s"] },
                        children: [{ type: "text", value: " " }],
                      },
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
