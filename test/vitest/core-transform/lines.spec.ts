import type { Root } from "hast";
import { createCoreTransform, createHighlighter } from "impasto";
import common from "impasto/lang/common";
import { expect, it } from "vitest";

it("splits lines terminated with newlines", async () => {
  const highlighter = await createHighlighter(common);
  const tree = highlighter.highlight("1\n2\n", "source.js");
  const coreTransform = createCoreTransform();
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
                    properties: { className: ["pl-c1"] },
                    children: [{ type: "text", value: "1" }],
                  },
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
                    properties: { className: ["pl-c1"] },
                    children: [{ type: "text", value: "2" }],
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

it("handles missing terminal newlines", async () => {
  const highlighter = await createHighlighter(common);
  const tree = highlighter.highlight("1\n2", "source.js");
  const coreTransform = createCoreTransform();
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
                    properties: { className: ["pl-c1"] },
                    children: [{ type: "text", value: "1" }],
                  },
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
                    properties: { className: ["pl-c1"] },
                    children: [{ type: "text", value: "2" }],
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

it("handles text nodes with interspersed newlines", async () => {
  const highlighter = await createHighlighter(common);
  const tree = highlighter.highlight(
    `

a

b


`,
    undefined,
  );
  const coreTransform = createCoreTransform();
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
                  { type: "text", value: "a" },
                  { type: "text", value: "\n" },
                ],
              },
              {
                type: "element",
                tagName: "div",
                properties: { className: ["imp-l"] },
                children: [{ type: "text", value: "\n" }],
              },
              {
                type: "element",
                tagName: "div",
                properties: { className: ["imp-l"] },
                children: [
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

it("ignores unexpected node types", () => {
  const tree: Root = {
    type: "root",
    children: [
      { type: "doctype" },
      { type: "text", value: "a" },
      { type: "comment", value: "b" },
    ],
  };
  const coreTransform = createCoreTransform();
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
                  { type: "text", value: "a" },
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
