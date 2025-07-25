import { createCoreTransform, createHighlighter } from "impasto";
import common from "impasto/lang/common";
import { expect, it } from "vitest";
import { rootToHTML } from "../../hast.js";

it("supports sections", async () => {
  const highlighter = await createHighlighter(common);
  const tree = highlighter.highlight(
    `

1


  // [!section-start section-d]


2


  // [!section-start section-e] [!section-start section-c]


3 // [!section section-a] [!section section-b]


4


  // [!section-end section-e] [!section-end section-d]


5


  // [!section-end section-c]


6

`,
    "source.js",
  );
  const coreTransform = createCoreTransform();
  coreTransform(tree);

  expect(rootToHTML(tree)).toMatchInlineSnapshot(`
    "
    <div class="imp-l">
      <span class="pl-c1">1</span>
    </div>
    <div class="imp-l"></div>
    <div class="imp-l" data-imp-s="section-d">
      <span class="pl-c1">2</span>
    </div>
    <div class="imp-l" data-imp-s="section-d"></div>
    <div class="imp-l" data-imp-s="section-a section-b section-c section-d section-e">
      <span class="pl-c1">3</span>
    </div>
    <div class="imp-l" data-imp-s="section-c section-d section-e"></div>
    <div class="imp-l" data-imp-s="section-c section-d section-e">
      <span class="pl-c1">4</span>
    </div>
    <div class="imp-l" data-imp-s="section-c"></div>
    <div class="imp-l" data-imp-s="section-c">
      <span class="pl-c1">5</span>
    </div>
    <div class="imp-l"></div>
    <div class="imp-l">
      <span class="pl-c1">6</span>
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
      children: [{ type: "text", value: "\n" }],
    },
    {
      type: "element",
      tagName: "div",
      properties: { className: ["imp-l"], "data-imp-s": "section-d" },
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
      properties: { className: ["imp-l"], "data-imp-s": "section-d" },
      children: [{ type: "text", value: "\n" }],
    },
    {
      type: "element",
      tagName: "div",
      properties: {
        className: ["imp-l"],
        "data-imp-s": "section-a section-b section-c section-d section-e",
      },
      children: [
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
        "data-imp-s": "section-c section-d section-e",
      },
      children: [{ type: "text", value: "\n" }],
    },
    {
      type: "element",
      tagName: "div",
      properties: {
        className: ["imp-l"],
        "data-imp-s": "section-c section-d section-e",
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
    {
      type: "element",
      tagName: "div",
      properties: { className: ["imp-l"], "data-imp-s": "section-c" },
      children: [{ type: "text", value: "\n" }],
    },
    {
      type: "element",
      tagName: "div",
      properties: { className: ["imp-l"], "data-imp-s": "section-c" },
      children: [
        {
          type: "element",
          tagName: "span",
          properties: { className: ["pl-c1"] },
          children: [{ type: "text", value: "5" }],
        },
        { type: "text", value: "\n" },
      ],
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
      children: [
        {
          type: "element",
          tagName: "span",
          properties: { className: ["pl-c1"] },
          children: [{ type: "text", value: "6" }],
        },
        { type: "text", value: "\n" },
      ],
    },
  ]);
});

it("throws when section names are undefined", async () => {
  const highlighter = await createHighlighter(common);
  const tree = highlighter.highlight("// [!section]", "source.js");
  const coreTransform = createCoreTransform();

  expect(() => coreTransform(tree)).toThrowError(
    "Missing code section name on line 1 in annotation [!section]",
  );
});

it("throws when section names are re-used", async () => {
  const highlighter = await createHighlighter(common);
  const tree = highlighter.highlight(
    `// [!section section-a]
// [!section section-a]`,
    "source.js",
  );
  const coreTransform = createCoreTransform();

  expect(() => coreTransform(tree)).toThrowError(
    "Code section section-a on line 2 already seen on line 1",
  );
});

it("throws when section names aren't closed", async () => {
  const highlighter = await createHighlighter(common);
  const tree = highlighter.highlight(
    `// [!section-start section-a]
// [!section-start section-b]`,
    "source.js",
  );
  const coreTransform = createCoreTransform();

  expect(() => coreTransform(tree)).toThrowError(
    "Unclosed code sections: section-a on line 1, section-b on line 2",
  );
});
