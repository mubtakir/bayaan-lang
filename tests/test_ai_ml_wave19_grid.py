from bayan.bayan import HybridLexer, HybridParser, HybridInterpreter


def _run(code: str) -> HybridInterpreter:
    lexer = HybridLexer(code)
    tokens = lexer.tokenize()
    parser = HybridParser(tokens)
    program = parser.parse()
    interp = HybridInterpreter()
    interp.interpret(program)
    return interp


def test_grid_search_cv_softmax_selects_better_params():
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
        params = []
        params.append({{"lr": 0.05, "epochs": 100, "l2": 0.0}})
        params.append({{"lr": 0.2, "epochs": 500, "l2": 0.0}})
        res = ML.grid_search_cv_softmax(X, y, params, 3)
        best = res["best_params"]
        score = res["best_score"]
    }}
    """
    interp = _run(code)
    best = interp.traditional.global_env.get('best')
    score = interp.traditional.global_env.get('score')
    assert isinstance(best, dict)
    assert score >= 0.8
    # Expect the higher epochs to win on this simple dataset
    assert best.get("epochs") == 500

