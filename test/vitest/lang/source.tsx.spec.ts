import { createHighlighter } from "impasto";
import sourceTSX from "impasto/lang/source.tsx";
import { expect, it } from "vitest";

it("should highlight property names", async () => {
  const highlighter = await createHighlighter([sourceTSX]);
  const tree = highlighter.highlight("let x={a:1,b}", "source.tsx");

  expect(tree).toEqual({
    type: "root",
    children: [
      {
        type: "element",
        tagName: "span",
        properties: { className: ["pl-k"] },
        children: [{ type: "text", value: "let" }],
      },
      { type: "text", value: " " },
      {
        type: "element",
        tagName: "span",
        properties: { className: ["pl-smi"] },
        children: [{ type: "text", value: "x" }],
      },
      {
        type: "element",
        tagName: "span",
        properties: { className: ["pl-k"] },
        children: [{ type: "text", value: "=" }],
      },
      { type: "text", value: "{" },
      {
        type: "element",
        tagName: "span",
        properties: { className: ["pl-c1"] },
        children: [{ type: "text", value: "a" }],
      },
      { type: "text", value: ":" },
      {
        type: "element",
        tagName: "span",
        properties: { className: ["pl-c1"] },
        children: [{ type: "text", value: "1" }],
      },
      { type: "text", value: "," },
      {
        type: "element",
        tagName: "span",
        properties: { className: ["pl-smi"] },
        children: [{ type: "text", value: "b" }],
      },
      { type: "text", value: "}" },
    ],
  });
});
