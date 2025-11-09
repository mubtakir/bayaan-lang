from bayan.bayan import HybridLexer, HybridParser, HybridInterpreter


def run_interp(code: str) -> HybridInterpreter:
    lexer = HybridLexer(code)
    tokens = lexer.tokenize()
    parser = HybridParser(tokens)
    program = parser.parse()
    interp = HybridInterpreter()
    interp.interpret(program)
    return interp


def test_data_minmax_and_pearson_and_arabic_wrappers():
    code = """
    import ai.data as data
    hybrid {
      xs = [2.0, 4.0, 6.0]
      mm = data.minmax_normalize(xs)
      # Pearson r for a perfect positive correlation
      r = data.pearson_r([1.0,2.0,3.0], [2.0,3.0,4.0])
      # Arabic wrappers
      qs = data.نسب_مئوية_متعددة([1,2,3,4], [0.25, 0.50, 0.75])
      i = data.مدى_ربيعي([1,2,3,4])
      # z-score on constant vector -> zeros
      z = data.zscore_normalize([5.0,5.0,5.0])
      # Arabic wrapper for min-max
      ar_mm = data.تطبيع_أدنى_أقصى([2.0, 4.0, 6.0])
    }
    """
    interp = run_interp(code)
    env = interp.traditional.global_env
    mm = env.get('mm')
    assert len(mm) == 3 and abs(mm[0] - 0.0) < 1e-6 and abs(mm[1] - 0.5) < 1e-6 and abs(mm[2] - 1.0) < 1e-6
    assert env.get('r') > 0.99
    qs = env.get('qs')
    assert isinstance(qs, list) and len(qs) == 3
    assert abs(env.get('i') - 2.0) < 1e-6
    z = env.get('z')
    assert z == [0.0, 0.0, 0.0]
    ar_mm = env.get('ar_mm')
    assert ar_mm == [0.0, 0.5, 1.0]

