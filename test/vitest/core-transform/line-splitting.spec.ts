import { common } from "@wooorm/starry-night";
import type { Root } from "hast";
import { coreTransform, createHighlighter } from "impasto";
import { expect, it } from "vitest";

it("splits lines terminated with newlines", async () => {
  const highlighter = await createHighlighter(common);
  const tree = highlighter.highlight("1\n2\n", "source.js");
  const transformed = coreTransform(tree);

  expect(transformed).toMatchObject({
    type: "root",
    children: [
      {
        type: "element",
        tagName: "pre",
        properties: { class: "imp-cb" },
        children: [
          {
            type: "element",
            tagName: "code",
            properties: {},
            children: [
              {
                type: "element",
                tagName: "div",
                properties: { class: "imp-l" },
                children: [
                  {
                    type: "element",
                    tagName: "span",
                    properties: { className: ["pl-c1"] },
                    children: [{ type: "text", value: "1" }],
                  },
                ],
              },
              {
                type: "element",
                tagName: "div",
                properties: { class: "imp-l" },
                children: [
                  {
                    type: "element",
                    tagName: "span",
                    properties: { className: ["pl-c1"] },
                    children: [{ type: "text", value: "2" }],
                  },
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
  const transformed = coreTransform(tree);

  expect(transformed).toMatchObject({
    type: "root",
    children: [
      {
        type: "element",
        tagName: "pre",
        properties: { class: "imp-cb" },
        children: [
          {
            type: "element",
            tagName: "code",
            properties: {},
            children: [
              {
                type: "element",
                tagName: "div",
                properties: { class: "imp-l" },
                children: [
                  {
                    type: "element",
                    tagName: "span",
                    properties: { className: ["pl-c1"] },
                    children: [{ type: "text", value: "1" }],
                  },
                ],
              },
              {
                type: "element",
                tagName: "div",
                properties: { class: "imp-l" },
                children: [
                  {
                    type: "element",
                    tagName: "span",
                    properties: { className: ["pl-c1"] },
                    children: [{ type: "text", value: "2" }],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  });
});

it("handles text nodes with newlines mid-value", async () => {
  const highlighter = await createHighlighter(common);
  const tree = highlighter.highlight("a\nb", undefined);
  const transformed = coreTransform(tree);

  expect(transformed).toMatchObject({
    type: "root",
    children: [
      {
        type: "element",
        tagName: "pre",
        properties: { class: "imp-cb" },
        children: [
          {
            type: "element",
            tagName: "code",
            properties: {},
            children: [
              {
                type: "element",
                tagName: "div",
                properties: { class: "imp-l" },
                children: [{ type: "text", value: "a" }],
              },
              {
                type: "element",
                tagName: "div",
                properties: { class: "imp-l" },
                children: [{ type: "text", value: "b" }],
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
  const transformed = coreTransform(tree);

  expect(transformed).toMatchObject({
    type: "root",
    children: [
      {
        type: "element",
        tagName: "pre",
        properties: { class: "imp-cb" },
        children: [
          {
            type: "element",
            tagName: "code",
            properties: {},
            children: [
              {
                type: "element",
                tagName: "div",
                properties: { class: "imp-l" },
                children: [{ type: "text", value: "a" }],
              },
            ],
          },
        ],
      },
    ],
  });
});
