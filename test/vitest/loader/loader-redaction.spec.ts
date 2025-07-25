import type { Element } from "hast";
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

it("supports redaction", async () => {
  const outputPath = resolve(outputDirPath, "redaction");

  const compiler = webpack({
    context: import.meta.dirname,
    entry: "./fixture/redaction/entry.js",
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
            options: {
              grammars: common,
              redact: {
                "api-key": { search: ["key_\\w+"], replace: "REDACTED" },
              },
            },
          },
        },
      ],
    },
  });

  const result = await compile(compiler);

  expect(result).toEqual({
    filename: "./fixture/redaction/entry.js",
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
              children: [{ type: "text", value: "const" }],
              properties: { className: ["pl-k"] },
              tagName: "span",
              type: "element",
            },
            space,
            {
              children: [{ type: "text", value: "key" }],
              properties: { className: ["pl-c1"] },
              tagName: "span",
              type: "element",
            },
            space,
            {
              children: [{ type: "text", value: "=" }],
              properties: { className: ["pl-k"] },
              tagName: "span",
              type: "element",
            },
            space,
            {
              children: [
                {
                  children: [{ type: "text", value: '"' }],
                  properties: { className: ["pl-pds"] },
                  tagName: "span",
                  type: "element",
                },
                {
                  type: "element",
                  tagName: "span",
                  properties: {
                    className: ["imp-rd"],
                    "data-imp-rd": "api-key",
                  },
                  children: [{ type: "text", value: "REDACTED" }],
                },
                {
                  children: [{ type: "text", value: '"' }],
                  properties: { className: ["pl-pds"] },
                  tagName: "span",
                  type: "element",
                },
              ],
              properties: { className: ["pl-s"] },
              tagName: "span",
              type: "element",
            },
            { type: "text", value: ";\n" },
          ],
        },
      ],
    },
  });
});

it("supports redaction with no replace value", async () => {
  const outputPath = resolve(outputDirPath, "redaction");

  const compiler = webpack({
    context: import.meta.dirname,
    entry: "./fixture/redaction/entry.js",
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
            options: {
              grammars: common,
              redact: {
                "api-key": { search: ["key_\\w+"] },
              },
            },
          },
        },
      ],
    },
  });

  const result = await compile(compiler);

  expect(result).toEqual({
    filename: "./fixture/redaction/entry.js",
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
              children: [{ type: "text", value: "const" }],
              properties: { className: ["pl-k"] },
              tagName: "span",
              type: "element",
            },
            space,
            {
              children: [{ type: "text", value: "key" }],
              properties: { className: ["pl-c1"] },
              tagName: "span",
              type: "element",
            },
            space,
            {
              children: [{ type: "text", value: "=" }],
              properties: { className: ["pl-k"] },
              tagName: "span",
              type: "element",
            },
            space,
            {
              children: [
                {
                  children: [{ type: "text", value: '"' }],
                  properties: { className: ["pl-pds"] },
                  tagName: "span",
                  type: "element",
                },
                {
                  type: "element",
                  tagName: "span",
                  properties: {
                    className: ["imp-rd"],
                    "data-imp-rd": "api-key",
                  },
                  children: [],
                },
                {
                  children: [{ type: "text", value: '"' }],
                  properties: { className: ["pl-pds"] },
                  tagName: "span",
                  type: "element",
                },
              ],
              properties: { className: ["pl-s"] },
              tagName: "span",
              type: "element",
            },
            { type: "text", value: ";\n" },
          ],
        },
      ],
    },
  });
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
