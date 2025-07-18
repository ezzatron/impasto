import type { Element, Root as HastRoot, Properties, Text } from "hast";
import { codeBlock as codeBlockClass } from "./css-class.js";

/**
 * Performs some basic checks to ensure that the given tree is a valid root.
 *
 * Deliberately does not check the entire structure for performance reasons.
 */
export function assertRoot(tree: unknown): asserts tree is Root {
  const isValid =
    typeof tree === "object" &&
    tree != null &&
    "type" in tree &&
    tree.type === "root" &&
    "children" in tree &&
    Array.isArray(tree.children) &&
    tree.children.length === 1 &&
    isPre(tree.children[0]);

  if (!isValid) throw new Error("Not an Impasto root");
}

/**
 * Checks whether the given tree is a whitespace element.
 */
export function isWhitespace(tree: unknown): tree is SpaceElement | TabElement {
  return (
    typeof tree === "object" &&
    tree != null &&
    "type" in tree &&
    tree.type === "element" &&
    "tagName" in tree &&
    tree.tagName === "span" &&
    "properties" in tree &&
    typeof tree.properties === "object" &&
    tree.properties != null &&
    "className" in tree.properties &&
    Array.isArray(tree.properties.className) &&
    (tree.properties.className.includes("imp-s") ||
      tree.properties.className.includes("imp-t")) &&
    "children" in tree &&
    Array.isArray(tree.children) &&
    tree.children.length === 1 &&
    tree.children[0].type === "text"
  );
}

/**
 * An Impasto root.
 *
 * Contains exactly one child: the pre element.
 */
export interface Root extends HastRoot {
  type: "root";
  children: [PreElement];
}

/**
 * An Impasto pre element.
 *
 * Contains exactly two children: the line numbers container and the code
 * element.
 */
export interface PreElement extends Element {
  tagName: "pre";
  properties: Properties & {
    /**
     * A CSS class array that always includes the code block class.
     */
    className: string[];
  };
  children: [LineNumbersElement, CodeElement];
}

/**
 * An Impasto line numbers element.
 *
 * Contains one or more line number elements.
 */
export interface LineNumbersElement extends Element {
  tagName: "div";
  properties: Properties & {
    /**
     * A CSS class array that always includes the line numbers class.
     */
    className: string[];
  };
  children: LineNumberElement[];
}

/**
 * An Impasto line number element.
 *
 * Contains a single text node with the line number.
 */
export interface LineNumberElement extends Element {
  tagName: "div";
  properties: Properties & {
    /**
     * A CSS class array that always includes the line number class.
     */
    className: string[];
  };
  children: [Text];
}

/**
 * An Impasto code element.
 *
 * Contains one or more line elements.
 */
export interface CodeElement extends Element {
  tagName: "code";
  children: LineElement[];
}

/**
 * An Impasto line element.
 *
 * Contains the highlighted code for a single line.
 */
export interface LineElement extends Element {
  tagName: "div";
  properties: Properties & {
    /**
     * A CSS class array that always includes the line class.
     */
    className: string[];
  };
  children: (Element | Text)[];
}

/**
 * An Impasto space element.
 *
 * Represents a single space character in the code.
 */
export interface SpaceElement extends Element {
  tagName: "span";
  properties: Properties & {
    /**
     * A CSS class array that always includes the space class.
     */
    className: string[];
  };
  children: [Text];
}

/**
 * An Impasto tab element.
 *
 * Represents a single tab character in the code.
 */
export interface TabElement extends Element {
  tagName: "span";
  properties: Properties & {
    /**
     * A CSS class array that always includes the tab class.
     */
    className: string[];
  };
  children: [Text];
}

function isPre(content: unknown): content is PreElement {
  return (
    typeof content === "object" &&
    content != null &&
    "type" in content &&
    content.type === "element" &&
    "tagName" in content &&
    content.tagName === "pre" &&
    "properties" in content &&
    typeof content.properties === "object" &&
    content.properties != null &&
    "className" in content.properties &&
    Array.isArray(content.properties.className) &&
    content.properties.className.includes(codeBlockClass) &&
    "children" in content &&
    Array.isArray(content.children) &&
    content.children.length === 2
  );
}
