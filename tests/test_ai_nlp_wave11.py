from bayan.bayan import HybridLexer, HybridParser, HybridInterpreter


def run_interp(code: str) -> HybridInterpreter:
    lexer = HybridLexer(code)
    tokens = lexer.tokenize()
    parser = HybridParser(tokens)
    program = parser.parse()
    interp = HybridInterpreter()
    interp.interpret(program)
    return interp


def test_nlp_levenshtein_distance_basic():
    code = """
    from ai.nlp import levenshtein_distance
    hybrid {
      d1 = levenshtein_distance("kitten", "sitting")
      d2 = levenshtein_distance("", "")
      d3 = levenshtein_distance("a", "")
      d4 = levenshtein_distance("", "abc")
      d5 = levenshtein_distance("flaw", "lawn")
    }
    """
    interp = run_interp(code)
    env = interp.traditional.global_env
    assert env.get('d1') == 3
    assert env.get('d2') == 0
    assert env.get('d3') == 1
    assert env.get('d4') == 3
    assert env.get('d5') == 2


def test_nlp_levenshtein_distance_arabic_wrapper():
    code = """
    from ai.nlp import مسافة_ليفنشتاين
    hybrid {
      z = مسافة_ليفنشتاين("abc", "yabd")
    }
    """
    interp = run_interp(code)
    z = interp.traditional.global_env.get('z')
    assert z == 2

