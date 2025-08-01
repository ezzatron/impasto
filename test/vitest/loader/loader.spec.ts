import type { Element } from "hast";
import common from "impasto/lang/common";
import { resolve } from "node:path";
import { expect, it } from "vitest";
import { webpack } from "webpack";
import { rootToHTML } from "../../hast.js";
import { compile } from "./compile.js";

const artifactsPath = resolve(import.meta.dirname, "../../../artifacts");
const outputDirPath = resolve(artifactsPath, "loader/output");

const space: Element = {
  type: "element",
  tagName: "span",
  properties: { className: ["imp-s"] },
  children: [{ type: "text", value: " " }],
};

it("loads code", async () => {
  const outputPath = resolve(outputDirPath, "loads-code");

  const compiler = webpack({
    context: import.meta.dirname,
    entry: "./fixture/basic/entry.js",
    output: {
      path: outputPath,
      filename: "bundle.js",
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: {
            loader: resolve(artifactsPath, "dist/loader/index.js"),
            options: { grammars: common },
          },
        },
      ],
    },
  });

  const result = await compile(compiler);

  expect(rootToHTML(result.tree)).toMatchInlineSnapshot(`
    "
    <div class="imp-l" data-imp-s="first-line">
      <span class="pl-c1">1</span>;
    </div>
    <div class="imp-l">
      <span class="pl-c1">2</span>;
    </div>
    "
  `);
  expect(result).toEqual({
    filePath: "./fixture/basic/entry.js",
    scope: "source.js",
    tree: {
      type: "root",
      children: [
        {
          type: "element",
          tagName: "div",
          properties: {
            className: ["imp-l"],
            "data-imp-s": "first-line",
          },
          children: [
            {
              type: "element",
              tagName: "span",
              properties: { className: ["pl-c1"] },
              children: [{ type: "text", value: "1" }],
            },
            { type: "text", value: ";\n" },
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
            { type: "text", value: ";\n" },
          ],
        },
      ],
    },
  });
});

it("supports the strip annotation mode", async () => {
  const outputPath = resolve(outputDirPath, "strip-annotation-mode");

  const compiler = webpack({
    context: import.meta.dirname,
    entry: "./fixture/basic/entry.js?annotations=strip",
    output: {
      path: outputPath,
      filename: "bundle.js",
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: {
            loader: resolve(artifactsPath, "dist/loader/index.js"),
            options: { grammars: common },
          },
        },
      ],
    },
  });

  const result = await compile(compiler);

  expect(rootToHTML(result.tree)).toMatchInlineSnapshot(`
    "
    <div class="imp-l" data-imp-s="first-line">
      <span class="pl-c1">1</span>;
    </div>
    <div class="imp-l">
      <span class="pl-c1">2</span>;
    </div>
    "
  `);
  expect(result).toEqual({
    filePath: "./fixture/basic/entry.js",
    scope: "source.js",
    tree: {
      type: "root",
      children: [
        {
          type: "element",
          tagName: "div",
          properties: {
            className: ["imp-l"],
            "data-imp-s": "first-line",
          },
          children: [
            {
              type: "element",
              tagName: "span",
              properties: { className: ["pl-c1"] },
              children: [{ type: "text", value: "1" }],
            },
            { type: "text", value: ";\n" },
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
            { type: "text", value: ";\n" },
          ],
        },
      ],
    },
  });
});

