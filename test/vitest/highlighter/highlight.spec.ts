import { createHighlighter } from "impasto";
import common from "impasto/lang/common";
import { expect, it } from "vitest";

it("highlights code", async () => {
  const highlighter = await createHighlighter(common);
  const tree = highlighter.highlight("1", "source.js");

  expect(tree).toEqual({
    type: "root",
    children: [
      {
        type: "element",
        tagName: "span",
        properties: { className: ["pl-c1"] },
        children: [{ type: "text", value: "1" }],
      },
    ],
  });
});

it("supports undefined flags", async () => {
  const highlighter = await createHighlighter(common);
  const tree = highlighter.highlight("a", undefined);

  expect(tree).toEqual({
    type: "root",
    children: [{ type: "text", value: "a" }],
  });
});
