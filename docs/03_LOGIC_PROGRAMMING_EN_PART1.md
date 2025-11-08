# Bayan Tutorial (EN) — Part 3.A: Logic Programming — Part 1 (Basics)

> Quick Nav: [PART1](03_LOGIC_PROGRAMMING_EN_PART1.md) | [PART2](03_LOGIC_PROGRAMMING_EN_PART2.md) | [PART3](03_LOGIC_PROGRAMMING_EN_PART3.md) | [PART4](03_LOGIC_PROGRAMMING_EN_PART4.md)

Bayan supports Prolog-style logic programming: facts, rules, and queries, inside `hybrid { }` blocks.

## 1) Facts
```bayan
hybrid {
    fact parent("Ali", "Sara").
    fact parent("Sara", "Omar").
}
```

## 2) Queries
```bayan
query parent("Ali", ?X).
```

## 3) Logic Variables
- Variables start with `?`, e.g., `?X`, `?Y`.
- They unify with values during query solving.

## 4) Simple Rules
```bayan
hybrid {
    fact parent("Ali", "Sara").
    fact parent("Sara", "Omar").
    rule grandparent(X,Y) :- parent(X,Z), parent(Z,Y).
}

query grandparent("Ali", ?G).
```


