import type { Element } from "hast";
import {
  createCoreTransform,
  createHighlighter,
  createInstanceTransform,
} from "impasto";
import common from "impasto/lang/common";
import { expect, it } from "vitest";
import { rootToHTML } from "../../hast.js";

const s = " ";
const t = "\t";

const space: Element = {
  type: "element",
  tagName: "span",
  properties: { className: ["imp-s"] },
  children: [{ type: "text", value: s }],
};

it("removes all section context from the output", async () => {
  const highlighter = await createHighlighter(common);
  const tree = highlighter.highlight(
    `
1 // [!section section-a]
${t}${s}${s}2 // [!section-start section-b]
${t}${s}${s}${s}${s}3 // [!section section-c]
${t}${s}${s}4 // [!section-end section-b]
5 // [!section section-d]
6
    `,
    "source.js",
  );
  const coreTransform = createCoreTransform();
  const { tree: coreTree } = coreTransform(tree);
  const instanceTransform = createInstanceTransform({
    section: "section-b",
    noSectionContext: true,
  });
  const transformed = instanceTransform(coreTree);

  expect(rootToHTML(transformed)).toMatchInlineSnapshot(`
    "
    <pre class="imp-cb">
      <div class="imp-ln">
        <div class="imp-n">2</div>
        <div class="imp-n">3</div>
        <div class="imp-n">4</div>
      </div>
      <code>
        <div class="imp-l" data-imp-s="section-b">
          <span class="pl-c1">2</span>
        </div>
        <div class="imp-l" data-imp-s="section-b section-c">
          <span class="imp-s"></span>
          <span class="imp-s"></span>
          <span class="pl-c1">3</span>
        </div>
        <div class="imp-l" data-imp-s="section-b">
          <span class="pl-c1">4</span>
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
        properties: {
          className: ["imp-cb"],
        },
        children: [
          {
            type: "element",
            tagName: "div",
            properties: { className: ["imp-ln"] },
            children: [
              {
                type: "element",
                tagName: "div",
                properties: { className: ["imp-n"] },
                children: [{ type: "text", value: "2" }],
              },
              {
                type: "element",
                tagName: "div",
                properties: { className: ["imp-n"] },
                children: [{ type: "text", value: "3" }],
              },
              {
                type: "element",
                tagName: "div",
                properties: { className: ["imp-n"] },
                children: [{ type: "text", value: "4" }],
              },
            ],
          },
          {
            type: "element",
            tagName: "code",
            properties: {},
            children: [
              {
                type: "element",
                tagName: "div",
                properties: {
                  className: ["imp-l"],
                  "data-imp-s": "section-b",
                },
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
              {
                type: "element",
                tagName: "div",
                properties: {
                  className: ["imp-l"],
                  "data-imp-s": "section-b section-c",
                },
                children: [
                  space,
                  space,
                  {
                    type: "element",
                    tagName: "span",
                    properties: { className: ["pl-c1"] },
                    children: [{ type: "text", value: "3" }],
                  },
                  { type: "text", value: "\n" },
                ],
              },
              {
                type: "element",
                tagName: "div",
                properties: {
                  className: ["imp-l"],
                  "data-imp-s": "section-b",
                },
                children: [
                  {
                    type: "element",
                    tagName: "span",
                    properties: { className: ["pl-c1"] },
                    children: [{ type: "text", value: "4" }],
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
