import type { Element } from "hast";
import type { LineNumberElement, LineNumbersElement } from "impasto";
import common from "impasto/lang/common";
import type { LoadedCode } from "impasto/loader";
import { resolve } from "node:path";
import { expect, it } from "vitest";
import { webpack, type Compiler } from "webpack";

const artifactsPath = resolve(import.meta.dirname, "../../../artifacts");
const outputDirPath = resolve(artifactsPath, "loader/output");

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

  expect(result).toEqual({
    filename: "./fixture/basic/entry.js",
    scope: "source.js",
    lineNumbers: true,
    tree: {
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

  expect(result).toEqual({
    filename: "./fixture/basic/entry.js",
    scope: "source.js",
    lineNumbers: true,
    tree: {
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

  expect(result).toEqual({
    filename: "./fixture/basic/entry.js",
    scope: "source.js",
    lineNumbers: true,
    tree: {
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

  expect(result).toEqual({
    filename: "./fixture/basic/entry.js",
    scope: "source.js",
    lineNumbers: true,
    tree: {
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

async function compile(compiler: Compiler): Promise<LoadedCode> {
  return new Promise((resolve, reject) => {
    compiler.run((error, stats) => {
      if (!stats) {
        reject(error);

        return;
      }

      if (stats.hasErrors()) {
        reject(
          new Error(stats.toJson().errors?.[0]?.message ?? "Unknown error"),
        );

        return;
      }

      const source = stats
        .toJson({ source: true })
        ?.modules?.[0]?.source?.toString();

      if (typeof source !== "string") {
        reject(new Error("No source found in stats"));

        return;
      }

      try {
        resolve(JSON.parse(source.slice(15, -1)));
      } catch (error) {
        reject(error);
      }
    });
  });
}
