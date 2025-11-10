# حقائق احتمالية وتشكيك (Probabilistic Facts)
مثال يعلن حقائق احتمالية ويستعلم عنها.

```bayan
hybrid {
    prob("is_sunny", "غدًا", 0.8).
    prob("is_rainy", "غدًا", 0.2).
    prob("is_hot", "غدًا", 0.6).

    print("احتمال الشمس غدًا:")
    query prob("is_sunny", "غدًا", ?p).
}
```
