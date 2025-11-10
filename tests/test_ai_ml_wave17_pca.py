from bayan.bayan import HybridLexer, HybridParser, HybridInterpreter


def run_interp(code: str) -> HybridInterpreter:
    lexer = HybridLexer(code)
    tokens = lexer.tokenize()
    parser = HybridParser(tokens)
    program = parser.parse()
    interp = HybridInterpreter()
    interp.interpret(program)
    return interp


def test_ml_pca_basic_shapes_and_reconstruction():
    code = """
    import ai.ml as ml
    hybrid {
      X = [[1.0,2.0,3.0],[2.0,1.0,0.0],[3.0,0.0,1.0],[4.0,1.0,2.0]]
      m1 = ml.pca_fit(X, 1)
      comps1 = m1[0]
      mean1 = m1[1]
      Z1 = ml.pca_transform(X, comps1, mean1)

      m2 = ml.pca_fit(X, 2)
      comps2 = m2[0]
      mean2 = m2[1]
      Z2 = ml.pca_transform(X, comps2, mean2)
    }
    """
    interp = run_interp(code)
    env = interp.traditional.global_env
    X = env.get('X')
    comps1 = env.get('comps1')
    mean1 = env.get('mean1')
    Z1 = env.get('Z1')
    comps2 = env.get('comps2')
    mean2 = env.get('mean2')
    Z2 = env.get('Z2')

    # shapes
    assert len(comps1) == 1
    assert len(comps1[0]) == len(X[0])
    assert len(Z1) == len(X) and len(Z1[0]) == 1

    assert len(comps2) == 2
    assert len(comps2[0]) == len(X[0])
    assert len(Z2) == len(X) and len(Z2[0]) == 2

    # reconstruction helper (in Python) using mean and components
    def reconstruct(Z, comps, mean):
        n = len(Z)
        k = len(comps)
        d = len(mean)
        Xr = []
        for i in range(n):
            row = [mean[j] for j in range(d)]
            for c in range(k):
                for j in range(d):
                    row[j] += Z[i][c] * comps[c][j]
            Xr.append(row)
        return Xr

    def sse(A, B):
        s = 0.0
        for i in range(len(A)):
            for j in range(len(A[0])):
                diff = A[i][j] - B[i][j]
                s += diff * diff
        return s

    X1 = reconstruct(Z1, comps1, mean1)
    X2 = reconstruct(Z2, comps2, mean2)
    e1 = sse(X, X1)
    e2 = sse(X, X2)

    assert e2 <= e1 + 1e-6

