from bayan.bayan import HybridLexer, HybridParser, HybridInterpreter


def run_interp(code: str) -> HybridInterpreter:
    lexer = HybridLexer(code)
    tokens = lexer.tokenize()
    parser = HybridParser(tokens)
    program = parser.parse()
    interp = HybridInterpreter()
    interp.interpret(program)
    return interp


def test_nlp_cosine_similarity_basic():
    code = """
    import ai.nlp as nlp
    hybrid {
      s = nlp.cosine_similarity(["a","a","b"], ["a","b","b"])
    }
    """
    interp = run_interp(code)
    s = interp.traditional.global_env.get('s')
    assert s > 0.79 and s < 0.81  # expected ~0.8


def test_nlp_similarity_router():
    code = """
    import ai.nlp as nlp
    hybrid {
      j = nlp.similarity(["a","b"], ["b","c"], "jaccard")
      c = nlp.similarity(["a","a","b"], ["a","b","b"], "cosine")
      o = nlp.similarity(["a","b"], ["a","c","b"], "overlap")
    }
    """
    interp = run_interp(code)
    env = interp.traditional.global_env
    j = env.get('j'); c = env.get('c'); o = env.get('o')
    assert abs(j - (1.0/3.0)) < 1e-6
    assert c > 0.79 and c < 0.81
    assert abs(o - (2.0/2.0)) < 1e-6


def test_nlp_bm25_score_with_term_weights():
    code = """
    import ai.nlp as nlp
    hybrid {
      docs = ["a a", "b b"]
      m = nlp.bm25_build(docs, 1.5, 0.75)
      s = nlp.bm25_score(m, "a b")
      sw = nlp.bm25_score_with_term_weights(m, "a b", {"a": 3.0, "b": 1.0})
      s0 = s[0]
      s1 = s[1]
      sw0 = sw[0]
      sw1 = sw[1]
    }
    """
    interp = run_interp(code)
    env = interp.traditional.global_env
    s0 = env.get('s0'); s1 = env.get('s1')
    sw0 = env.get('sw0'); sw1 = env.get('sw1')
    assert sw0 > s0  # boosting 'a' increases score of doc rich in 'a'
    assert abs(sw1 - s1) < 1e-9  # 'b' weight unchanged, doc with only 'b' unchanged

