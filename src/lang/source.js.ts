import type { Grammar } from "@wooorm/starry-night";

/*
 * MIT License
 *
 * Copyright (c) 2015 - present Microsoft Corporation
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/**
 * JavaScript grammar with React support.
 *
 * @see {@link https://github.com/microsoft/vscode/blob/af0a171e61fa7bce22b53002bc2f3970315f7b73/extensions/javascript/syntaxes/JavaScript.tmLanguage.json}
 */
const grammar: Grammar = {
  scopeName: "source.js",
  extensions: [
    "._js",
    ".bones",
    ".cjs",
    ".cy",
    ".es6",
    ".jake",
    ".javascript",
    ".js",
    ".js.erb",
    ".jsb",
    ".jscad",
    ".jsfl",
    ".jslib",
    ".jsm",
    ".json5",
    ".jsonld",
    ".jspre",
    ".jss",
    ".jsx",
    ".mjs",
    ".njs",
    ".pac",
    ".sjs",
    ".ssjs",
    ".xsjs",
    ".xsjslib",
  ],
  names: [
    "cycript",
    "javascript",
    "javascript+erb",
    "js",
    "json5",
    "jsonld",
    "node",
    "qt-script",
  ],
  patterns: [
    { include: "#directives" },
    { include: "#statements" },
    { include: "#shebang" },
  ],
  repository: {
    shebang: {
      name: "comment.line.shebang.js.jsx",
      match: "\\A(#!).*(?=$)",
      captures: { "1": { name: "punctuation.definition.comment.js.jsx" } },
    },
    statements: {
      patterns: [
        { include: "#declaration" },
        { include: "#control-statement" },
        { include: "#after-operator-block-as-object-literal" },
        { include: "#decl-block" },
        { include: "#label" },
        { include: "#expression" },
        { include: "#punctuation-semicolon" },
        { include: "#string" },
        { include: "#comment" },
      ],
    },
    declaration: {
      patterns: [
        { include: "#decorator" },
        { include: "#var-expr" },
        { include: "#function-declaration" },
        { include: "#class-declaration" },
        { include: "#interface-declaration" },
        { include: "#enum-declaration" },
        { include: "#namespace-declaration" },
        { include: "#type-alias-declaration" },
        { include: "#import-equals-declaration" },
        { include: "#import-declaration" },
        { include: "#export-declaration" },
        {
          name: "storage.modifier.js.jsx",
          match:
            "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(declare|export)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))",
        },
      ],
    },
    "control-statement": {
      patterns: [
        { include: "#switch-statement" },
        { include: "#for-loop" },
        {
          name: "keyword.control.trycatch.js.jsx",
          match:
            "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(catch|finally|throw|try)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))",
        },
        {
          match:
            "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(break|continue|goto)\\s+([_$[:alpha:]][_$[:alnum:]]*)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))",
          captures: {
            "1": { name: "keyword.control.loop.js.jsx" },
            "2": { name: "entity.name.label.js.jsx" },
          },
        },
        {
          name: "keyword.control.loop.js.jsx",
          match:
            "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(break|continue|do|goto|while)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))",
        },
        {
          begin:
            "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(return)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))",
          beginCaptures: { "0": { name: "keyword.control.flow.js.jsx" } },
          end: "(?=[;}]|$|;|^\\s*$|(?:^\\s*(?:abstract|async|(?:\\bawait\\s+(?:\\busing(?=\\s+(?!in\\b|of\\b(?!\\s*(?:of\\b|=)))[_$[:alpha:]])\\b)\\b)|break|case|catch|class|const|continue|declare|do|else|enum|export|finally|function|for|goto|if|import|interface|let|module|namespace|switch|return|throw|try|type|(?:\\busing(?=\\s+(?!in\\b|of\\b(?!\\s*(?:of\\b|=)))[_$[:alpha:]])\\b)|var|while)\\b))",
          patterns: [{ include: "#expression" }],
        },
        {
          name: "keyword.control.switch.js.jsx",
          match:
            "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(case|default|switch)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))",
        },
        { include: "#if-statement" },
        {
          name: "keyword.control.conditional.js.jsx",
          match:
            "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(else|if)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))",
        },
        {
          name: "keyword.control.with.js.jsx",
          match:
            "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(with)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))",
        },
        {
          name: "keyword.control.js.jsx",
          match:
            "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(package)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))",
        },
        {
          name: "keyword.other.debugger.js.jsx",
          match:
            "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(debugger)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))",
        },
      ],
    },
    label: {
      patterns: [
        {
          begin: "([_$[:alpha:]][_$[:alnum:]]*)\\s*(:)(?=\\s*\\{)",
          beginCaptures: {
            "1": { name: "entity.name.label.js.jsx" },
            "2": { name: "punctuation.separator.label.js.jsx" },
          },
          end: "(?<=\\})",
          patterns: [{ include: "#decl-block" }],
        },
        {
          match: "([_$[:alpha:]][_$[:alnum:]]*)\\s*(:)",
          captures: {
            "1": { name: "entity.name.label.js.jsx" },
            "2": { name: "punctuation.separator.label.js.jsx" },
          },
        },
      ],
    },
    expression: {
      patterns: [
        { include: "#expressionWithoutIdentifiers" },
        { include: "#identifiers" },
        { include: "#expressionPunctuations" },
      ],
    },
    expressionWithoutIdentifiers: {
      patterns: [
        { include: "#jsx" },
        { include: "#string" },
        { include: "#regex" },
        { include: "#comment" },
        { include: "#function-expression" },
        { include: "#class-expression" },
        { include: "#arrow-function" },
        { include: "#paren-expression-possibly-arrow" },
        { include: "#cast" },
        { include: "#ternary-expression" },
        { include: "#new-expr" },
        { include: "#instanceof-expr" },
        { include: "#object-literal" },
        { include: "#expression-operators" },
        { include: "#function-call" },
        { include: "#literal" },
        { include: "#support-objects" },
        { include: "#paren-expression" },
      ],
    },
    expressionPunctuations: {
      patterns: [
        { include: "#punctuation-comma" },
        { include: "#punctuation-accessor" },
      ],
    },
    decorator: {
      name: "meta.decorator.js.jsx",
      begin: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))\\@",
      beginCaptures: { "0": { name: "punctuation.decorator.js.jsx" } },
      end: "(?=\\s)",
      patterns: [{ include: "#expression" }],
    },
    "var-expr": {
      patterns: [
        {
          name: "meta.var.expr.js.jsx",
          begin:
            "(?=(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(\\bexport)\\s+)?(?:(\\bdeclare)\\s+)?\\b(var|let)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.)))",
          end: "(?!(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(\\bexport)\\s+)?(?:(\\bdeclare)\\s+)?\\b(var|let)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.)))((?=^|;|}|((?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(of|in)\\s+)|;|^\\s*$|(?:^\\s*(?:abstract|async|(?:\\bawait\\s+(?:\\busing(?=\\s+(?!in\\b|of\\b(?!\\s*(?:of\\b|=)))[_$[:alpha:]])\\b)\\b)|break|case|catch|class|const|continue|declare|do|else|enum|export|finally|function|for|goto|if|import|interface|let|module|namespace|switch|return|throw|try|type|(?:\\busing(?=\\s+(?!in\\b|of\\b(?!\\s*(?:of\\b|=)))[_$[:alpha:]])\\b)|var|while)\\b))|((?<!^let|[^\\._$[:alnum:]]let|^var|[^\\._$[:alnum:]]var)(?=\\s*$)))",
          patterns: [
            {
              begin:
                "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(\\bexport)\\s+)?(?:(\\bdeclare)\\s+)?\\b(var|let)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))\\s*",
              beginCaptures: {
                "1": { name: "keyword.control.export.js.jsx" },
                "2": { name: "storage.modifier.js.jsx" },
                "3": { name: "storage.type.js.jsx" },
              },
              end: "(?=\\S)",
            },
            { include: "#destructuring-variable" },
            { include: "#var-single-variable" },
            { include: "#variable-initializer" },
            { include: "#comment" },
            {
              begin: "(,)\\s*(?=$|\\/\\/)",
              beginCaptures: {
                "1": { name: "punctuation.separator.comma.js.jsx" },
              },
              end: "(?<!,)(((?==|;|}|((?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(of|in)\\s+)|^\\s*$))|((?<=\\S)(?=\\s*$)))",
              patterns: [
                { include: "#single-line-comment-consuming-line-ending" },
                { include: "#comment" },
                { include: "#destructuring-variable" },
                { include: "#var-single-variable" },
                { include: "#punctuation-comma" },
              ],
            },
            { include: "#punctuation-comma" },
          ],
        },
        {
          name: "meta.var.expr.js.jsx",
          begin:
            "(?=(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(\\bexport)\\s+)?(?:(\\bdeclare)\\s+)?\\b(const(?!\\s+enum\\b))(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.)))",
          beginCaptures: {
            "1": { name: "keyword.control.export.js.jsx" },
            "2": { name: "storage.modifier.js.jsx" },
            "3": { name: "storage.type.js.jsx" },
          },
          end: "(?!(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(\\bexport)\\s+)?(?:(\\bdeclare)\\s+)?\\b(const(?!\\s+enum\\b))(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.)))((?=^|;|}|((?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(of|in)\\s+)|;|^\\s*$|(?:^\\s*(?:abstract|async|(?:\\bawait\\s+(?:\\busing(?=\\s+(?!in\\b|of\\b(?!\\s*(?:of\\b|=)))[_$[:alpha:]])\\b)\\b)|break|case|catch|class|const|continue|declare|do|else|enum|export|finally|function|for|goto|if|import|interface|let|module|namespace|switch|return|throw|try|type|(?:\\busing(?=\\s+(?!in\\b|of\\b(?!\\s*(?:of\\b|=)))[_$[:alpha:]])\\b)|var|while)\\b))|((?<!^const|[^\\._$[:alnum:]]const)(?=\\s*$)))",
          patterns: [
            {
              begin:
                "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(\\bexport)\\s+)?(?:(\\bdeclare)\\s+)?\\b(const(?!\\s+enum\\b))(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))\\s*",
              beginCaptures: {
                "1": { name: "keyword.control.export.js.jsx" },
                "2": { name: "storage.modifier.js.jsx" },
                "3": { name: "storage.type.js.jsx" },
              },
              end: "(?=\\S)",
            },
            { include: "#destructuring-const" },
            { include: "#var-single-const" },
            { include: "#variable-initializer" },
            { include: "#comment" },
            {
              begin: "(,)\\s*(?=$|\\/\\/)",
              beginCaptures: {
                "1": { name: "punctuation.separator.comma.js.jsx" },
              },
              end: "(?<!,)(((?==|;|}|((?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(of|in)\\s+)|^\\s*$))|((?<=\\S)(?=\\s*$)))",
              patterns: [
                { include: "#single-line-comment-consuming-line-ending" },
                { include: "#comment" },
                { include: "#destructuring-const" },
                { include: "#var-single-const" },
                { include: "#punctuation-comma" },
              ],
            },
            { include: "#punctuation-comma" },
          ],
        },
        {
          name: "meta.var.expr.js.jsx",
          begin:
            "(?=(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(\\bexport)\\s+)?(?:(\\bdeclare)\\s+)?\\b((?:\\busing(?=\\s+(?!in\\b|of\\b(?!\\s*(?:of\\b|=)))[_$[:alpha:]])\\b)|(?:\\bawait\\s+(?:\\busing(?=\\s+(?!in\\b|of\\b(?!\\s*(?:of\\b|=)))[_$[:alpha:]])\\b)\\b))(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.)))",
          beginCaptures: {
            "1": { name: "keyword.control.export.js.jsx" },
            "2": { name: "storage.modifier.js.jsx" },
            "3": { name: "storage.type.js.jsx" },
          },
          end: "(?!(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(\\bexport)\\s+)?(?:(\\bdeclare)\\s+)?\\b((?:\\busing(?=\\s+(?!in\\b|of\\b(?!\\s*(?:of\\b|=)))[_$[:alpha:]])\\b)|(?:\\bawait\\s+(?:\\busing(?=\\s+(?!in\\b|of\\b(?!\\s*(?:of\\b|=)))[_$[:alpha:]])\\b)\\b))(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.)))((?=;|}|((?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(of|in)\\s+)|;|^\\s*$|(?:^\\s*(?:abstract|async|(?:\\bawait\\s+(?:\\busing(?=\\s+(?!in\\b|of\\b(?!\\s*(?:of\\b|=)))[_$[:alpha:]])\\b)\\b)|break|case|catch|class|const|continue|declare|do|else|enum|export|finally|function|for|goto|if|import|interface|let|module|namespace|switch|return|throw|try|type|(?:\\busing(?=\\s+(?!in\\b|of\\b(?!\\s*(?:of\\b|=)))[_$[:alpha:]])\\b)|var|while)\\b))|((?<!^using|[^\\._$[:alnum:]]using|^await\\s+using|[^\\._$[:alnum:]]await\\s+using)(?=\\s*$)))",
          patterns: [
            {
              begin:
                "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(\\bexport)\\s+)?(?:(\\bdeclare)\\s+)?\\b((?:\\busing(?=\\s+(?!in\\b|of\\b(?!\\s*(?:of\\b|=)))[_$[:alpha:]])\\b)|(?:\\bawait\\s+(?:\\busing(?=\\s+(?!in\\b|of\\b(?!\\s*(?:of\\b|=)))[_$[:alpha:]])\\b)\\b))(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))\\s*",
              beginCaptures: {
                "1": { name: "keyword.control.export.js.jsx" },
                "2": { name: "storage.modifier.js.jsx" },
                "3": { name: "storage.type.js.jsx" },
              },
              end: "(?=\\S)",
            },
            { include: "#var-single-const" },
            { include: "#variable-initializer" },
            { include: "#comment" },
            {
              begin: "(,)\\s*((?!\\S)|(?=\\/\\/))",
              beginCaptures: {
                "1": { name: "punctuation.separator.comma.js.jsx" },
              },
              end: "(?<!,)(((?==|;|}|((?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(of|in)\\s+)|^\\s*$))|((?<=\\S)(?=\\s*$)))",
              patterns: [
                { include: "#single-line-comment-consuming-line-ending" },
                { include: "#comment" },
                { include: "#var-single-const" },
                { include: "#punctuation-comma" },
              ],
            },
            { include: "#punctuation-comma" },
          ],
        },
      ],
    },
    "var-single-variable": {
      patterns: [
        {
          name: "meta.var-single-variable.expr.js.jsx",
          begin:
            "(?x)([_$[:alpha:]][_$[:alnum:]]*)(\\!)?(?=\\s*\n# function assignment |\n(=\\s*(\n  ((async\\s+)?(\n    (function\\s*[(<*]) |\n    (function\\s+) |\n    ([_$[:alpha:]][_$[:alnum:]]*\\s*=>)\n  )) |\n  ((async\\s*)?(\n    ((<\\s*$)|([\\(]\\s*((([\\{\\[]\\s*)?$)|((\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})\\s*((:\\s*\\{?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))|((\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])\\s*((:\\s*\\[?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))))) |\n    # sure shot arrow functions even if => is on new line\n(\n  (<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?\n  [(]\\s*(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*\n  (\n    ([)]\\s*:) |                                                                                       # ():\n    ((\\.\\.\\.\\s*)?[_$[:alpha:]][_$[:alnum:]]*\\s*:)                                                                  # [(]param: | [(]...param:\n  )\n) |\n(\n  [<]\\s*[_$[:alpha:]][_$[:alnum:]]*\\s+extends\\s*[^=>]                                                              # < typeparam extends\n) |\n# arrow function possible to detect only with => on same line\n(\n  (<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?                                                                                 # typeparameters\n  \\(\\s*(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*(([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\.\\.\\.\\s*[_$[:alpha:]]))([^()\\'\\\"\\`]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\'([^\\'\\\\]|\\\\.)*\\')|(\\\"([^\\\"\\\\]|\\\\.)*\\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))*)?\\)   # parameters\n  (\\s*:\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+)?                                                                        # return type\n  \\s*=>                                                                                               # arrow operator\n)\n  ))\n)) |\n# typeannotation is fn type: < | () | (... | (param: | (param, | (param? | (param= | (param) =>\n(:\\s*(\n  (<) |\n  ([(]\\s*(\n    ([)]) |\n    (\\.\\.\\.) |\n    ([_$[:alnum:]]+\\s*(\n      ([:,?=])|\n      ([)]\\s*=>)\n    ))\n  ))\n)) |\n(:\\s*(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))Function(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))) |\n(:\\s*((<\\s*$)|([\\(]\\s*((([\\{\\[]\\s*)?$)|((\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})\\s*((:\\s*\\{?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))|((\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])\\s*((:\\s*\\[?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*))))))) |\n(:\\s*(=>|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(<[^<>]*>)|[^<>(),=])+=\\s*(\n  ((async\\s+)?(\n    (function\\s*[(<*]) |\n    (function\\s+) |\n    ([_$[:alpha:]][_$[:alnum:]]*\\s*=>)\n  )) |\n  ((async\\s*)?(\n    ((<\\s*$)|([\\(]\\s*((([\\{\\[]\\s*)?$)|((\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})\\s*((:\\s*\\{?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))|((\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])\\s*((:\\s*\\[?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))))) |\n    # sure shot arrow functions even if => is on new line\n(\n  (<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?\n  [(]\\s*(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*\n  (\n    ([)]\\s*:) |                                                                                       # ():\n    ((\\.\\.\\.\\s*)?[_$[:alpha:]][_$[:alnum:]]*\\s*:)                                                                  # [(]param: | [(]...param:\n  )\n) |\n(\n  [<]\\s*[_$[:alpha:]][_$[:alnum:]]*\\s+extends\\s*[^=>]                                                              # < typeparam extends\n) |\n# arrow function possible to detect only with => on same line\n(\n  (<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?                                                                                 # typeparameters\n  \\(\\s*(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*(([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\.\\.\\.\\s*[_$[:alpha:]]))([^()\\'\\\"\\`]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\'([^\\'\\\\]|\\\\.)*\\')|(\\\"([^\\\"\\\\]|\\\\.)*\\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))*)?\\)   # parameters\n  (\\s*:\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+)?                                                                        # return type\n  \\s*=>                                                                                               # arrow operator\n)\n  ))\n)))",
          beginCaptures: {
            "1": {
              name: "meta.definition.variable.js.jsx entity.name.function.js.jsx",
            },
            "2": { name: "keyword.operator.definiteassignment.js.jsx" },
          },
          end: "(?=$|^|[;,=}]|((?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(of|in)\\s+)|(;|^\\s*$|(?:^\\s*(?:abstract|async|(?:\\bawait\\s+(?:\\busing(?=\\s+(?!in\\b|of\\b(?!\\s*(?:of\\b|=)))[_$[:alpha:]])\\b)\\b)|break|case|catch|class|const|continue|declare|do|else|enum|export|finally|function|for|goto|if|import|interface|let|module|namespace|switch|return|throw|try|type|(?:\\busing(?=\\s+(?!in\\b|of\\b(?!\\s*(?:of\\b|=)))[_$[:alpha:]])\\b)|var|while)\\b)))",
          patterns: [{ include: "#var-single-variable-type-annotation" }],
        },
        {
          name: "meta.var-single-variable.expr.js.jsx",
          begin: "([[:upper:]][_$[:digit:][:upper:]]*)(?![_$[:alnum:]])(\\!)?",
          beginCaptures: {
            "1": {
              name: "meta.definition.variable.js.jsx variable.other.constant.js.jsx",
            },
            "2": { name: "keyword.operator.definiteassignment.js.jsx" },
          },
          end: "(?=$|^|[;,=}]|((?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(of|in)\\s+)|(;|^\\s*$|(?:^\\s*(?:abstract|async|(?:\\bawait\\s+(?:\\busing(?=\\s+(?!in\\b|of\\b(?!\\s*(?:of\\b|=)))[_$[:alpha:]])\\b)\\b)|break|case|catch|class|const|continue|declare|do|else|enum|export|finally|function|for|goto|if|import|interface|let|module|namespace|switch|return|throw|try|type|(?:\\busing(?=\\s+(?!in\\b|of\\b(?!\\s*(?:of\\b|=)))[_$[:alpha:]])\\b)|var|while)\\b)))",
          patterns: [{ include: "#var-single-variable-type-annotation" }],
        },
        {
          name: "meta.var-single-variable.expr.js.jsx",
          begin: "([_$[:alpha:]][_$[:alnum:]]*)(\\!)?",
          beginCaptures: {
            "1": {
              name: "meta.definition.variable.js.jsx variable.other.readwrite.js.jsx",
            },
            "2": { name: "keyword.operator.definiteassignment.js.jsx" },
          },
          end: "(?=$|^|[;,=}]|((?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(of|in)\\s+)|(;|^\\s*$|(?:^\\s*(?:abstract|async|(?:\\bawait\\s+(?:\\busing(?=\\s+(?!in\\b|of\\b(?!\\s*(?:of\\b|=)))[_$[:alpha:]])\\b)\\b)|break|case|catch|class|const|continue|declare|do|else|enum|export|finally|function|for|goto|if|import|interface|let|module|namespace|switch|return|throw|try|type|(?:\\busing(?=\\s+(?!in\\b|of\\b(?!\\s*(?:of\\b|=)))[_$[:alpha:]])\\b)|var|while)\\b)))",
          patterns: [{ include: "#var-single-variable-type-annotation" }],
        },
      ],
    },
    "var-single-const": {
      patterns: [
        {
          name: "meta.var-single-variable.expr.js.jsx",
          begin:
            "(?x)([_$[:alpha:]][_$[:alnum:]]*)(?=\\s*\n# function assignment |\n(=\\s*(\n  ((async\\s+)?(\n    (function\\s*[(<*]) |\n    (function\\s+) |\n    ([_$[:alpha:]][_$[:alnum:]]*\\s*=>)\n  )) |\n  ((async\\s*)?(\n    ((<\\s*$)|([\\(]\\s*((([\\{\\[]\\s*)?$)|((\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})\\s*((:\\s*\\{?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))|((\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])\\s*((:\\s*\\[?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))))) |\n    # sure shot arrow functions even if => is on new line\n(\n  (<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?\n  [(]\\s*(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*\n  (\n    ([)]\\s*:) |                                                                                       # ():\n    ((\\.\\.\\.\\s*)?[_$[:alpha:]][_$[:alnum:]]*\\s*:)                                                                  # [(]param: | [(]...param:\n  )\n) |\n(\n  [<]\\s*[_$[:alpha:]][_$[:alnum:]]*\\s+extends\\s*[^=>]                                                              # < typeparam extends\n) |\n# arrow function possible to detect only with => on same line\n(\n  (<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?                                                                                 # typeparameters\n  \\(\\s*(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*(([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\.\\.\\.\\s*[_$[:alpha:]]))([^()\\'\\\"\\`]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\'([^\\'\\\\]|\\\\.)*\\')|(\\\"([^\\\"\\\\]|\\\\.)*\\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))*)?\\)   # parameters\n  (\\s*:\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+)?                                                                        # return type\n  \\s*=>                                                                                               # arrow operator\n)\n  ))\n)) |\n# typeannotation is fn type: < | () | (... | (param: | (param, | (param? | (param= | (param) =>\n(:\\s*(\n  (<) |\n  ([(]\\s*(\n    ([)]) |\n    (\\.\\.\\.) |\n    ([_$[:alnum:]]+\\s*(\n      ([:,?=])|\n      ([)]\\s*=>)\n    ))\n  ))\n)) |\n(:\\s*(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))Function(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))) |\n(:\\s*((<\\s*$)|([\\(]\\s*((([\\{\\[]\\s*)?$)|((\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})\\s*((:\\s*\\{?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))|((\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])\\s*((:\\s*\\[?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*))))))) |\n(:\\s*(=>|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(<[^<>]*>)|[^<>(),=])+=\\s*(\n  ((async\\s+)?(\n    (function\\s*[(<*]) |\n    (function\\s+) |\n    ([_$[:alpha:]][_$[:alnum:]]*\\s*=>)\n  )) |\n  ((async\\s*)?(\n    ((<\\s*$)|([\\(]\\s*((([\\{\\[]\\s*)?$)|((\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})\\s*((:\\s*\\{?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))|((\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])\\s*((:\\s*\\[?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))))) |\n    # sure shot arrow functions even if => is on new line\n(\n  (<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?\n  [(]\\s*(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*\n  (\n    ([)]\\s*:) |                                                                                       # ():\n    ((\\.\\.\\.\\s*)?[_$[:alpha:]][_$[:alnum:]]*\\s*:)                                                                  # [(]param: | [(]...param:\n  )\n) |\n(\n  [<]\\s*[_$[:alpha:]][_$[:alnum:]]*\\s+extends\\s*[^=>]                                                              # < typeparam extends\n) |\n# arrow function possible to detect only with => on same line\n(\n  (<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?                                                                                 # typeparameters\n  \\(\\s*(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*(([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\.\\.\\.\\s*[_$[:alpha:]]))([^()\\'\\\"\\`]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\'([^\\'\\\\]|\\\\.)*\\')|(\\\"([^\\\"\\\\]|\\\\.)*\\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))*)?\\)   # parameters\n  (\\s*:\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+)?                                                                        # return type\n  \\s*=>                                                                                               # arrow operator\n)\n  ))\n)))",
          beginCaptures: {
            "1": {
              name: "meta.definition.variable.js.jsx variable.other.constant.js.jsx entity.name.function.js.jsx",
            },
          },
          end: "(?=$|^|[;,=}]|((?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(of|in)\\s+)|(;|^\\s*$|(?:^\\s*(?:abstract|async|(?:\\bawait\\s+(?:\\busing(?=\\s+(?!in\\b|of\\b(?!\\s*(?:of\\b|=)))[_$[:alpha:]])\\b)\\b)|break|case|catch|class|const|continue|declare|do|else|enum|export|finally|function|for|goto|if|import|interface|let|module|namespace|switch|return|throw|try|type|(?:\\busing(?=\\s+(?!in\\b|of\\b(?!\\s*(?:of\\b|=)))[_$[:alpha:]])\\b)|var|while)\\b)))",
          patterns: [{ include: "#var-single-variable-type-annotation" }],
        },
        {
          name: "meta.var-single-variable.expr.js.jsx",
          begin: "([_$[:alpha:]][_$[:alnum:]]*)",
          beginCaptures: {
            "1": {
              name: "meta.definition.variable.js.jsx variable.other.constant.js.jsx",
            },
          },
          end: "(?=$|^|[;,=}]|((?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(of|in)\\s+)|(;|^\\s*$|(?:^\\s*(?:abstract|async|(?:\\bawait\\s+(?:\\busing(?=\\s+(?!in\\b|of\\b(?!\\s*(?:of\\b|=)))[_$[:alpha:]])\\b)\\b)|break|case|catch|class|const|continue|declare|do|else|enum|export|finally|function|for|goto|if|import|interface|let|module|namespace|switch|return|throw|try|type|(?:\\busing(?=\\s+(?!in\\b|of\\b(?!\\s*(?:of\\b|=)))[_$[:alpha:]])\\b)|var|while)\\b)))",
          patterns: [{ include: "#var-single-variable-type-annotation" }],
        },
      ],
    },
    "var-single-variable-type-annotation": {
      patterns: [
        { include: "#type-annotation" },
        { include: "#string" },
        { include: "#comment" },
      ],
    },
    "destructuring-variable": {
      patterns: [
        {
          name: "meta.object-binding-pattern-variable.js.jsx",
          begin:
            "(?<!=|:|^of|[^\\._$[:alnum:]]of|^in|[^\\._$[:alnum:]]in)\\s*(?=\\{)",
          end: "(?=$|^|[;,=}]|((?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(of|in)\\s+))",
          patterns: [
            { include: "#object-binding-pattern" },
            { include: "#type-annotation" },
            { include: "#comment" },
          ],
        },
        {
          name: "meta.array-binding-pattern-variable.js.jsx",
          begin:
            "(?<!=|:|^of|[^\\._$[:alnum:]]of|^in|[^\\._$[:alnum:]]in)\\s*(?=\\[)",
          end: "(?=$|^|[;,=}]|((?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(of|in)\\s+))",
          patterns: [
            { include: "#array-binding-pattern" },
            { include: "#type-annotation" },
            { include: "#comment" },
          ],
        },
      ],
    },
    "destructuring-const": {
      patterns: [
        {
          name: "meta.object-binding-pattern-variable.js.jsx",
          begin:
            "(?<!=|:|^of|[^\\._$[:alnum:]]of|^in|[^\\._$[:alnum:]]in)\\s*(?=\\{)",
          end: "(?=$|^|[;,=}]|((?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(of|in)\\s+))",
          patterns: [
            { include: "#object-binding-pattern-const" },
            { include: "#type-annotation" },
            { include: "#comment" },
          ],
        },
        {
          name: "meta.array-binding-pattern-variable.js.jsx",
          begin:
            "(?<!=|:|^of|[^\\._$[:alnum:]]of|^in|[^\\._$[:alnum:]]in)\\s*(?=\\[)",
          end: "(?=$|^|[;,=}]|((?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(of|in)\\s+))",
          patterns: [
            { include: "#array-binding-pattern-const" },
            { include: "#type-annotation" },
            { include: "#comment" },
          ],
        },
      ],
    },
    "object-binding-element": {
      patterns: [
        { include: "#comment" },
        {
          begin:
            "(?x)(?=((\\b(?<!\\$)0(?:x|X)[0-9a-fA-F][0-9a-fA-F_]*(n)?\\b(?!\\$))|(\\b(?<!\\$)0(?:b|B)[01][01_]*(n)?\\b(?!\\$))|(\\b(?<!\\$)0(?:o|O)?[0-7][0-7_]*(n)?\\b(?!\\$))|((?<!\\$)(?:\n  (?:\\b[0-9][0-9_]*(\\.)[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)| # 1.1E+3\n  (?:\\b[0-9][0-9_]*(\\.)[eE][+-]?[0-9][0-9_]*(n)?\\b)|             # 1.E+3\n  (?:\\B(\\.)[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)|             # .1E+3\n  (?:\\b[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)|                 # 1E+3\n  (?:\\b[0-9][0-9_]*(\\.)[0-9][0-9_]*(n)?\\b)|                      # 1.1\n  (?:\\b[0-9][0-9_]*(\\.)(n)?\\B)|                                  # 1.\n  (?:\\B(\\.)[0-9][0-9_]*(n)?\\b)|                                  # .1\n  (?:\\b[0-9][0-9_]*(n)?\\b(?!\\.))                                 # 1\n)(?!\\$))|([_$[:alpha:]][_$[:alnum:]]*)|(\\'([^\\'\\\\]|\\\\.)*\\')|(\\\"([^\\\"\\\\]|\\\\.)*\\\")|(\\`([^\\`\\\\]|\\\\.)*\\`)|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])+\\]))\\s*(:))",
          end: "(?=,|\\})",
          patterns: [
            { include: "#object-binding-element-propertyName" },
            { include: "#binding-element" },
          ],
        },
        { include: "#object-binding-pattern" },
        { include: "#destructuring-variable-rest" },
        { include: "#variable-initializer" },
        { include: "#punctuation-comma" },
      ],
    },
    "object-binding-element-const": {
      patterns: [
        { include: "#comment" },
        {
          begin:
            "(?x)(?=((\\b(?<!\\$)0(?:x|X)[0-9a-fA-F][0-9a-fA-F_]*(n)?\\b(?!\\$))|(\\b(?<!\\$)0(?:b|B)[01][01_]*(n)?\\b(?!\\$))|(\\b(?<!\\$)0(?:o|O)?[0-7][0-7_]*(n)?\\b(?!\\$))|((?<!\\$)(?:\n  (?:\\b[0-9][0-9_]*(\\.)[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)| # 1.1E+3\n  (?:\\b[0-9][0-9_]*(\\.)[eE][+-]?[0-9][0-9_]*(n)?\\b)|             # 1.E+3\n  (?:\\B(\\.)[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)|             # .1E+3\n  (?:\\b[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)|                 # 1E+3\n  (?:\\b[0-9][0-9_]*(\\.)[0-9][0-9_]*(n)?\\b)|                      # 1.1\n  (?:\\b[0-9][0-9_]*(\\.)(n)?\\B)|                                  # 1.\n  (?:\\B(\\.)[0-9][0-9_]*(n)?\\b)|                                  # .1\n  (?:\\b[0-9][0-9_]*(n)?\\b(?!\\.))                                 # 1\n)(?!\\$))|([_$[:alpha:]][_$[:alnum:]]*)|(\\'([^\\'\\\\]|\\\\.)*\\')|(\\\"([^\\\"\\\\]|\\\\.)*\\\")|(\\`([^\\`\\\\]|\\\\.)*\\`)|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])+\\]))\\s*(:))",
          end: "(?=,|\\})",
          patterns: [
            { include: "#object-binding-element-propertyName" },
            { include: "#binding-element-const" },
          ],
        },
        { include: "#object-binding-pattern-const" },
        { include: "#destructuring-variable-rest-const" },
        { include: "#variable-initializer" },
        { include: "#punctuation-comma" },
      ],
    },
    "object-binding-element-propertyName": {
      begin:
        "(?x)(?=((\\b(?<!\\$)0(?:x|X)[0-9a-fA-F][0-9a-fA-F_]*(n)?\\b(?!\\$))|(\\b(?<!\\$)0(?:b|B)[01][01_]*(n)?\\b(?!\\$))|(\\b(?<!\\$)0(?:o|O)?[0-7][0-7_]*(n)?\\b(?!\\$))|((?<!\\$)(?:\n  (?:\\b[0-9][0-9_]*(\\.)[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)| # 1.1E+3\n  (?:\\b[0-9][0-9_]*(\\.)[eE][+-]?[0-9][0-9_]*(n)?\\b)|             # 1.E+3\n  (?:\\B(\\.)[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)|             # .1E+3\n  (?:\\b[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)|                 # 1E+3\n  (?:\\b[0-9][0-9_]*(\\.)[0-9][0-9_]*(n)?\\b)|                      # 1.1\n  (?:\\b[0-9][0-9_]*(\\.)(n)?\\B)|                                  # 1.\n  (?:\\B(\\.)[0-9][0-9_]*(n)?\\b)|                                  # .1\n  (?:\\b[0-9][0-9_]*(n)?\\b(?!\\.))                                 # 1\n)(?!\\$))|([_$[:alpha:]][_$[:alnum:]]*)|(\\'([^\\'\\\\]|\\\\.)*\\')|(\\\"([^\\\"\\\\]|\\\\.)*\\\")|(\\`([^\\`\\\\]|\\\\.)*\\`)|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])+\\]))\\s*(:))",
      end: "(:)",
      endCaptures: { "0": { name: "punctuation.destructuring.js.jsx" } },
      patterns: [
        { include: "#string" },
        { include: "#array-literal" },
        { include: "#numeric-literal" },
        {
          name: "variable.object.property.js.jsx",
          match: "([_$[:alpha:]][_$[:alnum:]]*)",
        },
      ],
    },
    "binding-element": {
      patterns: [
        { include: "#comment" },
        { include: "#string" },
        { include: "#numeric-literal" },
        { include: "#regex" },
        { include: "#object-binding-pattern" },
        { include: "#array-binding-pattern" },
        { include: "#destructuring-variable-rest" },
        { include: "#variable-initializer" },
      ],
    },
    "binding-element-const": {
      patterns: [
        { include: "#comment" },
        { include: "#string" },
        { include: "#numeric-literal" },
        { include: "#regex" },
        { include: "#object-binding-pattern-const" },
        { include: "#array-binding-pattern-const" },
        { include: "#destructuring-variable-rest-const" },
        { include: "#variable-initializer" },
      ],
    },
    "destructuring-variable-rest": {
      match: "(?:(\\.\\.\\.)\\s*)?([_$[:alpha:]][_$[:alnum:]]*)",
      captures: {
        "1": { name: "keyword.operator.rest.js.jsx" },
        "2": {
          name: "meta.definition.variable.js.jsx variable.other.readwrite.js.jsx",
        },
      },
    },
    "destructuring-variable-rest-const": {
      match: "(?:(\\.\\.\\.)\\s*)?([_$[:alpha:]][_$[:alnum:]]*)",
      captures: {
        "1": { name: "keyword.operator.rest.js.jsx" },
        "2": {
          name: "meta.definition.variable.js.jsx variable.other.constant.js.jsx",
        },
      },
    },
    "object-binding-pattern": {
      begin: "(?:(\\.\\.\\.)\\s*)?(\\{)",
      beginCaptures: {
        "1": { name: "keyword.operator.rest.js.jsx" },
        "2": { name: "punctuation.definition.binding-pattern.object.js.jsx" },
      },
      end: "\\}",
      endCaptures: {
        "0": { name: "punctuation.definition.binding-pattern.object.js.jsx" },
      },
      patterns: [{ include: "#object-binding-element" }],
    },
    "object-binding-pattern-const": {
      begin: "(?:(\\.\\.\\.)\\s*)?(\\{)",
      beginCaptures: {
        "1": { name: "keyword.operator.rest.js.jsx" },
        "2": { name: "punctuation.definition.binding-pattern.object.js.jsx" },
      },
      end: "\\}",
      endCaptures: {
        "0": { name: "punctuation.definition.binding-pattern.object.js.jsx" },
      },
      patterns: [{ include: "#object-binding-element-const" }],
    },
    "array-binding-pattern": {
      begin: "(?:(\\.\\.\\.)\\s*)?(\\[)",
      beginCaptures: {
        "1": { name: "keyword.operator.rest.js.jsx" },
        "2": { name: "punctuation.definition.binding-pattern.array.js.jsx" },
      },
      end: "\\]",
      endCaptures: {
        "0": { name: "punctuation.definition.binding-pattern.array.js.jsx" },
      },
      patterns: [
        { include: "#binding-element" },
        { include: "#punctuation-comma" },
      ],
    },
    "array-binding-pattern-const": {
      begin: "(?:(\\.\\.\\.)\\s*)?(\\[)",
      beginCaptures: {
        "1": { name: "keyword.operator.rest.js.jsx" },
        "2": { name: "punctuation.definition.binding-pattern.array.js.jsx" },
      },
      end: "\\]",
      endCaptures: {
        "0": { name: "punctuation.definition.binding-pattern.array.js.jsx" },
      },
      patterns: [
        { include: "#binding-element-const" },
        { include: "#punctuation-comma" },
      ],
    },
    "parameter-name": {
      patterns: [
        {
          match:
            "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(override|public|protected|private|readonly)\\s+(?=(override|public|protected|private|readonly)\\s+)",
          captures: { "1": { name: "storage.modifier.js.jsx" } },
        },
        {
          match:
            "(?x)(?:(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(override|public|private|protected|readonly)\\s+)?(?:(\\.\\.\\.)\\s*)?(?<!=|:)(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(this)|([_$[:alpha:]][_$[:alnum:]]*))(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))\\s*(\\??)(?=\\s*\n# function assignment |\n(=\\s*(\n  ((async\\s+)?(\n    (function\\s*[(<*]) |\n    (function\\s+) |\n    ([_$[:alpha:]][_$[:alnum:]]*\\s*=>)\n  )) |\n  ((async\\s*)?(\n    ((<\\s*$)|([\\(]\\s*((([\\{\\[]\\s*)?$)|((\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})\\s*((:\\s*\\{?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))|((\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])\\s*((:\\s*\\[?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))))) |\n    # sure shot arrow functions even if => is on new line\n(\n  (<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?\n  [(]\\s*(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*\n  (\n    ([)]\\s*:) |                                                                                       # ():\n    ((\\.\\.\\.\\s*)?[_$[:alpha:]][_$[:alnum:]]*\\s*:)                                                                  # [(]param: | [(]...param:\n  )\n) |\n(\n  [<]\\s*[_$[:alpha:]][_$[:alnum:]]*\\s+extends\\s*[^=>]                                                              # < typeparam extends\n) |\n# arrow function possible to detect only with => on same line\n(\n  (<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?                                                                                 # typeparameters\n  \\(\\s*(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*(([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\.\\.\\.\\s*[_$[:alpha:]]))([^()\\'\\\"\\`]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\'([^\\'\\\\]|\\\\.)*\\')|(\\\"([^\\\"\\\\]|\\\\.)*\\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))*)?\\)   # parameters\n  (\\s*:\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+)?                                                                        # return type\n  \\s*=>                                                                                               # arrow operator\n)\n  ))\n)) |\n# typeannotation is fn type: < | () | (... | (param: | (param, | (param? | (param= | (param) =>\n(:\\s*(\n  (<) |\n  ([(]\\s*(\n    ([)]) |\n    (\\.\\.\\.) |\n    ([_$[:alnum:]]+\\s*(\n      ([:,?=])|\n      ([)]\\s*=>)\n    ))\n  ))\n)) |\n(:\\s*(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))Function(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))) |\n(:\\s*((<\\s*$)|([\\(]\\s*((([\\{\\[]\\s*)?$)|((\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})\\s*((:\\s*\\{?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))|((\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])\\s*((:\\s*\\[?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*))))))) |\n(:\\s*(=>|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(<[^<>]*>)|[^<>(),=])+=\\s*(\n  ((async\\s+)?(\n    (function\\s*[(<*]) |\n    (function\\s+) |\n    ([_$[:alpha:]][_$[:alnum:]]*\\s*=>)\n  )) |\n  ((async\\s*)?(\n    ((<\\s*$)|([\\(]\\s*((([\\{\\[]\\s*)?$)|((\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})\\s*((:\\s*\\{?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))|((\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])\\s*((:\\s*\\[?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))))) |\n    # sure shot arrow functions even if => is on new line\n(\n  (<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?\n  [(]\\s*(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*\n  (\n    ([)]\\s*:) |                                                                                       # ():\n    ((\\.\\.\\.\\s*)?[_$[:alpha:]][_$[:alnum:]]*\\s*:)                                                                  # [(]param: | [(]...param:\n  )\n) |\n(\n  [<]\\s*[_$[:alpha:]][_$[:alnum:]]*\\s+extends\\s*[^=>]                                                              # < typeparam extends\n) |\n# arrow function possible to detect only with => on same line\n(\n  (<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?                                                                                 # typeparameters\n  \\(\\s*(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*(([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\.\\.\\.\\s*[_$[:alpha:]]))([^()\\'\\\"\\`]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\'([^\\'\\\\]|\\\\.)*\\')|(\\\"([^\\\"\\\\]|\\\\.)*\\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))*)?\\)   # parameters\n  (\\s*:\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+)?                                                                        # return type\n  \\s*=>                                                                                               # arrow operator\n)\n  ))\n)))",
          captures: {
            "1": { name: "storage.modifier.js.jsx" },
            "2": { name: "keyword.operator.rest.js.jsx" },
            "3": {
              name: "entity.name.function.js.jsx variable.language.this.js.jsx",
            },
            "4": { name: "entity.name.function.js.jsx" },
            "5": { name: "keyword.operator.optional.js.jsx" },
          },
        },
        {
          match:
            "(?x)(?:(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(override|public|private|protected|readonly)\\s+)?(?:(\\.\\.\\.)\\s*)?(?<!=|:)(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(this)|([_$[:alpha:]][_$[:alnum:]]*))(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))\\s*(\\??)",
          captures: {
            "1": { name: "storage.modifier.js.jsx" },
            "2": { name: "keyword.operator.rest.js.jsx" },
            "3": {
              name: "variable.parameter.js.jsx variable.language.this.js.jsx",
            },
            "4": { name: "variable.parameter.js.jsx" },
            "5": { name: "keyword.operator.optional.js.jsx" },
          },
        },
      ],
    },
    "destructuring-parameter": {
      patterns: [
        {
          name: "meta.parameter.object-binding-pattern.js.jsx",
          begin: "(?<!=|:)\\s*(?:(\\.\\.\\.)\\s*)?(\\{)",
          beginCaptures: {
            "1": { name: "keyword.operator.rest.js.jsx" },
            "2": {
              name: "punctuation.definition.binding-pattern.object.js.jsx",
            },
          },
          end: "\\}",
          endCaptures: {
            "0": {
              name: "punctuation.definition.binding-pattern.object.js.jsx",
            },
          },
          patterns: [{ include: "#parameter-object-binding-element" }],
        },
        {
          name: "meta.paramter.array-binding-pattern.js.jsx",
          begin: "(?<!=|:)\\s*(?:(\\.\\.\\.)\\s*)?(\\[)",
          beginCaptures: {
            "1": { name: "keyword.operator.rest.js.jsx" },
            "2": {
              name: "punctuation.definition.binding-pattern.array.js.jsx",
            },
          },
          end: "\\]",
          endCaptures: {
            "0": {
              name: "punctuation.definition.binding-pattern.array.js.jsx",
            },
          },
          patterns: [
            { include: "#parameter-binding-element" },
            { include: "#punctuation-comma" },
          ],
        },
      ],
    },
    "parameter-object-binding-element": {
      patterns: [
        { include: "#comment" },
        {
          begin:
            "(?x)(?=((\\b(?<!\\$)0(?:x|X)[0-9a-fA-F][0-9a-fA-F_]*(n)?\\b(?!\\$))|(\\b(?<!\\$)0(?:b|B)[01][01_]*(n)?\\b(?!\\$))|(\\b(?<!\\$)0(?:o|O)?[0-7][0-7_]*(n)?\\b(?!\\$))|((?<!\\$)(?:\n  (?:\\b[0-9][0-9_]*(\\.)[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)| # 1.1E+3\n  (?:\\b[0-9][0-9_]*(\\.)[eE][+-]?[0-9][0-9_]*(n)?\\b)|             # 1.E+3\n  (?:\\B(\\.)[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)|             # .1E+3\n  (?:\\b[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)|                 # 1E+3\n  (?:\\b[0-9][0-9_]*(\\.)[0-9][0-9_]*(n)?\\b)|                      # 1.1\n  (?:\\b[0-9][0-9_]*(\\.)(n)?\\B)|                                  # 1.\n  (?:\\B(\\.)[0-9][0-9_]*(n)?\\b)|                                  # .1\n  (?:\\b[0-9][0-9_]*(n)?\\b(?!\\.))                                 # 1\n)(?!\\$))|([_$[:alpha:]][_$[:alnum:]]*)|(\\'([^\\'\\\\]|\\\\.)*\\')|(\\\"([^\\\"\\\\]|\\\\.)*\\\")|(\\`([^\\`\\\\]|\\\\.)*\\`)|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])+\\]))\\s*(:))",
          end: "(?=,|\\})",
          patterns: [
            { include: "#object-binding-element-propertyName" },
            { include: "#parameter-binding-element" },
            { include: "#paren-expression" },
          ],
        },
        { include: "#parameter-object-binding-pattern" },
        { include: "#destructuring-parameter-rest" },
        { include: "#variable-initializer" },
        { include: "#punctuation-comma" },
      ],
    },
    "parameter-binding-element": {
      patterns: [
        { include: "#comment" },
        { include: "#string" },
        { include: "#numeric-literal" },
        { include: "#regex" },
        { include: "#parameter-object-binding-pattern" },
        { include: "#parameter-array-binding-pattern" },
        { include: "#destructuring-parameter-rest" },
        { include: "#variable-initializer" },
      ],
    },
    "destructuring-parameter-rest": {
      match: "(?:(\\.\\.\\.)\\s*)?([_$[:alpha:]][_$[:alnum:]]*)",
      captures: {
        "1": { name: "keyword.operator.rest.js.jsx" },
        "2": { name: "variable.parameter.js.jsx" },
      },
    },
    "parameter-object-binding-pattern": {
      begin: "(?:(\\.\\.\\.)\\s*)?(\\{)",
      beginCaptures: {
        "1": { name: "keyword.operator.rest.js.jsx" },
        "2": { name: "punctuation.definition.binding-pattern.object.js.jsx" },
      },
      end: "\\}",
      endCaptures: {
        "0": { name: "punctuation.definition.binding-pattern.object.js.jsx" },
      },
      patterns: [{ include: "#parameter-object-binding-element" }],
    },
    "parameter-array-binding-pattern": {
      begin: "(?:(\\.\\.\\.)\\s*)?(\\[)",
      beginCaptures: {
        "1": { name: "keyword.operator.rest.js.jsx" },
        "2": { name: "punctuation.definition.binding-pattern.array.js.jsx" },
      },
      end: "\\]",
      endCaptures: {
        "0": { name: "punctuation.definition.binding-pattern.array.js.jsx" },
      },
      patterns: [
        { include: "#parameter-binding-element" },
        { include: "#punctuation-comma" },
      ],
    },
    "field-declaration": {
      name: "meta.field.declaration.js.jsx",
      begin:
        "(?x)(?<!\\()(?:(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(readonly)\\s+)?(?=\\s*((\\b(?<!\\$)0(?:x|X)[0-9a-fA-F][0-9a-fA-F_]*(n)?\\b(?!\\$))|(\\b(?<!\\$)0(?:b|B)[01][01_]*(n)?\\b(?!\\$))|(\\b(?<!\\$)0(?:o|O)?[0-7][0-7_]*(n)?\\b(?!\\$))|((?<!\\$)(?:\n  (?:\\b[0-9][0-9_]*(\\.)[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)| # 1.1E+3\n  (?:\\b[0-9][0-9_]*(\\.)[eE][+-]?[0-9][0-9_]*(n)?\\b)|             # 1.E+3\n  (?:\\B(\\.)[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)|             # .1E+3\n  (?:\\b[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)|                 # 1E+3\n  (?:\\b[0-9][0-9_]*(\\.)[0-9][0-9_]*(n)?\\b)|                      # 1.1\n  (?:\\b[0-9][0-9_]*(\\.)(n)?\\B)|                                  # 1.\n  (?:\\B(\\.)[0-9][0-9_]*(n)?\\b)|                                  # .1\n  (?:\\b[0-9][0-9_]*(n)?\\b(?!\\.))                                 # 1\n)(?!\\$))|(\\#?[_$[:alpha:]][_$[:alnum:]]*)|(\\'([^\\'\\\\]|\\\\.)*\\')|(\\\"([^\\\"\\\\]|\\\\.)*\\\")|(\\`([^\\`\\\\]|\\\\.)*\\`)|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])+\\]))\\s*(?:(?:(\\?)|(\\!))\\s*)?(=|:|;|,|\\}|$))",
      beginCaptures: { "1": { name: "storage.modifier.js.jsx" } },
      end: "(?x)(?=\\}|;|,|$|(^(?!\\s*((\\b(?<!\\$)0(?:x|X)[0-9a-fA-F][0-9a-fA-F_]*(n)?\\b(?!\\$))|(\\b(?<!\\$)0(?:b|B)[01][01_]*(n)?\\b(?!\\$))|(\\b(?<!\\$)0(?:o|O)?[0-7][0-7_]*(n)?\\b(?!\\$))|((?<!\\$)(?:\n  (?:\\b[0-9][0-9_]*(\\.)[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)| # 1.1E+3\n  (?:\\b[0-9][0-9_]*(\\.)[eE][+-]?[0-9][0-9_]*(n)?\\b)|             # 1.E+3\n  (?:\\B(\\.)[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)|             # .1E+3\n  (?:\\b[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)|                 # 1E+3\n  (?:\\b[0-9][0-9_]*(\\.)[0-9][0-9_]*(n)?\\b)|                      # 1.1\n  (?:\\b[0-9][0-9_]*(\\.)(n)?\\B)|                                  # 1.\n  (?:\\B(\\.)[0-9][0-9_]*(n)?\\b)|                                  # .1\n  (?:\\b[0-9][0-9_]*(n)?\\b(?!\\.))                                 # 1\n)(?!\\$))|(\\#?[_$[:alpha:]][_$[:alnum:]]*)|(\\'([^\\'\\\\]|\\\\.)*\\')|(\\\"([^\\\"\\\\]|\\\\.)*\\\")|(\\`([^\\`\\\\]|\\\\.)*\\`)|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])+\\]))\\s*(?:(?:(\\?)|(\\!))\\s*)?(=|:|;|,|$))))|(?<=\\})",
      patterns: [
        { include: "#variable-initializer" },
        { include: "#type-annotation" },
        { include: "#string" },
        { include: "#array-literal" },
        { include: "#numeric-literal" },
        { include: "#comment" },
        {
          match:
            "(?x)(\\#?[_$[:alpha:]][_$[:alnum:]]*)(?:(\\?)|(\\!))?(?=\\s*\\s*\n# function assignment |\n(=\\s*(\n  ((async\\s+)?(\n    (function\\s*[(<*]) |\n    (function\\s+) |\n    ([_$[:alpha:]][_$[:alnum:]]*\\s*=>)\n  )) |\n  ((async\\s*)?(\n    ((<\\s*$)|([\\(]\\s*((([\\{\\[]\\s*)?$)|((\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})\\s*((:\\s*\\{?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))|((\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])\\s*((:\\s*\\[?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))))) |\n    # sure shot arrow functions even if => is on new line\n(\n  (<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?\n  [(]\\s*(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*\n  (\n    ([)]\\s*:) |                                                                                       # ():\n    ((\\.\\.\\.\\s*)?[_$[:alpha:]][_$[:alnum:]]*\\s*:)                                                                  # [(]param: | [(]...param:\n  )\n) |\n(\n  [<]\\s*[_$[:alpha:]][_$[:alnum:]]*\\s+extends\\s*[^=>]                                                              # < typeparam extends\n) |\n# arrow function possible to detect only with => on same line\n(\n  (<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?                                                                                 # typeparameters\n  \\(\\s*(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*(([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\.\\.\\.\\s*[_$[:alpha:]]))([^()\\'\\\"\\`]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\'([^\\'\\\\]|\\\\.)*\\')|(\\\"([^\\\"\\\\]|\\\\.)*\\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))*)?\\)   # parameters\n  (\\s*:\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+)?                                                                        # return type\n  \\s*=>                                                                                               # arrow operator\n)\n  ))\n)) |\n# typeannotation is fn type: < | () | (... | (param: | (param, | (param? | (param= | (param) =>\n(:\\s*(\n  (<) |\n  ([(]\\s*(\n    ([)]) |\n    (\\.\\.\\.) |\n    ([_$[:alnum:]]+\\s*(\n      ([:,?=])|\n      ([)]\\s*=>)\n    ))\n  ))\n)) |\n(:\\s*(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))Function(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))) |\n(:\\s*((<\\s*$)|([\\(]\\s*((([\\{\\[]\\s*)?$)|((\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})\\s*((:\\s*\\{?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))|((\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])\\s*((:\\s*\\[?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*))))))) |\n(:\\s*(=>|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(<[^<>]*>)|[^<>(),=])+=\\s*(\n  ((async\\s+)?(\n    (function\\s*[(<*]) |\n    (function\\s+) |\n    ([_$[:alpha:]][_$[:alnum:]]*\\s*=>)\n  )) |\n  ((async\\s*)?(\n    ((<\\s*$)|([\\(]\\s*((([\\{\\[]\\s*)?$)|((\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})\\s*((:\\s*\\{?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))|((\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])\\s*((:\\s*\\[?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))))) |\n    # sure shot arrow functions even if => is on new line\n(\n  (<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?\n  [(]\\s*(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*\n  (\n    ([)]\\s*:) |                                                                                       # ():\n    ((\\.\\.\\.\\s*)?[_$[:alpha:]][_$[:alnum:]]*\\s*:)                                                                  # [(]param: | [(]...param:\n  )\n) |\n(\n  [<]\\s*[_$[:alpha:]][_$[:alnum:]]*\\s+extends\\s*[^=>]                                                              # < typeparam extends\n) |\n# arrow function possible to detect only with => on same line\n(\n  (<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?                                                                                 # typeparameters\n  \\(\\s*(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*(([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\.\\.\\.\\s*[_$[:alpha:]]))([^()\\'\\\"\\`]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\'([^\\'\\\\]|\\\\.)*\\')|(\\\"([^\\\"\\\\]|\\\\.)*\\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))*)?\\)   # parameters\n  (\\s*:\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+)?                                                                        # return type\n  \\s*=>                                                                                               # arrow operator\n)\n  ))\n)))",
          captures: {
            "1": {
              name: "meta.definition.property.js.jsx entity.name.function.js.jsx",
            },
            "2": { name: "keyword.operator.optional.js.jsx" },
            "3": { name: "keyword.operator.definiteassignment.js.jsx" },
          },
        },
        {
          name: "meta.definition.property.js.jsx variable.object.property.js.jsx",
          match: "\\#?[_$[:alpha:]][_$[:alnum:]]*",
        },
        { name: "keyword.operator.optional.js.jsx", match: "\\?" },
        { name: "keyword.operator.definiteassignment.js.jsx", match: "\\!" },
      ],
    },
    "variable-initializer": {
      patterns: [
        {
          begin: "(?<!=|!)(=)(?!=)(?=\\s*\\S)(?!\\s*.*=>\\s*$)",
          beginCaptures: {
            "1": { name: "keyword.operator.assignment.js.jsx" },
          },
          end: "(?=$|^|[,);}\\]]|((?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(of|in)\\s+))",
          patterns: [{ include: "#expression" }],
        },
        {
          begin: "(?<!=|!)(=)(?!=)",
          beginCaptures: {
            "1": { name: "keyword.operator.assignment.js.jsx" },
          },
          end: "(?=[,);}\\]]|((?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(of|in)\\s+))|(?=^\\s*$)|(?<![\\|\\&\\+\\-\\*\\/])(?<=\\S)(?<!=)(?=\\s*$)",
          patterns: [{ include: "#expression" }],
        },
      ],
    },
    "function-declaration": {
      name: "meta.function.js.jsx",
      begin:
        "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(\\bexport)\\s+)?(?:(\\bdeclare)\\s+)?(?:(async)\\s+)?(function\\b)(?:\\s*(\\*))?(?:(?:\\s+|(?<=\\*))([_$[:alpha:]][_$[:alnum:]]*))?\\s*",
      beginCaptures: {
        "1": { name: "keyword.control.export.js.jsx" },
        "2": { name: "storage.modifier.js.jsx" },
        "3": { name: "storage.modifier.async.js.jsx" },
        "4": { name: "storage.type.function.js.jsx" },
        "5": { name: "keyword.generator.asterisk.js.jsx" },
        "6": {
          name: "meta.definition.function.js.jsx entity.name.function.js.jsx",
        },
      },
      end: "(?=;|^\\s*$|(?:^\\s*(?:abstract|async|(?:\\bawait\\s+(?:\\busing(?=\\s+(?!in\\b|of\\b(?!\\s*(?:of\\b|=)))[_$[:alpha:]])\\b)\\b)|break|case|catch|class|const|continue|declare|do|else|enum|export|finally|function|for|goto|if|import|interface|let|module|namespace|switch|return|throw|try|type|(?:\\busing(?=\\s+(?!in\\b|of\\b(?!\\s*(?:of\\b|=)))[_$[:alpha:]])\\b)|var|while)\\b))|(?<=\\})",
      patterns: [{ include: "#function-name" }, { include: "#function-body" }],
    },
    "function-expression": {
      name: "meta.function.expression.js.jsx",
      begin:
        "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(async)\\s+)?(function\\b)(?:\\s*(\\*))?(?:(?:\\s+|(?<=\\*))([_$[:alpha:]][_$[:alnum:]]*))?\\s*",
      beginCaptures: {
        "1": { name: "storage.modifier.async.js.jsx" },
        "2": { name: "storage.type.function.js.jsx" },
        "3": { name: "keyword.generator.asterisk.js.jsx" },
        "4": {
          name: "meta.definition.function.js.jsx entity.name.function.js.jsx",
        },
      },
      end: "(?=;)|(?<=\\})",
      patterns: [
        { include: "#function-name" },
        { include: "#single-line-comment-consuming-line-ending" },
        { include: "#function-body" },
      ],
    },
    "function-name": {
      name: "meta.definition.function.js.jsx entity.name.function.js.jsx",
      match: "[_$[:alpha:]][_$[:alnum:]]*",
    },
    "function-body": {
      patterns: [
        { include: "#comment" },
        { include: "#type-parameters" },
        { include: "#function-parameters" },
        { include: "#return-type" },
        { include: "#type-function-return-type" },
        { include: "#decl-block" },
        { name: "keyword.generator.asterisk.js.jsx", match: "\\*" },
      ],
    },
    "method-declaration": {
      patterns: [
        {
          name: "meta.method.declaration.js.jsx",
          begin:
            "(?x)(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:\\b(override)\\s+)?(?:\\b(public|private|protected)\\s+)?(?:\\b(abstract)\\s+)?(?:\\b(async)\\s+)?\\s*\\b(constructor)\\b(?!:)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))",
          beginCaptures: {
            "1": { name: "storage.modifier.js.jsx" },
            "2": { name: "storage.modifier.js.jsx" },
            "3": { name: "storage.modifier.js.jsx" },
            "4": { name: "storage.modifier.async.js.jsx" },
            "5": { name: "storage.type.js.jsx" },
          },
          end: "(?=\\}|;|,|$)|(?<=\\})",
          patterns: [
            { include: "#method-declaration-name" },
            { include: "#function-body" },
          ],
        },
        {
          name: "meta.method.declaration.js.jsx",
          begin:
            "(?x)(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:\\b(override)\\s+)?(?:\\b(public|private|protected)\\s+)?(?:\\b(abstract)\\s+)?(?:\\b(async)\\s+)?(?:(?:\\s*\\b(new)\\b(?!:)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.)))|(?:(\\*)\\s*)?)(?=\\s*((<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*))?[\\(])",
          beginCaptures: {
            "1": { name: "storage.modifier.js.jsx" },
            "2": { name: "storage.modifier.js.jsx" },
            "3": { name: "storage.modifier.js.jsx" },
            "4": { name: "storage.modifier.async.js.jsx" },
            "5": { name: "keyword.operator.new.js.jsx" },
            "6": { name: "keyword.generator.asterisk.js.jsx" },
          },
          end: "(?=\\}|;|,|$)|(?<=\\})",
          patterns: [
            { include: "#method-declaration-name" },
            { include: "#function-body" },
          ],
        },
        {
          name: "meta.method.declaration.js.jsx",
          begin:
            "(?x)(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:\\b(override)\\s+)?(?:\\b(public|private|protected)\\s+)?(?:\\b(abstract)\\s+)?(?:\\b(async)\\s+)?(?:\\b(get|set)\\s+)?(?:(\\*)\\s*)?(?=\\s*(((\\b(?<!\\$)0(?:x|X)[0-9a-fA-F][0-9a-fA-F_]*(n)?\\b(?!\\$))|(\\b(?<!\\$)0(?:b|B)[01][01_]*(n)?\\b(?!\\$))|(\\b(?<!\\$)0(?:o|O)?[0-7][0-7_]*(n)?\\b(?!\\$))|((?<!\\$)(?:\n  (?:\\b[0-9][0-9_]*(\\.)[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)| # 1.1E+3\n  (?:\\b[0-9][0-9_]*(\\.)[eE][+-]?[0-9][0-9_]*(n)?\\b)|             # 1.E+3\n  (?:\\B(\\.)[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)|             # .1E+3\n  (?:\\b[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)|                 # 1E+3\n  (?:\\b[0-9][0-9_]*(\\.)[0-9][0-9_]*(n)?\\b)|                      # 1.1\n  (?:\\b[0-9][0-9_]*(\\.)(n)?\\B)|                                  # 1.\n  (?:\\B(\\.)[0-9][0-9_]*(n)?\\b)|                                  # .1\n  (?:\\b[0-9][0-9_]*(n)?\\b(?!\\.))                                 # 1\n)(?!\\$))|([_$[:alpha:]][_$[:alnum:]]*)|(\\'([^\\'\\\\]|\\\\.)*\\')|(\\\"([^\\\"\\\\]|\\\\.)*\\\")|(\\`([^\\`\\\\]|\\\\.)*\\`)|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])+\\]))\\s*(\\??))\\s*((<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*))?[\\(])",
          beginCaptures: {
            "1": { name: "storage.modifier.js.jsx" },
            "2": { name: "storage.modifier.js.jsx" },
            "3": { name: "storage.modifier.js.jsx" },
            "4": { name: "storage.modifier.async.js.jsx" },
            "5": { name: "storage.type.property.js.jsx" },
            "6": { name: "keyword.generator.asterisk.js.jsx" },
          },
          end: "(?=\\}|;|,|$)|(?<=\\})",
          patterns: [
            { include: "#method-declaration-name" },
            { include: "#function-body" },
          ],
        },
      ],
    },
    "object-literal-method-declaration": {
      name: "meta.method.declaration.js.jsx",
      begin:
        "(?x)(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:\\b(async)\\s+)?(?:\\b(get|set)\\s+)?(?:(\\*)\\s*)?(?=\\s*(((\\b(?<!\\$)0(?:x|X)[0-9a-fA-F][0-9a-fA-F_]*(n)?\\b(?!\\$))|(\\b(?<!\\$)0(?:b|B)[01][01_]*(n)?\\b(?!\\$))|(\\b(?<!\\$)0(?:o|O)?[0-7][0-7_]*(n)?\\b(?!\\$))|((?<!\\$)(?:\n  (?:\\b[0-9][0-9_]*(\\.)[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)| # 1.1E+3\n  (?:\\b[0-9][0-9_]*(\\.)[eE][+-]?[0-9][0-9_]*(n)?\\b)|             # 1.E+3\n  (?:\\B(\\.)[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)|             # .1E+3\n  (?:\\b[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)|                 # 1E+3\n  (?:\\b[0-9][0-9_]*(\\.)[0-9][0-9_]*(n)?\\b)|                      # 1.1\n  (?:\\b[0-9][0-9_]*(\\.)(n)?\\B)|                                  # 1.\n  (?:\\B(\\.)[0-9][0-9_]*(n)?\\b)|                                  # .1\n  (?:\\b[0-9][0-9_]*(n)?\\b(?!\\.))                                 # 1\n)(?!\\$))|([_$[:alpha:]][_$[:alnum:]]*)|(\\'([^\\'\\\\]|\\\\.)*\\')|(\\\"([^\\\"\\\\]|\\\\.)*\\\")|(\\`([^\\`\\\\]|\\\\.)*\\`)|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])+\\]))\\s*(\\??))\\s*((<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*))?[\\(])",
      beginCaptures: {
        "1": { name: "storage.modifier.async.js.jsx" },
        "2": { name: "storage.type.property.js.jsx" },
        "3": { name: "keyword.generator.asterisk.js.jsx" },
      },
      end: "(?=\\}|;|,)|(?<=\\})",
      patterns: [
        { include: "#method-declaration-name" },
        { include: "#function-body" },
        {
          begin:
            "(?x)(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:\\b(async)\\s+)?(?:\\b(get|set)\\s+)?(?:(\\*)\\s*)?(?=\\s*(((\\b(?<!\\$)0(?:x|X)[0-9a-fA-F][0-9a-fA-F_]*(n)?\\b(?!\\$))|(\\b(?<!\\$)0(?:b|B)[01][01_]*(n)?\\b(?!\\$))|(\\b(?<!\\$)0(?:o|O)?[0-7][0-7_]*(n)?\\b(?!\\$))|((?<!\\$)(?:\n  (?:\\b[0-9][0-9_]*(\\.)[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)| # 1.1E+3\n  (?:\\b[0-9][0-9_]*(\\.)[eE][+-]?[0-9][0-9_]*(n)?\\b)|             # 1.E+3\n  (?:\\B(\\.)[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)|             # .1E+3\n  (?:\\b[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)|                 # 1E+3\n  (?:\\b[0-9][0-9_]*(\\.)[0-9][0-9_]*(n)?\\b)|                      # 1.1\n  (?:\\b[0-9][0-9_]*(\\.)(n)?\\B)|                                  # 1.\n  (?:\\B(\\.)[0-9][0-9_]*(n)?\\b)|                                  # .1\n  (?:\\b[0-9][0-9_]*(n)?\\b(?!\\.))                                 # 1\n)(?!\\$))|([_$[:alpha:]][_$[:alnum:]]*)|(\\'([^\\'\\\\]|\\\\.)*\\')|(\\\"([^\\\"\\\\]|\\\\.)*\\\")|(\\`([^\\`\\\\]|\\\\.)*\\`)|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])+\\]))\\s*(\\??))\\s*((<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*))?[\\(])",
          beginCaptures: {
            "1": { name: "storage.modifier.async.js.jsx" },
            "2": { name: "storage.type.property.js.jsx" },
            "3": { name: "keyword.generator.asterisk.js.jsx" },
          },
          end: "(?=\\(|\\<)",
          patterns: [{ include: "#method-declaration-name" }],
        },
      ],
    },
    "method-declaration-name": {
      begin:
        "(?x)(?=((\\b(?<!\\$)0(?:x|X)[0-9a-fA-F][0-9a-fA-F_]*(n)?\\b(?!\\$))|(\\b(?<!\\$)0(?:b|B)[01][01_]*(n)?\\b(?!\\$))|(\\b(?<!\\$)0(?:o|O)?[0-7][0-7_]*(n)?\\b(?!\\$))|((?<!\\$)(?:\n  (?:\\b[0-9][0-9_]*(\\.)[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)| # 1.1E+3\n  (?:\\b[0-9][0-9_]*(\\.)[eE][+-]?[0-9][0-9_]*(n)?\\b)|             # 1.E+3\n  (?:\\B(\\.)[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)|             # .1E+3\n  (?:\\b[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)|                 # 1E+3\n  (?:\\b[0-9][0-9_]*(\\.)[0-9][0-9_]*(n)?\\b)|                      # 1.1\n  (?:\\b[0-9][0-9_]*(\\.)(n)?\\B)|                                  # 1.\n  (?:\\B(\\.)[0-9][0-9_]*(n)?\\b)|                                  # .1\n  (?:\\b[0-9][0-9_]*(n)?\\b(?!\\.))                                 # 1\n)(?!\\$))|([_$[:alpha:]][_$[:alnum:]]*)|(\\'([^\\'\\\\]|\\\\.)*\\')|(\\\"([^\\\"\\\\]|\\\\.)*\\\")|(\\`([^\\`\\\\]|\\\\.)*\\`)|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])+\\]))\\s*(\\??)\\s*[\\(\\<])",
      end: "(?=\\(|\\<)",
      patterns: [
        { include: "#string" },
        { include: "#array-literal" },
        { include: "#numeric-literal" },
        {
          name: "meta.definition.method.js.jsx entity.name.function.js.jsx",
          match: "[_$[:alpha:]][_$[:alnum:]]*",
        },
        { name: "keyword.operator.optional.js.jsx", match: "\\?" },
      ],
    },
    "arrow-function": {
      patterns: [
        {
          name: "meta.arrow.js.jsx",
          match:
            "(?:(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(\\basync)\\s+)?([_$[:alpha:]][_$[:alnum:]]*)\\s*(?==>)",
          captures: {
            "1": { name: "storage.modifier.async.js.jsx" },
            "2": { name: "variable.parameter.js.jsx" },
          },
        },
        {
          name: "meta.arrow.js.jsx",
          begin:
            "(?x) (?:\n  (?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(\\basync)\n)? ((?<![})!\\]])\\s*\n  (?=\n    # sure shot arrow functions even if => is on new line\n(\n  (<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?\n  [(]\\s*(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*\n  (\n    ([)]\\s*:) |                                                                                       # ():\n    ((\\.\\.\\.\\s*)?[_$[:alpha:]][_$[:alnum:]]*\\s*:)                                                                  # [(]param: | [(]...param:\n  )\n) |\n(\n  [<]\\s*[_$[:alpha:]][_$[:alnum:]]*\\s+extends\\s*[^=>]                                                              # < typeparam extends\n) |\n# arrow function possible to detect only with => on same line\n(\n  (<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?                                                                                 # typeparameters\n  \\(\\s*(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*(([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\.\\.\\.\\s*[_$[:alpha:]]))([^()\\'\\\"\\`]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\'([^\\'\\\\]|\\\\.)*\\')|(\\\"([^\\\"\\\\]|\\\\.)*\\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))*)?\\)   # parameters\n  (\\s*:\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+)?                                                                        # return type\n  \\s*=>                                                                                               # arrow operator\n)\n  )\n)",
          beginCaptures: { "1": { name: "storage.modifier.async.js.jsx" } },
          end: "(?==>|\\{|(^\\s*(export|function|class|interface|let|var|(?:\\busing(?=\\s+(?!in\\b|of\\b(?!\\s*(?:of\\b|=)))[_$[:alpha:]])\\b)|(?:\\bawait\\s+(?:\\busing(?=\\s+(?!in\\b|of\\b(?!\\s*(?:of\\b|=)))[_$[:alpha:]])\\b)\\b)|const|import|enum|namespace|module|type|abstract|declare)\\s+))",
          patterns: [
            { include: "#comment" },
            { include: "#type-parameters" },
            { include: "#function-parameters" },
            { include: "#arrow-return-type" },
            { include: "#possibly-arrow-return-type" },
          ],
        },
        {
          name: "meta.arrow.js.jsx",
          begin: "=>",
          beginCaptures: {
            "0": { name: "storage.type.function.arrow.js.jsx" },
          },
          end: "((?<=\\}|\\S)(?<!=>)|((?!\\{)(?=\\S)))(?!\\/[\\/\\*])",
          patterns: [
            { include: "#single-line-comment-consuming-line-ending" },
            { include: "#decl-block" },
            { include: "#expression" },
          ],
        },
      ],
    },
    "indexer-declaration": {
      name: "meta.indexer.declaration.js.jsx",
      begin:
        "(?:(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(readonly)\\s*)?\\s*(\\[)\\s*([_$[:alpha:]][_$[:alnum:]]*)\\s*(?=:)",
      beginCaptures: {
        "1": { name: "storage.modifier.js.jsx" },
        "2": { name: "meta.brace.square.js.jsx" },
        "3": { name: "variable.parameter.js.jsx" },
      },
      end: "(\\])\\s*(\\?\\s*)?|$",
      endCaptures: {
        "1": { name: "meta.brace.square.js.jsx" },
        "2": { name: "keyword.operator.optional.js.jsx" },
      },
      patterns: [{ include: "#type-annotation" }],
    },
    "indexer-mapped-type-declaration": {
      name: "meta.indexer.mappedtype.declaration.js.jsx",
      begin:
        "(?:(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))([+-])?(readonly)\\s*)?\\s*(\\[)\\s*([_$[:alpha:]][_$[:alnum:]]*)\\s+(in)\\s+",
      beginCaptures: {
        "1": { name: "keyword.operator.type.modifier.js.jsx" },
        "2": { name: "storage.modifier.js.jsx" },
        "3": { name: "meta.brace.square.js.jsx" },
        "4": { name: "entity.name.type.js.jsx" },
        "5": { name: "keyword.operator.expression.in.js.jsx" },
      },
      end: "(\\])([+-])?\\s*(\\?\\s*)?|$",
      endCaptures: {
        "1": { name: "meta.brace.square.js.jsx" },
        "2": { name: "keyword.operator.type.modifier.js.jsx" },
        "3": { name: "keyword.operator.optional.js.jsx" },
      },
      patterns: [
        {
          match: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(as)\\s+",
          captures: { "1": { name: "keyword.control.as.js.jsx" } },
        },
        { include: "#type" },
      ],
    },
    "function-parameters": {
      name: "meta.parameters.js.jsx",
      begin: "\\(",
      beginCaptures: {
        "0": { name: "punctuation.definition.parameters.begin.js.jsx" },
      },
      end: "\\)",
      endCaptures: {
        "0": { name: "punctuation.definition.parameters.end.js.jsx" },
      },
      patterns: [{ include: "#function-parameters-body" }],
    },
    "function-parameters-body": {
      patterns: [
        { include: "#comment" },
        { include: "#string" },
        { include: "#decorator" },
        { include: "#destructuring-parameter" },
        { include: "#parameter-name" },
        { include: "#parameter-type-annotation" },
        { include: "#variable-initializer" },
        { name: "punctuation.separator.parameter.js.jsx", match: "," },
      ],
    },
    "class-declaration": {
      name: "meta.class.js.jsx",
      begin:
        "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(\\bexport)\\s+)?(?:(\\bdeclare)\\s+)?\\b(?:(abstract)\\s+)?\\b(class)\\b(?=\\s+|/[/*])",
      beginCaptures: {
        "1": { name: "keyword.control.export.js.jsx" },
        "2": { name: "storage.modifier.js.jsx" },
        "3": { name: "storage.modifier.js.jsx" },
        "4": { name: "storage.type.class.js.jsx" },
      },
      end: "(?<=\\})",
      patterns: [{ include: "#class-declaration-or-expression-patterns" }],
    },
    "class-expression": {
      name: "meta.class.js.jsx",
      begin:
        "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(abstract)\\s+)?(class)\\b(?=\\s+|[<{]|\\/[\\/*])",
      beginCaptures: {
        "1": { name: "storage.modifier.js.jsx" },
        "2": { name: "storage.type.class.js.jsx" },
      },
      end: "(?<=\\})",
      patterns: [{ include: "#class-declaration-or-expression-patterns" }],
    },
    "class-declaration-or-expression-patterns": {
      patterns: [
        { include: "#comment" },
        { include: "#class-or-interface-heritage" },
        {
          match: "[_$[:alpha:]][_$[:alnum:]]*",
          captures: { "0": { name: "entity.name.type.class.js.jsx" } },
        },
        { include: "#type-parameters" },
        { include: "#class-or-interface-body" },
      ],
    },
    "interface-declaration": {
      name: "meta.interface.js.jsx",
      begin:
        "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(\\bexport)\\s+)?(?:(\\bdeclare)\\s+)?\\b(?:(abstract)\\s+)?\\b(interface)\\b(?=\\s+|/[/*])",
      beginCaptures: {
        "1": { name: "keyword.control.export.js.jsx" },
        "2": { name: "storage.modifier.js.jsx" },
        "3": { name: "storage.modifier.js.jsx" },
        "4": { name: "storage.type.interface.js.jsx" },
      },
      end: "(?<=\\})",
      patterns: [
        { include: "#comment" },
        { include: "#class-or-interface-heritage" },
        {
          match: "[_$[:alpha:]][_$[:alnum:]]*",
          captures: { "0": { name: "entity.name.type.interface.js.jsx" } },
        },
        { include: "#type-parameters" },
        { include: "#class-or-interface-body" },
      ],
    },
    "class-or-interface-heritage": {
      begin:
        "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:\\b(extends|implements)\\b)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))",
      beginCaptures: { "1": { name: "storage.modifier.js.jsx" } },
      end: "(?=\\{)",
      patterns: [
        { include: "#comment" },
        { include: "#class-or-interface-heritage" },
        { include: "#type-parameters" },
        { include: "#expressionWithoutIdentifiers" },
        {
          match:
            "([_$[:alpha:]][_$[:alnum:]]*)\\s*(?:(\\.)|(\\?\\.(?!\\s*[[:digit:]])))(?=\\s*[_$[:alpha:]][_$[:alnum:]]*(\\s*\\??\\.\\s*[_$[:alpha:]][_$[:alnum:]]*)*\\s*)",
          captures: {
            "1": { name: "entity.name.type.module.js.jsx" },
            "2": { name: "punctuation.accessor.js.jsx" },
            "3": { name: "punctuation.accessor.optional.js.jsx" },
          },
        },
        {
          match: "([_$[:alpha:]][_$[:alnum:]]*)",
          captures: { "1": { name: "entity.other.inherited-class.js.jsx" } },
        },
        { include: "#expressionPunctuations" },
      ],
    },
    "class-or-interface-body": {
      begin: "\\{",
      beginCaptures: { "0": { name: "punctuation.definition.block.js.jsx" } },
      end: "\\}",
      endCaptures: { "0": { name: "punctuation.definition.block.js.jsx" } },
      patterns: [
        { include: "#comment" },
        { include: "#decorator" },
        {
          begin: "(?<=:)\\s*",
          end: "(?=\\s|[;),}\\]:\\-\\+]|;|^\\s*$|(?:^\\s*(?:abstract|async|(?:\\bawait\\s+(?:\\busing(?=\\s+(?!in\\b|of\\b(?!\\s*(?:of\\b|=)))[_$[:alpha:]])\\b)\\b)|break|case|catch|class|const|continue|declare|do|else|enum|export|finally|function|for|goto|if|import|interface|let|module|namespace|switch|return|throw|try|type|(?:\\busing(?=\\s+(?!in\\b|of\\b(?!\\s*(?:of\\b|=)))[_$[:alpha:]])\\b)|var|while)\\b))",
          patterns: [{ include: "#expression" }],
        },
        { include: "#method-declaration" },
        { include: "#indexer-declaration" },
        { include: "#field-declaration" },
        { include: "#string" },
        { include: "#type-annotation" },
        { include: "#variable-initializer" },
        { include: "#access-modifier" },
        { include: "#property-accessor" },
        { include: "#async-modifier" },
        { include: "#after-operator-block-as-object-literal" },
        { include: "#decl-block" },
        { include: "#expression" },
        { include: "#punctuation-comma" },
        { include: "#punctuation-semicolon" },
      ],
    },
    "access-modifier": {
      name: "storage.modifier.js.jsx",
      match:
        "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(abstract|declare|override|public|protected|private|readonly|static)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))",
    },
    "property-accessor": {
      name: "storage.type.property.js.jsx",
      match:
        "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(accessor|get|set)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))",
    },
    "async-modifier": {
      name: "storage.modifier.async.js.jsx",
      match:
        "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(async)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))",
    },
    "enum-declaration": {
      name: "meta.enum.declaration.js.jsx",
      begin:
        "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(\\bexport)\\s+)?(?:(\\bdeclare)\\s+)?(?:\\b(const)\\s+)?\\b(enum)\\s+([_$[:alpha:]][_$[:alnum:]]*)",
      beginCaptures: {
        "1": { name: "keyword.control.export.js.jsx" },
        "2": { name: "storage.modifier.js.jsx" },
        "3": { name: "storage.modifier.js.jsx" },
        "4": { name: "storage.type.enum.js.jsx" },
        "5": { name: "entity.name.type.enum.js.jsx" },
      },
      end: "(?<=\\})",
      patterns: [
        { include: "#comment" },
        {
          begin: "\\{",
          beginCaptures: {
            "0": { name: "punctuation.definition.block.js.jsx" },
          },
          end: "\\}",
          endCaptures: { "0": { name: "punctuation.definition.block.js.jsx" } },
          patterns: [
            { include: "#comment" },
            {
              begin: "([_$[:alpha:]][_$[:alnum:]]*)",
              beginCaptures: {
                "0": { name: "variable.other.enummember.js.jsx" },
              },
              end: "(?=,|\\}|$)",
              patterns: [
                { include: "#comment" },
                { include: "#variable-initializer" },
              ],
            },
            {
              begin:
                "(?=((\\'([^\\'\\\\]|\\\\.)*\\')|(\\\"([^\\\"\\\\]|\\\\.)*\\\")|(\\`([^\\`\\\\]|\\\\.)*\\`)|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])+\\])))",
              end: "(?=,|\\}|$)",
              patterns: [
                { include: "#string" },
                { include: "#array-literal" },
                { include: "#comment" },
                { include: "#variable-initializer" },
              ],
            },
            { include: "#punctuation-comma" },
          ],
        },
      ],
    },
    "namespace-declaration": {
      name: "meta.namespace.declaration.js.jsx",
      begin:
        "(?:(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(\\bexport)\\s+)?(?:(\\bdeclare)\\s+)?\\b(namespace|module)\\s+(?=[_$[:alpha:]\"'`]))",
      beginCaptures: {
        "1": { name: "keyword.control.export.js.jsx" },
        "2": { name: "storage.modifier.js.jsx" },
        "3": { name: "storage.type.namespace.js.jsx" },
      },
      end: "(?<=\\})|(?=;|^\\s*$|(?:^\\s*(?:abstract|async|(?:\\bawait\\s+(?:\\busing(?=\\s+(?!in\\b|of\\b(?!\\s*(?:of\\b|=)))[_$[:alpha:]])\\b)\\b)|break|case|catch|class|const|continue|declare|do|else|enum|export|finally|function|for|goto|if|import|interface|let|module|namespace|switch|return|throw|try|type|(?:\\busing(?=\\s+(?!in\\b|of\\b(?!\\s*(?:of\\b|=)))[_$[:alpha:]])\\b)|var|while)\\b))",
      patterns: [
        { include: "#comment" },
        { include: "#string" },
        {
          name: "entity.name.type.module.js.jsx",
          match: "([_$[:alpha:]][_$[:alnum:]]*)",
        },
        { include: "#punctuation-accessor" },
        { include: "#decl-block" },
      ],
    },
    "type-alias-declaration": {
      name: "meta.type.declaration.js.jsx",
      begin:
        "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(\\bexport)\\s+)?(?:(\\bdeclare)\\s+)?\\b(type)\\b\\s+([_$[:alpha:]][_$[:alnum:]]*)\\s*",
      beginCaptures: {
        "1": { name: "keyword.control.export.js.jsx" },
        "2": { name: "storage.modifier.js.jsx" },
        "3": { name: "storage.type.type.js.jsx" },
        "4": { name: "entity.name.type.alias.js.jsx" },
      },
      end: "(?=\\}|;|^\\s*$|(?:^\\s*(?:abstract|async|(?:\\bawait\\s+(?:\\busing(?=\\s+(?!in\\b|of\\b(?!\\s*(?:of\\b|=)))[_$[:alpha:]])\\b)\\b)|break|case|catch|class|const|continue|declare|do|else|enum|export|finally|function|for|goto|if|import|interface|let|module|namespace|switch|return|throw|try|type|(?:\\busing(?=\\s+(?!in\\b|of\\b(?!\\s*(?:of\\b|=)))[_$[:alpha:]])\\b)|var|while)\\b))",
      patterns: [
        { include: "#comment" },
        { include: "#type-parameters" },
        {
          begin: "(=)\\s*(intrinsic)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))",
          beginCaptures: {
            "1": { name: "keyword.operator.assignment.js.jsx" },
            "2": { name: "keyword.control.intrinsic.js.jsx" },
          },
          end: "(?=\\}|;|^\\s*$|(?:^\\s*(?:abstract|async|(?:\\bawait\\s+(?:\\busing(?=\\s+(?!in\\b|of\\b(?!\\s*(?:of\\b|=)))[_$[:alpha:]])\\b)\\b)|break|case|catch|class|const|continue|declare|do|else|enum|export|finally|function|for|goto|if|import|interface|let|module|namespace|switch|return|throw|try|type|(?:\\busing(?=\\s+(?!in\\b|of\\b(?!\\s*(?:of\\b|=)))[_$[:alpha:]])\\b)|var|while)\\b))",
          patterns: [{ include: "#type" }],
        },
        {
          begin: "(=)\\s*",
          beginCaptures: {
            "1": { name: "keyword.operator.assignment.js.jsx" },
          },
          end: "(?=\\}|;|^\\s*$|(?:^\\s*(?:abstract|async|(?:\\bawait\\s+(?:\\busing(?=\\s+(?!in\\b|of\\b(?!\\s*(?:of\\b|=)))[_$[:alpha:]])\\b)\\b)|break|case|catch|class|const|continue|declare|do|else|enum|export|finally|function|for|goto|if|import|interface|let|module|namespace|switch|return|throw|try|type|(?:\\busing(?=\\s+(?!in\\b|of\\b(?!\\s*(?:of\\b|=)))[_$[:alpha:]])\\b)|var|while)\\b))",
          patterns: [{ include: "#type" }],
        },
      ],
    },
    "import-equals-declaration": {
      patterns: [
        {
          name: "meta.import-equals.external.js.jsx",
          begin:
            "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(\\bexport)\\s+)?(?:(\\bdeclare)\\s+)?\\b(import)(?:\\s+(type))?\\s+([_$[:alpha:]][_$[:alnum:]]*)\\s*(=)\\s*(require)\\s*(\\()",
          beginCaptures: {
            "1": { name: "keyword.control.export.js.jsx" },
            "2": { name: "storage.modifier.js.jsx" },
            "3": { name: "keyword.control.import.js.jsx" },
            "4": { name: "keyword.control.type.js.jsx" },
            "5": { name: "variable.other.readwrite.alias.js.jsx" },
            "6": { name: "keyword.operator.assignment.js.jsx" },
            "7": { name: "keyword.control.require.js.jsx" },
            "8": { name: "meta.brace.round.js.jsx" },
          },
          end: "\\)",
          endCaptures: { "0": { name: "meta.brace.round.js.jsx" } },
          patterns: [{ include: "#comment" }, { include: "#string" }],
        },
        {
          name: "meta.import-equals.internal.js.jsx",
          begin:
            "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(\\bexport)\\s+)?(?:(\\bdeclare)\\s+)?\\b(import)(?:\\s+(type))?\\s+([_$[:alpha:]][_$[:alnum:]]*)\\s*(=)\\s*(?!require\\b)",
          beginCaptures: {
            "1": { name: "keyword.control.export.js.jsx" },
            "2": { name: "storage.modifier.js.jsx" },
            "3": { name: "keyword.control.import.js.jsx" },
            "4": { name: "keyword.control.type.js.jsx" },
            "5": { name: "variable.other.readwrite.alias.js.jsx" },
            "6": { name: "keyword.operator.assignment.js.jsx" },
          },
          end: "(?=;|$|^)",
          patterns: [
            { include: "#single-line-comment-consuming-line-ending" },
            { include: "#comment" },
            {
              match:
                "([_$[:alpha:]][_$[:alnum:]]*)\\s*(?:(\\.)|(\\?\\.(?!\\s*[[:digit:]])))",
              captures: {
                "1": { name: "entity.name.type.module.js.jsx" },
                "2": { name: "punctuation.accessor.js.jsx" },
                "3": { name: "punctuation.accessor.optional.js.jsx" },
              },
            },
            {
              name: "variable.other.readwrite.js.jsx",
              match: "([_$[:alpha:]][_$[:alnum:]]*)",
            },
          ],
        },
      ],
    },
    "import-declaration": {
      name: "meta.import.js.jsx",
      begin:
        "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(\\bexport)\\s+)?(?:(\\bdeclare)\\s+)?\\b(import)(?:\\s+(type)(?!\\s+from))?(?!\\s*[:\\(])(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))",
      beginCaptures: {
        "1": { name: "keyword.control.export.js.jsx" },
        "2": { name: "storage.modifier.js.jsx" },
        "3": { name: "keyword.control.import.js.jsx" },
        "4": { name: "keyword.control.type.js.jsx" },
      },
      end: "(?<!^import|[^\\._$[:alnum:]]import)(?=;|$|^)",
      patterns: [
        { include: "#single-line-comment-consuming-line-ending" },
        { include: "#comment" },
        { include: "#string" },
        {
          begin: "(?<=^import|[^\\._$[:alnum:]]import)(?!\\s*[\"'])",
          end: "\\bfrom\\b",
          endCaptures: { "0": { name: "keyword.control.from.js.jsx" } },
          patterns: [{ include: "#import-export-declaration" }],
        },
        { include: "#import-export-declaration" },
      ],
    },
    "export-declaration": {
      patterns: [
        {
          match:
            "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(export)\\s+(as)\\s+(namespace)\\s+([_$[:alpha:]][_$[:alnum:]]*)",
          captures: {
            "1": { name: "keyword.control.export.js.jsx" },
            "2": { name: "keyword.control.as.js.jsx" },
            "3": { name: "storage.type.namespace.js.jsx" },
            "4": { name: "entity.name.type.module.js.jsx" },
          },
        },
        {
          name: "meta.export.default.js.jsx",
          begin:
            "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(export)(?:\\s+(type))?(?:(?:\\s*(=))|(?:\\s+(default)(?=\\s+)))",
          beginCaptures: {
            "1": { name: "keyword.control.export.js.jsx" },
            "2": { name: "keyword.control.type.js.jsx" },
            "3": { name: "keyword.operator.assignment.js.jsx" },
            "4": { name: "keyword.control.default.js.jsx" },
          },
          end: "(?=$|;|^\\s*$|(?:^\\s*(?:abstract|async|(?:\\bawait\\s+(?:\\busing(?=\\s+(?!in\\b|of\\b(?!\\s*(?:of\\b|=)))[_$[:alpha:]])\\b)\\b)|break|case|catch|class|const|continue|declare|do|else|enum|export|finally|function|for|goto|if|import|interface|let|module|namespace|switch|return|throw|try|type|(?:\\busing(?=\\s+(?!in\\b|of\\b(?!\\s*(?:of\\b|=)))[_$[:alpha:]])\\b)|var|while)\\b))",
          patterns: [
            { include: "#interface-declaration" },
            { include: "#expression" },
          ],
        },
        {
          name: "meta.export.js.jsx",
          begin:
            "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(export)(?:\\s+(type))?\\b(?!(\\$)|(\\s*:))((?=\\s*[\\{*])|((?=\\s*[_$[:alpha:]][_$[:alnum:]]*(\\s|,))(?!\\s*(?:abstract|async|(?:\\bawait\\s+(?:\\busing(?=\\s+(?!in\\b|of\\b(?!\\s*(?:of\\b|=)))[_$[:alpha:]])\\b)\\b)|break|case|catch|class|const|continue|declare|do|else|enum|export|finally|function|for|goto|if|import|interface|let|module|namespace|switch|return|throw|try|type|(?:\\busing(?=\\s+(?!in\\b|of\\b(?!\\s*(?:of\\b|=)))[_$[:alpha:]])\\b)|var|while)\\b)))",
          beginCaptures: {
            "1": { name: "keyword.control.export.js.jsx" },
            "2": { name: "keyword.control.type.js.jsx" },
          },
          end: "(?=$|;|^\\s*$|(?:^\\s*(?:abstract|async|(?:\\bawait\\s+(?:\\busing(?=\\s+(?!in\\b|of\\b(?!\\s*(?:of\\b|=)))[_$[:alpha:]])\\b)\\b)|break|case|catch|class|const|continue|declare|do|else|enum|export|finally|function|for|goto|if|import|interface|let|module|namespace|switch|return|throw|try|type|(?:\\busing(?=\\s+(?!in\\b|of\\b(?!\\s*(?:of\\b|=)))[_$[:alpha:]])\\b)|var|while)\\b))",
          patterns: [{ include: "#import-export-declaration" }],
        },
      ],
    },
    "import-export-declaration": {
      patterns: [
        { include: "#comment" },
        { include: "#string" },
        { include: "#import-export-block" },
        { name: "keyword.control.from.js.jsx", match: "\\bfrom\\b" },
        { include: "#import-export-assert-clause" },
        { include: "#import-export-clause" },
      ],
    },
    "import-export-assert-clause": {
      begin:
        "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(with)|(assert))\\s*(\\{)",
      beginCaptures: {
        "1": { name: "keyword.control.with.js.jsx" },
        "2": { name: "keyword.control.assert.js.jsx" },
        "3": { name: "punctuation.definition.block.js.jsx" },
      },
      end: "\\}",
      endCaptures: { "0": { name: "punctuation.definition.block.js.jsx" } },
      patterns: [
        { include: "#comment" },
        { include: "#string" },
        {
          name: "meta.property-name.js.jsx",
          match:
            "(?:[_$[:alpha:]][_$[:alnum:]]*)\\s*(?=(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*:)",
        },
        { name: "punctuation.separator.key-value.js.jsx", match: ":" },
      ],
    },
    "import-export-block": {
      name: "meta.block.js.jsx",
      begin: "\\{",
      beginCaptures: { "0": { name: "punctuation.definition.block.js.jsx" } },
      end: "\\}",
      endCaptures: { "0": { name: "punctuation.definition.block.js.jsx" } },
      patterns: [{ include: "#import-export-clause" }],
    },
    "import-export-clause": {
      patterns: [
        { include: "#comment" },
        {
          match:
            "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(?:(\\btype)\\s+)?(?:(\\bdefault)|(\\*)|(\\b[_$[:alpha:]][_$[:alnum:]]*)|((\\'([^\\'\\\\]|\\\\.)*\\')|(\\\"([^\\\"\\\\]|\\\\.)*\\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))))\\s+(as)\\s+(?:(default(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.)))|([_$[:alpha:]][_$[:alnum:]]*)|((\\'([^\\'\\\\]|\\\\.)*\\')|(\\\"([^\\\"\\\\]|\\\\.)*\\\")|(\\`([^\\`\\\\]|\\\\.)*\\`)))",
          captures: {
            "1": { name: "keyword.control.type.js.jsx" },
            "2": { name: "keyword.control.default.js.jsx" },
            "3": { name: "constant.language.import-export-all.js.jsx" },
            "4": { name: "variable.other.readwrite.js.jsx" },
            "5": { name: "string.quoted.alias.js.jsx" },
            "12": { name: "keyword.control.as.js.jsx" },
            "13": { name: "keyword.control.default.js.jsx" },
            "14": { name: "variable.other.readwrite.alias.js.jsx" },
            "15": { name: "string.quoted.alias.js.jsx" },
          },
        },
        { include: "#punctuation-comma" },
        { name: "constant.language.import-export-all.js.jsx", match: "\\*" },
        { name: "keyword.control.default.js.jsx", match: "\\b(default)\\b" },
        {
          match:
            "(?:(\\btype)\\s+)?(?:([_$[:alpha:]][_$[:alnum:]]*)|((\\'([^\\'\\\\]|\\\\.)*\\')|(\\\"([^\\\"\\\\]|\\\\.)*\\\")|(\\`([^\\`\\\\]|\\\\.)*\\`)))",
          captures: {
            "1": { name: "keyword.control.type.js.jsx" },
            "2": { name: "variable.other.readwrite.alias.js.jsx" },
            "3": { name: "string.quoted.alias.js.jsx" },
          },
        },
      ],
    },
    "switch-statement": {
      name: "switch-statement.expr.js.jsx",
      begin:
        "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?=\\bswitch\\s*\\()",
      end: "\\}",
      endCaptures: { "0": { name: "punctuation.definition.block.js.jsx" } },
      patterns: [
        { include: "#comment" },
        {
          name: "switch-expression.expr.js.jsx",
          begin:
            "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(switch)\\s*(\\()",
          beginCaptures: {
            "1": { name: "keyword.control.switch.js.jsx" },
            "2": { name: "meta.brace.round.js.jsx" },
          },
          end: "\\)",
          endCaptures: { "0": { name: "meta.brace.round.js.jsx" } },
          patterns: [{ include: "#expression" }],
        },
        {
          name: "switch-block.expr.js.jsx",
          begin: "\\{",
          beginCaptures: {
            "0": { name: "punctuation.definition.block.js.jsx" },
          },
          end: "(?=\\})",
          patterns: [
            {
              name: "case-clause.expr.js.jsx",
              begin:
                "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(case|default(?=:))(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))",
              beginCaptures: { "1": { name: "keyword.control.switch.js.jsx" } },
              end: "(?=:)",
              patterns: [{ include: "#expression" }],
            },
            {
              begin: "(:)\\s*(\\{)",
              beginCaptures: {
                "1": {
                  name: "case-clause.expr.js.jsx punctuation.definition.section.case-statement.js.jsx",
                },
                "2": {
                  name: "meta.block.js.jsx punctuation.definition.block.js.jsx",
                },
              },
              end: "\\}",
              endCaptures: {
                "0": {
                  name: "meta.block.js.jsx punctuation.definition.block.js.jsx",
                },
              },
              contentName: "meta.block.js.jsx",
              patterns: [{ include: "#statements" }],
            },
            {
              match: "(:)",
              captures: {
                "0": {
                  name: "case-clause.expr.js.jsx punctuation.definition.section.case-statement.js.jsx",
                },
              },
            },
            { include: "#statements" },
          ],
        },
      ],
    },
    "for-loop": {
      begin:
        "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))for(?=((\\s+|(\\s*\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*))await)?\\s*(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)?(\\())",
      beginCaptures: { "0": { name: "keyword.control.loop.js.jsx" } },
      end: "(?<=\\))",
      patterns: [
        { include: "#comment" },
        { name: "keyword.control.loop.js.jsx", match: "await" },
        {
          begin: "\\(",
          beginCaptures: { "0": { name: "meta.brace.round.js.jsx" } },
          end: "\\)",
          endCaptures: { "0": { name: "meta.brace.round.js.jsx" } },
          patterns: [
            { include: "#var-expr" },
            { include: "#expression" },
            { include: "#punctuation-semicolon" },
          ],
        },
      ],
    },
    "if-statement": {
      patterns: [
        {
          begin:
            "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?=\\bif\\s*(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))\\s*(?!\\{))",
          end: "(?=;|$|\\})",
          patterns: [
            { include: "#comment" },
            {
              begin:
                "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(if)\\s*(\\()",
              beginCaptures: {
                "1": { name: "keyword.control.conditional.js.jsx" },
                "2": { name: "meta.brace.round.js.jsx" },
              },
              end: "\\)",
              endCaptures: { "0": { name: "meta.brace.round.js.jsx" } },
              patterns: [{ include: "#expression" }],
            },
            {
              name: "string.regexp.js.jsx",
              begin:
                "(?<=\\))\\s*\\/(?![\\/*])(?=(?:[^\\/\\\\\\[]|\\\\.|\\[([^\\]\\\\]|\\\\.)*\\])+\\/([dgimsuvy]+|(?![\\/\\*])|(?=\\/\\*))(?!\\s*[a-zA-Z0-9_$]))",
              beginCaptures: {
                "0": { name: "punctuation.definition.string.begin.js.jsx" },
              },
              end: "(/)([dgimsuvy]*)",
              endCaptures: {
                "1": { name: "punctuation.definition.string.end.js.jsx" },
                "2": { name: "keyword.other.js.jsx" },
              },
              patterns: [{ include: "#regexp" }],
            },
            { include: "#statements" },
          ],
        },
      ],
    },
    "decl-block": {
      name: "meta.block.js.jsx",
      begin: "\\{",
      beginCaptures: { "0": { name: "punctuation.definition.block.js.jsx" } },
      end: "\\}",
      endCaptures: { "0": { name: "punctuation.definition.block.js.jsx" } },
      patterns: [{ include: "#statements" }],
    },
    "after-operator-block-as-object-literal": {
      name: "meta.objectliteral.js.jsx",
      begin:
        "(?<!\\+\\+|--)(?<=[:=(,\\[?+!>]|^await|[^\\._$[:alnum:]]await|^return|[^\\._$[:alnum:]]return|^yield|[^\\._$[:alnum:]]yield|^throw|[^\\._$[:alnum:]]throw|^in|[^\\._$[:alnum:]]in|^of|[^\\._$[:alnum:]]of|^typeof|[^\\._$[:alnum:]]typeof|&&|\\|\\||\\*)\\s*(\\{)",
      beginCaptures: { "1": { name: "punctuation.definition.block.js.jsx" } },
      end: "\\}",
      endCaptures: { "0": { name: "punctuation.definition.block.js.jsx" } },
      patterns: [{ include: "#object-member" }],
    },
    "object-literal": {
      name: "meta.objectliteral.js.jsx",
      begin: "\\{",
      beginCaptures: { "0": { name: "punctuation.definition.block.js.jsx" } },
      end: "\\}",
      endCaptures: { "0": { name: "punctuation.definition.block.js.jsx" } },
      patterns: [{ include: "#object-member" }],
    },
    "object-member": {
      patterns: [
        { include: "#comment" },
        { include: "#object-literal-method-declaration" },
        {
          name: "meta.object.member.js.jsx meta.object-literal.key.js.jsx",
          begin: "(?=\\[)",
          end: "(?=:)|((?<=[\\]])(?=\\s*[\\(\\<]))",
          patterns: [{ include: "#comment" }, { include: "#array-literal" }],
        },
        {
          name: "meta.object.member.js.jsx meta.object-literal.key.js.jsx",
          begin: "(?=[\\'\\\"\\`])",
          end: "(?=:)|((?<=[\\'\\\"\\`])(?=((\\s*[\\(\\<,}])|(\\s+(as|satisifies)\\s+))))",
          patterns: [{ include: "#comment" }, { include: "#string" }],
        },
        {
          name: "meta.object.member.js.jsx meta.object-literal.key.js.jsx",
          begin:
            "(?x)(?=(\\b(?<!\\$)0(?:x|X)[0-9a-fA-F][0-9a-fA-F_]*(n)?\\b(?!\\$))|(\\b(?<!\\$)0(?:b|B)[01][01_]*(n)?\\b(?!\\$))|(\\b(?<!\\$)0(?:o|O)?[0-7][0-7_]*(n)?\\b(?!\\$))|((?<!\\$)(?:\n  (?:\\b[0-9][0-9_]*(\\.)[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)| # 1.1E+3\n  (?:\\b[0-9][0-9_]*(\\.)[eE][+-]?[0-9][0-9_]*(n)?\\b)|             # 1.E+3\n  (?:\\B(\\.)[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)|             # .1E+3\n  (?:\\b[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)|                 # 1E+3\n  (?:\\b[0-9][0-9_]*(\\.)[0-9][0-9_]*(n)?\\b)|                      # 1.1\n  (?:\\b[0-9][0-9_]*(\\.)(n)?\\B)|                                  # 1.\n  (?:\\B(\\.)[0-9][0-9_]*(n)?\\b)|                                  # .1\n  (?:\\b[0-9][0-9_]*(n)?\\b(?!\\.))                                 # 1\n)(?!\\$)))",
          end: "(?=:)|(?=\\s*([\\(\\<,}])|(\\s+as|satisifies\\s+))",
          patterns: [{ include: "#comment" }, { include: "#numeric-literal" }],
        },
        {
          name: "meta.method.declaration.js.jsx",
          begin: "(?<=[\\]\\'\\\"\\`])(?=\\s*[\\(\\<])",
          end: "(?=\\}|;|,)|(?<=\\})",
          patterns: [{ include: "#function-body" }],
        },
        {
          name: "meta.object.member.js.jsx",
          match:
            "(?![_$[:alpha:]])([[:digit:]]+)\\s*(?=(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*:)",
          captures: {
            "0": { name: "meta.property-name.js.jsx" },
            "1": { name: "constant.numeric.decimal.js.jsx" },
          },
        },
        {
          name: "meta.object.member.js.jsx",
          match:
            "(?x)(?:([_$[:alpha:]][_$[:alnum:]]*)\\s*(?=(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*:(\\s*\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/)*\\s*(\n  ((async\\s+)?(\n    (function\\s*[(<*]) |\n    (function\\s+) |\n    ([_$[:alpha:]][_$[:alnum:]]*\\s*=>)\n  )) |\n  ((async\\s*)?(\n    ((<\\s*$)|([\\(]\\s*((([\\{\\[]\\s*)?$)|((\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})\\s*((:\\s*\\{?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))|((\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])\\s*((:\\s*\\[?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))))) |\n    # sure shot arrow functions even if => is on new line\n(\n  (<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?\n  [(]\\s*(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*\n  (\n    ([)]\\s*:) |                                                                                       # ():\n    ((\\.\\.\\.\\s*)?[_$[:alpha:]][_$[:alnum:]]*\\s*:)                                                                  # [(]param: | [(]...param:\n  )\n) |\n(\n  [<]\\s*[_$[:alpha:]][_$[:alnum:]]*\\s+extends\\s*[^=>]                                                              # < typeparam extends\n) |\n# arrow function possible to detect only with => on same line\n(\n  (<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?                                                                                 # typeparameters\n  \\(\\s*(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*(([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\.\\.\\.\\s*[_$[:alpha:]]))([^()\\'\\\"\\`]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\'([^\\'\\\\]|\\\\.)*\\')|(\\\"([^\\\"\\\\]|\\\\.)*\\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))*)?\\)   # parameters\n  (\\s*:\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+)?                                                                        # return type\n  \\s*=>                                                                                               # arrow operator\n)\n  ))\n)))",
          captures: {
            "0": { name: "meta.property-name.js.jsx" },
            "1": { name: "entity.name.function.js.jsx" },
          },
        },
        {
          name: "meta.object.member.js.jsx",
          match:
            "(?:[_$[:alpha:]][_$[:alnum:]]*)\\s*(?=(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*:)",
          captures: { "0": { name: "meta.property-name.js.jsx" } },
        },
        {
          name: "meta.object.member.js.jsx",
          begin: "\\.\\.\\.",
          beginCaptures: { "0": { name: "keyword.operator.spread.js.jsx" } },
          end: "(?=,|\\})",
          patterns: [{ include: "#expression" }],
        },
        {
          name: "meta.object.member.js.jsx",
          match: "([_$[:alpha:]][_$[:alnum:]]*)\\s*(?=,|\\}|$|\\/\\/|\\/\\*)",
          captures: { "1": { name: "variable.other.readwrite.js.jsx" } },
        },
        {
          name: "meta.object.member.js.jsx",
          match:
            "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(as)\\s+(const)(?=\\s*([,}]|$))",
          captures: {
            "1": { name: "keyword.control.as.js.jsx" },
            "2": { name: "storage.modifier.js.jsx" },
          },
        },
        {
          name: "meta.object.member.js.jsx",
          begin:
            "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(as)|(satisfies))\\s+",
          beginCaptures: {
            "1": { name: "keyword.control.as.js.jsx" },
            "2": { name: "keyword.control.satisfies.js.jsx" },
          },
          end: "(?=[;),}\\]:?\\-\\+\\>]|\\|\\||\\&\\&|\\!\\=\\=|$|^|((?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(as|satisifies)\\s+))",
          patterns: [{ include: "#type" }],
        },
        {
          name: "meta.object.member.js.jsx",
          begin: "(?=[_$[:alpha:]][_$[:alnum:]]*\\s*=)",
          end: "(?=,|\\}|$|\\/\\/|\\/\\*)",
          patterns: [{ include: "#expression" }],
        },
        {
          name: "meta.object.member.js.jsx",
          begin: ":",
          beginCaptures: {
            "0": {
              name: "meta.object-literal.key.js.jsx punctuation.separator.key-value.js.jsx",
            },
          },
          end: "(?=,|\\})",
          patterns: [
            {
              begin:
                "(?<=:)\\s*(async)?(?=\\s*(<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)\\(\\s*((([\\{\\[]\\s*)?$)|((\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})\\s*((:\\s*\\{?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))|((\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])\\s*((:\\s*\\[?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))))",
              beginCaptures: { "1": { name: "storage.modifier.async.js.jsx" } },
              end: "(?<=\\))",
              patterns: [
                { include: "#type-parameters" },
                {
                  begin: "\\(",
                  beginCaptures: { "0": { name: "meta.brace.round.js.jsx" } },
                  end: "\\)",
                  endCaptures: { "0": { name: "meta.brace.round.js.jsx" } },
                  patterns: [
                    { include: "#expression-inside-possibly-arrow-parens" },
                  ],
                },
              ],
            },
            {
              begin:
                "(?<=:)\\s*(async)?\\s*(\\()(?=\\s*((([\\{\\[]\\s*)?$)|((\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})\\s*((:\\s*\\{?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))|((\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])\\s*((:\\s*\\[?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))))",
              beginCaptures: {
                "1": { name: "storage.modifier.async.js.jsx" },
                "2": { name: "meta.brace.round.js.jsx" },
              },
              end: "\\)",
              endCaptures: { "0": { name: "meta.brace.round.js.jsx" } },
              patterns: [
                { include: "#expression-inside-possibly-arrow-parens" },
              ],
            },
            {
              begin: "(?<=:)\\s*(async)?\\s*(?=\\<\\s*$)",
              beginCaptures: { "1": { name: "storage.modifier.async.js.jsx" } },
              end: "(?<=\\>)",
              patterns: [{ include: "#type-parameters" }],
            },
            {
              begin:
                "(?<=\\>)\\s*(\\()(?=\\s*((([\\{\\[]\\s*)?$)|((\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})\\s*((:\\s*\\{?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))|((\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])\\s*((:\\s*\\[?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))))",
              beginCaptures: { "1": { name: "meta.brace.round.js.jsx" } },
              end: "\\)",
              endCaptures: { "0": { name: "meta.brace.round.js.jsx" } },
              patterns: [
                { include: "#expression-inside-possibly-arrow-parens" },
              ],
            },
            { include: "#possibly-arrow-return-type" },
            { include: "#expression" },
          ],
        },
        { include: "#punctuation-comma" },
        { include: "#decl-block" },
      ],
    },
    "ternary-expression": {
      begin: "(?!\\?\\.\\s*[^[:digit:]])(\\?)(?!\\?)",
      beginCaptures: { "1": { name: "keyword.operator.ternary.js.jsx" } },
      end: "\\s*(:)",
      endCaptures: { "1": { name: "keyword.operator.ternary.js.jsx" } },
      patterns: [{ include: "#expression" }],
    },
    "function-call": {
      patterns: [
        {
          begin:
            "(?=(((([_$[:alpha:]][_$[:alnum:]]*)(\\s*\\??\\.\\s*(\\#?[_$[:alpha:]][_$[:alnum:]]*))*)|(\\??\\.\\s*\\#?[_$[:alpha:]][_$[:alnum:]]*))|(?<=[\\)]))\\s*(?:(\\?\\.\\s*)|(\\!))?((<\\s*(((keyof|infer|typeof|readonly)\\s+)|(([_$[:alpha:]][_$[:alnum:]]*|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\'([^\\'\\\\]|\\\\.)*\\')|(\\\"([^\\\"\\\\]|\\\\.)*\\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))(?=\\s*([\\<\\>\\,\\.\\[]|=>|&(?!&)|\\|(?!\\|)))))([^<>\\(]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(?<==)\\>|\\<\\s*(((keyof|infer|typeof|readonly)\\s+)|(([_$[:alpha:]][_$[:alnum:]]*|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\'([^\\'\\\\]|\\\\.)*\\')|(\\\"([^\\\"\\\\]|\\\\.)*\\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))(?=\\s*([\\<\\>\\,\\.\\[]|=>|&(?!&)|\\|(?!\\|)))))(([^<>\\(]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(?<==)\\>|\\<\\s*(((keyof|infer|typeof|readonly)\\s+)|(([_$[:alpha:]][_$[:alnum:]]*|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\'([^\\'\\\\]|\\\\.)*\\')|(\\\"([^\\\"\\\\]|\\\\.)*\\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))(?=\\s*([\\<\\>\\,\\.\\[]|=>|&(?!&)|\\|(?!\\|)))))([^<>\\(]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(?<==)\\>)*(?<!=)\\>))*(?<!=)\\>)*(?<!=)>\\s*)?\\())",
          end: "(?<=\\))(?!(((([_$[:alpha:]][_$[:alnum:]]*)(\\s*\\??\\.\\s*(\\#?[_$[:alpha:]][_$[:alnum:]]*))*)|(\\??\\.\\s*\\#?[_$[:alpha:]][_$[:alnum:]]*))|(?<=[\\)]))\\s*(?:(\\?\\.\\s*)|(\\!))?((<\\s*(((keyof|infer|typeof|readonly)\\s+)|(([_$[:alpha:]][_$[:alnum:]]*|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\'([^\\'\\\\]|\\\\.)*\\')|(\\\"([^\\\"\\\\]|\\\\.)*\\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))(?=\\s*([\\<\\>\\,\\.\\[]|=>|&(?!&)|\\|(?!\\|)))))([^<>\\(]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(?<==)\\>|\\<\\s*(((keyof|infer|typeof|readonly)\\s+)|(([_$[:alpha:]][_$[:alnum:]]*|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\'([^\\'\\\\]|\\\\.)*\\')|(\\\"([^\\\"\\\\]|\\\\.)*\\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))(?=\\s*([\\<\\>\\,\\.\\[]|=>|&(?!&)|\\|(?!\\|)))))(([^<>\\(]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(?<==)\\>|\\<\\s*(((keyof|infer|typeof|readonly)\\s+)|(([_$[:alpha:]][_$[:alnum:]]*|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\'([^\\'\\\\]|\\\\.)*\\')|(\\\"([^\\\"\\\\]|\\\\.)*\\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))(?=\\s*([\\<\\>\\,\\.\\[]|=>|&(?!&)|\\|(?!\\|)))))([^<>\\(]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(?<==)\\>)*(?<!=)\\>))*(?<!=)\\>)*(?<!=)>\\s*)?\\())",
          patterns: [
            {
              name: "meta.function-call.js.jsx",
              begin:
                "(?=(([_$[:alpha:]][_$[:alnum:]]*)(\\s*\\??\\.\\s*(\\#?[_$[:alpha:]][_$[:alnum:]]*))*)|(\\??\\.\\s*\\#?[_$[:alpha:]][_$[:alnum:]]*))",
              end: "(?=\\s*(?:(\\?\\.\\s*)|(\\!))?((<\\s*(((keyof|infer|typeof|readonly)\\s+)|(([_$[:alpha:]][_$[:alnum:]]*|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\'([^\\'\\\\]|\\\\.)*\\')|(\\\"([^\\\"\\\\]|\\\\.)*\\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))(?=\\s*([\\<\\>\\,\\.\\[]|=>|&(?!&)|\\|(?!\\|)))))([^<>\\(]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(?<==)\\>|\\<\\s*(((keyof|infer|typeof|readonly)\\s+)|(([_$[:alpha:]][_$[:alnum:]]*|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\'([^\\'\\\\]|\\\\.)*\\')|(\\\"([^\\\"\\\\]|\\\\.)*\\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))(?=\\s*([\\<\\>\\,\\.\\[]|=>|&(?!&)|\\|(?!\\|)))))(([^<>\\(]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(?<==)\\>|\\<\\s*(((keyof|infer|typeof|readonly)\\s+)|(([_$[:alpha:]][_$[:alnum:]]*|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\'([^\\'\\\\]|\\\\.)*\\')|(\\\"([^\\\"\\\\]|\\\\.)*\\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))(?=\\s*([\\<\\>\\,\\.\\[]|=>|&(?!&)|\\|(?!\\|)))))([^<>\\(]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(?<==)\\>)*(?<!=)\\>))*(?<!=)\\>)*(?<!=)>\\s*)?\\())",
              patterns: [{ include: "#function-call-target" }],
            },
            { include: "#comment" },
            { include: "#function-call-optionals" },
            { include: "#type-arguments" },
            { include: "#paren-expression" },
          ],
        },
        {
          begin:
            "(?=(((([_$[:alpha:]][_$[:alnum:]]*)(\\s*\\??\\.\\s*(\\#?[_$[:alpha:]][_$[:alnum:]]*))*)|(\\??\\.\\s*\\#?[_$[:alpha:]][_$[:alnum:]]*))|(?<=[\\)]))(<\\s*[\\{\\[\\(]\\s*$))",
          end: "(?<=\\>)(?!(((([_$[:alpha:]][_$[:alnum:]]*)(\\s*\\??\\.\\s*(\\#?[_$[:alpha:]][_$[:alnum:]]*))*)|(\\??\\.\\s*\\#?[_$[:alpha:]][_$[:alnum:]]*))|(?<=[\\)]))(<\\s*[\\{\\[\\(]\\s*$))",
          patterns: [
            {
              name: "meta.function-call.js.jsx",
              begin:
                "(?=(([_$[:alpha:]][_$[:alnum:]]*)(\\s*\\??\\.\\s*(\\#?[_$[:alpha:]][_$[:alnum:]]*))*)|(\\??\\.\\s*\\#?[_$[:alpha:]][_$[:alnum:]]*))",
              end: "(?=(<\\s*[\\{\\[\\(]\\s*$))",
              patterns: [{ include: "#function-call-target" }],
            },
            { include: "#comment" },
            { include: "#function-call-optionals" },
            { include: "#type-arguments" },
          ],
        },
      ],
    },
    "function-call-target": {
      patterns: [
        { include: "#support-function-call-identifiers" },
        {
          name: "entity.name.function.js.jsx",
          match: "(\\#?[_$[:alpha:]][_$[:alnum:]]*)",
        },
      ],
    },
    "function-call-optionals": {
      patterns: [
        {
          name: "meta.function-call.js.jsx punctuation.accessor.optional.js.jsx",
          match: "\\?\\.",
        },
        {
          name: "meta.function-call.js.jsx keyword.operator.definiteassignment.js.jsx",
          match: "\\!",
        },
      ],
    },
    "support-function-call-identifiers": {
      patterns: [
        { include: "#literal" },
        { include: "#support-objects" },
        { include: "#object-identifiers" },
        { include: "#punctuation-accessor" },
        {
          name: "keyword.operator.expression.import.js.jsx",
          match:
            "(?:(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))import(?=\\s*[\\(]\\s*[\\\"\\'\\`]))",
        },
      ],
    },
    "new-expr": {
      name: "new.expr.js.jsx",
      begin:
        "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(new)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))",
      beginCaptures: { "1": { name: "keyword.operator.new.js.jsx" } },
      end: "(?<=\\))|(?=[;),}\\]:?\\-\\+\\>]|\\|\\||\\&\\&|\\!\\=\\=|$|((?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))new(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.)))|((?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))function((\\s+[_$[:alpha:]][_$[:alnum:]]*)|(\\s*[\\(]))))",
      patterns: [{ include: "#expression" }],
    },
    "instanceof-expr": {
      begin:
        "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(instanceof)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))",
      beginCaptures: {
        "1": { name: "keyword.operator.expression.instanceof.js.jsx" },
      },
      end: "(?<=\\))|(?=[;),}\\]:?\\-\\+\\>]|\\|\\||\\&\\&|\\!\\=\\=|$|(===|!==|==|!=)|(([\\&\\~\\^\\|]\\s*)?[_$[:alpha:]][_$[:alnum:]]*\\s+instanceof(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.)))|((?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))function((\\s+[_$[:alpha:]][_$[:alnum:]]*)|(\\s*[\\(]))))",
      patterns: [{ include: "#type" }],
    },
    "paren-expression-possibly-arrow": {
      patterns: [
        {
          begin:
            "(?<=[(=,])\\s*(async)?(?=\\s*((<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*))?\\(\\s*((([\\{\\[]\\s*)?$)|((\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})\\s*((:\\s*\\{?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))|((\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])\\s*((:\\s*\\[?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))))",
          beginCaptures: { "1": { name: "storage.modifier.async.js.jsx" } },
          end: "(?<=\\))",
          patterns: [
            { include: "#paren-expression-possibly-arrow-with-typeparameters" },
          ],
        },
        {
          begin:
            "(?<=[(=,]|=>|^return|[^\\._$[:alnum:]]return)\\s*(async)?(?=\\s*((((<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*))?\\()|(<)|((<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)))\\s*$)",
          beginCaptures: { "1": { name: "storage.modifier.async.js.jsx" } },
          end: "(?<=\\))",
          patterns: [
            { include: "#paren-expression-possibly-arrow-with-typeparameters" },
          ],
        },
        { include: "#possibly-arrow-return-type" },
      ],
    },
    "paren-expression-possibly-arrow-with-typeparameters": {
      patterns: [
        { include: "#type-parameters" },
        {
          begin: "\\(",
          beginCaptures: { "0": { name: "meta.brace.round.js.jsx" } },
          end: "\\)",
          endCaptures: { "0": { name: "meta.brace.round.js.jsx" } },
          patterns: [{ include: "#expression-inside-possibly-arrow-parens" }],
        },
      ],
    },
    "expression-inside-possibly-arrow-parens": {
      patterns: [
        { include: "#expressionWithoutIdentifiers" },
        { include: "#comment" },
        { include: "#string" },
        { include: "#decorator" },
        { include: "#destructuring-parameter" },
        {
          match:
            "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(override|public|protected|private|readonly)\\s+(?=(override|public|protected|private|readonly)\\s+)",
          captures: { "1": { name: "storage.modifier.js.jsx" } },
        },
        {
          match:
            "(?x)(?:(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(override|public|private|protected|readonly)\\s+)?(?:(\\.\\.\\.)\\s*)?(?<!=|:)(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(this)|([_$[:alpha:]][_$[:alnum:]]*))(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))\\s*(\\??)(?=\\s*\n# function assignment |\n(=\\s*(\n  ((async\\s+)?(\n    (function\\s*[(<*]) |\n    (function\\s+) |\n    ([_$[:alpha:]][_$[:alnum:]]*\\s*=>)\n  )) |\n  ((async\\s*)?(\n    ((<\\s*$)|([\\(]\\s*((([\\{\\[]\\s*)?$)|((\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})\\s*((:\\s*\\{?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))|((\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])\\s*((:\\s*\\[?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))))) |\n    # sure shot arrow functions even if => is on new line\n(\n  (<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?\n  [(]\\s*(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*\n  (\n    ([)]\\s*:) |                                                                                       # ():\n    ((\\.\\.\\.\\s*)?[_$[:alpha:]][_$[:alnum:]]*\\s*:)                                                                  # [(]param: | [(]...param:\n  )\n) |\n(\n  [<]\\s*[_$[:alpha:]][_$[:alnum:]]*\\s+extends\\s*[^=>]                                                              # < typeparam extends\n) |\n# arrow function possible to detect only with => on same line\n(\n  (<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?                                                                                 # typeparameters\n  \\(\\s*(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*(([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\.\\.\\.\\s*[_$[:alpha:]]))([^()\\'\\\"\\`]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\'([^\\'\\\\]|\\\\.)*\\')|(\\\"([^\\\"\\\\]|\\\\.)*\\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))*)?\\)   # parameters\n  (\\s*:\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+)?                                                                        # return type\n  \\s*=>                                                                                               # arrow operator\n)\n  ))\n)) |\n# typeannotation is fn type: < | () | (... | (param: | (param, | (param? | (param= | (param) =>\n(:\\s*(\n  (<) |\n  ([(]\\s*(\n    ([)]) |\n    (\\.\\.\\.) |\n    ([_$[:alnum:]]+\\s*(\n      ([:,?=])|\n      ([)]\\s*=>)\n    ))\n  ))\n)) |\n(:\\s*(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))Function(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))) |\n(:\\s*((<\\s*$)|([\\(]\\s*((([\\{\\[]\\s*)?$)|((\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})\\s*((:\\s*\\{?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))|((\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])\\s*((:\\s*\\[?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*))))))) |\n(:\\s*(=>|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(<[^<>]*>)|[^<>(),=])+=\\s*(\n  ((async\\s+)?(\n    (function\\s*[(<*]) |\n    (function\\s+) |\n    ([_$[:alpha:]][_$[:alnum:]]*\\s*=>)\n  )) |\n  ((async\\s*)?(\n    ((<\\s*$)|([\\(]\\s*((([\\{\\[]\\s*)?$)|((\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})\\s*((:\\s*\\{?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))|((\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])\\s*((:\\s*\\[?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))))) |\n    # sure shot arrow functions even if => is on new line\n(\n  (<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?\n  [(]\\s*(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*\n  (\n    ([)]\\s*:) |                                                                                       # ():\n    ((\\.\\.\\.\\s*)?[_$[:alpha:]][_$[:alnum:]]*\\s*:)                                                                  # [(]param: | [(]...param:\n  )\n) |\n(\n  [<]\\s*[_$[:alpha:]][_$[:alnum:]]*\\s+extends\\s*[^=>]                                                              # < typeparam extends\n) |\n# arrow function possible to detect only with => on same line\n(\n  (<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?                                                                                 # typeparameters\n  \\(\\s*(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*(([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\.\\.\\.\\s*[_$[:alpha:]]))([^()\\'\\\"\\`]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\'([^\\'\\\\]|\\\\.)*\\')|(\\\"([^\\\"\\\\]|\\\\.)*\\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))*)?\\)   # parameters\n  (\\s*:\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+)?                                                                        # return type\n  \\s*=>                                                                                               # arrow operator\n)\n  ))\n)))",
          captures: {
            "1": { name: "storage.modifier.js.jsx" },
            "2": { name: "keyword.operator.rest.js.jsx" },
            "3": {
              name: "entity.name.function.js.jsx variable.language.this.js.jsx",
            },
            "4": { name: "entity.name.function.js.jsx" },
            "5": { name: "keyword.operator.optional.js.jsx" },
          },
        },
        {
          match:
            "(?x)(?:(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(override|public|private|protected|readonly)\\s+)?(?:(\\.\\.\\.)\\s*)?(?<!=|:)(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(this)|([_$[:alpha:]][_$[:alnum:]]*))(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))\\s*(\\??)(?=\\s*[:,]|$)",
          captures: {
            "1": { name: "storage.modifier.js.jsx" },
            "2": { name: "keyword.operator.rest.js.jsx" },
            "3": {
              name: "variable.parameter.js.jsx variable.language.this.js.jsx",
            },
            "4": { name: "variable.parameter.js.jsx" },
            "5": { name: "keyword.operator.optional.js.jsx" },
          },
        },
        { include: "#type-annotation" },
        { include: "#variable-initializer" },
        { name: "punctuation.separator.parameter.js.jsx", match: "," },
        { include: "#identifiers" },
        { include: "#expressionPunctuations" },
      ],
    },
    "paren-expression": {
      begin: "\\(",
      beginCaptures: { "0": { name: "meta.brace.round.js.jsx" } },
      end: "\\)",
      endCaptures: { "0": { name: "meta.brace.round.js.jsx" } },
      patterns: [{ include: "#expression" }],
    },
    cast: { patterns: [{ include: "#jsx" }] },
    "expression-operators": {
      patterns: [
        {
          name: "keyword.control.flow.js.jsx",
          match:
            "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(await)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))",
        },
        {
          begin:
            "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(yield)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))(?=\\s*\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*\\*)",
          beginCaptures: { "1": { name: "keyword.control.flow.js.jsx" } },
          end: "\\*",
          endCaptures: { "0": { name: "keyword.generator.asterisk.js.jsx" } },
          patterns: [{ include: "#comment" }],
        },
        {
          match:
            "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(yield)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))(?:\\s*(\\*))?",
          captures: {
            "1": { name: "keyword.control.flow.js.jsx" },
            "2": { name: "keyword.generator.asterisk.js.jsx" },
          },
        },
        {
          name: "keyword.operator.expression.delete.js.jsx",
          match:
            "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))delete(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))",
        },
        {
          name: "keyword.operator.expression.in.js.jsx",
          match:
            "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))in(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))(?!\\()",
        },
        {
          name: "keyword.operator.expression.of.js.jsx",
          match:
            "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))of(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))(?!\\()",
        },
        {
          name: "keyword.operator.expression.instanceof.js.jsx",
          match:
            "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))instanceof(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))",
        },
        {
          name: "keyword.operator.new.js.jsx",
          match:
            "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))new(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))",
        },
        { include: "#typeof-operator" },
        {
          name: "keyword.operator.expression.void.js.jsx",
          match:
            "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))void(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))",
        },
        {
          match:
            "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(as)\\s+(const)(?=\\s*($|[;,:})\\]]))",
          captures: {
            "1": { name: "keyword.control.as.js.jsx" },
            "2": { name: "storage.modifier.js.jsx" },
          },
        },
        {
          begin:
            "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(as)|(satisfies))\\s+",
          beginCaptures: {
            "1": { name: "keyword.control.as.js.jsx" },
            "2": { name: "keyword.control.satisfies.js.jsx" },
          },
          end: "(?=^|[;),}\\]:?\\-\\+\\>]|\\|\\||\\&\\&|\\!\\=\\=|$|((?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(as|satisfies)\\s+)|(\\s+\\<))",
          patterns: [{ include: "#type" }],
        },
        { name: "keyword.operator.spread.js.jsx", match: "\\.\\.\\." },
        {
          name: "keyword.operator.assignment.compound.js.jsx",
          match: "\\*=|(?<!\\()/=|%=|\\+=|\\-=",
        },
        {
          name: "keyword.operator.assignment.compound.bitwise.js.jsx",
          match: "\\&=|\\^=|<<=|>>=|>>>=|\\|=",
        },
        { name: "keyword.operator.bitwise.shift.js.jsx", match: "<<|>>>|>>" },
        { name: "keyword.operator.comparison.js.jsx", match: "===|!==|==|!=" },
        { name: "keyword.operator.relational.js.jsx", match: "<=|>=|<>|<|>" },
        {
          match: "(?<=[_$[:alnum:]])(\\!)\\s*(?:(/=)|(?:(/)(?![/*])))",
          captures: {
            "1": { name: "keyword.operator.logical.js.jsx" },
            "2": { name: "keyword.operator.assignment.compound.js.jsx" },
            "3": { name: "keyword.operator.arithmetic.js.jsx" },
          },
        },
        {
          name: "keyword.operator.logical.js.jsx",
          match: "\\!|&&|\\|\\||\\?\\?",
        },
        { name: "keyword.operator.bitwise.js.jsx", match: "\\&|~|\\^|\\|" },
        { name: "keyword.operator.assignment.js.jsx", match: "\\=" },
        { name: "keyword.operator.decrement.js.jsx", match: "--" },
        { name: "keyword.operator.increment.js.jsx", match: "\\+\\+" },
        { name: "keyword.operator.arithmetic.js.jsx", match: "%|\\*|/|-|\\+" },
        {
          begin:
            "(?<=[_$[:alnum:])\\]])\\s*(?=(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)+(?:(/=)|(?:(/)(?![/*]))))",
          end: "(?:(/=)|(?:(/)(?!\\*([^\\*]|(\\*[^\\/]))*\\*\\/)))",
          endCaptures: {
            "1": { name: "keyword.operator.assignment.compound.js.jsx" },
            "2": { name: "keyword.operator.arithmetic.js.jsx" },
          },
          patterns: [{ include: "#comment" }],
        },
        {
          match: "(?<=[_$[:alnum:])\\]])\\s*(?:(/=)|(?:(/)(?![/*])))",
          captures: {
            "1": { name: "keyword.operator.assignment.compound.js.jsx" },
            "2": { name: "keyword.operator.arithmetic.js.jsx" },
          },
        },
      ],
    },
    "typeof-operator": {
      begin:
        "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))typeof(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))",
      beginCaptures: {
        "0": { name: "keyword.operator.expression.typeof.js.jsx" },
      },
      end: "(?=[,);}\\]=>:&|{\\?]|(extends\\s+)|$|;|^\\s*$|(?:^\\s*(?:abstract|async|(?:\\bawait\\s+(?:\\busing(?=\\s+(?!in\\b|of\\b(?!\\s*(?:of\\b|=)))[_$[:alpha:]])\\b)\\b)|break|case|catch|class|const|continue|declare|do|else|enum|export|finally|function|for|goto|if|import|interface|let|module|namespace|switch|return|throw|try|type|(?:\\busing(?=\\s+(?!in\\b|of\\b(?!\\s*(?:of\\b|=)))[_$[:alpha:]])\\b)|var|while)\\b))",
      patterns: [{ include: "#type-arguments" }, { include: "#expression" }],
    },
    literal: {
      patterns: [
        { include: "#numeric-literal" },
        { include: "#boolean-literal" },
        { include: "#null-literal" },
        { include: "#undefined-literal" },
        { include: "#numericConstant-literal" },
        { include: "#array-literal" },
        { include: "#this-literal" },
        { include: "#super-literal" },
      ],
    },
    "array-literal": {
      name: "meta.array.literal.js.jsx",
      begin: "\\s*(\\[)",
      beginCaptures: { "1": { name: "meta.brace.square.js.jsx" } },
      end: "\\]",
      endCaptures: { "0": { name: "meta.brace.square.js.jsx" } },
      patterns: [{ include: "#expression" }, { include: "#punctuation-comma" }],
    },
    "numeric-literal": {
      patterns: [
        {
          name: "constant.numeric.hex.js.jsx",
          match: "\\b(?<!\\$)0(?:x|X)[0-9a-fA-F][0-9a-fA-F_]*(n)?\\b(?!\\$)",
          captures: { "1": { name: "storage.type.numeric.bigint.js.jsx" } },
        },
        {
          name: "constant.numeric.binary.js.jsx",
          match: "\\b(?<!\\$)0(?:b|B)[01][01_]*(n)?\\b(?!\\$)",
          captures: { "1": { name: "storage.type.numeric.bigint.js.jsx" } },
        },
        {
          name: "constant.numeric.octal.js.jsx",
          match: "\\b(?<!\\$)0(?:o|O)?[0-7][0-7_]*(n)?\\b(?!\\$)",
          captures: { "1": { name: "storage.type.numeric.bigint.js.jsx" } },
        },
        {
          match:
            "(?x)\n(?<!\\$)(?:\n  (?:\\b[0-9][0-9_]*(\\.)[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)| # 1.1E+3\n  (?:\\b[0-9][0-9_]*(\\.)[eE][+-]?[0-9][0-9_]*(n)?\\b)|             # 1.E+3\n  (?:\\B(\\.)[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)|             # .1E+3\n  (?:\\b[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)|                 # 1E+3\n  (?:\\b[0-9][0-9_]*(\\.)[0-9][0-9_]*(n)?\\b)|                      # 1.1\n  (?:\\b[0-9][0-9_]*(\\.)(n)?\\B)|                                  # 1.\n  (?:\\B(\\.)[0-9][0-9_]*(n)?\\b)|                                  # .1\n  (?:\\b[0-9][0-9_]*(n)?\\b(?!\\.))                                 # 1\n)(?!\\$)",
          captures: {
            "0": { name: "constant.numeric.decimal.js.jsx" },
            "1": { name: "meta.delimiter.decimal.period.js.jsx" },
            "2": { name: "storage.type.numeric.bigint.js.jsx" },
            "3": { name: "meta.delimiter.decimal.period.js.jsx" },
            "4": { name: "storage.type.numeric.bigint.js.jsx" },
            "5": { name: "meta.delimiter.decimal.period.js.jsx" },
            "6": { name: "storage.type.numeric.bigint.js.jsx" },
            "7": { name: "storage.type.numeric.bigint.js.jsx" },
            "8": { name: "meta.delimiter.decimal.period.js.jsx" },
            "9": { name: "storage.type.numeric.bigint.js.jsx" },
            "10": { name: "meta.delimiter.decimal.period.js.jsx" },
            "11": { name: "storage.type.numeric.bigint.js.jsx" },
            "12": { name: "meta.delimiter.decimal.period.js.jsx" },
            "13": { name: "storage.type.numeric.bigint.js.jsx" },
            "14": { name: "storage.type.numeric.bigint.js.jsx" },
          },
        },
      ],
    },
    "boolean-literal": {
      patterns: [
        {
          name: "constant.language.boolean.true.js.jsx",
          match:
            "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))true(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))",
        },
        {
          name: "constant.language.boolean.false.js.jsx",
          match:
            "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))false(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))",
        },
      ],
    },
    "null-literal": {
      name: "constant.language.null.js.jsx",
      match:
        "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))null(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))",
    },
    "this-literal": {
      name: "variable.language.this.js.jsx",
      match: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))this\\b(?!\\$)",
    },
    "super-literal": {
      name: "variable.language.super.js.jsx",
      match: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))super\\b(?!\\$)",
    },
    "undefined-literal": {
      name: "constant.language.undefined.js.jsx",
      match:
        "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))undefined(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))",
    },
    "numericConstant-literal": {
      patterns: [
        {
          name: "constant.language.nan.js.jsx",
          match:
            "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))NaN(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))",
        },
        {
          name: "constant.language.infinity.js.jsx",
          match:
            "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))Infinity(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))",
        },
      ],
    },
    "support-objects": {
      patterns: [
        {
          name: "variable.language.arguments.js.jsx",
          match:
            "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(arguments)\\b(?!\\$)",
        },
        {
          name: "support.class.promise.js.jsx",
          match:
            "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(Promise)\\b(?!\\$)",
        },
        {
          match:
            "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(import)\\s*(?:(\\.)|(\\?\\.(?!\\s*[[:digit:]])))\\s*(meta)\\b(?!\\$)",
          captures: {
            "1": { name: "keyword.control.import.js.jsx" },
            "2": { name: "punctuation.accessor.js.jsx" },
            "3": { name: "punctuation.accessor.optional.js.jsx" },
            "4": { name: "support.variable.property.importmeta.js.jsx" },
          },
        },
        {
          match:
            "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(new)\\s*(?:(\\.)|(\\?\\.(?!\\s*[[:digit:]])))\\s*(target)\\b(?!\\$)",
          captures: {
            "1": { name: "keyword.operator.new.js.jsx" },
            "2": { name: "punctuation.accessor.js.jsx" },
            "3": { name: "punctuation.accessor.optional.js.jsx" },
            "4": { name: "support.variable.property.target.js.jsx" },
          },
        },
        {
          match:
            "(?x) (?:(\\.)|(\\?\\.(?!\\s*[[:digit:]]))) \\s* (?:\n  (?:(constructor|length|prototype|__proto__)\\b(?!\\$|\\s*(<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?\\())\n  |\n  (?:(EPSILON|MAX_SAFE_INTEGER|MAX_VALUE|MIN_SAFE_INTEGER|MIN_VALUE|NEGATIVE_INFINITY|POSITIVE_INFINITY)\\b(?!\\$)))",
          captures: {
            "1": { name: "punctuation.accessor.js.jsx" },
            "2": { name: "punctuation.accessor.optional.js.jsx" },
            "3": { name: "support.variable.property.js.jsx" },
            "4": { name: "support.constant.js.jsx" },
          },
        },
        {
          match:
            "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(exports)|(module)(?:(?:(\\.)|(\\?\\.(?!\\s*[[:digit:]])))(exports|id|filename|loaded|parent|children))?)\\b(?!\\$)",
          captures: {
            "1": { name: "support.type.object.module.js.jsx" },
            "2": { name: "support.type.object.module.js.jsx" },
            "3": { name: "punctuation.accessor.js.jsx" },
            "4": { name: "punctuation.accessor.optional.js.jsx" },
            "5": { name: "support.type.object.module.js.jsx" },
          },
        },
      ],
    },
    identifiers: {
      patterns: [
        { include: "#object-identifiers" },
        {
          match:
            "(?x)(?:(?:(\\.)|(\\?\\.(?!\\s*[[:digit:]])))\\s*)?([_$[:alpha:]][_$[:alnum:]]*)(?=\\s*=\\s*(\n  ((async\\s+)?(\n    (function\\s*[(<*]) |\n    (function\\s+) |\n    ([_$[:alpha:]][_$[:alnum:]]*\\s*=>)\n  )) |\n  ((async\\s*)?(\n    ((<\\s*$)|([\\(]\\s*((([\\{\\[]\\s*)?$)|((\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})\\s*((:\\s*\\{?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))|((\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])\\s*((:\\s*\\[?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))))) |\n    # sure shot arrow functions even if => is on new line\n(\n  (<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?\n  [(]\\s*(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*\n  (\n    ([)]\\s*:) |                                                                                       # ():\n    ((\\.\\.\\.\\s*)?[_$[:alpha:]][_$[:alnum:]]*\\s*:)                                                                  # [(]param: | [(]...param:\n  )\n) |\n(\n  [<]\\s*[_$[:alpha:]][_$[:alnum:]]*\\s+extends\\s*[^=>]                                                              # < typeparam extends\n) |\n# arrow function possible to detect only with => on same line\n(\n  (<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*(((const\\s+)?[_$[:alpha:]])|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?                                                                                 # typeparameters\n  \\(\\s*(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*(([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\.\\.\\.\\s*[_$[:alpha:]]))([^()\\'\\\"\\`]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\'([^\\'\\\\]|\\\\.)*\\')|(\\\"([^\\\"\\\\]|\\\\.)*\\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))*)?\\)   # parameters\n  (\\s*:\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+)?                                                                        # return type\n  \\s*=>                                                                                               # arrow operator\n)\n  ))\n))",
          captures: {
            "1": { name: "punctuation.accessor.js.jsx" },
            "2": { name: "punctuation.accessor.optional.js.jsx" },
            "3": { name: "entity.name.function.js.jsx" },
          },
        },
        {
          match:
            "(?:(\\.)|(\\?\\.(?!\\s*[[:digit:]])))\\s*(\\#?[[:upper:]][_$[:digit:][:upper:]]*)(?![_$[:alnum:]])",
          captures: {
            "1": { name: "punctuation.accessor.js.jsx" },
            "2": { name: "punctuation.accessor.optional.js.jsx" },
            "3": { name: "variable.other.constant.property.js.jsx" },
          },
        },
        {
          match:
            "(?:(\\.)|(\\?\\.(?!\\s*[[:digit:]])))\\s*(\\#?[_$[:alpha:]][_$[:alnum:]]*)",
          captures: {
            "1": { name: "punctuation.accessor.js.jsx" },
            "2": { name: "punctuation.accessor.optional.js.jsx" },
            "3": { name: "variable.other.property.js.jsx" },
          },
        },
        {
          name: "variable.other.constant.js.jsx",
          match: "([[:upper:]][_$[:digit:][:upper:]]*)(?![_$[:alnum:]])",
        },
        {
          name: "variable.other.readwrite.js.jsx",
          match: "[_$[:alpha:]][_$[:alnum:]]*",
        },
      ],
    },
    "object-identifiers": {
      patterns: [
        {
          name: "support.class.js.jsx",
          match:
            "([_$[:alpha:]][_$[:alnum:]]*)(?=\\s*\\??\\.\\s*prototype\\b(?!\\$))",
        },
        {
          match:
            "(?x)(?:(\\.)|(\\?\\.(?!\\s*[[:digit:]])))\\s*(?:\n  (\\#?[[:upper:]][_$[:digit:][:upper:]]*) |\n  (\\#?[_$[:alpha:]][_$[:alnum:]]*)\n)(?=\\s*\\??\\.\\s*\\#?[_$[:alpha:]][_$[:alnum:]]*)",
          captures: {
            "1": { name: "punctuation.accessor.js.jsx" },
            "2": { name: "punctuation.accessor.optional.js.jsx" },
            "3": { name: "variable.other.constant.object.property.js.jsx" },
            "4": { name: "variable.other.object.property.js.jsx" },
          },
        },
        {
          match:
            "(?x)(?:\n  ([[:upper:]][_$[:digit:][:upper:]]*) |\n  ([_$[:alpha:]][_$[:alnum:]]*)\n)(?=\\s*\\??\\.\\s*\\#?[_$[:alpha:]][_$[:alnum:]]*)",
          captures: {
            "1": { name: "variable.other.constant.object.js.jsx" },
            "2": { name: "variable.other.object.js.jsx" },
          },
        },
      ],
    },
    "type-annotation": {
      patterns: [
        {
          name: "meta.type.annotation.js.jsx",
          begin: "(:)(?=\\s*\\S)",
          beginCaptures: {
            "1": { name: "keyword.operator.type.annotation.js.jsx" },
          },
          end: "(?<![:|&])(?!\\s*[|&]\\s+)((?=^|[,);\\}\\]]|//)|(?==[^>])|((?<=[\\}>\\]\\)]|[_$[:alpha:]])\\s*(?=\\{)))",
          patterns: [{ include: "#type" }],
        },
        {
          name: "meta.type.annotation.js.jsx",
          begin: "(:)",
          beginCaptures: {
            "1": { name: "keyword.operator.type.annotation.js.jsx" },
          },
          end: "(?<![:|&])((?=[,);\\}\\]]|\\/\\/)|(?==[^>])|(?=^\\s*$)|((?<=[\\}>\\]\\)]|[_$[:alpha:]])\\s*(?=\\{)))",
          patterns: [{ include: "#type" }],
        },
      ],
    },
    "parameter-type-annotation": {
      patterns: [
        {
          name: "meta.type.annotation.js.jsx",
          begin: "(:)",
          beginCaptures: {
            "1": { name: "keyword.operator.type.annotation.js.jsx" },
          },
          end: "(?=[,)])|(?==[^>])",
          patterns: [{ include: "#type" }],
        },
      ],
    },
    "return-type": {
      patterns: [
        {
          name: "meta.return.type.js.jsx",
          begin: "(?<=\\))\\s*(:)(?=\\s*\\S)",
          beginCaptures: {
            "1": { name: "keyword.operator.type.annotation.js.jsx" },
          },
          end: "(?<![:|&])(?=$|^|[{};,]|//)",
          patterns: [{ include: "#return-type-core" }],
        },
        {
          name: "meta.return.type.js.jsx",
          begin: "(?<=\\))\\s*(:)",
          beginCaptures: {
            "1": { name: "keyword.operator.type.annotation.js.jsx" },
          },
          end: "(?<![:|&])((?=[{};,]|//|^\\s*$)|((?<=\\S)(?=\\s*$)))",
          patterns: [{ include: "#return-type-core" }],
        },
      ],
    },
    "return-type-core": {
      patterns: [
        { include: "#comment" },
        {
          begin: "(?<=[:|&])(?=\\s*\\{)",
          end: "(?<=\\})",
          patterns: [{ include: "#type-object" }],
        },
        { include: "#type-predicate-operator" },
        { include: "#type" },
      ],
    },
    "arrow-return-type": {
      name: "meta.return.type.arrow.js.jsx",
      begin: "(?<=\\))\\s*(:)",
      beginCaptures: {
        "1": { name: "keyword.operator.type.annotation.js.jsx" },
      },
      end: "(?==>|\\{|(^\\s*(export|function|class|interface|let|var|(?:\\busing(?=\\s+(?!in\\b|of\\b(?!\\s*(?:of\\b|=)))[_$[:alpha:]])\\b)|(?:\\bawait\\s+(?:\\busing(?=\\s+(?!in\\b|of\\b(?!\\s*(?:of\\b|=)))[_$[:alpha:]])\\b)\\b)|const|import|enum|namespace|module|type|abstract|declare)\\s+))",
      patterns: [{ include: "#arrow-return-type-body" }],
    },
    "possibly-arrow-return-type": {
      begin:
        "(?<=\\)|^)\\s*(:)(?=\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*=>)",
      beginCaptures: {
        "1": {
          name: "meta.arrow.js.jsx meta.return.type.arrow.js.jsx keyword.operator.type.annotation.js.jsx",
        },
      },
      end: "(?==>|\\{|(^\\s*(export|function|class|interface|let|var|(?:\\busing(?=\\s+(?!in\\b|of\\b(?!\\s*(?:of\\b|=)))[_$[:alpha:]])\\b)|(?:\\bawait\\s+(?:\\busing(?=\\s+(?!in\\b|of\\b(?!\\s*(?:of\\b|=)))[_$[:alpha:]])\\b)\\b)|const|import|enum|namespace|module|type|abstract|declare)\\s+))",
      contentName: "meta.arrow.js.jsx meta.return.type.arrow.js.jsx",
      patterns: [{ include: "#arrow-return-type-body" }],
    },
    "arrow-return-type-body": {
      patterns: [
        {
          begin: "(?<=[:])(?=\\s*\\{)",
          end: "(?<=\\})",
          patterns: [{ include: "#type-object" }],
        },
        { include: "#type-predicate-operator" },
        { include: "#type" },
      ],
    },
    "type-parameters": {
      name: "meta.type.parameters.js.jsx",
      begin: "(<)",
      beginCaptures: {
        "1": { name: "punctuation.definition.typeparameters.begin.js.jsx" },
      },
      end: "(>)",
      endCaptures: {
        "1": { name: "punctuation.definition.typeparameters.end.js.jsx" },
      },
      patterns: [
        { include: "#comment" },
        {
          name: "storage.modifier.js.jsx",
          match:
            "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(extends|in|out|const)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))",
        },
        { include: "#type" },
        { include: "#punctuation-comma" },
        { name: "keyword.operator.assignment.js.jsx", match: "(=)(?!>)" },
      ],
    },
    "type-arguments": {
      name: "meta.type.parameters.js.jsx",
      begin: "\\<",
      beginCaptures: {
        "0": { name: "punctuation.definition.typeparameters.begin.js.jsx" },
      },
      end: "\\>",
      endCaptures: {
        "0": { name: "punctuation.definition.typeparameters.end.js.jsx" },
      },
      patterns: [{ include: "#type-arguments-body" }],
    },
    "type-arguments-body": {
      patterns: [
        {
          match:
            "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(_)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))",
          captures: { "0": { name: "keyword.operator.type.js.jsx" } },
        },
        { include: "#type" },
        { include: "#punctuation-comma" },
      ],
    },
    type: {
      patterns: [
        { include: "#comment" },
        { include: "#type-string" },
        { include: "#numeric-literal" },
        { include: "#type-primitive" },
        { include: "#type-builtin-literals" },
        { include: "#type-parameters" },
        { include: "#type-tuple" },
        { include: "#type-object" },
        { include: "#type-operators" },
        { include: "#type-conditional" },
        { include: "#type-fn-type-parameters" },
        { include: "#type-paren-or-function-parameters" },
        { include: "#type-function-return-type" },
        {
          match:
            "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(readonly)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))\\s*",
          captures: { "1": { name: "storage.modifier.js.jsx" } },
        },
        { include: "#type-name" },
      ],
    },
    "type-primitive": {
      name: "support.type.primitive.js.jsx",
      match:
        "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(string|number|bigint|boolean|symbol|any|void|never|unknown)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))",
    },
    "type-builtin-literals": {
      name: "support.type.builtin.js.jsx",
      match:
        "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(this|true|false|undefined|null|object)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))",
    },
    "type-tuple": {
      name: "meta.type.tuple.js.jsx",
      begin: "\\[",
      beginCaptures: { "0": { name: "meta.brace.square.js.jsx" } },
      end: "\\]",
      endCaptures: { "0": { name: "meta.brace.square.js.jsx" } },
      patterns: [
        { name: "keyword.operator.rest.js.jsx", match: "\\.\\.\\." },
        {
          match:
            "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))([_$[:alpha:]][_$[:alnum:]]*)\\s*(\\?)?\\s*(:)",
          captures: {
            "1": { name: "entity.name.label.js.jsx" },
            "2": { name: "keyword.operator.optional.js.jsx" },
            "3": { name: "punctuation.separator.label.js.jsx" },
          },
        },
        { include: "#type" },
        { include: "#punctuation-comma" },
      ],
    },
    "type-object": {
      name: "meta.object.type.js.jsx",
      begin: "\\{",
      beginCaptures: { "0": { name: "punctuation.definition.block.js.jsx" } },
      end: "\\}",
      endCaptures: { "0": { name: "punctuation.definition.block.js.jsx" } },
      patterns: [
        { include: "#comment" },
        { include: "#method-declaration" },
        { include: "#indexer-declaration" },
        { include: "#indexer-mapped-type-declaration" },
        { include: "#field-declaration" },
        { include: "#type-annotation" },
        {
          begin: "\\.\\.\\.",
          beginCaptures: { "0": { name: "keyword.operator.spread.js.jsx" } },
          end: "(?=\\}|;|,|$)|(?<=\\})",
          patterns: [{ include: "#type" }],
        },
        { include: "#punctuation-comma" },
        { include: "#punctuation-semicolon" },
        { include: "#type" },
      ],
    },
    "type-conditional": {
      patterns: [
        {
          begin: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(extends)\\s+",
          beginCaptures: { "1": { name: "storage.modifier.js.jsx" } },
          end: "(?<=:)",
          patterns: [
            {
              begin: "\\?",
              beginCaptures: {
                "0": { name: "keyword.operator.ternary.js.jsx" },
              },
              end: ":",
              endCaptures: { "0": { name: "keyword.operator.ternary.js.jsx" } },
              patterns: [{ include: "#type" }],
            },
            { include: "#type" },
          ],
        },
      ],
    },
    "type-paren-or-function-parameters": {
      name: "meta.type.paren.cover.js.jsx",
      begin: "\\(",
      beginCaptures: { "0": { name: "meta.brace.round.js.jsx" } },
      end: "\\)",
      endCaptures: { "0": { name: "meta.brace.round.js.jsx" } },
      patterns: [
        {
          match:
            "(?x)(?:(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(public|private|protected|readonly)\\s+)?(?:(\\.\\.\\.)\\s*)?(?<!=|:)(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(this)|([_$[:alpha:]][_$[:alnum:]]*))\\s*(\\??)(?=\\s*(:\\s*(\n  (<) |\n  ([(]\\s*(\n    ([)]) |\n    (\\.\\.\\.) |\n    ([_$[:alnum:]]+\\s*(\n      ([:,?=])|\n      ([)]\\s*=>)\n    ))\n  ))\n)) |\n(:\\s*(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))Function(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))) |\n(:\\s*((<\\s*$)|([\\(]\\s*((([\\{\\[]\\s*)?$)|((\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})\\s*((:\\s*\\{?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))|((\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])\\s*((:\\s*\\[?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*))))))))",
          captures: {
            "1": { name: "storage.modifier.js.jsx" },
            "2": { name: "keyword.operator.rest.js.jsx" },
            "3": {
              name: "entity.name.function.js.jsx variable.language.this.js.jsx",
            },
            "4": { name: "entity.name.function.js.jsx" },
            "5": { name: "keyword.operator.optional.js.jsx" },
          },
        },
        {
          match:
            "(?x)(?:(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(public|private|protected|readonly)\\s+)?(?:(\\.\\.\\.)\\s*)?(?<!=|:)(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(this)|([_$[:alpha:]][_$[:alnum:]]*))\\s*(\\??)(?=:)",
          captures: {
            "1": { name: "storage.modifier.js.jsx" },
            "2": { name: "keyword.operator.rest.js.jsx" },
            "3": {
              name: "variable.parameter.js.jsx variable.language.this.js.jsx",
            },
            "4": { name: "variable.parameter.js.jsx" },
            "5": { name: "keyword.operator.optional.js.jsx" },
          },
        },
        { include: "#type-annotation" },
        { name: "punctuation.separator.parameter.js.jsx", match: "," },
        { include: "#type" },
      ],
    },
    "type-fn-type-parameters": {
      patterns: [
        {
          begin:
            "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(abstract)\\s+)?(new)\\b(?=\\s*\\<)",
          beginCaptures: {
            "1": {
              name: "meta.type.constructor.js.jsx storage.modifier.js.jsx",
            },
            "2": {
              name: "meta.type.constructor.js.jsx keyword.control.new.js.jsx",
            },
          },
          end: "(?<=>)",
          patterns: [{ include: "#comment" }, { include: "#type-parameters" }],
        },
        {
          name: "meta.type.constructor.js.jsx",
          begin:
            "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(abstract)\\s+)?(new)\\b\\s*(?=\\()",
          beginCaptures: {
            "1": { name: "storage.modifier.js.jsx" },
            "2": { name: "keyword.control.new.js.jsx" },
          },
          end: "(?<=\\))",
          patterns: [{ include: "#function-parameters" }],
        },
        {
          name: "meta.type.function.js.jsx",
          begin:
            "(?x)(\n  (?=\n    [(]\\s*(\n      ([)]) |\n      (\\.\\.\\.) |\n      ([_$[:alnum:]]+\\s*(\n        ([:,?=])|\n        ([)]\\s*=>)\n      ))\n    )\n  )\n)",
          end: "(?<=\\))",
          patterns: [{ include: "#function-parameters" }],
        },
      ],
    },
    "type-function-return-type": {
      patterns: [
        {
          name: "meta.type.function.return.js.jsx",
          begin: "(=>)(?=\\s*\\S)",
          beginCaptures: {
            "1": { name: "storage.type.function.arrow.js.jsx" },
          },
          end: "(?<!=>)(?<![|&])(?=[,\\]\\)\\{\\}=;>:\\?]|//|$)",
          patterns: [{ include: "#type-function-return-type-core" }],
        },
        {
          name: "meta.type.function.return.js.jsx",
          begin: "=>",
          beginCaptures: {
            "0": { name: "storage.type.function.arrow.js.jsx" },
          },
          end: "(?<!=>)(?<![|&])((?=[,\\]\\)\\{\\}=;:\\?>]|//|^\\s*$)|((?<=\\S)(?=\\s*$)))",
          patterns: [{ include: "#type-function-return-type-core" }],
        },
      ],
    },
    "type-function-return-type-core": {
      patterns: [
        { include: "#comment" },
        {
          begin: "(?<==>)(?=\\s*\\{)",
          end: "(?<=\\})",
          patterns: [{ include: "#type-object" }],
        },
        { include: "#type-predicate-operator" },
        { include: "#type" },
      ],
    },
    "type-operators": {
      patterns: [
        { include: "#typeof-operator" },
        { include: "#type-infer" },
        {
          begin: "([&|])(?=\\s*\\{)",
          beginCaptures: { "0": { name: "keyword.operator.type.js.jsx" } },
          end: "(?<=\\})",
          patterns: [{ include: "#type-object" }],
        },
        {
          begin: "[&|]",
          beginCaptures: { "0": { name: "keyword.operator.type.js.jsx" } },
          end: "(?=\\S)",
        },
        {
          name: "keyword.operator.expression.keyof.js.jsx",
          match:
            "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))keyof(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))",
        },
        { name: "keyword.operator.ternary.js.jsx", match: "(\\?|\\:)" },
        {
          name: "keyword.operator.expression.import.js.jsx",
          match:
            "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))import(?=\\s*\\()",
        },
      ],
    },
    "type-infer": {
      patterns: [
        {
          match:
            "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(infer)\\s+([_$[:alpha:]][_$[:alnum:]]*)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))(?:\\s+(extends)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.)))?",
          name: "meta.type.infer.js.jsx",
          captures: {
            "1": { name: "keyword.operator.expression.infer.js.jsx" },
            "2": { name: "entity.name.type.js.jsx" },
            "3": { name: "keyword.operator.expression.extends.js.jsx" },
          },
        },
      ],
    },
    "type-predicate-operator": {
      patterns: [
        {
          match:
            "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(asserts)\\s+)?(?!asserts)(?:(this)|([_$[:alpha:]][_$[:alnum:]]*))\\s(is)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))",
          captures: {
            "1": { name: "keyword.operator.type.asserts.js.jsx" },
            "2": {
              name: "variable.parameter.js.jsx variable.language.this.js.jsx",
            },
            "3": { name: "variable.parameter.js.jsx" },
            "4": { name: "keyword.operator.expression.is.js.jsx" },
          },
        },
        {
          match:
            "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(asserts)\\s+(?!is)(?:(this)|([_$[:alpha:]][_$[:alnum:]]*))(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))",
          captures: {
            "1": { name: "keyword.operator.type.asserts.js.jsx" },
            "2": {
              name: "variable.parameter.js.jsx variable.language.this.js.jsx",
            },
            "3": { name: "variable.parameter.js.jsx" },
          },
        },
        {
          name: "keyword.operator.type.asserts.js.jsx",
          match:
            "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))asserts(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))",
        },
        {
          name: "keyword.operator.expression.is.js.jsx",
          match:
            "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))is(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))",
        },
      ],
    },
    "type-name": {
      patterns: [
        {
          begin:
            "([_$[:alpha:]][_$[:alnum:]]*)\\s*(?:(\\.)|(\\?\\.(?!\\s*[[:digit:]])))\\s*(<)",
          captures: {
            "1": { name: "entity.name.type.module.js.jsx" },
            "2": { name: "punctuation.accessor.js.jsx" },
            "3": { name: "punctuation.accessor.optional.js.jsx" },
            "4": {
              name: "meta.type.parameters.js.jsx punctuation.definition.typeparameters.begin.js.jsx",
            },
          },
          end: "(>)",
          endCaptures: {
            "1": {
              name: "meta.type.parameters.js.jsx punctuation.definition.typeparameters.end.js.jsx",
            },
          },
          contentName: "meta.type.parameters.js.jsx",
          patterns: [{ include: "#type-arguments-body" }],
        },
        {
          begin: "([_$[:alpha:]][_$[:alnum:]]*)\\s*(<)",
          beginCaptures: {
            "1": { name: "entity.name.type.js.jsx" },
            "2": {
              name: "meta.type.parameters.js.jsx punctuation.definition.typeparameters.begin.js.jsx",
            },
          },
          end: "(>)",
          endCaptures: {
            "1": {
              name: "meta.type.parameters.js.jsx punctuation.definition.typeparameters.end.js.jsx",
            },
          },
          contentName: "meta.type.parameters.js.jsx",
          patterns: [{ include: "#type-arguments-body" }],
        },
        {
          match:
            "([_$[:alpha:]][_$[:alnum:]]*)\\s*(?:(\\.)|(\\?\\.(?!\\s*[[:digit:]])))",
          captures: {
            "1": { name: "entity.name.type.module.js.jsx" },
            "2": { name: "punctuation.accessor.js.jsx" },
            "3": { name: "punctuation.accessor.optional.js.jsx" },
          },
        },
        {
          name: "entity.name.type.js.jsx",
          match: "[_$[:alpha:]][_$[:alnum:]]*",
        },
      ],
    },
    "punctuation-comma": {
      name: "punctuation.separator.comma.js.jsx",
      match: ",",
    },
    "punctuation-semicolon": {
      name: "punctuation.terminator.statement.js.jsx",
      match: ";",
    },
    "punctuation-accessor": {
      match: "(?:(\\.)|(\\?\\.(?!\\s*[[:digit:]])))",
      captures: {
        "1": { name: "punctuation.accessor.js.jsx" },
        "2": { name: "punctuation.accessor.optional.js.jsx" },
      },
    },
    string: {
      patterns: [
        { include: "#qstring-single" },
        { include: "#qstring-double" },
        { include: "#template" },
      ],
    },
    "qstring-double": {
      name: "string.quoted.double.js.jsx",
      begin: '"',
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.js.jsx" },
      },
      end: '(")|((?:[^\\\\\\n])$)',
      endCaptures: {
        "1": { name: "punctuation.definition.string.end.js.jsx" },
        "2": { name: "invalid.illegal.newline.js.jsx" },
      },
      patterns: [{ include: "#string-character-escape" }],
    },
    "qstring-single": {
      name: "string.quoted.single.js.jsx",
      begin: "'",
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.js.jsx" },
      },
      end: "(\\')|((?:[^\\\\\\n])$)",
      endCaptures: {
        "1": { name: "punctuation.definition.string.end.js.jsx" },
        "2": { name: "invalid.illegal.newline.js.jsx" },
      },
      patterns: [{ include: "#string-character-escape" }],
    },
    "string-character-escape": {
      name: "constant.character.escape.js.jsx",
      match:
        "\\\\(x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4}|u\\{[0-9A-Fa-f]+\\}|[0-2][0-7]{0,2}|3[0-6][0-7]?|37[0-7]?|[4-7][0-7]?|.|$)",
    },
    template: {
      patterns: [
        { include: "#template-call" },
        {
          contentName: "string.template.js.jsx",
          begin: "([_$[:alpha:]][_$[:alnum:]]*)?(`)",
          beginCaptures: {
            "1": { name: "entity.name.function.tagged-template.js.jsx" },
            "2": {
              name: "string.template.js.jsx punctuation.definition.string.template.begin.js.jsx",
            },
          },
          end: "`",
          endCaptures: {
            "0": {
              name: "string.template.js.jsx punctuation.definition.string.template.end.js.jsx",
            },
          },
          patterns: [
            { include: "#template-substitution-element" },
            { include: "#string-character-escape" },
          ],
        },
      ],
    },
    "template-call": {
      patterns: [
        {
          begin:
            "(?=(([_$[:alpha:]][_$[:alnum:]]*\\s*\\??\\.\\s*)*|(\\??\\.\\s*)?)([_$[:alpha:]][_$[:alnum:]]*)(<\\s*(((keyof|infer|typeof|readonly)\\s+)|(([_$[:alpha:]][_$[:alnum:]]*|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\'([^\\'\\\\]|\\\\.)*\\')|(\\\"([^\\\"\\\\]|\\\\.)*\\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))(?=\\s*([\\<\\>\\,\\.\\[]|=>|&(?!&)|\\|(?!\\|)))))([^<>\\(]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(?<==)\\>|\\<\\s*(((keyof|infer|typeof|readonly)\\s+)|(([_$[:alpha:]][_$[:alnum:]]*|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\'([^\\'\\\\]|\\\\.)*\\')|(\\\"([^\\\"\\\\]|\\\\.)*\\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))(?=\\s*([\\<\\>\\,\\.\\[]|=>|&(?!&)|\\|(?!\\|)))))(([^<>\\(]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(?<==)\\>|\\<\\s*(((keyof|infer|typeof|readonly)\\s+)|(([_$[:alpha:]][_$[:alnum:]]*|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\'([^\\'\\\\]|\\\\.)*\\')|(\\\"([^\\\"\\\\]|\\\\.)*\\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))(?=\\s*([\\<\\>\\,\\.\\[]|=>|&(?!&)|\\|(?!\\|)))))([^<>\\(]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(?<==)\\>)*(?<!=)\\>))*(?<!=)\\>)*(?<!=)>\\s*)?`)",
          end: "(?=`)",
          patterns: [
            {
              begin:
                "(?=(([_$[:alpha:]][_$[:alnum:]]*\\s*\\??\\.\\s*)*|(\\??\\.\\s*)?)([_$[:alpha:]][_$[:alnum:]]*))",
              end: "(?=(<\\s*(((keyof|infer|typeof|readonly)\\s+)|(([_$[:alpha:]][_$[:alnum:]]*|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\'([^\\'\\\\]|\\\\.)*\\')|(\\\"([^\\\"\\\\]|\\\\.)*\\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))(?=\\s*([\\<\\>\\,\\.\\[]|=>|&(?!&)|\\|(?!\\|)))))([^<>\\(]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(?<==)\\>|\\<\\s*(((keyof|infer|typeof|readonly)\\s+)|(([_$[:alpha:]][_$[:alnum:]]*|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\'([^\\'\\\\]|\\\\.)*\\')|(\\\"([^\\\"\\\\]|\\\\.)*\\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))(?=\\s*([\\<\\>\\,\\.\\[]|=>|&(?!&)|\\|(?!\\|)))))(([^<>\\(]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(?<==)\\>|\\<\\s*(((keyof|infer|typeof|readonly)\\s+)|(([_$[:alpha:]][_$[:alnum:]]*|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\'([^\\'\\\\]|\\\\.)*\\')|(\\\"([^\\\"\\\\]|\\\\.)*\\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))(?=\\s*([\\<\\>\\,\\.\\[]|=>|&(?!&)|\\|(?!\\|)))))([^<>\\(]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(?<==)\\>)*(?<!=)\\>))*(?<!=)\\>)*(?<!=)>\\s*)?`)",
              patterns: [
                { include: "#support-function-call-identifiers" },
                {
                  name: "entity.name.function.tagged-template.js.jsx",
                  match: "([_$[:alpha:]][_$[:alnum:]]*)",
                },
              ],
            },
            { include: "#type-arguments" },
          ],
        },
        {
          begin:
            "([_$[:alpha:]][_$[:alnum:]]*)?\\s*(?=(<\\s*(((keyof|infer|typeof|readonly)\\s+)|(([_$[:alpha:]][_$[:alnum:]]*|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\'([^\\'\\\\]|\\\\.)*\\')|(\\\"([^\\\"\\\\]|\\\\.)*\\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))(?=\\s*([\\<\\>\\,\\.\\[]|=>|&(?!&)|\\|(?!\\|)))))([^<>\\(]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(?<==)\\>|\\<\\s*(((keyof|infer|typeof|readonly)\\s+)|(([_$[:alpha:]][_$[:alnum:]]*|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\'([^\\'\\\\]|\\\\.)*\\')|(\\\"([^\\\"\\\\]|\\\\.)*\\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))(?=\\s*([\\<\\>\\,\\.\\[]|=>|&(?!&)|\\|(?!\\|)))))(([^<>\\(]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(?<==)\\>|\\<\\s*(((keyof|infer|typeof|readonly)\\s+)|(([_$[:alpha:]][_$[:alnum:]]*|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\'([^\\'\\\\]|\\\\.)*\\')|(\\\"([^\\\"\\\\]|\\\\.)*\\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))(?=\\s*([\\<\\>\\,\\.\\[]|=>|&(?!&)|\\|(?!\\|)))))([^<>\\(]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(?<==)\\>)*(?<!=)\\>))*(?<!=)\\>)*(?<!=)>\\s*)`)",
          beginCaptures: {
            "1": { name: "entity.name.function.tagged-template.js.jsx" },
          },
          end: "(?=`)",
          patterns: [{ include: "#type-arguments" }],
        },
      ],
    },
    "template-substitution-element": {
      name: "meta.template.expression.js.jsx",
      begin: "\\$\\{",
      beginCaptures: {
        "0": {
          name: "punctuation.definition.template-expression.begin.js.jsx",
        },
      },
      end: "\\}",
      endCaptures: {
        "0": { name: "punctuation.definition.template-expression.end.js.jsx" },
      },
      patterns: [{ include: "#expression" }],
      contentName: "meta.embedded.line.js.jsx",
    },
    "type-string": {
      patterns: [
        { include: "#qstring-single" },
        { include: "#qstring-double" },
        { include: "#template-type" },
      ],
    },
    "template-type": {
      patterns: [
        { include: "#template-call" },
        {
          contentName: "string.template.js.jsx",
          begin: "([_$[:alpha:]][_$[:alnum:]]*)?(`)",
          beginCaptures: {
            "1": { name: "entity.name.function.tagged-template.js.jsx" },
            "2": {
              name: "string.template.js.jsx punctuation.definition.string.template.begin.js.jsx",
            },
          },
          end: "`",
          endCaptures: {
            "0": {
              name: "string.template.js.jsx punctuation.definition.string.template.end.js.jsx",
            },
          },
          patterns: [
            { include: "#template-type-substitution-element" },
            { include: "#string-character-escape" },
          ],
        },
      ],
    },
    "template-type-substitution-element": {
      name: "meta.template.expression.js.jsx",
      begin: "\\$\\{",
      beginCaptures: {
        "0": {
          name: "punctuation.definition.template-expression.begin.js.jsx",
        },
      },
      end: "\\}",
      endCaptures: {
        "0": { name: "punctuation.definition.template-expression.end.js.jsx" },
      },
      patterns: [{ include: "#type" }],
      contentName: "meta.embedded.line.js.jsx",
    },
    regex: {
      patterns: [
        {
          name: "string.regexp.js.jsx",
          begin:
            "(?<!\\+\\+|--|})(?<=[=(:,\\[?+!]|^return|[^\\._$[:alnum:]]return|^case|[^\\._$[:alnum:]]case|=>|&&|\\|\\||\\*\\/)\\s*(\\/)(?![\\/*])(?=(?:[^\\/\\\\\\[\\()]|\\\\.|\\[([^\\]\\\\]|\\\\.)+\\]|\\(([^\\)\\\\]|\\\\.)+\\))+\\/([dgimsuvy]+|(?![\\/\\*])|(?=\\/\\*))(?!\\s*[a-zA-Z0-9_$]))",
          beginCaptures: {
            "1": { name: "punctuation.definition.string.begin.js.jsx" },
          },
          end: "(/)([dgimsuvy]*)",
          endCaptures: {
            "1": { name: "punctuation.definition.string.end.js.jsx" },
            "2": { name: "keyword.other.js.jsx" },
          },
          patterns: [{ include: "#regexp" }],
        },
        {
          name: "string.regexp.js.jsx",
          begin:
            "((?<![_$[:alnum:])\\]]|\\+\\+|--|}|\\*\\/)|((?<=^return|[^\\._$[:alnum:]]return|^case|[^\\._$[:alnum:]]case))\\s*)\\/(?![\\/*])(?=(?:[^\\/\\\\\\[]|\\\\.|\\[([^\\]\\\\]|\\\\.)*\\])+\\/([dgimsuvy]+|(?![\\/\\*])|(?=\\/\\*))(?!\\s*[a-zA-Z0-9_$]))",
          beginCaptures: {
            "0": { name: "punctuation.definition.string.begin.js.jsx" },
          },
          end: "(/)([dgimsuvy]*)",
          endCaptures: {
            "1": { name: "punctuation.definition.string.end.js.jsx" },
            "2": { name: "keyword.other.js.jsx" },
          },
          patterns: [{ include: "#regexp" }],
        },
      ],
    },
    regexp: {
      patterns: [
        { name: "keyword.control.anchor.regexp", match: "\\\\[bB]|\\^|\\$" },
        {
          match: "\\\\[1-9]\\d*|\\\\k<([a-zA-Z_$][\\w$]*)>",
          captures: {
            "0": { name: "keyword.other.back-reference.regexp" },
            "1": { name: "variable.other.regexp" },
          },
        },
        {
          name: "keyword.operator.quantifier.regexp",
          match: "[?+*]|\\{(\\d+,\\d+|\\d+,|,\\d+|\\d+)\\}\\??",
        },
        { name: "keyword.operator.or.regexp", match: "\\|" },
        {
          name: "meta.group.assertion.regexp",
          begin: "(\\()((\\?=)|(\\?!)|(\\?<=)|(\\?<!))",
          beginCaptures: {
            "1": { name: "punctuation.definition.group.regexp" },
            "2": { name: "punctuation.definition.group.assertion.regexp" },
            "3": { name: "meta.assertion.look-ahead.regexp" },
            "4": { name: "meta.assertion.negative-look-ahead.regexp" },
            "5": { name: "meta.assertion.look-behind.regexp" },
            "6": { name: "meta.assertion.negative-look-behind.regexp" },
          },
          end: "(\\))",
          endCaptures: { "1": { name: "punctuation.definition.group.regexp" } },
          patterns: [{ include: "#regexp" }],
        },
        {
          name: "meta.group.regexp",
          begin: "\\((?:(\\?:)|(?:\\?<([a-zA-Z_$][\\w$]*)>))?",
          beginCaptures: {
            "0": { name: "punctuation.definition.group.regexp" },
            "1": { name: "punctuation.definition.group.no-capture.regexp" },
            "2": { name: "variable.other.regexp" },
          },
          end: "\\)",
          endCaptures: { "0": { name: "punctuation.definition.group.regexp" } },
          patterns: [{ include: "#regexp" }],
        },
        {
          name: "constant.other.character-class.set.regexp",
          begin: "(\\[)(\\^)?",
          beginCaptures: {
            "1": { name: "punctuation.definition.character-class.regexp" },
            "2": { name: "keyword.operator.negation.regexp" },
          },
          end: "(\\])",
          endCaptures: {
            "1": { name: "punctuation.definition.character-class.regexp" },
          },
          patterns: [
            {
              name: "constant.other.character-class.range.regexp",
              match:
                "(?:.|(\\\\(?:[0-7]{3}|x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4}))|(\\\\c[A-Z])|(\\\\.))\\-(?:[^\\]\\\\]|(\\\\(?:[0-7]{3}|x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4}))|(\\\\c[A-Z])|(\\\\.))",
              captures: {
                "1": { name: "constant.character.numeric.regexp" },
                "2": { name: "constant.character.control.regexp" },
                "3": { name: "constant.character.escape.backslash.regexp" },
                "4": { name: "constant.character.numeric.regexp" },
                "5": { name: "constant.character.control.regexp" },
                "6": { name: "constant.character.escape.backslash.regexp" },
              },
            },
            { include: "#regex-character-class" },
          ],
        },
        { include: "#regex-character-class" },
      ],
    },
    "regex-character-class": {
      patterns: [
        {
          name: "constant.other.character-class.regexp",
          match: "\\\\[wWsSdDtrnvf]|\\.",
        },
        {
          name: "constant.character.numeric.regexp",
          match: "\\\\([0-7]{3}|x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4})",
        },
        { name: "constant.character.control.regexp", match: "\\\\c[A-Z]" },
        { name: "constant.character.escape.backslash.regexp", match: "\\\\." },
      ],
    },
    comment: {
      patterns: [
        {
          name: "comment.block.documentation.js.jsx",
          begin: "/\\*\\*(?!/)",
          beginCaptures: {
            "0": { name: "punctuation.definition.comment.js.jsx" },
          },
          end: "\\*/",
          endCaptures: {
            "0": { name: "punctuation.definition.comment.js.jsx" },
          },
          patterns: [{ include: "#docblock" }],
        },
        {
          name: "comment.block.js.jsx",
          begin: "(/\\*)(?:\\s*((@)internal)(?=\\s|(\\*/)))?",
          beginCaptures: {
            "1": { name: "punctuation.definition.comment.js.jsx" },
            "2": { name: "storage.type.internaldeclaration.js.jsx" },
            "3": { name: "punctuation.decorator.internaldeclaration.js.jsx" },
          },
          end: "\\*/",
          endCaptures: {
            "0": { name: "punctuation.definition.comment.js.jsx" },
          },
        },
        {
          begin: "(^[ \\t]+)?((//)(?:\\s*((@)internal)(?=\\s|$))?)",
          beginCaptures: {
            "1": { name: "punctuation.whitespace.comment.leading.js.jsx" },
            "2": { name: "comment.line.double-slash.js.jsx" },
            "3": { name: "punctuation.definition.comment.js.jsx" },
            "4": { name: "storage.type.internaldeclaration.js.jsx" },
            "5": { name: "punctuation.decorator.internaldeclaration.js.jsx" },
          },
          end: "(?=$)",
          contentName: "comment.line.double-slash.js.jsx",
        },
      ],
    },
    "single-line-comment-consuming-line-ending": {
      begin: "(^[ \\t]+)?((//)(?:\\s*((@)internal)(?=\\s|$))?)",
      beginCaptures: {
        "1": { name: "punctuation.whitespace.comment.leading.js.jsx" },
        "2": { name: "comment.line.double-slash.js.jsx" },
        "3": { name: "punctuation.definition.comment.js.jsx" },
        "4": { name: "storage.type.internaldeclaration.js.jsx" },
        "5": { name: "punctuation.decorator.internaldeclaration.js.jsx" },
      },
      end: "(?=^)",
      contentName: "comment.line.double-slash.js.jsx",
    },
    directives: {
      name: "comment.line.triple-slash.directive.js.jsx",
      begin:
        "^(///)\\s*(?=<(reference|amd-dependency|amd-module)(\\s+(path|types|no-default-lib|lib|name|resolution-mode)\\s*=\\s*((\\'([^\\'\\\\]|\\\\.)*\\')|(\\\"([^\\\"\\\\]|\\\\.)*\\\")|(\\`([^\\`\\\\]|\\\\.)*\\`)))+\\s*/>\\s*$)",
      beginCaptures: { "1": { name: "punctuation.definition.comment.js.jsx" } },
      end: "(?=$)",
      patterns: [
        {
          name: "meta.tag.js.jsx",
          begin: "(<)(reference|amd-dependency|amd-module)",
          beginCaptures: {
            "1": { name: "punctuation.definition.tag.directive.js.jsx" },
            "2": { name: "entity.name.tag.directive.js.jsx" },
          },
          end: "/>",
          endCaptures: {
            "0": { name: "punctuation.definition.tag.directive.js.jsx" },
          },
          patterns: [
            {
              name: "entity.other.attribute-name.directive.js.jsx",
              match: "path|types|no-default-lib|lib|name|resolution-mode",
            },
            { name: "keyword.operator.assignment.js.jsx", match: "=" },
            { include: "#string" },
          ],
        },
      ],
    },
    docblock: {
      patterns: [
        {
          match:
            "(?x)\n((@)(?:access|api))\n\\s+\n(private|protected|public)\n\\b",
          captures: {
            "1": { name: "storage.type.class.jsdoc" },
            "2": { name: "punctuation.definition.block.tag.jsdoc" },
            "3": { name: "constant.language.access-type.jsdoc" },
          },
        },
        {
          match:
            "(?x)\n((@)author)\n\\s+\n(\n  [^@\\s<>*/]\n  (?:[^@<>*/]|\\*[^/])*\n)\n(?:\n  \\s*\n  (<)\n  ([^>\\s]+)\n  (>)\n)?",
          captures: {
            "1": { name: "storage.type.class.jsdoc" },
            "2": { name: "punctuation.definition.block.tag.jsdoc" },
            "3": { name: "entity.name.type.instance.jsdoc" },
            "4": { name: "punctuation.definition.bracket.angle.begin.jsdoc" },
            "5": { name: "constant.other.email.link.underline.jsdoc" },
            "6": { name: "punctuation.definition.bracket.angle.end.jsdoc" },
          },
        },
        {
          match:
            "(?x)\n((@)borrows) \\s+\n((?:[^@\\s*/]|\\*[^/])+)    # <that namepath>\n\\s+ (as) \\s+              # as\n((?:[^@\\s*/]|\\*[^/])+)    # <this namepath>",
          captures: {
            "1": { name: "storage.type.class.jsdoc" },
            "2": { name: "punctuation.definition.block.tag.jsdoc" },
            "3": { name: "entity.name.type.instance.jsdoc" },
            "4": { name: "keyword.operator.control.jsdoc" },
            "5": { name: "entity.name.type.instance.jsdoc" },
          },
        },
        {
          name: "meta.example.jsdoc",
          begin: "((@)example)\\s+",
          end: "(?=@|\\*/)",
          beginCaptures: {
            "1": { name: "storage.type.class.jsdoc" },
            "2": { name: "punctuation.definition.block.tag.jsdoc" },
          },
          patterns: [
            { match: "^\\s\\*\\s+" },
            {
              contentName: "constant.other.description.jsdoc",
              begin: "\\G(<)caption(>)",
              beginCaptures: {
                "0": { name: "entity.name.tag.inline.jsdoc" },
                "1": {
                  name: "punctuation.definition.bracket.angle.begin.jsdoc",
                },
                "2": { name: "punctuation.definition.bracket.angle.end.jsdoc" },
              },
              end: "(</)caption(>)|(?=\\*/)",
              endCaptures: {
                "0": { name: "entity.name.tag.inline.jsdoc" },
                "1": {
                  name: "punctuation.definition.bracket.angle.begin.jsdoc",
                },
                "2": { name: "punctuation.definition.bracket.angle.end.jsdoc" },
              },
            },
            {
              match: "[^\\s@*](?:[^*]|\\*[^/])*",
              captures: { "0": { name: "source.embedded.js.jsx" } },
            },
          ],
        },
        {
          match:
            "(?x) ((@)kind) \\s+ (class|constant|event|external|file|function|member|mixin|module|namespace|typedef) \\b",
          captures: {
            "1": { name: "storage.type.class.jsdoc" },
            "2": { name: "punctuation.definition.block.tag.jsdoc" },
            "3": { name: "constant.language.symbol-type.jsdoc" },
          },
        },
        {
          match:
            "(?x)\n((@)see)\n\\s+\n(?:\n  # URL\n  (\n    (?=https?://)\n    (?:[^\\s*]|\\*[^/])+\n  )\n  |\n  # JSDoc namepath\n  (\n    (?!\n      # Avoid matching bare URIs (also acceptable as links)\n      https?://\n      |\n      # Avoid matching {@inline tags}; we match those below\n      (?:\\[[^\\[\\]]*\\])? # Possible description [preceding]{@tag}\n      {@(?:link|linkcode|linkplain|tutorial)\\b\n    )\n    # Matched namepath\n    (?:[^@\\s*/]|\\*[^/])+\n  )\n)",
          captures: {
            "1": { name: "storage.type.class.jsdoc" },
            "2": { name: "punctuation.definition.block.tag.jsdoc" },
            "3": { name: "variable.other.link.underline.jsdoc" },
            "4": { name: "entity.name.type.instance.jsdoc" },
          },
        },
        {
          match:
            "(?x)\n((@)template)\n\\s+\n# One or more valid identifiers\n(\n  [A-Za-z_$]         # First character: non-numeric word character\n  [\\w$.\\[\\]]*        # Rest of identifier\n  (?:                # Possible list of additional identifiers\n    \\s* , \\s*\n    [A-Za-z_$]\n    [\\w$.\\[\\]]*\n  )*\n)",
          captures: {
            "1": { name: "storage.type.class.jsdoc" },
            "2": { name: "punctuation.definition.block.tag.jsdoc" },
            "3": { name: "variable.other.jsdoc" },
          },
        },
        {
          begin: "(?x)((@)template)\\s+(?={)",
          beginCaptures: {
            "1": { name: "storage.type.class.jsdoc" },
            "2": { name: "punctuation.definition.block.tag.jsdoc" },
          },
          end: "(?=\\s|\\*/|[^{}\\[\\]A-Za-z_$])",
          patterns: [
            { include: "#jsdoctype" },
            {
              name: "variable.other.jsdoc",
              match: "([A-Za-z_$][\\w$.\\[\\]]*)",
            },
          ],
        },
        {
          match:
            "(?x)\n(\n  (@)\n  (?:arg|argument|const|constant|member|namespace|param|var)\n)\n\\s+\n(\n  [A-Za-z_$]\n  [\\w$.\\[\\]]*\n)",
          captures: {
            "1": { name: "storage.type.class.jsdoc" },
            "2": { name: "punctuation.definition.block.tag.jsdoc" },
            "3": { name: "variable.other.jsdoc" },
          },
        },
        {
          begin: "((@)typedef)\\s+(?={)",
          beginCaptures: {
            "1": { name: "storage.type.class.jsdoc" },
            "2": { name: "punctuation.definition.block.tag.jsdoc" },
          },
          end: "(?=\\s|\\*/|[^{}\\[\\]A-Za-z_$])",
          patterns: [
            { include: "#jsdoctype" },
            {
              name: "entity.name.type.instance.jsdoc",
              match: "(?:[^@\\s*/]|\\*[^/])+",
            },
          ],
        },
        {
          begin:
            "((@)(?:arg|argument|const|constant|member|namespace|param|prop|property|var))\\s+(?={)",
          beginCaptures: {
            "1": { name: "storage.type.class.jsdoc" },
            "2": { name: "punctuation.definition.block.tag.jsdoc" },
          },
          end: "(?=\\s|\\*/|[^{}\\[\\]A-Za-z_$])",
          patterns: [
            { include: "#jsdoctype" },
            {
              name: "variable.other.jsdoc",
              match: "([A-Za-z_$][\\w$.\\[\\]]*)",
            },
            {
              name: "variable.other.jsdoc",
              match:
                "(?x)\n(\\[)\\s*\n[\\w$]+\n(?:\n  (?:\\[\\])?                                        # Foo[ ].bar properties within an array\n  \\.                                                # Foo.Bar namespaced parameter\n  [\\w$]+\n)*\n(?:\n  \\s*\n  (=)                                                # [foo=bar] Default parameter value\n  \\s*\n  (\n    # The inner regexes are to stop the match early at */ and to not stop at escaped quotes\n    (?>\n      \"(?:(?:\\*(?!/))|(?:\\\\(?!\"))|[^*\\\\])*?\" |                      # [foo=\"bar\"] Double-quoted\n      '(?:(?:\\*(?!/))|(?:\\\\(?!'))|[^*\\\\])*?' |                      # [foo='bar'] Single-quoted\n      \\[ (?:(?:\\*(?!/))|[^*])*? \\] |                                # [foo=[1,2]] Array literal\n      (?:(?:\\*(?!/))|\\s(?!\\s*\\])|\\[.*?(?:\\]|(?=\\*/))|[^*\\s\\[\\]])*   # Everything else\n    )*\n  )\n)?\n\\s*(?:(\\])((?:[^*\\s]|\\*[^\\s/])+)?|(?=\\*/))",
              captures: {
                "1": {
                  name: "punctuation.definition.optional-value.begin.bracket.square.jsdoc",
                },
                "2": { name: "keyword.operator.assignment.jsdoc" },
                "3": { name: "source.embedded.js.jsx" },
                "4": {
                  name: "punctuation.definition.optional-value.end.bracket.square.jsdoc",
                },
                "5": { name: "invalid.illegal.syntax.jsdoc" },
              },
            },
          ],
        },
        {
          begin:
            "(?x)\n(\n  (@)\n  (?:define|enum|exception|export|extends|lends|implements|modifies\n  |namespace|private|protected|returns?|satisfies|suppress|this|throws|type\n  |yields?)\n)\n\\s+(?={)",
          beginCaptures: {
            "1": { name: "storage.type.class.jsdoc" },
            "2": { name: "punctuation.definition.block.tag.jsdoc" },
          },
          end: "(?=\\s|\\*/|[^{}\\[\\]A-Za-z_$])",
          patterns: [{ include: "#jsdoctype" }],
        },
        {
          match:
            "(?x)\n(\n  (@)\n  (?:alias|augments|callback|constructs|emits|event|fires|exports?\n  |extends|external|function|func|host|lends|listens|interface|memberof!?\n  |method|module|mixes|mixin|name|requires|see|this|typedef|uses)\n)\n\\s+\n(\n  (?:\n    [^{}@\\s*] | \\*[^/]\n  )+\n)",
          captures: {
            "1": { name: "storage.type.class.jsdoc" },
            "2": { name: "punctuation.definition.block.tag.jsdoc" },
            "3": { name: "entity.name.type.instance.jsdoc" },
          },
        },
        {
          contentName: "variable.other.jsdoc",
          begin: "((@)(?:default(?:value)?|license|version))\\s+(([''\"]))",
          beginCaptures: {
            "1": { name: "storage.type.class.jsdoc" },
            "2": { name: "punctuation.definition.block.tag.jsdoc" },
            "3": { name: "variable.other.jsdoc" },
            "4": { name: "punctuation.definition.string.begin.jsdoc" },
          },
          end: "(\\3)|(?=$|\\*/)",
          endCaptures: {
            "0": { name: "variable.other.jsdoc" },
            "1": { name: "punctuation.definition.string.end.jsdoc" },
          },
        },
        {
          match:
            "((@)(?:default(?:value)?|license|tutorial|variation|version))\\s+([^\\s*]+)",
          captures: {
            "1": { name: "storage.type.class.jsdoc" },
            "2": { name: "punctuation.definition.block.tag.jsdoc" },
            "3": { name: "variable.other.jsdoc" },
          },
        },
        {
          name: "storage.type.class.jsdoc",
          match:
            "(?x) (@) (?:abstract|access|alias|api|arg|argument|async|attribute|augments|author|beta|borrows|bubbles |callback|chainable|class|classdesc|code|config|const|constant|constructor|constructs|copyright |default|defaultvalue|define|deprecated|desc|description|dict|emits|enum|event|example|exception |exports?|extends|extension(?:_?for)?|external|externs|file|fileoverview|final|fires|for|func |function|generator|global|hideconstructor|host|ignore|implements|implicitCast|inherit[Dd]oc |inner|instance|interface|internal|kind|lends|license|listens|main|member|memberof!?|method |mixes|mixins?|modifies|module|name|namespace|noalias|nocollapse|nocompile|nosideeffects |override|overview|package|param|polymer(?:Behavior)?|preserve|private|prop|property|protected |public|read[Oo]nly|record|require[ds]|returns?|see|since|static|struct|submodule|summary |suppress|template|this|throws|todo|tutorial|type|typedef|unrestricted|uses|var|variation |version|virtual|writeOnce|yields?) \\b",
          captures: { "1": { name: "punctuation.definition.block.tag.jsdoc" } },
        },
        { include: "#inline-tags" },
        {
          match: "((@)(?:[_$[:alpha:]][_$[:alnum:]]*))(?=\\s+)",
          captures: {
            "1": { name: "storage.type.class.jsdoc" },
            "2": { name: "punctuation.definition.block.tag.jsdoc" },
          },
        },
      ],
    },
    brackets: {
      patterns: [
        { begin: "{", end: "}|(?=\\*/)", patterns: [{ include: "#brackets" }] },
        {
          begin: "\\[",
          end: "\\]|(?=\\*/)",
          patterns: [{ include: "#brackets" }],
        },
      ],
    },
    "inline-tags": {
      patterns: [
        {
          name: "constant.other.description.jsdoc",
          match: "(\\[)[^\\]]+(\\])(?={@(?:link|linkcode|linkplain|tutorial))",
          captures: {
            "1": { name: "punctuation.definition.bracket.square.begin.jsdoc" },
            "2": { name: "punctuation.definition.bracket.square.end.jsdoc" },
          },
        },
        {
          name: "entity.name.type.instance.jsdoc",
          begin: "({)((@)(?:link(?:code|plain)?|tutorial))\\s*",
          beginCaptures: {
            "1": { name: "punctuation.definition.bracket.curly.begin.jsdoc" },
            "2": { name: "storage.type.class.jsdoc" },
            "3": { name: "punctuation.definition.inline.tag.jsdoc" },
          },
          end: "}|(?=\\*/)",
          endCaptures: {
            "0": { name: "punctuation.definition.bracket.curly.end.jsdoc" },
          },
          patterns: [
            {
              match: "\\G((?=https?://)(?:[^|}\\s*]|\\*[/])+)(\\|)?",
              captures: {
                "1": { name: "variable.other.link.underline.jsdoc" },
                "2": { name: "punctuation.separator.pipe.jsdoc" },
              },
            },
            {
              match: "\\G((?:[^{}@\\s|*]|\\*[^/])+)(\\|)?",
              captures: {
                "1": { name: "variable.other.description.jsdoc" },
                "2": { name: "punctuation.separator.pipe.jsdoc" },
              },
            },
          ],
        },
      ],
    },
    jsdoctype: {
      patterns: [
        {
          contentName: "entity.name.type.instance.jsdoc",
          begin: "\\G({)",
          beginCaptures: {
            "0": { name: "entity.name.type.instance.jsdoc" },
            "1": { name: "punctuation.definition.bracket.curly.begin.jsdoc" },
          },
          end: "((}))\\s*|(?=\\*/)",
          endCaptures: {
            "1": { name: "entity.name.type.instance.jsdoc" },
            "2": { name: "punctuation.definition.bracket.curly.end.jsdoc" },
          },
          patterns: [{ include: "#brackets" }],
        },
      ],
    },
    jsx: {
      patterns: [
        { include: "#jsx-tag-without-attributes-in-expression" },
        { include: "#jsx-tag-in-expression" },
      ],
    },
    "jsx-tag-without-attributes-in-expression": {
      begin:
        "(?<!\\+\\+|--)(?<=[({\\[,?=>:*]|&&|\\|\\||\\?|\\*\\/|^await|[^\\._$[:alnum:]]await|^return|[^\\._$[:alnum:]]return|^default|[^\\._$[:alnum:]]default|^yield|[^\\._$[:alnum:]]yield|^)\\s*(?=(<)\\s*(?:([_$[:alpha:]][-_$[:alnum:].]*)(?<!\\.|-)(:))?((?:[a-z][a-z0-9]*|([_$[:alpha:]][-_$[:alnum:].]*))(?<!\\.|-))?\\s*(>))",
      end: "(?!(<)\\s*(?:([_$[:alpha:]][-_$[:alnum:].]*)(?<!\\.|-)(:))?((?:[a-z][a-z0-9]*|([_$[:alpha:]][-_$[:alnum:].]*))(?<!\\.|-))?\\s*(>))",
      patterns: [{ include: "#jsx-tag-without-attributes" }],
    },
    "jsx-tag-without-attributes": {
      name: "meta.tag.without-attributes.js.jsx",
      begin:
        "(<)\\s*(?:([_$[:alpha:]][-_$[:alnum:].]*)(?<!\\.|-)(:))?((?:[a-z][a-z0-9]*|([_$[:alpha:]][-_$[:alnum:].]*))(?<!\\.|-))?\\s*(>)",
      end: "(</)\\s*(?:([_$[:alpha:]][-_$[:alnum:].]*)(?<!\\.|-)(:))?((?:[a-z][a-z0-9]*|([_$[:alpha:]][-_$[:alnum:].]*))(?<!\\.|-))?\\s*(>)",
      beginCaptures: {
        "1": { name: "punctuation.definition.tag.begin.js.jsx" },
        "2": { name: "entity.name.tag.namespace.js.jsx" },
        "3": { name: "punctuation.separator.namespace.js.jsx" },
        "4": { name: "entity.name.tag.js.jsx" },
        "5": { name: "support.class.component.js.jsx" },
        "6": { name: "punctuation.definition.tag.end.js.jsx" },
      },
      endCaptures: {
        "1": { name: "punctuation.definition.tag.begin.js.jsx" },
        "2": { name: "entity.name.tag.namespace.js.jsx" },
        "3": { name: "punctuation.separator.namespace.js.jsx" },
        "4": { name: "entity.name.tag.js.jsx" },
        "5": { name: "support.class.component.js.jsx" },
        "6": { name: "punctuation.definition.tag.end.js.jsx" },
      },
      contentName: "meta.jsx.children.js.jsx",
      patterns: [{ include: "#jsx-children" }],
    },
    "jsx-tag-in-expression": {
      begin:
        "(?x)\n  (?<!\\+\\+|--)(?<=[({\\[,?=>:*]|&&|\\|\\||\\?|\\*\\/|^await|[^\\._$[:alnum:]]await|^return|[^\\._$[:alnum:]]return|^default|[^\\._$[:alnum:]]default|^yield|[^\\._$[:alnum:]]yield|^)\\s*\n  (?!<\\s*[_$[:alpha:]][_$[:alnum:]]*((\\s+extends\\s+[^=>])|,)) # look ahead is not type parameter of arrow\n  (?=(<)\\s*(?:([_$[:alpha:]][-_$[:alnum:].]*)(?<!\\.|-)(:))?((?:[a-z][a-z0-9]*|([_$[:alpha:]][-_$[:alnum:].]*))(?<!\\.|-))(?=((<\\s*)|(\\s+))(?!\\?)|\\/?>))",
      end: "(?!(<)\\s*(?:([_$[:alpha:]][-_$[:alnum:].]*)(?<!\\.|-)(:))?((?:[a-z][a-z0-9]*|([_$[:alpha:]][-_$[:alnum:].]*))(?<!\\.|-))(?=((<\\s*)|(\\s+))(?!\\?)|\\/?>))",
      patterns: [{ include: "#jsx-tag" }],
    },
    "jsx-tag": {
      name: "meta.tag.js.jsx",
      begin:
        "(?=(<)\\s*(?:([_$[:alpha:]][-_$[:alnum:].]*)(?<!\\.|-)(:))?((?:[a-z][a-z0-9]*|([_$[:alpha:]][-_$[:alnum:].]*))(?<!\\.|-))(?=((<\\s*)|(\\s+))(?!\\?)|\\/?>))",
      end: "(/>)|(?:(</)\\s*(?:([_$[:alpha:]][-_$[:alnum:].]*)(?<!\\.|-)(:))?((?:[a-z][a-z0-9]*|([_$[:alpha:]][-_$[:alnum:].]*))(?<!\\.|-))?\\s*(>))",
      endCaptures: {
        "1": { name: "punctuation.definition.tag.end.js.jsx" },
        "2": { name: "punctuation.definition.tag.begin.js.jsx" },
        "3": { name: "entity.name.tag.namespace.js.jsx" },
        "4": { name: "punctuation.separator.namespace.js.jsx" },
        "5": { name: "entity.name.tag.js.jsx" },
        "6": { name: "support.class.component.js.jsx" },
        "7": { name: "punctuation.definition.tag.end.js.jsx" },
      },
      patterns: [
        {
          begin:
            "(<)\\s*(?:([_$[:alpha:]][-_$[:alnum:].]*)(?<!\\.|-)(:))?((?:[a-z][a-z0-9]*|([_$[:alpha:]][-_$[:alnum:].]*))(?<!\\.|-))(?=((<\\s*)|(\\s+))(?!\\?)|\\/?>)",
          beginCaptures: {
            "1": { name: "punctuation.definition.tag.begin.js.jsx" },
            "2": { name: "entity.name.tag.namespace.js.jsx" },
            "3": { name: "punctuation.separator.namespace.js.jsx" },
            "4": { name: "entity.name.tag.js.jsx" },
            "5": { name: "support.class.component.js.jsx" },
          },
          end: "(?=[/]?>)",
          patterns: [
            { include: "#comment" },
            { include: "#type-arguments" },
            { include: "#jsx-tag-attributes" },
          ],
        },
        {
          begin: "(>)",
          beginCaptures: {
            "1": { name: "punctuation.definition.tag.end.js.jsx" },
          },
          end: "(?=</)",
          contentName: "meta.jsx.children.js.jsx",
          patterns: [{ include: "#jsx-children" }],
        },
      ],
    },
    "jsx-children": {
      patterns: [
        { include: "#jsx-tag-without-attributes" },
        { include: "#jsx-tag" },
        { include: "#jsx-evaluated-code" },
        { include: "#jsx-entities" },
      ],
    },
    "jsx-evaluated-code": {
      contentName: "meta.embedded.expression.js.jsx",
      begin: "\\{",
      end: "\\}",
      beginCaptures: {
        "0": { name: "punctuation.section.embedded.begin.js.jsx" },
      },
      endCaptures: { "0": { name: "punctuation.section.embedded.end.js.jsx" } },
      patterns: [{ include: "#expression" }],
    },
    "jsx-entities": {
      patterns: [
        {
          name: "constant.character.entity.js.jsx",
          match: "(&)([a-zA-Z0-9]+|#[0-9]+|#x[0-9a-fA-F]+)(;)",
          captures: {
            "1": { name: "punctuation.definition.entity.js.jsx" },
            "3": { name: "punctuation.definition.entity.js.jsx" },
          },
        },
      ],
    },
    "jsx-tag-attributes": {
      name: "meta.tag.attributes.js.jsx",
      begin: "\\s+",
      end: "(?=[/]?>)",
      patterns: [
        { include: "#comment" },
        { include: "#jsx-tag-attribute-name" },
        { include: "#jsx-tag-attribute-assignment" },
        { include: "#jsx-string-double-quoted" },
        { include: "#jsx-string-single-quoted" },
        { include: "#jsx-evaluated-code" },
        { include: "#jsx-tag-attributes-illegal" },
      ],
    },
    "jsx-tag-attribute-name": {
      match:
        "(?x)\n  \\s*\n  (?:([_$[:alpha:]][-_$[:alnum:].]*)(:))?\n  ([_$[:alpha:]][-_$[:alnum:]]*)\n  (?=\\s|=|/?>|/\\*|//)",
      captures: {
        "1": { name: "entity.other.attribute-name.namespace.js.jsx" },
        "2": { name: "punctuation.separator.namespace.js.jsx" },
        "3": { name: "entity.other.attribute-name.js.jsx" },
      },
    },
    "jsx-tag-attribute-assignment": {
      name: "keyword.operator.assignment.js.jsx",
      match: "=(?=\\s*(?:'|\"|{|/\\*|//|\\n))",
    },
    "jsx-string-double-quoted": {
      name: "string.quoted.double.js.jsx",
      begin: '"',
      end: '"',
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.js.jsx" },
      },
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.js.jsx" },
      },
      patterns: [{ include: "#jsx-entities" }],
    },
    "jsx-string-single-quoted": {
      name: "string.quoted.single.js.jsx",
      begin: "'",
      end: "'",
      beginCaptures: {
        "0": { name: "punctuation.definition.string.begin.js.jsx" },
      },
      endCaptures: {
        "0": { name: "punctuation.definition.string.end.js.jsx" },
      },
      patterns: [{ include: "#jsx-entities" }],
    },
    "jsx-tag-attributes-illegal": {
      name: "invalid.illegal.attribute.js.jsx",
      match: "\\S+",
    },
  },
};

export default grammar;
