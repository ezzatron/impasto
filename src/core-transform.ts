import type { Element, ElementContent, Root, Text } from "hast";
import createClassList from "hast-util-class-list";
import { visit } from "unist-util-visit";
import { codeBlock, line, space, tab } from "./css-class.js";
import type { Transform } from "./transform.js";

/**
 * Matches annotations.
 *
 * The pattern is:
 * - \s? - optional whitespace
 * - \[! - annotation start
 * - ([\w-]+) - annotation name
 * - (?:\s+(.+?))? - optional annotation value
 * - ] - annotation end
 * - \s? - optional whitespace
 */
const annotationPattern = /\s?\[!([\w-]+)(?:\s+(.+?))?]\s?/g;

/**
 * Matches comments.
 *
 * The pattern is:
 * - (\s*(?:\/\/|\/\*|<!--|#|--|%%?|;;?|"|')) - comment start
 * - \s+ - whitespace
 * - (.*?) - comment content (non-greedy)
 * - \s* - optional whitespace
 * - ((?:\*\/|-->)\s*)? - optional comment end
 */
const commentPattern =
  /^(\s*(?:\/\/|\/\*|<!--|#|--|%%?|;;?|"|')\s+)(.*?)\s*((?:\*\/|-->)\s*)?$/;

const whitespacePattern = /[ \t]/g;

const whitespaceClassMap: Record<string, string> = {
  " ": space,
  "\t": tab,
};

/**
 * A parsed annotation.
 */
export interface Annotation {
  /**
   * The annotation name.
   */
  name: string;

  /**
   * The annotation value.
   */
  value: string;
}

/**
 * The result of the core transform.
 */
export interface CoreTransformResult {
  /**
   * Annotations found in the code.
   */
  annotations: Record<string, Annotation[]>;
}

/**
 * The core transform.
 *
 * **Caution:** This transform mutates the input AST.
 *
 * This transform is intended to be used as a common pre-processing step. Other,
 * more configurable transforms can be applied afterward, where they can
 * leverage the consistent output from this transform.
 *
 * This transform handles:
 * - Line splitting — Each line's content is wrapped with `<div class="imp-l">`
 * - Trimming/collapsing empty lines
 * - Trimming trailing whitespace from lines
 * - Annotation parsing
 * - TODO: Sections
 * - Whitespace wrapping — Spaces are wrapped with `<span class="imp-s">`, and
 *   tabs are wrapped with `<span class="imp-t">`
 */
export const coreTransform: Transform<CoreTransformResult> = (tree) => {
  const lines = splitLines(tree);

  const annotations: Record<string, Annotation[]> = {};
  const annotationComments: Map<Text, AnnotationComment> = new Map();
  parseAnnotations(annotations, annotationComments, lines);

  cleanupLines(lines, annotationComments);
  wrapWhitespace(lines);

  tree.children = [
    {
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
    },
  ];

  return { annotations };
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

function cleanupLines(
  lines: Element[],
  annotationComments: Map<Text, AnnotationComment>,
): void {
  let isFollowingEmpty = false;

  // process lines in reverse order
  for (let i = lines.length - 1; i >= 0; --i) {
    const line = lines[i];

    // strip annotations
    let wasCommentRemoved = false;

    for (let j = line.children.length - 1; j >= 0; --j) {
      const text = getCommentText(line.children[j]);
      if (!text) continue;

      // skip non-annotation comments
      const comment = annotationComments.get(text);
      if (!comment) continue;

      const { start, end = "" } = comment;
      const content = comment.content.replaceAll(annotationPattern, " ").trim();

      if (content) {
        // comment still has content after stripping annotations
        text.value = `${start}${content}${end}`;
      } else {
        wasCommentRemoved = true;

        if (isJSXComment(line.children[j - 1], line.children[j + 1])) {
          line.children.splice(j - 1, 3);
          j -= 2; // account for the two additional elements that were removed
        } else {
          line.children.splice(j, 1);
        }
      }
    }

    if (wasCommentRemoved && isEmptyLine(line)) {
      lines.splice(i, 1);
      continue;
    }

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

interface AnnotationComment {
  start: string;
  content: string;
  end: string;
}

function parseAnnotations(
  annotations: Record<string, Annotation[]>,
  annotationComments: Map<Text, AnnotationComment>,
  lines: Element[],
): void {
  for (let i = 0; i < lines.length; ++i) {
    const line = lines[i];
    annotations[i] = [];

    for (let j = 0; j < line.children.length; ++j) {
      const text = getCommentText(line.children[j]);
      if (!text) continue;

      const commentMatch = text.value.match(commentPattern);
      if (!commentMatch) continue;
      const annotationMatches = Array.from(
        commentMatch[2].matchAll(annotationPattern),
      );
      if (annotationMatches.length < 1) continue;

      const [, start, content, end] = commentMatch;
      annotationComments.set(text, { start, content, end });

      for (const [, name, value] of annotationMatches) {
        annotations[i].push({ name, value });
      }
    }
  }
}

function getCommentText(node: ElementContent): Text | undefined {
  if (node.type !== "element") return undefined;
  if (node.children.length !== 1) return undefined;

  const [text] = node.children;

  if (text.type !== "text") return undefined;

  return createClassList(node).contains("pl-c") ? text : undefined;
}

function isJSXComment(
  prevSibling: ElementContent | undefined,
  nextSibling: ElementContent | undefined,
): boolean {
  if (prevSibling?.type !== "element") return false;
  if (prevSibling.children.length !== 1) return false;
  if (nextSibling?.type !== "element") return false;
  if (nextSibling.children.length !== 1) return false;

  const [prevText] = prevSibling.children;
  const [nextText] = nextSibling.children;

  if (prevText.type !== "text") return false;
  if (nextText.type !== "text") return false;

  if (prevText.value !== "{") return false;
  if (nextText.value !== "}") return false;

  return (
    createClassList(prevSibling).contains("pl-pse") &&
    createClassList(nextSibling).contains("pl-pse")
  );
}
