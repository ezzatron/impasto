import { common } from "@wooorm/starry-night";
import { createHighlighter } from "impasto";
import { expect, it } from "vitest";

it("creates a highlighter", async () => {
  expect(await createHighlighter(common)).toMatchObject({
    highlight: expect.any(Function),
  });
});
