import { all } from "@wooorm/starry-night";
import { createHighlighter } from "impasto";
import { expect, it } from "vitest";

it("highlights code", async () => {
  const highlighter = await createHighlighter(all);

  expect(await highlighter.highlight("1", "source.js")).toMatchInlineSnapshot(`
    {
      "children": [
        {
          "children": [
            {
              "type": "text",
              "value": "1",
            },
          ],
          "properties": {
            "className": [
              "pl-c1",
            ],
          },
          "tagName": "span",
          "type": "element",
        },
      ],
      "type": "root",
    }
  `);
});

it("supports undefined flags", async () => {
  const highlighter = await createHighlighter(all);

  expect(await highlighter.highlight("a", undefined)).toMatchInlineSnapshot(
    `
    {
      "children": [
        {
          "type": "text",
          "value": "a",
        },
      ],
      "type": "root",
    }
  `,
  );
});
