# Voting & Stacking (Wave 20 example)

```bayan
hybrid {
    import ai.ml as ML

    X = [[0.0],[1.0],[2.0],[3.0]]
    y = [0,0,1,1]

    # Two estimators: logistic + softmax
    logreg = ML.logistic_regression_train(X, y, 0.5, 300)
    sm = ML.softmax_train(X, y, 0.2, 200, 0.0)

    ests = []
    ests.append({"kind":"logistic", "model": logreg})
    ests.append({"kind":"softmax", "model": sm})

    preds_hard = ML.voting_classifier_predict(X, ests, [0,1], "hard")
    preds_soft = ML.voting_classifier_predict(X, ests, [0,1], "soft")
    print("hard acc:", ML.accuracy_score(y, preds_hard))
    print("soft acc:", ML.accuracy_score(y, preds_soft))

    # Stacking with softmax meta-model
    base_specs = [{"kind":"softmax", "params": {"lr":0.2, "epochs":200, "l2":0.0}},
                  {"kind":"softmax", "params": {"lr":0.15, "epochs":300, "l2":0.0}}]
    stack = ML.stacking_train(X, y, base_specs, [0,1])
    preds = ML.stacking_predict(stack, X)
    print("stack acc:", ML.accuracy_score(y, preds))
}
```

