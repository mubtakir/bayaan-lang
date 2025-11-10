from bayan.bayan import HybridLexer, HybridParser, HybridInterpreter


def run_interp(code: str) -> HybridInterpreter:
    lexer = HybridLexer(code)
    tokens = lexer.tokenize()
    parser = HybridParser(tokens)
    program = parser.parse()
    interp = HybridInterpreter()
    interp.interpret(program)
    return interp


def test_ml_variance_threshold_mask_and_transform():
    code = """
    import ai.ml as ml
    hybrid {
      X = [[0.0,1.0],[0.0,2.0],[0.0,3.0]]
      mask = ml.variance_threshold_fit(X, 0.0)
      X2 = ml.variance_threshold_transform(X, mask)
    }
    """
    interp = run_interp(code)
    env = interp.traditional.global_env
    mask = env.get('mask')
    X2 = env.get('X2')

    assert mask == [0, 1]
    assert len(X2) == 3
    assert len(X2[0]) == 1

