import type { Element, Root } from "hast";
import { codeBlock, line } from "./css-class.js";
import type { Transform } from "./transform.js";

/**
 * The core transform.
 *
 * This transform handles:
 * - Line splitting
 * - Trimming/collapsing empty lines
 * - TODO: Annotation parsing
 * - TODO: Sections
 * - TODO: Whitespace wrapping
 */
export const coreTransform: Transform<Root> = (tree) => {
  const lines = splitLines(tree);
  cleanupLines(lines);

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

function splitLines(tree: Root): Element[] {
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
}

function cleanupLines(lines: Element[]): void {
  let isFollowingEmpty = false;

  for (let i = lines.length - 1; i >= 0; --i) {
    const line = lines[i];

    // trim/collapse empty lines
    const isEmpty = isEmptyLine(line);

    if (isEmpty && (isFollowingEmpty || i === 0 || i === lines.length - 1)) {
      lines.splice(i, 1);
    }

    isFollowingEmpty = isEmpty;
  }

  // strip leading empty line
  if (lines[0] && isEmptyLine(lines[0])) lines.shift();
}

function emptyLine(): Element {
  return {
    type: "element",
    tagName: "div",
    properties: { class: line },
    children: [],
  };
}

function isEmptyLine(line: Element): boolean {
  for (const node of line.children) {
    if (node.type !== "text" || node.value.trim()) return false;
  }

  return true;
}
