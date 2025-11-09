from bayan.bayan import HybridLexer, HybridParser, HybridInterpreter


def run_interp(code: str) -> HybridInterpreter:
    lexer = HybridLexer(code)
    tokens = lexer.tokenize()
    parser = HybridParser(tokens)
    program = parser.parse()
    interp = HybridInterpreter()
    interp.interpret(program)
    return interp


def test_ml_kfold_cross_val_accuracy_generic():
    code = """
    import ai.ml as ml
    hybrid {
      X = [[0.0],[1.0],[0.1],[0.9],[0.2],[0.8]]
      y = [0,1,0,1,0,1]
      acc_log = ml.k_fold_cross_val_accuracy(X, y, "logistic", 3, 0.5, 200, 3, True, 42)
      acc_knn = ml.k_fold_cross_val_accuracy(X, y, "knn", 3, 0.5, 200, 1, True, 42)
    }
    """
    interp = run_interp(code)
    env = interp.traditional.global_env
    acc_log = env.get('acc_log')
    acc_knn = env.get('acc_knn')

    assert 0.5 <= acc_log <= 1.0
    assert 0.5 <= acc_knn <= 1.0

