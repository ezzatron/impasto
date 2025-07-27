import type { Element } from "hast";
import {
  createCoreTransform,
  createHighlighter,
  splitSection,
  type Root,
} from "impasto";
import common from "impasto/lang/common";
import { expect, it } from "vitest";
import { rootToHTML } from "../hast.js";

const s = " ";
const t = "\t";

const space: Element = {
  type: "element",
  tagName: "span",
  properties: { className: ["imp-s"] },
  children: [{ type: "text", value: s }],
};

const tab: Element = {
  type: "element",
  tagName: "span",
  properties: { className: ["imp-t"] },
  children: [{ type: "text", value: t }],
};

it("isolates the supplied section", async () => {
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
  const result = splitSection(coreTree.children, "section-b");
  const sectionTree: Root = { type: "root", children: result.content.lines };
  const contextBeforeTree: Root = {
    type: "root",
    children: result.contextBefore?.lines ?? [],
  };
  const contextAfterTree: Root = {
    type: "root",
    children: result.contextAfter?.lines ?? [],
  };

  expect(result.lines).toEqual([
    ...(result.contextBefore?.lines ?? []),
    ...result.content.lines,
    ...(result.contextAfter?.lines ?? []),
  ]);
  expect(rootToHTML(contextBeforeTree)).toMatchInlineSnapshot(`
    "
    <div class="imp-l imp-sx" data-imp-s="section-a">
      <span class="pl-c1">1</span>
    </div>
    "
  `);
  expect(rootToHTML(sectionTree)).toMatchInlineSnapshot(`
    "
    <div class="imp-l imp-sc" data-imp-s="section-b">
      <span class="imp-sc-i">
        <span class="imp-t"></span>
        <span class="imp-s"></span>
        <span class="imp-s"></span>
      </span>
      <span class="pl-c1">2</span>
    </div>
    <div class="imp-l imp-sc" data-imp-s="section-b section-c">
      <span class="imp-sc-i">
        <span class="imp-t"></span>
        <span class="imp-s"></span>
        <span class="imp-s"></span>
      </span>
      <span class="imp-s"></span>
      <span class="imp-s"></span>
      <span class="pl-c1">3</span>
    </div>
    <div class="imp-l imp-sc" data-imp-s="section-b">
      <span class="imp-sc-i">
        <span class="imp-t"></span>
        <span class="imp-s"></span>
        <span class="imp-s"></span>
      </span>
      <span class="pl-c1">4</span>
    </div>
    "
  `);
  expect(rootToHTML(contextAfterTree)).toMatchInlineSnapshot(`
    "
    <div class="imp-l imp-sx" data-imp-s="section-d">
      <span class="pl-c1">5</span>
    </div>
    <div class="imp-l imp-sx">
      <span class="pl-c1">6</span>
    </div>
    "
  `);
  expect(result.contextBefore?.lines).toEqual([
    {
      type: "element",
      tagName: "div",
      properties: {
        className: ["imp-l", "imp-sx"],
        "data-imp-s": "section-a",
      },
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
  ]);
  expect(result.content.lines).toEqual([
    {
      type: "element",
      tagName: "div",
      properties: {
        className: ["imp-l", "imp-sc"],
        "data-imp-s": "section-b",
      },
      children: [
        {
          type: "element",
          tagName: "span",
          properties: { className: ["imp-sc-i"] },
          children: [tab, space, space],
        },
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
        className: ["imp-l", "imp-sc"],
        "data-imp-s": "section-b section-c",
      },
      children: [
        {
          type: "element",
          tagName: "span",
          properties: { className: ["imp-sc-i"] },
          children: [tab, space, space],
        },
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
        className: ["imp-l", "imp-sc"],
        "data-imp-s": "section-b",
      },
      children: [
        {
          type: "element",
          tagName: "span",
          properties: { className: ["imp-sc-i"] },
          children: [tab, space, space],
        },
        {
          type: "element",
          tagName: "span",
          properties: { className: ["pl-c1"] },
          children: [{ type: "text", value: "4" }],
        },
        { type: "text", value: "\n" },
      ],
    },
  ]);
  expect(result.contextAfter?.lines).toEqual([
    {
      type: "element",
      tagName: "div",
      properties: {
        className: ["imp-l", "imp-sx"],
        "data-imp-s": "section-d",
      },
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
      properties: { className: ["imp-l", "imp-sx"] },
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

it("handles sections that span all lines", async () => {
  const highlighter = await createHighlighter(common);
  const tree = highlighter.highlight(
    `
1 // [!section-start section-a]
2 // [!section-end section-a]
    `,
    "source.js",
  );
  const coreTransform = createCoreTransform();
  const { tree: coreTree } = coreTransform(tree);
  const result = splitSection(coreTree.children, "section-a");

  expect(result).toEqual({
    content: {
      lines: expect.arrayContaining([]),
      startLine: 1,
      endLine: 2,
    },
    contentIndent: { indent: "", spaceCount: 0, tabCount: 0 },
    contextBefore: undefined,
    contextAfter: undefined,
    lines: expect.arrayContaining([]),
  });
});

it("handles section lines with no common indentation", async () => {
  const highlighter = await createHighlighter(common);
  const tree = highlighter.highlight(
    `
${t}${s}${s}1 // [!section-start section-a]
${s}${s}${t}2 // [!section-end section-a]
3
    `,
    "source.js",
  );
  const coreTransform = createCoreTransform();
  const { tree: coreTree } = coreTransform(tree);
  const result = splitSection(coreTree.children, "section-a");
  const sectionTree: Root = { type: "root", children: result.content.lines };

  expect(rootToHTML(sectionTree)).toMatchInlineSnapshot(`
    "
    <div class="imp-l imp-sc" data-imp-s="section-a">
      <span class="imp-t"></span>
      <span class="imp-s"></span>
      <span class="imp-s"></span>
      <span class="pl-c1">1</span>
    </div>
    <div class="imp-l imp-sc" data-imp-s="section-a">
      <span class="imp-s"></span>
      <span class="imp-s"></span>
      <span class="imp-t"></span>
      <span class="pl-c1">2</span>
    </div>
    "
  `);
  expect(result.content.lines).toEqual([
    {
      type: "element",
      tagName: "div",
      properties: {
        className: ["imp-l", "imp-sc"],
        "data-imp-s": "section-a",
      },
      children: [
        tab,
        space,
        space,
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
      properties: {
        className: ["imp-l", "imp-sc"],
        "data-imp-s": "section-a",
      },
      children: [
        space,
        space,
        tab,
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

it("treats all lines as content if the section name is undefined", async () => {
  const highlighter = await createHighlighter(common);
  const tree = highlighter.highlight(
    `
1 // [!section-start section-a]
2 // [!section-end section-a]
    `,
    "source.js",
  );
  const coreTransform = createCoreTransform();
  const { tree: coreTree } = coreTransform(tree);
  const result = splitSection(coreTree.children, undefined);

  expect(result).toEqual({
    content: {
      lines: coreTree.children,
      startLine: 1,
      endLine: 2,
    },
    contentIndent: { indent: "", spaceCount: 0, tabCount: 0 },
    contextBefore: undefined,
    contextAfter: undefined,
    lines: coreTree.children,
  });
});

it("throws if the section is not found", async () => {
  const highlighter = await createHighlighter(common);
  const tree = highlighter.highlight("1", "source.js");
  const coreTransform = createCoreTransform();
  const { tree: coreTree } = coreTransform(tree);

  expect(() => splitSection(coreTree.children, "section-a")).toThrow(
    "Missing code section section-a",
  );
});
