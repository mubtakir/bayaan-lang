from bayan.bayan import HybridLexer, HybridParser, HybridInterpreter


def run_interp(code: str) -> HybridInterpreter:
    lexer = HybridLexer(code)
    tokens = lexer.tokenize()
    parser = HybridParser(tokens)
    program = parser.parse()
    interp = HybridInterpreter()
    interp.interpret(program)
    return interp


def test_data_simple_pipeline_variance_then_pca():
    code = """
    import ai.ml as ml
    import ai.data as data
    hybrid {
      X = [[0.0,1.0],[0.0,2.0],[0.0,3.0]]
      steps = [
        ["var", ml.variance_threshold_fit_params, ml.variance_threshold_transform_model, {"thr": 0.0}],
        ["pca", ml.pca_fit_params, ml.pca_transform_model, {"n_components": 1}]
      ]
      out = data.pipeline_fit_transform(steps, X)
      Xt = out[0]
      models = out[1]
      m0 = models[0]  # mask from variance threshold
    }
    """
    interp = run_interp(code)
    env = interp.traditional.global_env
    Xt = env.get('Xt')
    m0 = env.get('m0')

    # After variance-threshold (remove col0) then PCA(1), shape is (3,1)
    assert m0 == [0, 1]
    assert len(Xt) == 3
    assert len(Xt[0]) == 1

