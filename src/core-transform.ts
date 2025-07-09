import type { Element, Root } from "hast";
import { codeBlock, line } from "./css-class.js";
import type { Transform } from "./transform.js";

/**
 * The core transform.
 *
 * This transform handles:
 * - Line splitting
 * - TODO: Annotation parsing
 * - TODO: Sections
 * - TODO: Whitespace wrapping
 */
export const coreTransform: Transform<Root> = (tree) => {
  const lines: Element[] = splitLines(tree);

  const pre: Element = {
    type: "element",
    tagName: "pre",
    properties: { class: codeBlock },
    children: [
      {
        type: "element",
        tagName: "code",
        properties: {},
        children: lines,
      },
    ],
  };

  return { type: "root", children: [pre] };
};

const splitLines: Transform<Element[]> = (tree) => {
  const lines: Element[] = [];
  let line: Element = emptyLine();

  for (let i = 0; i < tree.children.length; ++i) {
    const node = tree.children[i];

    // inject highlighted elements into the current line
    if (node.type === "element") {
      line.children.push(node);
      continue;
    }

    // ignore other node types
    if (node.type !== "text") continue;

    // look for newlines in the text node
    const parts = node.value.split("\n");

    // remove trailing newline parts on the last line
    if (i === tree.children.length - 1 && parts[parts.length - 1] === "") {
      parts.pop();
    }

    for (let j = 0; j < parts.length; ++j) {
      // skip this for the first part, it's before the first newline
      if (j > 0) {
        // end the line and start a new one
        lines.push(line);
        line = emptyLine();
      }

      // push non-empty parts to the line
      const value = parts[j];
      if (value) line.children.push({ type: "text", value });
    }
  }

  lines.push(line);

  return lines;
};

function emptyLine(): Element {
  return {
    type: "element",
    tagName: "div",
    properties: { class: line },
    children: [],
  };
}
