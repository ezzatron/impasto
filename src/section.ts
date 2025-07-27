import createClassList from "hast-util-class-list";
import {
  sectionContent as sectionContentClass,
  sectionContentIndent as sectionContentIndentClass,
  sectionContext as sectionContextClass,
} from "./css-class.js";
import { sectionName as sectionNameAttr } from "./data-attribute.js";
import { isWhitespace, type LineElement } from "./impasto-tree.js";

/**
 * Result of splitting a section from the Impasto tree.
 */
export interface SplitSectionResult {
  /**
   * The lines that are part of the section.
   */
  content: SplitSectionResultSegment;

  /**
   * Details of the common indentation of the section content lines.
   */
  contentIndent: SplitSectionResultContentIndent;

  /**
   * The lines before the section.
   */
  contextBefore: SplitSectionResultSegment | undefined;

  /**
   * The lines after the section.
   */
  contextAfter: SplitSectionResultSegment | undefined;

  /**
   * All content and context lines combined.
   */
  lines: LineElement[];
}

/**
 * A segment of the section split result, either the section content lines, or
 * the context lines before or after it.
 */
export interface SplitSectionResultSegment {
  /**
   * The lines that are part of the segment.
   */
  lines: LineElement[];

  /**
   * The start line number of the segment.
   *
   * **Note:** Line numbers are 1-based.
   */
  startLine: number;

  /**
   * The end line number of the segment.
   *
   * **Note:** Line numbers are 1-based.
   */
  endLine: number;
}

/**
 * Details of the common indentation of the section content lines.
 */
export interface SplitSectionResultContentIndent {
  /**
   * The common indentation.
   */
  indent: string;

  /**
   * The number of spaces in the common indentation.
   */
  spaceCount: number;

  /**
   * The number of tabs in the common indentation.
   */
  tabCount: number;
}

/**
 * Splits code lines into a section and its context.
 *
 * @param lines - The original lines of code.
 * @param section - The name of the section to isolate. If falsy, all lines are
 *   considered part of the content.
 */
export function splitSection(
  lines: LineElement[],
  section: string | undefined,
): SplitSectionResult {
  lines = structuredClone(lines);

  if (!section) {
    return {
      content: { lines, startLine: 1, endLine: lines.length },
      contentIndent: { indent: "", spaceCount: 0, tabCount: 0 },
      contextBefore: undefined,
      contextAfter: undefined,
      lines,
    };
  }

  const contentLines: LineElement[] = [];
  const linesBefore: LineElement[] = [];
  const linesAfter: LineElement[] = [];
  let hasSection = false;

  for (let i = 0; i < lines.length; ++i) {
    const line = lines[i];

    const sectionsData = line.properties[sectionNameAttr];
    const sections =
      typeof sectionsData === "string" ? sectionsData.split(" ") : [];

    if (sections.includes(section)) {
      hasSection = true;
      contentLines.push(line);
      createClassList(line).add(sectionContentClass);
    } else if (hasSection) {
      linesAfter.push(line);
      createClassList(line).add(sectionContextClass);
    } else {
      linesBefore.push(line);
      createClassList(line).add(sectionContextClass);
    }
  }

  if (!hasSection) throw new Error(`Missing code section ${section}`);

  const contentIndent = wrapSectionIndent(contentLines);

  const content: SplitSectionResultSegment = {
    lines: contentLines,
    startLine: linesBefore.length + 1,
    endLine: linesBefore.length + contentLines.length,
  };

  const contextBefore: SplitSectionResultSegment | undefined =
    linesBefore.length > 0
      ? {
          lines: linesBefore,
          startLine: 1,
          endLine: linesBefore.length,
        }
      : undefined;

  const contextAfter: SplitSectionResultSegment | undefined =
    linesAfter.length > 0
      ? {
          lines: linesAfter,
          startLine: content.endLine + 1,
          endLine: content.endLine + linesAfter.length,
        }
      : undefined;

  return {
    content,
    contentIndent,
    contextBefore,
    contextAfter,
    lines,
  };
}

function wrapSectionIndent(
  lines: LineElement[],
): SplitSectionResultContentIndent {
  let indent = "";

  for (const element of lines[0].children) {
    if (!isWhitespace(element)) break;

    indent += element.children[0].value;
  }

  let i;
  let spaceCount = 0;
  let tabCount = 0;

  outer: for (i = 0; i < indent.length; ++i) {
    const char = indent[i];

    for (let j = 1; j < lines.length; ++j) {
      const element = lines[j].children[i];

      if (!isWhitespace(element) || element.children[0].value !== char) {
        break outer;
      }
    }

    if (char === "\t") {
      ++tabCount;
    } else {
      ++spaceCount;
    }
  }

  if (i < 1) return { indent: "", spaceCount: 0, tabCount: 0 };

  for (const line of lines) {
    line.children.splice(0, i, {
      type: "element",
      tagName: "span",
      properties: { className: [sectionContentIndentClass] },
      children: line.children.slice(0, i),
    });
  }

  return { indent, spaceCount, tabCount };
}
