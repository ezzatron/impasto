import type { Root } from "./impasto-tree.js";

/**
 * Transforms an HTML AST produced by the highlighter.
 *
 * @typeParam T - The return type of the transform function.
 */
export type Transform<T = void> = (tree: Root) => T;
