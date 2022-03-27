export function assertEqual(evaluate, expect) {
    if (evaluate !== expect)
        console.error(`Assertion error:\nEvaluating `, evaluate, `but expected `, expect);
}
//# sourceMappingURL=util.js.map