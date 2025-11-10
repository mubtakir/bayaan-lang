from bayan.bayan import HybridLexer, HybridParser, HybridInterpreter


def run_interp(code: str) -> HybridInterpreter:
    lexer = HybridLexer(code)
    tokens = lexer.tokenize()
    parser = HybridParser(tokens)
    program = parser.parse()
    interp = HybridInterpreter()
    interp.interpret(program)
    return interp


def test_nlp_lcs_length_basic():
    code = """
    from ai.nlp import lcs_length
    hybrid {
      a = "abcdef"
      b = "acbcf"
      l = lcs_length(a, b)
    }
    """
    interp = run_interp(code)
    l = interp.traditional.global_env.get('l')
    assert l == 4


def test_nlp_jaccard_char_ngrams_bigrams():
    code = """
    from ai.nlp import jaccard_char_ngrams
    hybrid {
      t1 = "abcd"
      t2 = "abxd"
      s = jaccard_char_ngrams(t1, t2, 2)
    }
    """
    interp = run_interp(code)
    s = interp.traditional.global_env.get('s')
    assert abs(s - 0.2) < 1e-6


def test_nlp_wave14_arabic_wrappers():
    code = """
    import ai.nlp as nlp
    hybrid {
      ل = nlp.طول_LCS("abcde", "ace")
      ج = nlp.جاكارد_محارف("abcd", "abxd", 2)
    }
    """
    interp = run_interp(code)
    env = interp.traditional.global_env
    assert env.get('ل') == 3
    assert abs(env.get('ج') - 0.2) < 1e-6