it("supports the retain annotation mode", async () => {
  const outputPath = resolve(outputDirPath, "retain-annotation-mode");

  const compiler = webpack({
    context: import.meta.dirname,
    entry: "./fixture/basic/entry.js?annotations=retain",
    output: {
      path: outputPath,
      filename: "bundle.js",
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: {
            loader: resolve(artifactsPath, "dist/loader/index.js"),
            options: { grammars: common },
          },
        },
      ],
    },
  });

  const result = await compile(compiler);

  expect(rootToHTML(result.tree)).toMatchInlineSnapshot(`
    "
    <div class="imp-l" data-imp-s="first-line">
      <span class="pl-c1">1</span>;
      <span class="imp-s"></span>
      <span class="pl-c">//
        <span class="imp-s"></span>[!section
        <span class="imp-s"></span>first-line]
      </span>
    </div>
    <div class="imp-l">
      <span class="pl-c1">2</span>;
    </div>
    "
  `);
  expect(result).toEqual({
    filePath: "./fixture/basic/entry.js",
    scope: "source.js",
    tree: {
      type: "root",
      children: [
        {
          type: "element",
          tagName: "div",
          properties: {
            className: ["imp-l"],
            "data-imp-s": "first-line",
          },
          children: [
            {
              type: "element",
              tagName: "span",
              properties: { className: ["pl-c1"] },
              children: [{ type: "text", value: "1" }],
            },
            { type: "text", value: ";" },
            space,
            {
              type: "element",
              tagName: "span",
              properties: { className: ["pl-c"] },
              children: [
                { type: "text", value: "//" },
                space,
                { type: "text", value: "[!section" },
                space,
                { type: "text", value: "first-line]" },
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
              properties: { className: ["pl-c1"] },
              children: [{ type: "text", value: "2" }],
            },
            { type: "text", value: ";\n" },
          ],
        },
      ],
    },
  });
});

it("supports the ignore annotation mode", async () => {
  const outputPath = resolve(outputDirPath, "ignore-annotation-mode");

  const compiler = webpack({
    context: import.meta.dirname,
    entry: "./fixture/basic/entry.js?annotations=ignore",
    output: {
      path: outputPath,
      filename: "bundle.js",
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: {
            loader: resolve(artifactsPath, "dist/loader/index.js"),
            options: { grammars: common },
          },
        },
      ],
    },
  });

  const result = await compile(compiler);

  expect(rootToHTML(result.tree)).toMatchInlineSnapshot(`
    "
    <div class="imp-l">
      <span class="pl-c1">1</span>;
      <span class="imp-s"></span>
      <span class="pl-c">//
        <span class="imp-s"></span>[!section
        <span class="imp-s"></span>first-line]
      </span>
    </div>
    <div class="imp-l">
      <span class="pl-c1">2</span>;
    </div>
    "
  `);
  expect(result).toEqual({
    filePath: "./fixture/basic/entry.js",
    scope: "source.js",
    tree: {
      type: "root",
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
            { type: "text", value: ";" },
            space,
            {
              type: "element",
              tagName: "span",
              properties: { className: ["pl-c"] },
              children: [
                { type: "text", value: "//" },
                space,
                { type: "text", value: "[!section" },
                space,
                { type: "text", value: "first-line]" },
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
              properties: { className: ["pl-c1"] },
              children: [{ type: "text", value: "2" }],
            },
            { type: "text", value: ";\n" },
          ],
        },
      ],
    },
  });
});

it("throws for unknown annotation modes", async () => {
  const outputPath = resolve(outputDirPath, "unknown-annotation-mode");

  const compiler = webpack({
    context: import.meta.dirname,
    entry: "./fixture/basic/entry.js?annotations=xxx",
    output: {
      path: outputPath,
      filename: "bundle.js",
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: {
            loader: resolve(artifactsPath, "dist/loader/index.js"),
            options: { grammars: common },
          },
        },
      ],
    },
  });

  await expect(() => compile(compiler)).rejects.toThrow(
    "Invalid annotation mode: xxx",
  );
});

it("throws if no grammars are provided", async () => {
  const outputPath = resolve(outputDirPath, "no-grammars");

  const compiler = webpack({
    context: import.meta.dirname,
    entry: "./fixture/basic/entry.js",
    output: {
      path: outputPath,
      filename: "bundle.js",
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: {
            loader: resolve(artifactsPath, "dist/loader/index.js"),
          },
        },
      ],
    },
  });

  await expect(() => compile(compiler)).rejects.toThrow(
    "options misses the property 'grammars'",
  );
});
