from bayan.bayan import HybridLexer, HybridParser, HybridInterpreter


def run_interp(code: str) -> HybridInterpreter:
    lexer = HybridLexer(code)
    tokens = lexer.tokenize()
    parser = HybridParser(tokens)
    program = parser.parse()
    interp = HybridInterpreter()
    interp.interpret(program)
    return interp


def test_ml_confusion_multiclass_and_report():
    code = """
    import ai.ml as ml
    hybrid {
      y_true = [0, 1, 2, 1, 0, 2]
      y_pred = [0, 2, 2, 1, 0, 1]
      res = ml.confusion_matrix_multi(y_true, y_pred, [0, 1, 2])
      mat = res[0]
      labs = res[1]
      rep = ml.classification_report(y_true, y_pred, [0, 1, 2])
      per = rep["per_class"]
      p0 = per[0]["precision"]
      acc = rep["accuracy"]
      macf = rep["macro_avg"]["f1"]
    }
    """
    interp = run_interp(code)
    env = interp.traditional.global_env
    mat = env.get('mat')
    labs = env.get('labs')
    p0 = env.get('p0')
    acc = env.get('acc')
    macf = env.get('macf')

    assert labs == [0, 1, 2]
    assert mat[0][0] == 2
    assert mat[1][1] == 1
    assert mat[2][2] == 1
    assert abs(p0 - 1.0) < 1e-9
    assert abs(acc - (4/6)) < 1e-9
    assert abs(macf - ((1.0 + 0.5 + 0.5) / 3)) < 1e-9

