# Soft TF-IDF Similarity (Wave 20 example)

```bayan
hybrid {
    import ai.nlp as NLP

    docs = [
        "The quick brown fox",
        "A fast brown fox jumps",
        "الذئب البني السريع"
    ]
    model = NLP.soft_tfidf_build(docs, 0.9)

    s = NLP.soft_tfidf_cosine_similarity("quick fox", "fast brown fox", model)
    print("similarity:", s)
}
```

