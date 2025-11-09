from bayan.bayan import HybridLexer, HybridParser, HybridInterpreter


def run_interp(code: str) -> HybridInterpreter:
    lexer = HybridLexer(code)
    tokens = lexer.tokenize()
    parser = HybridParser(tokens)
    program = parser.parse()
    interp = HybridInterpreter()
    interp.interpret(program)
    return interp


def test_ml_logistic_regression_train_and_predict():
    code = """
    from ai.ml import logistic_regression_train, logistic_regression_predict
    hybrid {
      X = [[0], [1], [2], [3]]
      y = [0, 0, 1, 1]
      model = logistic_regression_train(X, y, 0.5, 300)
      w = model[0]
      b = model[1]
      preds = logistic_regression_predict([[0.5], [2.5]], w, b, 0.5)
    }
    """
    interp = run_interp(code)
    env = interp.traditional.global_env
    preds = env.get('preds')
    assert preds == [0, 1]

