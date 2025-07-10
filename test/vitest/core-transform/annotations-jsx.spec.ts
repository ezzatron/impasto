import type { Element, ElementContent, Root } from "hast";
import { coreTransform, createHighlighter } from "impasto";
import common from "impasto/lang/common";
import { expect, it } from "vitest";

const space: ElementContent = {
  type: "element",
  tagName: "span",
  properties: { className: ["imp-s"] },
  children: [{ type: "text", value: " " }],
};

it("strips JSX annotations", async () => {
  const highlighter = await createHighlighter(common);
  const tree = highlighter.highlight(
    `<div>
{/* [!name-a value a] */}
a {/* [!name-b value b] extra content */}
{/* normal comment */}
{/* [!name-c value c] [!name-d value d] */}
</div>
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
                  { type: "text", value: "<" },
                  {
                    type: "element",
                    tagName: "span",
                    properties: { className: ["pl-ent"] },
                    children: [{ type: "text", value: "div" }],
                  },
                  { type: "text", value: ">" },
                  { type: "text", value: "\n" },
                ],
              },
              {
                type: "element",
                tagName: "div",
                properties: { className: ["imp-l"] },
                children: [
                  { type: "text", value: "a" },
                  space,
                  {
                    type: "element",
                    tagName: "span",
                    properties: { className: ["pl-pse"] },
                    children: [{ type: "text", value: "{" }],
                  },
                  {
                    type: "element",
                    tagName: "span",
                    properties: { className: ["pl-c"] },
                    children: [
                      { type: "text", value: "/*" },
                      space,
                      { type: "text", value: "extra" },
                      space,
                      { type: "text", value: "content*/" },
                    ],
                  },
                  {
                    type: "element",
                    tagName: "span",
                    properties: { className: ["pl-pse"] },
                    children: [{ type: "text", value: "}" }],
                  },
                  { type: "text", value: "\n" },
                ],
              },
              {
                properties: { className: ["imp-l"] },
                tagName: "div",
                type: "element",
                children: [
                  {
                    type: "element",
                    tagName: "span",
                    properties: { className: ["pl-pse"] },
                    children: [{ type: "text", value: "{" }],
                  },
                  {
                    type: "element",
                    tagName: "span",
                    properties: { className: ["pl-c"] },
                    children: [
                      { type: "text", value: "/*" },
                      space,
                      { type: "text", value: "normal" },
                      space,
                      { type: "text", value: "comment" },
                      space,
                      { type: "text", value: "*/" },
                    ],
                  },
                  {
                    type: "element",
                    tagName: "span",
                    properties: { className: ["pl-pse"] },
                    children: [{ type: "text", value: "}" }],
                  },
                  { type: "text", value: "\n" },
                ],
              },
              {
                type: "element",
                tagName: "div",
                properties: { className: ["imp-l"] },
                children: [
                  { type: "text", value: "</" },
                  {
                    type: "element",
                    tagName: "span",
                    properties: { className: ["pl-ent"] },
                    children: [{ type: "text", value: "div" }],
                  },
                  { type: "text", value: ">" },
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

it("doesn't strip surrounding nodes that are similar to JSX annotations", () => {
  const annotation: Element = {
    type: "element",
    tagName: "span",
    properties: { className: ["pl-c"] },
    children: [{ type: "text", value: "// [!name value]" }],
  };
  const tree: Root = {
    type: "root",
    children: [
      // previous sibling isn't an element
      { type: "text", value: "a" },
      structuredClone(annotation),
      {
        type: "element",
        tagName: "div",
        properties: {},
        children: [{ type: "text", value: "}" }],
      },

      // previous sibling doesn't have 1 child
      { type: "element", tagName: "div", properties: {}, children: [] },
      structuredClone(annotation),
      {
        type: "element",
        tagName: "div",
        properties: {},
        children: [{ type: "text", value: "}" }],
      },

      // previous sibling child isn't text
      {
        type: "element",
        tagName: "div",
        properties: {},
        children: [{ type: "comment", value: "a" }],
      },
      structuredClone(annotation),
      {
        type: "element",
        tagName: "div",
        properties: {},
        children: [{ type: "text", value: "}" }],
      },

      // previous sibling text isn't an open brace
      {
        type: "element",
        tagName: "div",
        properties: {},
        children: [{ type: "text", value: "a" }],
      },
      structuredClone(annotation),
      {
        type: "element",
        tagName: "div",
        properties: {},
        children: [{ type: "text", value: "}" }],
      },

      // next sibling isn't an element
      {
        type: "element",
        tagName: "div",
        properties: {},
        children: [{ type: "text", value: "{" }],
      },
      structuredClone(annotation),
      { type: "text", value: "a" },

      // next sibling doesn't have 1 child
      {
        type: "element",
        tagName: "div",
        properties: {},
        children: [{ type: "text", value: "{" }],
      },
      structuredClone(annotation),
      { type: "element", tagName: "div", properties: {}, children: [] },

      // next sibling child isn't text
      {
        type: "element",
        tagName: "div",
        properties: {},
        children: [{ type: "text", value: "{" }],
      },
      structuredClone(annotation),
      {
        type: "element",
        tagName: "div",
        properties: {},
        children: [{ type: "comment", value: "a" }],
      },

      // next sibling text isn't a closing brace
      {
        type: "element",
        tagName: "div",
        properties: {},
        children: [{ type: "text", value: "{" }],
      },
      structuredClone(annotation),
      {
        type: "element",
        tagName: "div",
        properties: {},
        children: [{ type: "text", value: "a" }],
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
                  // previous sibling isn't an element
                  { type: "text", value: "a" },
                  {
                    type: "element",
                    tagName: "div",
                    properties: { className: [] },
                    children: [{ type: "text", value: "}" }],
                  },

                  // previous sibling doesn't have 1 child
                  {
                    type: "element",
                    tagName: "div",
                    properties: {},
                    children: [],
                  },
                  {
                    type: "element",
                    tagName: "div",
                    properties: { className: [] },
                    children: [{ type: "text", value: "}" }],
                  },

                  // previous sibling child isn't text
                  {
                    type: "element",
                    tagName: "div",
                    properties: {},
                    children: [{ type: "comment", value: "a" }],
                  },
                  {
                    type: "element",
                    tagName: "div",
                    properties: { className: [] },
                    children: [{ type: "text", value: "}" }],
                  },

                  // previous sibling text isn't an open brace
                  {
                    type: "element",
                    tagName: "div",
                    properties: {},
                    children: [{ type: "text", value: "a" }],
                  },
                  {
                    type: "element",
                    tagName: "div",
                    properties: { className: [] },
                    children: [{ type: "text", value: "}" }],
                  },

                  // next sibling isn't an element
                  {
                    type: "element",
                    tagName: "div",
                    properties: { className: [] },
                    children: [{ type: "text", value: "{" }],
                  },
                  { type: "text", value: "a" },

                  // next sibling doesn't have 1 child
                  {
                    type: "element",
                    tagName: "div",
                    properties: { className: [] },
                    children: [{ type: "text", value: "{" }],
                  },
                  {
                    type: "element",
                    tagName: "div",
                    properties: {},
                    children: [],
                  },

                  // next sibling child isn't text
                  {
                    type: "element",
                    tagName: "div",
                    properties: { className: [] },
                    children: [{ type: "text", value: "{" }],
                  },
                  {
                    type: "element",
                    tagName: "div",
                    properties: {},
                    children: [{ type: "comment", value: "a" }],
                  },

                  // next sibling text isn't a closing brace
                  {
                    type: "element",
                    tagName: "div",
                    properties: { className: [] },
                    children: [{ type: "text", value: "{" }],
                  },
                  {
                    type: "element",
                    tagName: "div",
                    properties: {},
                    children: [{ type: "text", value: "a" }],
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
