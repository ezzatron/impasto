import {
  createCoreTransform,
  createHighlighter,
  createInstanceTransform,
  type LineNumberElement,
  type LineNumbersElement,
} from "impasto";
import common from "impasto/lang/common";
import { expect, it } from "vitest";
import { rootToHTML } from "../../hast.js";

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

it("doesn't show line numbers by default", async () => {
  const highlighter = await createHighlighter(common);
  const tree = highlighter.highlight("1", "source.js");
  const coreTransform = createCoreTransform();
  const { tree: coreTree } = coreTransform(tree);
  const instanceTransform = createInstanceTransform();
  const transformed = instanceTransform(coreTree);

  expect(rootToHTML(transformed)).toMatchInlineSnapshot(`
    "
    <pre class="imp-cb">
      <div class="imp-ln">
        <div class="imp-n">1</div>
      </div>
      <code>
        <div class="imp-l">
          <span class="pl-c1">1</span>
        </div>
      </code>
    </pre>
    "
  `);
  expect(transformed).toEqual({
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
                    properties: { className: ["pl-c1"] },
                    children: [{ type: "text", value: "1" }],
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

it("shows line numbers when enabled", async () => {
  const highlighter = await createHighlighter(common);
  const tree = highlighter.highlight("1", "source.js");
  const coreTransform = createCoreTransform();
  const { tree: coreTree } = coreTransform(tree);
  const instanceTransform = createInstanceTransform({ showLineNumbers: true });
  const transformed = instanceTransform(coreTree);

  expect(rootToHTML(transformed)).toMatchInlineSnapshot(`
    "
    <pre class="imp-cb imp-ln-s">
      <div class="imp-ln">
        <div class="imp-n">1</div>
      </div>
      <code>
        <div class="imp-l">
          <span class="pl-c1">1</span>
        </div>
      </code>
    </pre>
    "
  `);
  expect(transformed).toEqual({
    type: "root",
    children: [
      {
        type: "element",
        tagName: "pre",
        properties: { className: ["imp-cb", "imp-ln-s"] },
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
                    properties: { className: ["pl-c1"] },
                    children: [{ type: "text", value: "1" }],
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
