# Bayan Tutorial (EN) — Part 3.C: Logic Programming — Part 3 (Meta-predicates, Dynamic KB, Hybrid)

> Quick Nav: [PART1](03_LOGIC_PROGRAMMING_EN_PART1.md) | [PART2](03_LOGIC_PROGRAMMING_EN_PART2.md) | [PART3](03_LOGIC_PROGRAMMING_EN_PART3.md) | [PART4](03_LOGIC_PROGRAMMING_EN_PART4.md)

## 10) Meta-predicates: findall/bagof/setof
```bayan
hybrid {
    fact likes("Ali", tea). fact likes("Sara", tea). fact likes("Omar", coffee).
}

# Collect all tea lovers
query findall(?X, likes(?X, tea), ?List).
```

## 11) Dynamic Knowledge Base
```bayan
hybrid {
    assertz(friend("Ali", "Omar")).
    asserta(friend("Omar", "Nora")).
}

query friend(?A, ?B).

hybrid {
    retract(friend("Ali", "Omar")).
}

query friend(?A, ?B).
```

## 12) Hybrid Programming
```bayan
hybrid {
    # Imperative
    names = ["Ali", "Sara", "Omar"]
    for n in names: { print(n) }

    # Logic
    fact parent("Ali", "Sara").
    fact parent("Sara", "Omar").
}

# Query logic facts
query parent(?P, ?C).
```

