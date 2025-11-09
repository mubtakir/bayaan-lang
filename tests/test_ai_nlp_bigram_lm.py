from bayan.bayan import HybridLexer, HybridParser, HybridInterpreter


def run_interp(code: str) -> HybridInterpreter:
    lexer = HybridLexer(code)
    tokens = lexer.tokenize()
    parser = HybridParser(tokens)
    program = parser.parse()
    interp = HybridInterpreter()
    interp.interpret(program)
    return interp


def test_nlp_bigram_lm_basic():
    code = """
    import ai.nlp as nlp
    hybrid {
      docs = ["I love machine learning", "I love deep learning"]
      model = nlp.bigram_lm_train(docs, 1.0)
      top = nlp.bigram_lm_predict_next(model, "love", 2)
      p_ml = nlp.bigram_lm_probability(model, "machine", "learning")
      p_de = nlp.bigram_lm_probability(model, "deep", "learning")
    }
    """
    interp = run_interp(code)
    env = interp.traditional.global_env
    top = env.get('top')
    p_ml = env.get('p_ml')
    p_de = env.get('p_de')

    assert "machine" in top and "deep" in top
    assert p_ml > 0.2 and p_de > 0.2

