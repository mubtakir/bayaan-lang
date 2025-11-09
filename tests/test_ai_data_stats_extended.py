from bayan.bayan import HybridLexer, HybridParser, HybridInterpreter


def run_interp(code: str) -> HybridInterpreter:
    lexer = HybridLexer(code)
    tokens = lexer.tokenize()
    parser = HybridParser(tokens)
    program = parser.parse()
    interp = HybridInterpreter()
    interp.interpret(program)
    return interp


def test_data_median_and_percentile():
    code = """
    import ai.data as data
    hybrid {
      m1 = data.median([3,1,4,2])
      m2 = data.median([1,2,3,4])
      p0 = data.percentile([1,2,3,4,5], 0)
      p25 = data.percentile([1,2,3,4,5], 25)
      p50 = data.percentile([1,2,3,4,5], 50)
      p75 = data.percentile([1,2,3,4,5], 75)
      p100 = data.percentile([1,2,3,4,5], 100)
      p375 = data.percentile([1,2,3,4,5], 37.5)
    }
    """
    interp = run_interp(code)
    env = interp.traditional.global_env
    m1 = env.get('m1'); m2 = env.get('m2')
    p0 = env.get('p0'); p25 = env.get('p25'); p50 = env.get('p50'); p75 = env.get('p75'); p100 = env.get('p100'); p375 = env.get('p375')
    assert abs(m1 - 2.5) < 1e-9
    assert abs(m2 - 2.5) < 1e-9
    assert abs(p0 - 1.0) < 1e-9
    assert abs(p25 - 2.0) < 1e-9
    assert abs(p50 - 3.0) < 1e-9
    assert abs(p75 - 4.0) < 1e-9
    assert abs(p100 - 5.0) < 1e-9
    assert abs(p375 - 2.5) < 1e-9

