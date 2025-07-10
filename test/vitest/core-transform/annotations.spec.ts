import type { ElementContent, Root } from "hast";
import { coreTransform, createHighlighter } from "impasto";
import common from "impasto/lang/common";
import { expect, it } from "vitest";

const space: ElementContent = {
  type: "element",
  tagName: "span",
  properties: { className: ["imp-s"] },
  children: [{ type: "text", value: " " }],
};

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
  const { annotations } = coreTransform(tree);

  expect(annotations).toMatchObject({
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
                    properties: { className: ["pl-c"] },
                    children: [
                      { type: "text", value: "!!" },
                      {
                        type: "element",
                        tagName: "span",
                        properties: { className: ["imp-s"] },
                        children: [{ type: "text", value: " " }],
                      },
                      { type: "text", value: "[!name" },
                      {
                        type: "element",
                        tagName: "span",
                        properties: { className: ["imp-s"] },
                        children: [{ type: "text", value: " " }],
                      },
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
  const { annotations } = coreTransform(tree);

  expect(annotations).toMatchObject({});
});
