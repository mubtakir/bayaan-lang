from bayan.bayan import HybridLexer, HybridParser, HybridInterpreter


def _run(code: str) -> HybridInterpreter:
    lexer = HybridLexer(code)
    tokens = lexer.tokenize()
    parser = HybridParser(tokens)
    program = parser.parse()
    interp = HybridInterpreter()
    interp.interpret(program)
    return interp


def test_wave20_softmax_multiclass_example():
    X = [
        [3.0, 3.0], [2.5, 3.5], [3.5, 2.0],
        [-3.0, -3.0], [-2.5, -3.5], [-3.5, -2.0],
        [3.0, -3.0], [2.5, -3.5], [3.5, -2.0],
    ]
    y = [0, 0, 0, 1, 1, 1, 2, 2, 2]
    code = f"""
    import ai.ml as ML
    hybrid {{
        X = {X}
        y = {y}
        model = ML.softmax_train(X, y, 0.2, 300, 0.0)
        preds = ML.softmax_predict(X, model)
        acc = ML.accuracy_score(y, preds)
    }}
    """
    interp = _run(code)
    acc = interp.traditional.global_env.get('acc')
    assert acc >= 0.9


def test_wave20_soft_tfidf_similarity_example():
    docs = [
        "The quick brown fox",
        "A fast brown fox jumps",
        "الثعلب البني السريع"
    ]
    code = f"""
    import ai.nlp as NLP
    hybrid {{
        docs = {docs}
        model = NLP.soft_tfidf_build(docs, 0.9)
        s1 = NLP.soft_tfidf_cosine_similarity("quick fox", "fast brown fox", model)
        s2 = NLP.soft_tfidf_cosine_similarity("quick fox", "blue whale", model)
    }}
    """
    interp = _run(code)
    s1 = interp.traditional.global_env.get('s1')
    s2 = interp.traditional.global_env.get('s2')
    assert s1 > 0.3
    assert s1 > s2


def test_wave20_pipeline_example_dimension():
    code = """
    import ai.ml as ML
    import ai.data as DATA
    hybrid {
        X = [[1.0, 0.0, 0.1], [0.9, 0.0, 0.2], [1.1, 0.0, 0.0],
             [0.0, 1.0, 0.9], [0.0, 0.9, 1.0], [0.0, 1.1, 0.8]]

        steps = [
            ["var", ML.variance_threshold_fit_params, ML.variance_threshold_transform_model, {"thr": 0.0}],
            ["pca", ML.pca_fit_params, ML.pca_transform_model, {"n_components": 1}]
        ]
        X2_models = DATA.pipeline_fit_transform(steps, X)
        X2 = X2_models[0]
        dim = len(X2[0])
    }
    """
    interp = _run(code)
    dim = interp.traditional.global_env.get('dim')
    assert dim == 1


def test_wave20_voting_example_accuracy():
    code = f"""
    import ai.ml as ML
    hybrid {{
        X = [[0.0],[1.0],[2.0],[3.0]]
        y = [0,0,1,1]
        logreg = ML.logistic_regression_train(X, y, 0.5, 300)
        sm = ML.softmax_train(X, y, 0.2, 200, 0.0)
        ests = []
        ests.append({{"kind":"logistic", "model": logreg}})
        ests.append({{"kind":"softmax", "model": sm}})
        preds = ML.voting_classifier_predict(X, ests, [0,1], "hard")
        acc = ML.accuracy_score(y, preds)
    }}
    """
    interp = _run(code)
    acc = interp.traditional.global_env.get('acc')
    assert acc >= 0.75

