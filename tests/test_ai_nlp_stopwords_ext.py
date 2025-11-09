from bayan.bayan import HybridLexer, HybridParser, HybridInterpreter


def run_interp(code: str) -> HybridInterpreter:
    lexer = HybridLexer(code)
    tokens = lexer.tokenize()
    parser = HybridParser(tokens)
    program = parser.parse()
    interp = HybridInterpreter()
    interp.interpret(program)
    return interp


def test_nlp_remove_stopwords_extended():
    code = """
    import ai.nlp as nlp
    hybrid {
      en = nlp.remove_stopwords_extended("We really love coding", "english")
      ar = nlp.remove_stopwords_extended("انا احب العلم", "arabic")
    }
    """
    interp = run_interp(code)
    env = interp.traditional.global_env
    en = env.get('en')
    ar = env.get('ar')

    assert en.lower() == "love coding"
    assert ("انا" not in ar)

