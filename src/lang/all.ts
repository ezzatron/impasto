import { all as baseGrammars } from "@wooorm/starry-night";
import sourceJS from "./source.js.js";

/**
 * List of all grammars.
 *
 * This is starry-night's "all" grammars, with some updated grammars for better
 * language support.
 *
 * @see {@link https://github.com/wooorm/starry-night#all}
 */
const grammars = baseGrammars.filter((g) => g.scopeName !== "source.js");
grammars.push(sourceJS);

export default grammars;
