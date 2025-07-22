import type { Element, Root } from "hast";
import {
  createCoreTransform,
  createHighlighter,
  type LineNumberElement,
  type LineNumbersElement,
} from "impasto";
import common from "impasto/lang/common";
import { expect, it } from "vitest";
import { rootToHTML } from "../../hast.js";

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
  const coreTransform = createCoreTransform();
  const { annotations } = coreTransform(tree);

  expect(annotations).toEqual({
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
  const coreTransform = createCoreTransform();
  coreTransform(tree);

  expect(rootToHTML(tree)).toMatchInlineSnapshot(`
    "
    <pre class="imp-cb">
      <div class="imp-ln">
        <div class="imp-n">1</div>
        <div class="imp-n">2</div>
      </div>
      <code>
        <div class="imp-l">
          <span class="pl-c1">1</span>
          <span class="imp-s"></span>
          <span class="pl-c">//
            <span class="imp-s"></span>extra
            <span class="imp-s"></span>content
          </span>
        </div>
        <div class="imp-l">
          <span class="pl-c">//
            <span class="imp-s"></span>normal
            <span class="imp-s"></span>comment
          </span>
        </div>
      </code>
    </pre>
    "
  `);
  expect(tree).toEqual({
    type: "root",
    children: [
      {
        type: "element",
        tagName: "pre",
        properties: { className: ["imp-cb"] },
        children: [
          lineNumbers(2),
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

it("doesn't strip annotations in retain mode", async () => {
  const highlighter = await createHighlighter(common);
  const tree = highlighter.highlight("// [!name value]", "source.js");
  const coreTransform = createCoreTransform({ annotationMode: "retain" });
  const { annotations } = coreTransform(tree);

  expect(annotations).toEqual({
    0: [{ name: "name", value: "value" }],
  });
  expect(rootToHTML(tree)).toMatchInlineSnapshot(`
    "
    <pre class="imp-cb">
      <div class="imp-ln">
        <div class="imp-n">1</div>
      </div>
      <code>
        <div class="imp-l">
          <span class="pl-c">//
            <span class="imp-s"></span>[!name
            <span class="imp-s"></span>value]
          </span>
        </div>
      </code>
    </pre>
    "
  `);
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
                    properties: { className: ["pl-c"] },
                    children: [
                      { type: "text", value: "//" },
                      space,
                      { type: "text", value: "[!name" },
                      space,
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

it("doesn't parse or strip annotations in ignore mode", async () => {
  const highlighter = await createHighlighter(common);
  const tree = highlighter.highlight("// [!name value]", "source.js");
  const coreTransform = createCoreTransform({ annotationMode: "ignore" });
  const { annotations } = coreTransform(tree);

  expect(annotations).toEqual({});
  expect(rootToHTML(tree)).toMatchInlineSnapshot(`
    "
    <pre class="imp-cb">
      <div class="imp-ln">
        <div class="imp-n">1</div>
      </div>
      <code>
        <div class="imp-l">
          <span class="pl-c">//
            <span class="imp-s"></span>[!name
            <span class="imp-s"></span>value]
          </span>
        </div>
      </code>
    </pre>
    "
  `);
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
                    properties: { className: ["pl-c"] },
                    children: [
                      { type: "text", value: "//" },
                      space,
                      { type: "text", value: "[!name" },
                      space,
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
  const coreTransform = createCoreTransform();
  coreTransform(tree);

  expect(rootToHTML(tree)).toMatchInlineSnapshot(`
    "
    <pre class="imp-cb">
      <div class="imp-ln">
        <div class="imp-n">1</div>
      </div>
      <code>
        <div class="imp-l">
          <span class="pl-c">!!
            <span class="imp-s"></span>[!name
            <span class="imp-s"></span>value]
          </span>
        </div>
      </code>
    </pre>
    "
  `);
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
                    properties: { className: ["pl-c"] },
                    children: [
                      { type: "text", value: "!!" },
                      space,
                      { type: "text", value: "[!name" },
                      space,
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
  const coreTransform = createCoreTransform();
  const { annotations } = coreTransform(tree);

  expect(annotations).toEqual({});
});
