import type { Grammar } from "@wooorm/starry-night";
import type { Root } from "hast";
import type { JSONSchema7 } from "json-schema";
import { callbackify } from "node:util";
import type { LoaderDefinitionFunction } from "webpack";
import {
  createCoreTransform,
  type AnnotationMode,
  type RedactEntry as CoreTransformRedactEntry,
} from "../core-transform.js";
import { createHighlighter } from "../highlighter.js";

/**
 * Options for the code loader.
 */
export interface CodeLoaderOptions {
  /**
   * The grammars to use for highlighting code.
   */
  grammars: Grammar[];

  /**
   * How to redact sensitive information.
   *
   * The keys are the types of sensitive information, and the values define
   * how to find and replace that information.
   */
  redact?: Record<string, RedactEntry>;
}

/**
 * Defines how to redact a specific type of sensitive information.
 */
export interface RedactEntry {
  /**
   * The regular expressions to use when finding the information to redact.
   *
   * **Note:** All expressions will use the global (`/g`) and case-insensitive
   * (`/i`) flags.
   */
  search: string[];

  /**
   * The replacement string to use when redacting the information.
   *
   * @defaultValue `""`
   */
  replace?: string;
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
    redact: {
      type: "object",
      additionalProperties: {
        type: "object",
        additionalProperties: false,
        required: ["search"],
        properties: {
          search: {
            type: "array",
            minItems: 1,
            items: {
              type: "string",
              minLength: 1,
            },
          },
          replace: {
            type: "string",
          },
        },
      },
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

    const redact = Object.fromEntries(
      Object.entries(options.redact ?? {}).map(
        ([type, { search, replace }]) => {
          const entry: CoreTransformRedactEntry = {
            search: search.map((pattern) => new RegExp(pattern, "gi")),
            replace: () => replace,
          };

          return [type, entry];
        },
      ),
    );

    const coreTransform = createCoreTransform({ annotationMode, redact });
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
