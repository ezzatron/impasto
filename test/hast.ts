import type { Element, Root } from "hast";
import { format } from "hast-util-format";
import { toHtml } from "hast-util-to-html";
import { visit } from "unist-util-visit";

export function rootToHTML(root: Root): string {
  const clone = structuredClone(root);

  // Swap to elements with insignificant whitespace for formatting
  // This is lossy, but the output is too hard to read otherwise
  const spans: Element[] = [];
  visit(clone, { type: "element", tagName: "span" }, (node) => {
    spans.push(node);
    node.tagName = "div";
  });
  format(clone);
  for (const span of spans) span.tagName = "span";

  return toHtml(clone);
}
