from bayan.bayan import HybridLexer, HybridParser, HybridInterpreter


def run_interp(code: str) -> HybridInterpreter:
    lexer = HybridLexer(code)
    tokens = lexer.tokenize()
    parser = HybridParser(tokens)
    program = parser.parse()
    interp = HybridInterpreter()
    interp.interpret(program)
    return interp


def test_ml_kfold_evaluate_logistic_and_knn():
    code = """
    import ai.ml as ml
    hybrid {
      X = [[0.0],[1.0],[0.1],[0.9],[0.2],[0.8]]
      y = [0,1,0,1,0,1]
      res_log = ml.k_fold_evaluate_logistic(X, y, 3, 0.5, 300, True, 42)
      p = res_log[0]
      r = res_log[1]
      f1 = res_log[2]
      acc = res_log[3]
      acc_knn = ml.k_fold_evaluate_knn(X, y, 3, 1, True, 42)
    }
    """
    interp = run_interp(code)
    env = interp.traditional.global_env
    f1 = env.get('f1')
    acc = env.get('acc')
    acc_knn = env.get('acc_knn')

    assert f1 >= 0.8
    assert acc >= 0.8
    assert acc_knn >= 0.8

