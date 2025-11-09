from bayan.bayan import HybridLexer, HybridParser, HybridInterpreter


def run_interp(code: str) -> HybridInterpreter:
    lexer = HybridLexer(code)
    tokens = lexer.tokenize()
    parser = HybridParser(tokens)
    program = parser.parse()
    interp = HybridInterpreter()
    interp.interpret(program)
    return interp


def test_ml_kmeans_two_clusters():
    code = """
    from ai.ml import k_means
    hybrid {
      data = [[0,0], [0,1], [10,10], [10,11]]
      res = k_means(data, 2, 10)
      centers = res[0]
      labels = res[1]
    }
    """
    interp = run_interp(code)
    env = interp.traditional.global_env
    centers = env.get('centers')
    labels = env.get('labels')
    assert len(centers) == 2
    assert len(labels) == 4
    # centers should be near (0,0.5) and (10,10.5) given the simple average
    c1, c2 = centers
    def near(a, b, tol=1.0):
        return abs(a[0]-b[0]) <= tol and abs(a[1]-b[1]) <= tol
    assert near(c1, [0, 0.5]) or near(c2, [0, 0.5])
    assert near(c1, [10, 10.5]) or near(c2, [10, 10.5])

