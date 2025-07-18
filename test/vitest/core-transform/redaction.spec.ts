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
            ],
          },
        ],
      },
    ],
  });
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
                    properties: {
                      className: ["imp-rd"],
                      "data-imp-rd": "api-key",
                    },
                    children: [{ type: "text", value: 'REDACTED<["key_a"]>' }],
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
