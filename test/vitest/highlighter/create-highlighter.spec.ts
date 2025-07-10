import { createHighlighter } from "impasto";
import all from "impasto/lang/all";
import { expect, it } from "vitest";

it("creates a highlighter", async () => {
  expect(await createHighlighter(all)).toMatchObject({
    highlight: expect.any(Function),
  });
});
