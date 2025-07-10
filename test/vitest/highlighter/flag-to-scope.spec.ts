import { createHighlighter } from "impasto";
import common from "impasto/lang/common";
import { expect, it } from "vitest";

it("converts flags to scopes", async () => {
  const highlighter = await createHighlighter(common);

  expect(highlighter.flagToScope("js")).toBe("source.js");
  expect(highlighter.flagToScope(".js")).toBe("source.js");
});

it("supports undefined flags", async () => {
  const highlighter = await createHighlighter(common);

  expect(highlighter.flagToScope(undefined)).toBeUndefined();
});
