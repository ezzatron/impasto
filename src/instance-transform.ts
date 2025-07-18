import type { Element, Root } from "hast";
import createClassList from "hast-util-class-list";
import {
  sectionContent as sectionContentClass,
  sectionContentIndent as sectionContentIndentClass,
  sectionContext as sectionContextClass,
  showLineNumbers as showLineNumbersClass,
} from "./css-class.js";
import {
  sectionContentIndentSpaceCount as sectionContentIndentSpaceCountProperty,
  sectionContentIndentTabCount as sectionContentIndentTabCountProperty,
} from "./css-property.js";
import { sectionName as sectionNameAttr } from "./data-attribute.js";
import {
  assertRoot,
  isWhitespace,
  type LineElement,
  type LineNumberElement,
} from "./impasto-tree.js";
import type { Transform } from "./transform.js";

/**
 * Configuration options for the instance transform.
 */
export interface InstanceTransformOptions {
  /**
   * Whether to remove all section context from the output.
   *
   * If `true`, all lines and line numbers that are not part of the isolated
   * section will be stripped from the output.
   *
   * @defaultValue `false`
   */
  noSectionContext?: boolean;

  /**
   * The name of a section to isolate.
   *
   * If provided and the section does not exist, an error will be thrown.
   *
   * If provided and the section spans all lines in the code, this option will
   * have no effect.
   *
   * If provided AND the section does not span all lines in the code:
   * - The transform will add the `imp-sc` CSS class to any lines or line
   *   numbers that are part of the section, and the `imp-sx` CSS class to any
   *   lines or line numbers that are not part of the section, allowing the
   *   context to be hidden, or styled differently.
   * - The `imp-sc-i` CSS class will be added to the common indentation of
   *   section content lines, allowing the section's indentation to be hidden or
   *   styled differently.
   * - The section name will be added to the `data-imp-s` attribute of the <pre>
   *   element.
   * - The `--imp-sc-i-s` and `--imp-sc-i-t` CSS properties of the <pre> will be
   *   set to the number of spaces and tabs in the common indentation of the
   *   section content lines, allowing for CSS calculation of the indentation
   *   width with respect to the desired tab width.
   */
  section?: string;

  /**
   * Whether line numbers should be visible.
   *
   * Line numbers will always be present in the AST. This option controls a CSS
   * class that can be used to show or hide them in the rendered output.
   *
   * @defaultValue `false`
   */
  showLineNumbers?: boolean;
}

/**
 * Create an instance transform.
 *
 * **Note:** This transform does not mutate the input AST.
 *
 * This transform expects an Impasto AST as produced by the core transform as
 * input.
 *
 * This transform handles:
 * - Showing or hiding line numbers — When `showLineNumbers` is `true`, the
 *   `imp-ln-s` CSS class is added to the pre element
 * - Separates lines into section content and context — Section content lines
 *   and line numbers will have the `imp-sc` CSS class, and section context
 *   lines and line numbers will have the `imp-sx` CSS class.
 * - Strips out section context lines — When `noSectionContext` is `true`, all
 *   lines and line numbers that are not part of the isolated section will be
 *   stripped from the output.
 */
export function createInstanceTransform({
  noSectionContext = false,
  section,
  showLineNumbers = false,
}: InstanceTransformOptions = {}): Transform<Root> {
  return (tree) => {
    tree = structuredClone(tree);
    assertRoot(tree);

    const [pre] = tree.children;
    if (showLineNumbers) pre.properties.className.push(showLineNumbersClass);

    if (!section) return tree;

    const [lineNumberContainer, code] = pre.children;
    const lineNumbers = lineNumberContainer.children;
    const lines = code.children;

    const [
      hasContext,
      sectionLineNumbers,
      sectionLines,
      lineNumbersBefore,
      linesBefore,
      lineNumbersAfter,
      linesAfter,
    ] = splitSection(lineNumbers, lines, section);

    if (!hasContext) return tree;

    const [spaceCount, tabCount] = wrapSectionIndent(
      noSectionContext,
      sectionLines,
    );

    if (noSectionContext) {
      lineNumberContainer.children = sectionLineNumbers;
      code.children = sectionLines;

      return tree;
    }

    pre.properties[sectionNameAttr] = section;
    pre.properties.style = [
      `${sectionContentIndentSpaceCountProperty}:${spaceCount}`,
      `${sectionContentIndentTabCountProperty}:${tabCount}`,
    ].join(";");

    addClassToElements(sectionContentClass, sectionLineNumbers);
    addClassToElements(sectionContentClass, sectionLines);

    addClassToElements(sectionContextClass, lineNumbersBefore);
    addClassToElements(sectionContextClass, linesBefore);
    addClassToElements(sectionContextClass, lineNumbersAfter);
    addClassToElements(sectionContextClass, linesAfter);

    return tree;
  };
}

