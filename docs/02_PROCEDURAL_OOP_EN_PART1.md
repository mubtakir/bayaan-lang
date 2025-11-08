# Bayan Tutorial (EN) — Part 2.A: Procedural & OOP — Part 1 (Basics)

> Quick Nav: [PART1](02_PROCEDURAL_OOP_EN_PART1.md) | [PART2](02_PROCEDURAL_OOP_EN_PART2.md) | [PART3](02_PROCEDURAL_OOP_EN_PART3.md) | [PART4](02_PROCEDURAL_OOP_EN_PART4.md)

This part introduces the basic syntax for traditional programming in Bayan.

## 1) Variables & Types

```bayan
hybrid {
    x = 10
    y = 3.14
    name = "Ahmed"
    ok = True
    items = [1, 2, 3]
    person = {name: "Ali", age: 30}
    print(str(x) + ", " + name)
}
```

## 2) Arithmetic and Logical Operators
- `+ - * / %`
- Comparisons: `== != < <= > >=`
- Logical: `and or not`

```bayan
hybrid {
    a = 5
    b = 2
    print(a + b)      # 7
    print(a > b)      # True
    print((a > 1) and (b < 3))
}
```

## 3) Strings
```bayan
hybrid {
    s = "hello"
    s2 = s + " world"
    print(s2)
}
```

## 4) Lists
```bayan
hybrid {
    numbers = [1, 2, 3]
    for n in numbers: { print(n) }
    print(len(numbers))
    print(numbers[0])
}
```

## 5) Dictionaries
```bayan
hybrid {
    person = {name: "Sara", age: 22}
    print(person[name])
    print(str(person[age]))
}
```

## 6) Notes
- Code blocks use `{ }` with a preceding `:` (Python-like semantics, brace-delimited blocks).
- You can mix logic programming in later parts using `hybrid { }` blocks with facts/rules/queries.

