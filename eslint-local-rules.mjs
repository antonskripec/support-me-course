const objectInitializerBraceNewline =
{
    meta: {
        type: "layout",
        fixable: "whitespace",
        docs: {
            description: "Require object initializer opening braces on the line after the equals sign.",
        },
        schema: [],
        messages: {
            expectedNewline: "Expected object initializer opening brace to be on the next line.",
        },
    },
    create(context)
    {
        const sourceCode = context.sourceCode;

        return {
            VariableDeclarator(node)
            {
                if (!node.init || node.init.type !== "ObjectExpression")
                {
                    return;
                }

                const equalsToken = sourceCode.getTokenBefore(node.init, (token) => token.value === "=");
                const openingBrace = sourceCode.getFirstToken(node.init);

                if (!equalsToken || !openingBrace || equalsToken.loc.end.line !== openingBrace.loc.start.line)
                {
                    return;
                }

                const declarationLine = sourceCode.lines[equalsToken.loc.start.line - 1] ?? "";
                const indentation = declarationLine.match(/^\s*/)?.[0] ?? "";

                context.report({
                    node: openingBrace,
                    messageId: "expectedNewline",
                    fix(fixer)
                    {
                        return fixer.replaceTextRange(
                            [equalsToken.range[1], openingBrace.range[0]],
                            `\n${indentation}`,
                        );
                    },
                });
            },
        };
    },
};

export const localRules =
{
    "object-initializer-brace-newline": objectInitializerBraceNewline,
};
