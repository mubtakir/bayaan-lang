from bayan.bayan import HybridLexer, HybridParser, HybridInterpreter


def run_interp(code: str) -> HybridInterpreter:
    lexer = HybridLexer(code)
    tokens = lexer.tokenize()
    parser = HybridParser(tokens)
    program = parser.parse()
    interp = HybridInterpreter()
    interp.interpret(program)
    return interp


def test_ml_perceptron_knn_weighted_random_forest():
    code = """
    from ai.ml import perceptron_train, perceptron_predict
    from ai.ml import perceptron_ovr_train, perceptron_ovr_predict
    from ai.ml import k_nearest_neighbors_weighted_predict
    from ai.ml import random_forest_train, random_forest_predict
    hybrid {
      # Perceptron on AND gate
      X = [[0.0,0.0],[0.0,1.0],[1.0,0.0],[1.0,1.0]]
      y = [0,0,0,1]
      wb = perceptron_train(X, y, 1.0, 20)
      preds_p = perceptron_predict(X, wb[0], wb[1])

      # Weighted KNN
      train_X = [[0.0],[1.0],[2.0]]
      train_y = ["A","B","B"]
      samples = [[0.9]]
      preds_knn = k_nearest_neighbors_weighted_predict(train_X, train_y, samples, 3)

      # Random forest on XOR (should fit with depth=2 and few trees)
      X2 = [[0,0],[0,1],[1,0],[1,1]]
      y2 = [0,1,1,0]
      rf = random_forest_train(X2, y2, 3, 2, 2, 1.0, 1.0, "gini", 42)
      preds_rf = random_forest_predict(rf, X2)
    }
    """
    interp = run_interp(code)
    env = interp.traditional.global_env
    assert env.get('preds_p') == [0,0,0,1]
    assert env.get('preds_knn') == ["B"]
    assert env.get('preds_rf') == [0,1,1,0]

