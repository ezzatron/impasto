import type { Element, Root } from "hast";
import { createCoreTransform, createHighlighter } from "impasto";
import all from "impasto/lang/all";
import common from "impasto/lang/common";
import { expect, it } from "vitest";
import { rootToHTML } from "../../hast.js";

const space: Element = {
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
  const coreTransform = createCoreTransform();
  coreTransform(tree);

  expect(rootToHTML(tree)).toMatchInlineSnapshot(`
    "
    <div class="imp-l">&#x3C;
      <span class="pl-ent">div</span>>
    </div>
    <div class="imp-l">a
      <span class="imp-s"></span>
      <span class="pl-pse">{</span>
      <span class="pl-c">/*
        <span class="imp-s"></span>extra
        <span class="imp-s"></span>content*/
      </span>
      <span class="pl-pse">}</span>
    </div>
    <div class="imp-l">
      <span class="pl-pse">{</span>
      <span class="pl-c">/*
        <span class="imp-s"></span>normal
        <span class="imp-s"></span>comment
        <span class="imp-s"></span>*/
      </span>
      <span class="pl-pse">}</span>
    </div>
    <div class="imp-l">&#x3C;/
      <span class="pl-ent">div</span>>
    </div>
    "
  `);
  expect(tree.children).toEqual([
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
        { type: "text", value: ">\n" },
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
        { type: "text", value: ">\n" },
      ],
    },
  ]);
});

it("strips MDX annotations", async () => {
  const highlighter = await createHighlighter(all);
  const tree = highlighter.highlight(
    `
{/* [!name-a value a] */}
a {/* [!name-b value b] extra content */}
{/* normal comment */}
{/* [!name-c value c] [!name-d value d] */}
`,
    "source.mdx",
  );
  const coreTransform = createCoreTransform();
  coreTransform(tree);

  expect(rootToHTML(tree)).toMatchInlineSnapshot(`
    "
    <div class="imp-l">a
      <span class="imp-s"></span>
      <span class="pl-s">{</span>
      <span class="pl-c">/*
        <span class="imp-s"></span>extra
        <span class="imp-s"></span>content*/
      </span>
      <span class="pl-s">}</span>
    </div>
    <div class="imp-l">
      <span class="pl-s">{</span>
      <span class="pl-c">/*
        <span class="imp-s"></span>normal
        <span class="imp-s"></span>comment
        <span class="imp-s"></span>*/
      </span>
      <span class="pl-s">}</span>
    </div>
    "
  `);
  expect(tree.children).toEqual([
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
          properties: { className: ["pl-s"] },
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
          properties: { className: ["pl-s"] },
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
          properties: { className: ["pl-s"] },
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
          properties: { className: ["pl-s"] },
          children: [{ type: "text", value: "}" }],
        },
        { type: "text", value: "\n" },
      ],
    },
  ]);
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
  const coreTransform = createCoreTransform();
  coreTransform(tree);

  expect(rootToHTML(tree)).toMatchInlineSnapshot(`
    "
    <div class="imp-l">a
      <div class="">}</div>
      <div></div>
      <div class="">}</div>
      <div><!--a--></div>
      <div class="">}</div>
      <div class="">a</div>
      <div class="">}</div>
      <div class="">{</div>a
      <div class="">{</div>
      <div></div>
      <div class="">{</div>
      <div><!--a--></div>
      <div class="">{</div>
      <div class="">a</div>
    </div>
    "
  `);
  expect(tree.children).toEqual([
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
          properties: expect.objectContaining({}),
          children: [{ type: "text", value: "}" }],
        },

        // previous sibling doesn't have 1 child
        {
          type: "element",
          tagName: "div",
          properties: expect.objectContaining({}),
          children: [],
        },
        {
          type: "element",
          tagName: "div",
          properties: expect.objectContaining({}),
          children: [{ type: "text", value: "}" }],
        },

        // previous sibling child isn't text
        {
          type: "element",
          tagName: "div",
          properties: expect.objectContaining({}),
          children: [{ type: "comment", value: "a" }],
        },
        {
          type: "element",
          tagName: "div",
          properties: expect.objectContaining({}),
          children: [{ type: "text", value: "}" }],
        },

        // previous sibling text isn't an open brace
        {
          type: "element",
          tagName: "div",
          properties: expect.objectContaining({}),
          children: [{ type: "text", value: "a" }],
        },
        {
          type: "element",
          tagName: "div",
          properties: expect.objectContaining({}),
          children: [{ type: "text", value: "}" }],
        },

        // next sibling isn't an element
        {
          type: "element",
          tagName: "div",
          properties: expect.objectContaining({}),
          children: [{ type: "text", value: "{" }],
        },
        { type: "text", value: "a" },

        // next sibling doesn't have 1 child
        {
          type: "element",
          tagName: "div",
          properties: expect.objectContaining({}),
          children: [{ type: "text", value: "{" }],
        },
        {
          type: "element",
          tagName: "div",
          properties: expect.objectContaining({}),
          children: [],
        },

        // next sibling child isn't text
        {
          type: "element",
          tagName: "div",
          properties: expect.objectContaining({}),
          children: [{ type: "text", value: "{" }],
        },
        {
          type: "element",
          tagName: "div",
          properties: expect.objectContaining({}),
          children: [{ type: "comment", value: "a" }],
        },

        // next sibling text isn't a closing brace
        {
          type: "element",
          tagName: "div",
          properties: expect.objectContaining({}),
          children: [{ type: "text", value: "{" }],
        },
        {
          type: "element",
          tagName: "div",
          properties: expect.objectContaining({}),
          children: [{ type: "text", value: "a" }],
        },

        { type: "text", value: "\n" },
      ],
    },
  ]);
});
