# Softmax Multiclass (Wave 20 example)

```bayan
hybrid {
    import ai.ml as ML

    X = [
        [3.0, 3.0], [2.5, 3.5], [3.5, 2.0],
        [-3.0, -3.0], [-2.5, -3.5], [-3.5, -2.0],
        [3.0, -3.0], [2.5, -3.5], [3.5, -2.0],
    ]
    y = [0, 0, 0, 1, 1, 1, 2, 2, 2]

    model = ML.softmax_train(X, y, 0.2, 300, 0.0)
    preds = ML.softmax_predict(X, model)
    acc = ML.accuracy_score(y, preds)
    print("accuracy:", acc)
}
```

