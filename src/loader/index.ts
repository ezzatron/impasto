import type { Grammar } from "@wooorm/starry-night";
import type { Root } from "hast";
import type { JSONSchema7 } from "json-schema";
import { callbackify } from "node:util";
import type { LoaderDefinitionFunction } from "webpack";
import { createCoreTransform, type AnnotationMode } from "../core-transform.js";
import { createHighlighter } from "../highlighter.js";

/**
 * Options for the code loader.
 */
export interface CodeLoaderOptions {
  /**
   * The grammars to use for highlighting code.
   */
  grammars: Grammar[];
}

/**
 * The result of the code loader.
 */
export interface LoadedCode {
  /**
   * The HTML AST representing the highlighted code.
   */
  tree: Root;

  /**
   * The scope of the highlighted code, derived from the resource path.
   */
  scope: string | undefined;

  /**
   * The filename of the resource being highlighted.
   */
  filename: string;

  /**
   * Whether to include line numbers in the highlighted code.
   *
   * This is always `true`, and is included for convenience when passing the
   * result to other parts of the system. The thinking is that you're more
   * likely to want line numbers than not when the code being highlighted comes
   * from an external file.
   */
  lineNumbers: true;
}

const schema: JSONSchema7 = {
  type: "object",
  additionalProperties: false,
  required: ["grammars"],
  properties: {
    grammars: {
      type: "array",
      items: { type: "object" },
    },
  },
} as const;

/**
 * Highlights code, applies the core transform, and returns an HTML AST plus
 * some metadata.
 */
const codeLoader: LoaderDefinitionFunction<CodeLoaderOptions> = function (
  source,
) {
  callbackify(async () => {
    const options = this.getOptions(schema);

    const params = new URLSearchParams(this.resourceQuery);
    const annotationMode = parseAnnotationMode(params);

    const highlighter = await createHighlighter(options.grammars);
    const scope = highlighter.flagToScope(this.resourcePath);
    const tree = highlighter.highlight(source, scope);
    const coreTransform = createCoreTransform({ annotationMode });
    coreTransform(tree);

    const result: LoadedCode = {
      tree,
      scope,
      filename: this.utils.contextify(this.rootContext, this.resourcePath),
      lineNumbers: true,
    };

    return `export default ${JSON.stringify(result)};`;
  })(this.async());
};

export default codeLoader;

function parseAnnotationMode(
  params: URLSearchParams,
): AnnotationMode | undefined {
  const mode = params.get("annotations");
  if (mode === null) return undefined;
  if (mode === "strip") return "strip";
  if (mode === "retain") return "retain";
  if (mode === "ignore") return "ignore";

  throw new Error(`Invalid annotation mode: ${mode}`);
}
