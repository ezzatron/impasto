import type { Element, Root as HastRoot, Properties, Text } from "hast";

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
 * Contains line elements as children, each representing a line of code.
 */
export interface Root extends HastRoot {
  type: "root";
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
