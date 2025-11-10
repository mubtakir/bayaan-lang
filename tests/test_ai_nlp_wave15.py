from bayan.bayan import HybridLexer, HybridParser, HybridInterpreter


def run_interp(code: str) -> HybridInterpreter:
    lexer = HybridLexer(code)
    tokens = lexer.tokenize()
    parser = HybridParser(tokens)
    program = parser.parse()
    interp = HybridInterpreter()
    interp.interpret(program)
    return interp


def test_nlp_jaro_and_winkler_known_pairs():
    code = """
    import ai.nlp as nlp
    hybrid {
      j1 = nlp.jaro_similarity("martha", "marhta")
      jw1 = nlp.jaro_winkler_similarity("martha", "marhta", 0.1, 4)
      j2 = nlp.jaro_similarity("dwayne", "duane")
      jw2 = nlp.jaro_winkler_similarity("dwayne", "duane", 0.1, 4)
    }
    """
    interp = run_interp(code)
    env = interp.traditional.global_env
    j1 = env.get('j1'); jw1 = env.get('jw1')
    j2 = env.get('j2'); jw2 = env.get('jw2')
    # Known approximate values from standard definitions
    assert j1 > 0.94 and j1 < 0.95
    assert jw1 > 0.961 and jw1 < 0.962
    assert j2 > 0.82 and j2 < 0.83
    assert jw2 > 0.83 and jw2 < 0.85


def test_nlp_dice_char_bigrams():
    code = """
    import ai.nlp as nlp
    hybrid {
      d = nlp.dice_char_ngrams("abcd", "abxd", 2)
    }
    """
    interp = run_interp(code)
    d = interp.traditional.global_env.get('d')
    # bigrams: {ab,bc,cd} vs {ab,bx,xd} -> intersection=1, sizes=3 and 3 -> dice=2*1/(3+3)=1/3
    assert abs(d - (1.0/3.0)) < 1e-6


def test_nlp_wave15_arabic_wrappers():
    code = """
    import ai.nlp as nlp
    hybrid {
      jw = nlp.تشابه_جارو_وينكلر("martha", "marhta", 0.1, 4)
      dc = nlp.دايس_محارف("abcd", "abxd", 2)
    }
    """
    interp = run_interp(code)
    env = interp.traditional.global_env
    jw = env.get('jw'); dc = env.get('dc')
    assert jw > 0.961 and jw < 0.962
    assert abs(dc - (1.0/3.0)) < 1e-6

