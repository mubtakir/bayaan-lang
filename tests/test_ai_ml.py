from bayan.bayan import HybridLexer, HybridParser, HybridInterpreter


def run_interp(code: str) -> HybridInterpreter:
    lexer = HybridLexer(code)
    tokens = lexer.tokenize()
    parser = HybridParser(tokens)
    program = parser.parse()
    interp = HybridInterpreter()
    interp.interpret(program)
    return interp


def test_ml_linear_regression_and_knn():
    code = """
    from ai.ml import linear_regression, k_nearest_neighbors_predict, انحدار_خطي, توقع_k_متجاور_أقرب
    hybrid {
      x = [1, 2, 3, 4, 5]
      y = [2, 4, 6, 8, 10]
      lr = linear_regression(x, y)
      m = lr[0]
      b = lr[1]
      preds = k_nearest_neighbors_predict([[0,0], [10,10]], ["A", "B"], [[1,1], [9,9]], 1)
      ar_lr = انحدار_خطي([1,2,3], [1,2,3])
      ar_preds = توقع_k_متجاور_أقرب([[0,0], [10,10]], ["A","B"], [[2,2], [8,8]], 1)
    }
    """
    interp = run_interp(code)
    env = interp.traditional.global_env
    assert abs(env.get('m') - 2.0) < 1e-9
    assert abs(env.get('b') - 0.0) < 1e-9
    assert env.get('preds') == ['A', 'B']
    assert env.get('ar_lr')[0] == 1.0 and env.get('ar_lr')[1] == 0.0
    assert env.get('ar_preds') == ['A', 'B']

