import {
  assertRoot,
  type LineNumberElement,
  type LineNumbersElement,
  type Root,
} from "impasto";
import { expect, it } from "vitest";

const lineNumber = (n: number): LineNumberElement => ({
  type: "element",
  tagName: "div",
  properties: { className: ["imp-n"] },
  children: [{ type: "text", value: String(n) }],
});

const lineNumbers = (n: number): LineNumbersElement => ({
  type: "element",
  tagName: "div",
  properties: { className: ["imp-ln"] },
  children: Array.from({ length: n }, (_, i) => lineNumber(i + 1)),
});

const validRoot: Root = {
  type: "root",
  children: [
    {
      type: "element",
      tagName: "pre",
      properties: { className: ["imp-cb"] },
      children: [
        lineNumbers(1),
        {
          type: "element",
          tagName: "code",
          properties: {},
          children: [
            {
              type: "element",
              tagName: "div",
              properties: { className: ["imp-l"] },
              children: [
                {
                  type: "element",
                  tagName: "span",
                  properties: { className: ["pl-c1"] },
                  children: [{ type: "text", value: "1" }],
                },
                { type: "text", value: "\n" },
              ],
            },
          ],
        },
      ],
    },
  ],
};

it("throws for non-objects", () => {
  expect(() => {
    assertRoot("not an object");
  }).toThrow("Not an Impasto root");
});

it("throws for nulls", () => {
  expect(() => {
    assertRoot(null);
  }).toThrow("Not an Impasto root");
});

it("throws for objects without a type", () => {
  const value = structuredClone(validRoot);
  // @ts-expect-error - Intentionally invalid
  delete value.type;

  expect(() => {
    assertRoot(value);
  }).toThrow("Not an Impasto root");
});

it("throws for objects with a non-root type", () => {
  const value = structuredClone(validRoot);
  // @ts-expect-error - Intentionally invalid
  value.type = "not-root";

  expect(() => {
    assertRoot(value);
  }).toThrow("Not an Impasto root");
});

it("throws for objects without children", () => {
  const value = structuredClone(validRoot);
  // @ts-expect-error - Intentionally invalid
  delete value.children;

  expect(() => {
    assertRoot(value);
  }).toThrow("Not an Impasto root");
});

it("throws for objects with non-array children", () => {
  const value = structuredClone(validRoot);
  // @ts-expect-error - Intentionally invalid
  value.children = "not an array";

  expect(() => {
    assertRoot(value);
  }).toThrow("Not an Impasto root");
});

it("throws for objects with no children", () => {
  const value = structuredClone(validRoot);
  // @ts-expect-error - Intentionally invalid
  value.children = [];

  expect(() => {
    assertRoot(value);
  }).toThrow("Not an Impasto root");
});

it("throws for objects with more than one child", () => {
  const value = structuredClone(validRoot);
  // @ts-expect-error - Intentionally invalid
  value.children.push({});

  expect(() => {
    assertRoot(value);
  }).toThrow("Not an Impasto root");
});

it("throws for non-object children", () => {
  const value = structuredClone(validRoot);
  // @ts-expect-error - Intentionally invalid
  value.children = ["not an object"];

  expect(() => {
    assertRoot(value);
  }).toThrow("Not an Impasto root");
});

it("throws for null children", () => {
  const value = structuredClone(validRoot);
  // @ts-expect-error - Intentionally invalid
  value.children = [null];

  expect(() => {
    assertRoot(value);
  }).toThrow("Not an Impasto root");
});

it("throws for object children without a type", () => {
  const value = structuredClone(validRoot);
  // @ts-expect-error - Intentionally invalid
  delete value.children[0].type;

  expect(() => {
    assertRoot(value);
  }).toThrow("Not an Impasto root");
});

it("throws for object children with a non-element type", () => {
  const value = structuredClone(validRoot);
  // @ts-expect-error - Intentionally invalid
  value.children[0].type = "not-element";

  expect(() => {
    assertRoot(value);
  }).toThrow("Not an Impasto root");
});

it("throws for element children without a tag name", () => {
  const value = structuredClone(validRoot);
  // @ts-expect-error - Intentionally invalid
  value.children[0].tagName = undefined;

  expect(() => {
    assertRoot(value);
  }).toThrow("Not an Impasto root");
});

it("throws for element children with a non-pre tag name", () => {
  const value = structuredClone(validRoot);
  // @ts-expect-error - Intentionally invalid
  value.children[0].tagName = "not-pre";

  expect(() => {
    assertRoot(value);
  }).toThrow("Not an Impasto root");
});

it("throws for pre children without properties", () => {
  const value = structuredClone(validRoot);
  // @ts-expect-error - Intentionally invalid
  delete value.children[0].properties;

  expect(() => {
    assertRoot(value);
  }).toThrow("Not an Impasto root");
});

it("throws for pre children with non-object properties", () => {
  const value = structuredClone(validRoot);
  // @ts-expect-error - Intentionally invalid
  value.children[0].properties = "not an object";

  expect(() => {
    assertRoot(value);
  }).toThrow("Not an Impasto root");
});

it("throws for pre children with null properties", () => {
  const value = structuredClone(validRoot);
  // @ts-expect-error - Intentionally invalid
  value.children[0].properties = null;

  expect(() => {
    assertRoot(value);
  }).toThrow("Not an Impasto root");
});

it("throws for pre children with no class name", () => {
  const value = structuredClone(validRoot);
  // @ts-expect-error - Intentionally invalid
  delete value.children[0].properties.className;

  expect(() => {
    assertRoot(value);
  }).toThrow("Not an Impasto root");
});

it("throws for pre children with non-array class names", () => {
  const value = structuredClone(validRoot);
  // @ts-expect-error - Intentionally invalid
  value.children[0].properties.className = "not an array";

  expect(() => {
    assertRoot(value);
  }).toThrow("Not an Impasto root");
});

it("throws for pre children with no code block class name", () => {
  const value = structuredClone(validRoot);
  value.children[0].properties.className = ["not-a-code-block"];

  expect(() => {
    assertRoot(value);
  }).toThrow("Not an Impasto root");
});

it("throws for pre children with no children", () => {
  const value = structuredClone(validRoot);
  // @ts-expect-error - Intentionally invalid
  delete value.children[0].children;

  expect(() => {
    assertRoot(value);
  }).toThrow("Not an Impasto root");
});

it("throws for pre children with non-array children", () => {
  const value = structuredClone(validRoot);
  // @ts-expect-error - Intentionally invalid
  value.children[0].children = "not an array";

  expect(() => {
    assertRoot(value);
  }).toThrow("Not an Impasto root");
});

it("throws for pre children with less than 2 children", () => {
  const value = structuredClone(validRoot);
  value.children[0].children.pop();

  expect(() => {
    assertRoot(value);
  }).toThrow("Not an Impasto root");
});

it("throws for pre children with more than 2 children", () => {
  const value = structuredClone(validRoot);
  value.children[0].children.push(value.children[0].children[0]);

  expect(() => {
    assertRoot(value);
  }).toThrow("Not an Impasto root");
});
