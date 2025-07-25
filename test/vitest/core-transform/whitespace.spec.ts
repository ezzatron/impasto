import type { Element, Root } from "hast";
import { createCoreTransform, createHighlighter } from "impasto";
import common from "impasto/lang/common";
import { expect, it } from "vitest";
import { rootToHTML } from "../../hast.js";

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

it("trims trailing whitespace from lines", () => {
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

  expect(rootToHTML(tree)).toMatchInlineSnapshot(`
    "
    <div class="imp-l">
      <span class="imp-s"></span>1
    </div>
    <div class="imp-l">
      <span class="imp-s"></span>
      <span class="imp-s"></span>2
    </div>
    "
  `);
  expect(tree.children).toEqual([
    {
      type: "element",
      tagName: "div",
      properties: { className: ["imp-l"] },
      children: [space, { type: "text", value: "1\n" }],
    },
    {
      type: "element",
      tagName: "div",
      properties: { className: ["imp-l"] },
      children: [space, space, { type: "text", value: "2\n" }],
    },
  ]);
});

it("wraps spaces", async () => {
  const highlighter = await createHighlighter(common);
  const tree = highlighter.highlight("  a  b", undefined);
  const coreTransform = createCoreTransform();
  coreTransform(tree);

  expect(rootToHTML(tree)).toMatchInlineSnapshot(`
    "
    <div class="imp-l">
      <span class="imp-s"></span>
      <span class="imp-s"></span>a
      <span class="imp-s"></span>
      <span class="imp-s"></span>b
    </div>
    "
  `);
  expect(tree.children).toEqual([
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
        { type: "text", value: "b\n" },
      ],
    },
  ]);
});

it("wraps tabs", async () => {
  const highlighter = await createHighlighter(common);
  const tree = highlighter.highlight("\t\ta\t\tb", undefined);
  const coreTransform = createCoreTransform();
  coreTransform(tree);

  expect(rootToHTML(tree)).toMatchInlineSnapshot(`
    "
    <div class="imp-l">
      <span class="imp-t"></span>
      <span class="imp-t"></span>a
      <span class="imp-t"></span>
      <span class="imp-t"></span>b
    </div>
    "
  `);
  expect(tree.children).toEqual([
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
        { type: "text", value: "b\n" },
      ],
    },
  ]);
});

it("wraps whitespace in code", async () => {
  const highlighter = await createHighlighter(common);
  const tree = highlighter.highlight('" \t1"', "source.js");
  const coreTransform = createCoreTransform();
  coreTransform(tree);

  expect(rootToHTML(tree)).toMatchInlineSnapshot(`
    "
    <div class="imp-l">
      <span class="pl-s">
        <span class="pl-pds">"</span>
        <span class="imp-s"></span>
        <span class="imp-t"></span>1
        <span class="pl-pds">"</span>
      </span>
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
  ]);
});
