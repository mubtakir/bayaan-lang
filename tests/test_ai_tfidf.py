from bayan.bayan import HybridLexer, HybridParser, HybridInterpreter


def run_interp(code: str) -> HybridInterpreter:
    lexer = HybridLexer(code)
    tokens = lexer.tokenize()
    parser = HybridParser(tokens)
    program = parser.parse()
    interp = HybridInterpreter()
    interp.interpret(program)
    return interp


def test_nlp_tfidf_basic():
    code = """
    import ai.nlp as nlp
    hybrid {
      docs = ["This product is excellent and awesome", "This is bad and awful"]
      vecs1 = nlp.compute_tfidf(docs)
      vecs2 = nlp.حساب_tfidf(docs)
      v1 = vecs1[0]
      v2 = vecs1[1]
    }
    """
    interp = run_interp(code)
    env = interp.traditional.global_env
    v1 = env.get('v1')
    v2 = env.get('v2')
    # Tokens should be lowercase after preprocessing
    assert v1.get('excellent', 0) > 0
    assert v1.get('awesome', 0) > 0
    assert v2.get('awful', 0) > 0
    assert v2.get('bad', 0) > 0
    assert v2.get('excellent', 0) == 0

