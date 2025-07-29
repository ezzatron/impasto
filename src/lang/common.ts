import { common as baseGrammars } from "@wooorm/starry-night";
import sourceJS from "./source.js.js";
import sourceTS from "./source.ts.js";

/**
 * List of common grammars.
 *
 * This is starry-night's "common" grammars, with some updated grammars for
 * better language support.
 *
 * @see {@link https://github.com/wooorm/starry-night#common}
 */
const grammars = baseGrammars.filter(({ scopeName }) => {
  switch (scopeName) {
    case "source.js":
    case "source.ts":
      return false;
  }

  return true;
});
grammars.push(sourceJS, sourceTS);

export default grammars;
