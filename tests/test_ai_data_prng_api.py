from bayan.bayan import HybridLexer, HybridParser, HybridInterpreter


def run_interp(code: str) -> HybridInterpreter:
    lexer = HybridLexer(code)
    tokens = lexer.tokenize()
    parser = HybridParser(tokens)
    program = parser.parse()
    interp = HybridInterpreter()
    interp.interpret(program)
    return interp


def test_data_prng_api_repeatability_and_ops():
    code = """
    import ai.data as data
    hybrid {
      data.set_seed(123)
      r1 = data.rand()
      data.set_seed(123)
      r2 = data.rand()
      a = [1,2,3,4,5]
      data.set_seed(42)
      s1 = data.shuffle_list(a)
      data.set_seed(42)
      s2 = data.shuffle_list(a)
      data.set_seed(99)
      sm = data.sample_list(a, 3)
      data.set_seed(7)
      ri = data.randint(1, 3)
    }
    """
    interp = run_interp(code)
    env = interp.traditional.global_env
    r1 = env.get('r1')
    r2 = env.get('r2')
    s1 = env.get('s1')
    s2 = env.get('s2')
    sm = env.get('sm')
    ri = env.get('ri')

    assert abs(r1 - r2) < 1e-12
    assert s1 == s2
    assert len(sm) == 3
    assert len(set(sm)) == 3
    assert ri in [1,2,3]

