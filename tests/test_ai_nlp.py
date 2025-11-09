from bayan.bayan import HybridLexer, HybridParser, HybridInterpreter


def run_interp(code: str) -> HybridInterpreter:
    lexer = HybridLexer(code)
    tokens = lexer.tokenize()
    parser = HybridParser(tokens)
    program = parser.parse()
    interp = HybridInterpreter()
    interp.interpret(program)
    return interp


def test_nlp_detect_sentiment_bilingual():
    code = """
    import ai.nlp as nlp
    hybrid {
      s1 = nlp.detect_sentiment("This product is excellent and awesome!")
      s2 = nlp.كشف_مشاعر("المنتج رائع جدًا وسعره مناسب")
    }
    """
    interp = run_interp(code)
    env = interp.traditional.global_env
    assert env.get('s1') == 'positive'
    assert env.get('s2') == 'إيجابي'