function splitSection(
  lineNumbers: LineNumberElement[],
  lines: LineElement[],
  name: string,
): [
  hasContext: boolean,
  sectionLineNumbers: LineNumberElement[],
  sectionLines: LineElement[],
  lineNumbersBefore: LineNumberElement[],
  linesBefore: LineElement[],
  lineNumbersAfter: LineNumberElement[],
  linesAfter: LineElement[],
] {
  const sectionLineNumbers: LineNumberElement[] = [];
  const sectionLines: LineElement[] = [];
  const lineNumbersBefore: LineNumberElement[] = [];
  const linesBefore: LineElement[] = [];
  const lineNumbersAfter: LineNumberElement[] = [];
  const linesAfter: LineElement[] = [];
  let hasSection = false;

  for (let i = 0; i < lines.length; ++i) {
    const lineNumber = lineNumbers[i];
    const line = lines[i];

    const sectionsData = line.properties[sectionNameAttr];
    const sections =
      typeof sectionsData === "string" ? sectionsData.split(" ") : [];

    if (sections.includes(name)) {
      hasSection = true;
      sectionLineNumbers.push(lineNumber);
      sectionLines.push(line);
    } else if (hasSection) {
      lineNumbersAfter.push(lineNumber);
      linesAfter.push(line);
    } else {
      lineNumbersBefore.push(lineNumber);
      linesBefore.push(line);
    }
  }

  if (!hasSection) throw new Error(`Missing code section ${name}`);

  return [
    lineNumbersBefore.length + lineNumbersAfter.length > 0,
    sectionLineNumbers,
    sectionLines,
    lineNumbersBefore,
    linesBefore,
    lineNumbersAfter,
    linesAfter,
  ];
}

function wrapSectionIndent(
  noSectionContext: boolean,
  lines: Element[],
): [spaceCount: number, tabCount: number] {
  const indents: [string, Element[], Element][] = [];

  for (let i = 0; i < lines.length; ++i) {
    const line = lines[i];
    const indentElements: Element[] = [];
    let indent = "";

    for (const child of line.children) {
      if (!isWhitespace(child)) break;

      indentElements.push(child);
      indent += child.children[0].value;
    }

    indents.push([indent, indentElements, line]);
  }

  let minIndentCharCount = Infinity;
  let indent = "";
  let indentElements: Element[] = [];

  for (const [lineIndent, lineIndentElements] of indents) {
    const indentCharCount = lineIndent.length;

    if (indentCharCount >= 0 && indentCharCount < minIndentCharCount) {
      minIndentCharCount = indentCharCount;
      indent = lineIndent;
      indentElements = lineIndentElements;
    }
  }

  for (const [lineIndent] of indents) {
    if (!lineIndent.startsWith(indent)) return [0, 0]; // Indent is inconsistent
  }

  let spaceCount = 0;
  let tabCount = 0;

  for (const char of indent) {
    if (char === "\t") {
      ++tabCount;
    } else {
      ++spaceCount;
    }
  }

  if (noSectionContext) {
    for (const [, , line] of indents) {
      line.children.splice(0, indentElements.length);
    }

    return [spaceCount, tabCount];
  }

  for (const [, , line] of indents) {
    line.children.splice(0, indentElements.length, {
      type: "element",
      tagName: "span",
      children: indentElements,
      properties: {
        className: [sectionContentIndentClass],
      },
    });
  }

  return [spaceCount, tabCount];
}

function addClassToElements(className: string, elements: Element[]) {
  for (const element of elements) createClassList(element).add(className);
}
