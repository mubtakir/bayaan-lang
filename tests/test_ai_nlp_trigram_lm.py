from bayan.bayan import HybridLexer, HybridParser, HybridInterpreter


def run_interp(code: str) -> HybridInterpreter:
    lexer = HybridLexer(code)
    tokens = lexer.tokenize()
    parser = HybridParser(tokens)
    program = parser.parse()
    interp = HybridInterpreter()
    interp.interpret(program)
    return interp


def test_nlp_trigram_lm_basic():
    code = """
    import ai.nlp as nlp
    hybrid {
      docs = ["the cat sat on the mat", "the cat sat", "the dog sat on the log"]
      model = nlp.trigram_lm_train(docs, 1.0)
      top = nlp.trigram_lm_predict_next(model, "the", "cat", 3)
      p_sat = nlp.trigram_lm_probability(model, "the", "cat", "sat")
      p_dog = nlp.trigram_lm_probability(model, "the", "cat", "dog")
    }
    """
    interp = run_interp(code)
    env = interp.traditional.global_env
    top = env.get('top')
    p_sat = env.get('p_sat')
    p_dog = env.get('p_dog')

    assert "sat" in top
    assert p_sat > p_dog

