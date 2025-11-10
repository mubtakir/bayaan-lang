# PCA + Variance + Simple Pipeline (Wave 20 example)

```bayan
hybrid {
    import ai.ml as ML
    import ai.data as DATA

    X = [[1.0, 0.0, 0.1], [0.9, 0.0, 0.2], [1.1, 0.0, 0.0],
         [0.0, 1.0, 0.9], [0.0, 0.9, 1.0], [0.0, 1.1, 0.8]]

    steps = [
        ["var", ML.variance_threshold_fit_params, ML.variance_threshold_transform_model, {"thr": 0.0}],
        ["pca", ML.pca_fit_params, ML.pca_transform_model, {"n_components": 1}]
    ]

    X2, models = DATA.pipeline_fit_transform(steps, X)
    print("transformed len:", len(X2[0]))
}
```

