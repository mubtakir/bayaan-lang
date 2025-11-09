from bayan.bayan import HybridLexer, HybridParser, HybridInterpreter


def run_interp(code: str) -> HybridInterpreter:
    lexer = HybridLexer(code)
    tokens = lexer.tokenize()
    parser = HybridParser(tokens)
    program = parser.parse()
    interp = HybridInterpreter()
    interp.interpret(program)
    return interp


def test_nlp_bm25_jaccard_vocab_limit():
    code = """
    import ai.nlp as nlp
    hybrid {
      docs = ["a a b", "a b b", "c"]
      model = nlp.bm25_build(docs, 1.5, 0.75)
      scores = nlp.bm25_score(model, "a b")
      # jaccard
      j = nlp.jaccard_similarity(["a","b"], ["b","c"])
      # vocab limited tfidf
      v = nlp.compute_tfidf_vocab_limit(["a b c", "a b", "a"], 1, True, True)
      v0 = v[0]
      has_a = v0.get("a", 0.0)
      has_b = v0.get("b", 0.0)
    }
    """
    interp = run_interp(code)
    env = interp.traditional.global_env
    scores = env.get('scores')
    assert scores[0] > scores[2] and scores[1] > scores[2]
    assert abs(env.get('j') - (1.0/3.0)) < 1e-6
    assert env.get('has_a') > 0.0
    assert abs(env.get('has_b')) < 1e-12

