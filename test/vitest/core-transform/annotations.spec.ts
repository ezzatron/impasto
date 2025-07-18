import type { Element, Root } from "hast";
import {
  createCoreTransform,
  createHighlighter,
  type LineNumberElement,
  type LineNumbersElement,
} from "impasto";
import common from "impasto/lang/common";
import { expect, it } from "vitest";

const space: Element = {
  type: "element",
  tagName: "span",
  properties: { className: ["imp-s"] },
  children: [{ type: "text", value: " " }],
};

const lineNumber = (n: number): LineNumberElement => ({
  type: "element",
  tagName: "div",
  properties: { className: ["imp-n"] },
  children: [{ type: "text", value: String(n) }],
});

const lineNumbers = (n: number): LineNumbersElement => ({
  type: "element",
  tagName: "div",
  properties: { className: ["imp-ln"] },
  children: Array.from({ length: n }, (_, i) => lineNumber(i + 1)),
});

it("parses annotations", async () => {
  const highlighter = await createHighlighter(common);
  const tree = highlighter.highlight(
    `// [!name-a value a]
1
// normal comment
// [!name-b value b] [!name-c value c]
`,
    "source.js",
  );
  const coreTransform = createCoreTransform();
  const { annotations } = coreTransform(tree);

  expect(annotations).toEqual({
    0: [{ name: "name-a", value: "value a" }],
    3: [
      { name: "name-b", value: "value b" },
      { name: "name-c", value: "value c" },
    ],
  });
});

it("strips annotations", async () => {
  const highlighter = await createHighlighter(common);
  const tree = highlighter.highlight(
    `// [!name-a value a]
1 // [!name-b value b] extra content
// normal comment
// [!name-c value c] [!name-d value d]
`,
    "source.js",
  );
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
                  {
                    type: "element",
                    tagName: "span",
                    properties: { className: ["pl-c1"] },
                    children: [{ type: "text", value: "1" }],
                  },
                  space,
                  {
                    type: "element",
                    tagName: "span",
                    properties: { className: ["pl-c"] },
                    children: [
                      { type: "text", value: "//" },
                      space,
                      { type: "text", value: "extra" },
                      space,
                      { type: "text", value: "content" },
                    ],
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
                    properties: { className: ["pl-c"] },
                    children: [
                      { type: "text", value: "//" },
                      space,
                      { type: "text", value: "normal" },
                      space,
                      { type: "text", value: "comment" },
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

it("doesn't strip annotations in retain mode", async () => {
  const highlighter = await createHighlighter(common);
  const tree = highlighter.highlight("// [!name value]", "source.js");
  const coreTransform = createCoreTransform({ annotationMode: "retain" });
  const { annotations } = coreTransform(tree);

  expect(annotations).toEqual({
    0: [{ name: "name", value: "value" }],
  });
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
                    properties: { className: ["pl-c"] },
                    children: [
                      { type: "text", value: "//" },
                      space,
                      { type: "text", value: "[!name" },
                      space,
                      { type: "text", value: "value]" },
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

it("doesn't parse or strip annotations in ignore mode", async () => {
  const highlighter = await createHighlighter(common);
  const tree = highlighter.highlight("// [!name value]", "source.js");
  const coreTransform = createCoreTransform({ annotationMode: "ignore" });
  const { annotations } = coreTransform(tree);

  expect(annotations).toEqual({});
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
                    properties: { className: ["pl-c"] },
                    children: [
                      { type: "text", value: "//" },
                      space,
                      { type: "text", value: "[!name" },
                      space,
                      { type: "text", value: "value]" },
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

it("ignores unknown comment syntaxes", () => {
  const tree: Root = {
    type: "root",
    children: [
      {
        type: "element",
        tagName: "span",
        properties: { className: ["pl-c"] },
        children: [{ type: "text", value: "!! [!name value]" }],
      },
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
                    properties: { className: ["pl-c"] },
                    children: [
                      { type: "text", value: "!!" },
                      space,
                      { type: "text", value: "[!name" },
                      space,
                      { type: "text", value: "value]" },
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

it("handles source with no annotations", async () => {
  const highlighter = await createHighlighter(common);
  const tree = highlighter.highlight("1", "source.js");
  const coreTransform = createCoreTransform();
  const { annotations } = coreTransform(tree);

  expect(annotations).toEqual({});
});
