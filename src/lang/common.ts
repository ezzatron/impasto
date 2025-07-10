import { common as baseGrammars } from "@wooorm/starry-night";
import sourceJS from "./source.js.js";

/**
 * List of common grammars.
 *
 * This is starry-night's "common" grammars, with some updated grammars for
 * better language support.
 *
 * @see {@link https://github.com/wooorm/starry-night#common}
 */
const grammars = baseGrammars.filter((g) => g.scopeName !== "source.js");
grammars.push(sourceJS);

export default grammars;
