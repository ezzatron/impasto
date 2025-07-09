import { all } from "@wooorm/starry-night";
import { createHighlighter } from "impasto";
import { expect, it } from "vitest";

it("converts flags to scopes", async () => {
  const highlighter = await createHighlighter(all);

  expect(highlighter.flagToScope("js")).toBe("source.js");
  expect(highlighter.flagToScope(".js")).toBe("source.js");
});

it("supports undefined flags", async () => {
  const highlighter = await createHighlighter(all);

  expect(highlighter.flagToScope(undefined)).toBeUndefined();
});
