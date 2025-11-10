from bayan.bayan import HybridLexer, HybridParser, HybridInterpreter


def run_interp(code: str) -> HybridInterpreter:
    lexer = HybridLexer(code)
    tokens = lexer.tokenize()
    parser = HybridParser(tokens)
    program = parser.parse()
    interp = HybridInterpreter()
    interp.interpret(program)
    return interp


def test_ml_naive_bayes_simple_text():
    code = """
    from ai.ml import naive_bayes_train, naive_bayes_predict
    hybrid {
      docs = [["spam","buy"],["spam","offer"],["ham","hi"],["ham","meeting"]]
      y = [1,1,0,0]
      model = naive_bayes_train(docs, y, 1.0)
      preds = naive_bayes_predict(model, [["buy"],["meeting"],["spam","offer"],["hello"]])
      p0 = preds[0]
      p1 = preds[1]
      p2 = preds[2]
      p3 = preds[3]
    }
    """
    interp = run_interp(code)
    env = interp.traditional.global_env
    assert env.get('p0') == 1
    assert env.get('p1') == 0
    assert env.get('p2') == 1
    assert env.get('p3') in (0,1)


def test_ml_naive_bayes_arabic_wrappers():
    code = """
    import ai.ml as ml
    hybrid {
      docs = [["\u0633\u0644\u0627\u0645"],["\u0639\u0631\u0636"]]
      y = [0,1]
      model = ml.\u062a\u062f\u0631\u064a\u0628_\u0628\u0627\u064a\u0632_\u0645\u062a\u0639\u062f\u062f(docs, y, 1.0)
      preds = ml.\u062a\u0648\u0642\u0639_\u0628\u0627\u064a\u0632_\u0645\u062a\u0639\u062f\u062f(model, [["\u0633\u0644\u0627\u0645"],["\u0639\u0631\u0636"]])
      p0 = preds[0]
      p1 = preds[1]
    }
    """
    interp = run_interp(code)
    env = interp.traditional.global_env
    assert env.get('p0') in (0,1)
    assert env.get('p1') in (0,1)

