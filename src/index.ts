export { createCoreTransform } from "./core-transform.js";
export type {
  Annotation,
  AnnotationMode,
  CoreTransformOptions,
  CoreTransformResult,
  RedactEntry,
} from "./core-transform.js";
export * as cssClass from "./css-class.js";
export * as cssProperty from "./css-property.js";
export * as dataAttribute from "./data-attribute.js";
export { createHighlighter } from "./highlighter.js";
export type { Highlighter } from "./highlighter.js";
export {
  CodeElement,
  LineElement,
  LineNumberElement,
  LineNumbersElement,
  PreElement,
  Root,
  SpaceElement,
  TabElement,
  assertRoot,
} from "./impasto-tree.js";
export { createInstanceTransform } from "./instance-transform.js";
export type { InstanceTransformOptions } from "./instance-transform.js";
export type { Transform } from "./transform.js";
