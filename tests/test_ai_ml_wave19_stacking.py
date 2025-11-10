from bayan.bayan import HybridLexer, HybridParser, HybridInterpreter


def _run(code: str) -> HybridInterpreter:
    lexer = HybridLexer(code)
    tokens = lexer.tokenize()
    parser = HybridParser(tokens)
    program = parser.parse()
    interp = HybridInterpreter()
    interp.interpret(program)
    return interp


def test_stacking_softmax_meta_multiclass():
    X = [
        [3.0, 3.0], [2.5, 3.5], [3.5, 2.0],
        [-3.0, -3.0], [-2.5, -3.5], [-3.5, -2.0],
        [3.0, -3.0], [2.5, -3.5], [3.5, -2.0],
    ]
    y = [0, 0, 0, 1, 1, 1, 2, 2, 2]

    code = f"""
    import ai.ml as ML
    hybrid {{
        X = {X}
        y = {y}
        p1 = {{"lr": 0.2, "epochs": 300, "l2": 0.0}}
        p2 = {{"lr": 0.15, "epochs": 400, "l2": 0.0}}
        b1 = {{"kind": "softmax", "params": p1}}
        b2 = {{"kind": "softmax", "params": p2}}
        base_specs = [b1, b2]
        stack = ML.stacking_train(X, y, base_specs, [0,1,2])
        preds = ML.stacking_predict(stack, X)
        rep = ML.classification_report(y, preds, [])
    }}
    """
    interp = _run(code)
    rep = interp.traditional.global_env.get('rep')
    assert rep["accuracy"] >= 0.95

