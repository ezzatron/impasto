import type { Root } from "hast";
import { createCoreTransform, createHighlighter } from "impasto";
import common from "impasto/lang/common";
import { expect, it } from "vitest";
import { rootToHTML } from "../../hast.js";

it("splits lines terminated with newlines", async () => {
  const highlighter = await createHighlighter(common);
  const tree = highlighter.highlight("1\n2\n", "source.js");
  const coreTransform = createCoreTransform();
  coreTransform(tree);

  expect(rootToHTML(tree)).toMatchInlineSnapshot(`
    "
    <div class="imp-l">
      <span class="pl-c1">1</span>
    </div>
    <div class="imp-l">
      <span class="pl-c1">2</span>
    </div>
    "
  `);
  expect(tree.children).toEqual([
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
  ]);
});

it("handles missing terminal newlines", async () => {
  const highlighter = await createHighlighter(common);
  const tree = highlighter.highlight("1\n2", "source.js");
  const coreTransform = createCoreTransform();
  coreTransform(tree);

  expect(rootToHTML(tree)).toMatchInlineSnapshot(`
    "
    <div class="imp-l">
      <span class="pl-c1">1</span>
    </div>
    <div class="imp-l">
      <span class="pl-c1">2</span>
    </div>
    "
  `);
  expect(tree.children).toEqual([
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
  ]);
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

  expect(rootToHTML(tree)).toMatchInlineSnapshot(`
    "
    <div class="imp-l">a</div>
    <div class="imp-l"></div>
    <div class="imp-l">b</div>
    "
  `);
  expect(tree.children).toEqual([
    {
      type: "element",
      tagName: "div",
      properties: { className: ["imp-l"] },
      children: [{ type: "text", value: "a\n" }],
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
      children: [{ type: "text", value: "b\n" }],
    },
  ]);
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

  expect(rootToHTML(tree)).toMatchInlineSnapshot(`
    "
    <div class="imp-l">a</div>
    "
  `);
  expect(tree.children).toEqual([
    {
      type: "element",
      tagName: "div",
      properties: { className: ["imp-l"] },
      children: [{ type: "text", value: "a\n" }],
    },
  ]);
});
