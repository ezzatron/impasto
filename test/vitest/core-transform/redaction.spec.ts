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

it("redacts sensitive information", async () => {
  const highlighter = await createHighlighter(common);
  const tree = highlighter.highlight(
    'const keys = "key_test_a key_test_b key_prod_a key_prod_b key_other" // hey',
    "source.js",
  );
  const coreTransform = createCoreTransform({
    redact: {
      "api-key": {
        search: [/key_test_a/g, /key_prod_(\w+)/g],
        replace: (match) => `REDACTED<${JSON.stringify(match)}>`,
      },
      greeting: {
        search: [/hey/g],
      },
    },
  });
  coreTransform(tree);

  expect(rootToHTML(tree)).toMatchInlineSnapshot(`
    "
    <div class="imp-l">
      <span class="pl-k">const</span>
      <span class="imp-s"></span>
      <span class="pl-c1">keys</span>
      <span class="imp-s"></span>
      <span class="pl-k">=</span>
      <span class="imp-s"></span>
      <span class="pl-s">
        <span class="pl-pds">"</span>
        <span class="imp-rd" data-imp-rd="api-key">REDACTED&#x3C;["key_test_a"]></span>
        <span class="imp-s"></span>key_test_b
        <span class="imp-s"></span>
        <span class="imp-rd" data-imp-rd="api-key">REDACTED&#x3C;["key_prod_a","a"]></span>
        <span class="imp-s"></span>
        <span class="imp-rd" data-imp-rd="api-key">REDACTED&#x3C;["key_prod_b","b"]></span>
        <span class="imp-s"></span>key_other
        <span class="pl-pds">"</span>
      </span>
      <span class="imp-s"></span>
      <span class="pl-c">//
        <span class="imp-s"></span>
        <span class="imp-rd" data-imp-rd="greeting"></span>
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
          properties: { className: ["pl-k"] },
          children: [{ type: "text", value: "const" }],
        },
        space,
        {
          type: "element",
          tagName: "span",
          properties: { className: ["pl-c1"] },
          children: [{ type: "text", value: "keys" }],
        },
        space,
        {
          type: "element",
          tagName: "span",
          properties: { className: ["pl-k"] },
          children: [{ type: "text", value: "=" }],
        },
        space,
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
              properties: {
                className: ["imp-rd"],
                "data-imp-rd": "api-key",
              },
              children: [
                {
                  type: "text",
                  value: 'REDACTED<["key_test_a"]>',
                },
              ],
            },
            space,
            { type: "text", value: "key_test_b" },
            space,
            {
              type: "element",
              tagName: "span",
              properties: {
                className: ["imp-rd"],
                "data-imp-rd": "api-key",
              },
              children: [
                {
                  type: "text",
                  value: 'REDACTED<["key_prod_a","a"]>',
                },
              ],
            },
            space,
            {
              type: "element",
              tagName: "span",
              properties: {
                className: ["imp-rd"],
                "data-imp-rd": "api-key",
              },
              children: [
                {
                  type: "text",
                  value: 'REDACTED<["key_prod_b","b"]>',
                },
              ],
            },
            space,
            { type: "text", value: "key_other" },
            {
              type: "element",
              tagName: "span",
              properties: { className: ["pl-pds"] },
              children: [{ type: "text", value: '"' }],
            },
          ],
        },
        space,
        {
          type: "element",
          tagName: "span",
          properties: { className: ["pl-c"] },
          children: [
            { type: "text", value: "//" },
            space,
            {
              type: "element",
              tagName: "span",
              properties: {
                className: ["imp-rd"],
                "data-imp-rd": "greeting",
              },
              children: [],
            },
          ],
        },
        { type: "text", value: "\n" },
      ],
    },
  ]);
});

it("redacts sensitive information spread across adjacent text nodes", () => {
  const tree: Root = {
    type: "root",
    children: [
      { type: "text", value: "key" },
      { type: "text", value: "_a" },
    ],
  };
  const coreTransform = createCoreTransform({
    redact: {
      "api-key": {
        search: [/key_\w+/g],
        replace: (match) => `REDACTED<${JSON.stringify(match)}>`,
      },
    },
  });
  coreTransform(tree);

  expect(rootToHTML(tree)).toMatchInlineSnapshot(`
    "
    <div class="imp-l">
      <span class="imp-rd" data-imp-rd="api-key">REDACTED&#x3C;["key_a"]></span>
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
          properties: {
            className: ["imp-rd"],
            "data-imp-rd": "api-key",
          },
          children: [{ type: "text", value: 'REDACTED<["key_a"]>' }],
        },
        { type: "text", value: "\n" },
      ],
    },
  ]);
});

it("can throw for extra sensitive information", async () => {
  const highlighter = await createHighlighter(common);
  const tree = highlighter.highlight('"key_prod_real"', "source.js");
  const coreTransform = createCoreTransform({
    redact: {
      "api-key": {
        search: [/key_prod_(\w+)/g],
        replace: (match) => {
          if (match[1] === "real") throw new Error("Don't use real keys!");
          return `REDACTED<${JSON.stringify(match)}>`;
        },
      },
    },
  });

  expect(() => coreTransform(tree)).toThrowError("Don't use real keys!");
});
