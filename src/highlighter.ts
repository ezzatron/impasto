import { createStarryNight } from "@wooorm/starry-night";
import type { Root } from "hast";

/**
 * A thin wrapper around starry-night, with support for undefined flags and
 * scopes.
 *
 * @see {@link createStarryNight}
 */
export interface Highlighter extends Awaited<
  ReturnType<typeof createStarryNight>
> {
  /**
   * Get the grammar scope (such as `text.md`) associated with a grammar name
   * (such as `markdown`) or grammar extension (such as `.md`).
   *
   * @see {@link https://github.com/wooorm/starry-night#starrynightflagtoscopeflag}
   */
  flagToScope: (flag: string | undefined) => string | undefined;

  /**
   * Highlight code as an HTML AST.
   *
   * @see {@link https://github.com/wooorm/starry-night#starrynighthighlightvalue-scope}
   */
  highlight: (value: string, scope: string | undefined) => Root;
}

/**
 * Creates a highlighter.
 */
export async function createHighlighter(
  ...args: Parameters<typeof createStarryNight>
): Promise<Highlighter> {
  const highlighter = await createStarryNight(...args);

  return {
    ...highlighter,

    // Add support for undefined flags
    flagToScope(flag) {
      return flag && highlighter.flagToScope(flag);
    },

    // Add support for undefined scopes
    highlight(value, scope) {
      return scope == null
        ? { type: "root", children: [{ type: "text", value }] }
        : highlighter.highlight(value, scope);
    },
  };
}
