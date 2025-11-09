from bayan.bayan import HybridLexer, HybridParser, HybridInterpreter


def run_interp(code: str) -> HybridInterpreter:
    lexer = HybridLexer(code)
    tokens = lexer.tokenize()
    parser = HybridParser(tokens)
    program = parser.parse()
    interp = HybridInterpreter()
    interp.interpret(program)
    return interp


def test_nlp_char_ngrams_basic():
    code = """
    import ai.nlp as nlp
    hybrid {
      grams = nlp.char_ngrams("abc", 2, 3)
    }
    """
    interp = run_interp(code)
    grams = interp.traditional.global_env.get('grams')
    assert "ab" in grams and "bc" in grams and "abc" in grams
    assert len(grams) == 3  # ab, bc, abc

