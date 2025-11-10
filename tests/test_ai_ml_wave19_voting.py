from bayan.bayan import HybridLexer, HybridParser, HybridInterpreter


def _run(code: str) -> HybridInterpreter:
    lexer = HybridLexer(code)
    tokens = lexer.tokenize()
    parser = HybridParser(tokens)
    program = parser.parse()
    interp = HybridInterpreter()
    interp.interpret(program)
    return interp


def test_voting_hard_binary():
    code = f"""
    import ai.ml as ML
    hybrid {{
        X = [[0.0],[1.0],[2.0],[3.0]]
        y = [0,0,1,1]

        wb = ML.logistic_regression_train(X, y, 0.5, 300)
        tree = ML.decision_tree_train(X, y, 2, "gini", 2)

        ests = []
        e1 = {{"kind": "logistic", "model": wb}}
        e2 = {{"kind": "tree", "model": tree}}
        ests.append(e1)
        ests.append(e2)

        preds = ML.voting_classifier_predict(X, ests, [0,1], "hard")
        rep = ML.classification_report(y, preds, [])
    }}
    """
    interp = _run(code)
    rep = interp.traditional.global_env.get('rep')
    assert rep["accuracy"] >= 0.95


def test_voting_soft_multiclass():
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
        m1 = ML.softmax_train(X, y, 0.2, 300, 0.0)
        m2 = ML.softmax_train(X, y, 0.15, 400, 0.0)
        ests = []
        ests.append({{"kind": "softmax", "model": m1}})
        ests.append({{"kind": "softmax", "model": m2}})
        preds = ML.voting_classifier_predict(X, ests, [0,1,2], "soft")
        rep = ML.classification_report(y, preds, [])
    }}
    """
    interp = _run(code)
    rep = interp.traditional.global_env.get('rep')
    assert rep["accuracy"] >= 0.95

