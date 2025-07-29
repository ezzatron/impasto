import { all as baseGrammars } from "@wooorm/starry-night";
import sourceJS from "./source.js.js";
import sourceTS from "./source.ts.js";
import sourceTSX from "./source.tsx.js";

/**
 * List of all grammars.
 *
 * This is starry-night's "all" grammars, with some updated grammars for better
 * language support.
 *
 * @see {@link https://github.com/wooorm/starry-night#all}
 */
const grammars = baseGrammars.filter(({ scopeName }) => {
  switch (scopeName) {
    case "source.js":
    case "source.ts":
    case "source.tsx":
      return false;
  }

  return true;
});
grammars.push(sourceJS, sourceTS, sourceTSX);

export default grammars;
