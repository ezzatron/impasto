import { createStarryNight } from "@wooorm/starry-night";
import type { Root } from "hast";

export type Highlighter = Awaited<ReturnType<typeof createStarryNight>> & {
  flagToScope: (flag: string | undefined) => string | undefined;
  highlight: (value: string, scope: string | undefined) => Root;
};

declare global {
  var highlighter: Promise<Highlighter> | undefined;
}

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
