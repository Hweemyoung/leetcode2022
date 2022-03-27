export function assertEqual(evaluate: any, expect: any) {
    if (evaluate !== expect)
        console.error(
            `Assertion error:\nEvaluating `,
            evaluate,
            `but expected `,
            expect
        );
}
