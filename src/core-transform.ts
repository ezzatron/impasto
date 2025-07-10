import type { Element, ElementContent, Root } from "hast";
import { visit } from "unist-util-visit";
import { codeBlock, line, space, tab } from "./css-class.js";
import type { Transform } from "./transform.js";

const whitespacePattern = /[ \t]/g;

const whitespaceClassMap: Record<string, string> = {
  " ": space,
  "\t": tab,
};

/**
 * The core transform.
 *
 * This transform handles:
 * - Line splitting
 * - Trimming/collapsing empty lines
 * - Trimming trailing whitespace from lines
 * - TODO: Annotation parsing
 * - TODO: Sections
 * - Whitespace wrapping
 */
export const coreTransform: Transform<Root> = (tree) => {
  const lines = splitLines(tree);
  cleanupLines(lines);
  wrapWhitespace(lines);

  const pre: Element = {
    type: "element",
    tagName: "pre",
    properties: { className: [codeBlock] },
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

  // process lines in reverse order
  for (let i = lines.length - 1; i >= 0; --i) {
    const line = lines[i];

    // strip trailing whitespace from children in reverse order
    for (let j = line.children.length - 1; j >= 0; --j) {
      const node = line.children[j];

      // a non-text node means we can't trim any more
      if (node.type !== "text") break;

      const trimmed = node.value.trimEnd();

      // strip empty text nodes from the end of the line
      if (!trimmed) {
        line.children.splice(j, 1);
        continue;
      }

      // if the trimmed value is different but not empty, update it
      if (trimmed !== node.value) node.value = trimmed;

      // value is not empty, so we can stop trimming
      break;
    }

    // trim/collapse empty lines
    const isEmpty = isEmptyLine(line);

    if (isEmpty && (isFollowingEmpty || i === 0 || i === lines.length - 1)) {
      lines.splice(i, 1);
    }

    isFollowingEmpty = isEmpty;
  }

  // strip leading empty line
  if (lines[0] && isEmptyLine(lines[0])) lines.shift();

  // ensure all remaining lines end with a newline
  for (let i = lines.length - 1; i >= 0; --i) {
    lines[i].children.push({ type: "text", value: "\n" });
  }
}

function wrapWhitespace(lines: Element[]): void {
  visit(
    { type: "root", children: lines },
    "text",
    (node, index, parent) => {
      /* v8 ignore start */
      if (!parent || index == null) {
        throw new Error("Invariant violation: missing parent or index");
      }
      /* v8 ignore stop */

      const whitespace: string[] = [];
      const nonWhitespace: string[] = [];

      whitespacePattern.lastIndex = 0;
      let match = whitespacePattern.exec(node.value);
      let lastIndex = 0;

      while (match) {
        whitespace.push(match[0]);
        nonWhitespace.push(node.value.slice(lastIndex, match.index));
        lastIndex = whitespacePattern.lastIndex;
        match = whitespacePattern.exec(node.value);
      }

      nonWhitespace.push(node.value.slice(lastIndex));

      const replacement: ElementContent[] = [];
      let i = 0;

      for (; i < whitespace.length; ++i) {
        if (nonWhitespace[i]) {
          replacement.push({ type: "text", value: nonWhitespace[i] });
        }

        replacement.push({
          type: "element",
          tagName: "span",
          properties: { className: [whitespaceClassMap[whitespace[i]]] },
          children: [{ type: "text", value: whitespace[i] }],
        });
      }

      if (nonWhitespace[i]) {
        replacement.push({ type: "text", value: nonWhitespace[i] });
      }

      parent.children.splice(index, 1, ...replacement);
    },
    true,
  );
}

function emptyLine(): Element {
  return {
    type: "element",
    tagName: "div",
    properties: { className: [line] },
    children: [],
  };
}

function isEmptyLine(line: Element): boolean {
  for (const node of line.children) {
    if (node.type !== "text" || node.value.trim()) return false;
  }

  return true;
}
