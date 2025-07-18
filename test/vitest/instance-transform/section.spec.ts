import type { Element } from "hast";
import {
  createCoreTransform,
  createHighlighter,
  createInstanceTransform,
} from "impasto";
import common from "impasto/lang/common";
import { expect, it } from "vitest";

const s = " ";
const t = "\t";

const space: Element = {
  type: "element",
  tagName: "span",
  properties: { className: ["imp-s"] },
  children: [{ type: "text", value: s }],
};

const tab: Element = {
  type: "element",
  tagName: "span",
  properties: { className: ["imp-t"] },
  children: [{ type: "text", value: t }],
};

it("doesn't isolate any section by default", async () => {
  const highlighter = await createHighlighter(common);
  const tree = highlighter.highlight(
    `
1 // [!section section-a]
${t}${s}${s}2 // [!section-start section-b]
${t}${s}${s}${s}${s}3 // [!section section-c]
${t}${s}${s}4 // [!section-end section-b]
5 // [!section section-d]
6
    `,
    "source.js",
  );
  const coreTransform = createCoreTransform();
  coreTransform(tree);
  const instanceTransform = createInstanceTransform();
  const transformed = instanceTransform(tree);

  expect(transformed).toEqual({
    type: "root",
    children: [
      {
        type: "element",
        tagName: "pre",
        properties: { className: ["imp-cb"] },
        children: [
          {
            type: "element",
            tagName: "div",
            properties: { className: ["imp-ln"] },
            children: [
              {
                type: "element",
                tagName: "div",
                properties: { className: ["imp-n"] },
                children: [{ type: "text", value: "1" }],
              },
              {
                type: "element",
                tagName: "div",
                properties: { className: ["imp-n"] },
                children: [{ type: "text", value: "2" }],
              },
              {
                type: "element",
                tagName: "div",
                properties: { className: ["imp-n"] },
                children: [{ type: "text", value: "3" }],
              },
              {
                type: "element",
                tagName: "div",
                properties: { className: ["imp-n"] },
                children: [{ type: "text", value: "4" }],
              },
              {
                type: "element",
                tagName: "div",
                properties: { className: ["imp-n"] },
                children: [{ type: "text", value: "5" }],
              },
              {
                type: "element",
                tagName: "div",
                properties: { className: ["imp-n"] },
                children: [{ type: "text", value: "6" }],
              },
            ],
          },
          {
            type: "element",
            tagName: "code",
            properties: {},
            children: [
              {
                type: "element",
                tagName: "div",
                properties: { className: ["imp-l"], "data-imp-s": "section-a" },
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
                properties: { className: ["imp-l"], "data-imp-s": "section-b" },
                children: [
                  tab,
                  space,
                  space,
                  {
                    type: "element",
                    tagName: "span",
                    properties: { className: ["pl-c1"] },
                    children: [{ type: "text", value: "2" }],
                  },
                  { type: "text", value: "\n" },
                ],
              },
              {
                type: "element",
                tagName: "div",
                properties: {
                  className: ["imp-l"],
                  "data-imp-s": "section-b section-c",
                },
                children: [
                  tab,
                  space,
                  space,
                  space,
                  space,
                  {
                    type: "element",
                    tagName: "span",
                    properties: { className: ["pl-c1"] },
                    children: [{ type: "text", value: "3" }],
                  },
                  { type: "text", value: "\n" },
                ],
              },
              {
                type: "element",
                tagName: "div",
                properties: { className: ["imp-l"], "data-imp-s": "section-b" },
                children: [
                  tab,
                  space,
                  space,
                  {
                    type: "element",
                    tagName: "span",
                    properties: { className: ["pl-c1"] },
                    children: [{ type: "text", value: "4" }],
                  },
                  { type: "text", value: "\n" },
                ],
              },
              {
                type: "element",
                tagName: "div",
                properties: { className: ["imp-l"], "data-imp-s": "section-d" },
                children: [
                  {
                    type: "element",
                    tagName: "span",
                    properties: { className: ["pl-c1"] },
                    children: [{ type: "text", value: "5" }],
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
                    children: [{ type: "text", value: "6" }],
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

it("isolates the supplied sections", async () => {
  const highlighter = await createHighlighter(common);
  const tree = highlighter.highlight(
    `
1 // [!section section-a]
${t}${s}${s}2 // [!section-start section-b]
${t}${s}${s}${s}${s}3 // [!section section-c]
${t}${s}${s}4 // [!section-end section-b]
5 // [!section section-d]
6
    `,
    "source.js",
  );
  const coreTransform = createCoreTransform();
  coreTransform(tree);
  const instanceTransform = createInstanceTransform({ section: "section-b" });
  const transformed = instanceTransform(tree);

  expect(transformed).toEqual({
    type: "root",
    children: [
      {
        type: "element",
        tagName: "pre",
        properties: {
          className: ["imp-cb"],
          "data-imp-s": "section-b",
          style: "--imp-sc-i-s:2;--imp-sc-i-t:1",
        },
        children: [
          {
            type: "element",
            tagName: "div",
            properties: { className: ["imp-ln"] },
            children: [
              {
                type: "element",
                tagName: "div",
                properties: { className: ["imp-n", "imp-sx"] },
                children: [{ type: "text", value: "1" }],
              },
              {
                type: "element",
                tagName: "div",
                properties: { className: ["imp-n", "imp-sc"] },
                children: [{ type: "text", value: "2" }],
              },
              {
                type: "element",
                tagName: "div",
                properties: { className: ["imp-n", "imp-sc"] },
                children: [{ type: "text", value: "3" }],
              },
              {
                type: "element",
                tagName: "div",
                properties: { className: ["imp-n", "imp-sc"] },
                children: [{ type: "text", value: "4" }],
              },
              {
                type: "element",
                tagName: "div",
                properties: { className: ["imp-n", "imp-sx"] },
                children: [{ type: "text", value: "5" }],
              },
              {
                type: "element",
                tagName: "div",
                properties: { className: ["imp-n", "imp-sx"] },
                children: [{ type: "text", value: "6" }],
              },
            ],
          },
          {
            type: "element",
            tagName: "code",
            properties: {},
            children: [
              {
                type: "element",
                tagName: "div",
                properties: {
                  className: ["imp-l", "imp-sx"],
                  "data-imp-s": "section-a",
                },
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
                properties: {
                  className: ["imp-l", "imp-sc"],
                  "data-imp-s": "section-b",
                },
                children: [
                  {
                    type: "element",
                    tagName: "span",
                    properties: { className: ["imp-sc-i"] },
                    children: [tab, space, space],
                  },
                  {
                    type: "element",
                    tagName: "span",
                    properties: { className: ["pl-c1"] },
                    children: [{ type: "text", value: "2" }],
                  },
                  { type: "text", value: "\n" },
                ],
              },
              {
                type: "element",
                tagName: "div",
                properties: {
                  className: ["imp-l", "imp-sc"],
                  "data-imp-s": "section-b section-c",
                },
                children: [
                  {
                    type: "element",
                    tagName: "span",
                    properties: { className: ["imp-sc-i"] },
                    children: [tab, space, space],
                  },
                  space,
                  space,
                  {
                    type: "element",
                    tagName: "span",
                    properties: { className: ["pl-c1"] },
                    children: [{ type: "text", value: "3" }],
                  },
                  { type: "text", value: "\n" },
                ],
              },
              {
                type: "element",
                tagName: "div",
                properties: {
                  className: ["imp-l", "imp-sc"],
                  "data-imp-s": "section-b",
                },
                children: [
                  {
                    type: "element",
                    tagName: "span",
                    properties: { className: ["imp-sc-i"] },
                    children: [tab, space, space],
                  },
                  {
                    type: "element",
                    tagName: "span",
                    properties: { className: ["pl-c1"] },
                    children: [{ type: "text", value: "4" }],
                  },
                  { type: "text", value: "\n" },
                ],
              },
              {
                type: "element",
                tagName: "div",
                properties: {
                  className: ["imp-l", "imp-sx"],
                  "data-imp-s": "section-d",
                },
                children: [
                  {
                    type: "element",
                    tagName: "span",
                    properties: { className: ["pl-c1"] },
                    children: [{ type: "text", value: "5" }],
                  },
                  { type: "text", value: "\n" },
                ],
              },
              {
                type: "element",
                tagName: "div",
                properties: { className: ["imp-l", "imp-sx"] },
                children: [
                  {
                    type: "element",
                    tagName: "span",
                    properties: { className: ["pl-c1"] },
                    children: [{ type: "text", value: "6" }],
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

it("does nothing if the section spans all lines", async () => {
  const highlighter = await createHighlighter(common);
  const tree = highlighter.highlight(
    `
1 // [!section-start section-a]
2 // [!section-end section-a]
    `,
    "source.js",
  );
  const coreTransform = createCoreTransform();
  coreTransform(tree);
  const instanceTransform = createInstanceTransform({ section: "section-a" });
  const transformed = instanceTransform(tree);

  expect(transformed).toEqual(tree);
});

it("handles inconsistent indentation", async () => {
  const highlighter = await createHighlighter(common);
  const tree = highlighter.highlight(
    `
${t}${s}${s}1 // [!section-start section-a]
${s}${s}${t}2 // [!section-end section-a]
3
    `,
    "source.js",
  );
  const coreTransform = createCoreTransform();
  coreTransform(tree);
  const instanceTransform = createInstanceTransform({ section: "section-a" });
  const transformed = instanceTransform(tree);

  expect(transformed).toEqual({
    type: "root",
    children: [
      {
        type: "element",
        tagName: "pre",
        properties: {
          className: ["imp-cb"],
          "data-imp-s": "section-a",
          style: "--imp-sc-i-s:0;--imp-sc-i-t:0",
        },
        children: [
          {
            type: "element",
            tagName: "div",
            properties: { className: ["imp-ln"] },
            children: [
              {
                type: "element",
                tagName: "div",
                properties: { className: ["imp-n", "imp-sc"] },
                children: [{ type: "text", value: "1" }],
              },
              {
                type: "element",
                tagName: "div",
                properties: { className: ["imp-n", "imp-sc"] },
                children: [{ type: "text", value: "2" }],
              },
              {
                type: "element",
                tagName: "div",
                properties: { className: ["imp-n", "imp-sx"] },
                children: [{ type: "text", value: "3" }],
              },
            ],
          },
          {
            type: "element",
            tagName: "code",
            properties: {},
            children: [
              {
                type: "element",
                tagName: "div",
                properties: {
                  className: ["imp-l", "imp-sc"],
                  "data-imp-s": "section-a",
                },
                children: [
                  tab,
                  space,
                  space,
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
                properties: {
                  className: ["imp-l", "imp-sc"],
                  "data-imp-s": "section-a",
                },
                children: [
                  space,
                  space,
                  tab,
                  {
                    type: "element",
                    tagName: "span",
                    properties: { className: ["pl-c1"] },
                    children: [{ type: "text", value: "2" }],
                  },
                  { type: "text", value: "\n" },
                ],
              },
              {
                type: "element",
                tagName: "div",
                properties: { className: ["imp-l", "imp-sx"] },
                children: [
                  {
                    type: "element",
                    tagName: "span",
                    properties: { className: ["pl-c1"] },
                    children: [{ type: "text", value: "3" }],
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

it("throws if the section is not found", async () => {
  const highlighter = await createHighlighter(common);
  const tree = highlighter.highlight("1", "source.js");
  const coreTransform = createCoreTransform();
  coreTransform(tree);
  const instanceTransform = createInstanceTransform({ section: "section-a" });

  expect(() => instanceTransform(tree)).toThrow(
    "Missing code section section-a",
  );
});
