# Bayan Tutorial (EN) — Part 2.B: Procedural & OOP — Part 2 (Control Flow & Functions)

> Quick Nav: [PART1](02_PROCEDURAL_OOP_EN_PART1.md) | [PART2](02_PROCEDURAL_OOP_EN_PART2.md) | [PART3](02_PROCEDURAL_OOP_EN_PART3.md) | [PART4](02_PROCEDURAL_OOP_EN_PART4.md)

## 7) If / Elif / Else
```bayan
hybrid {
    x = 10
    if x > 5: { print("x > 5") }
    elif x == 5: { print("x == 5") }
    else: { print("x < 5") }
}
```

## 8) Loops: for / while
```bayan
hybrid {
    for i in range(3): { print(i) }
    i = 2
    while i >= 0: { print(i); i = i - 1 }
}
```

## 9) Functions
```bayan
hybrid {
    def add(a, b): { return a + b }
    def greet(name="World"): { print("Hello, " + name) }
    print(add(2, 3))
    greet("Bayan")
}
```

## 10) Exceptions
```bayan
hybrid {
    def div(a, b): {
        if b == 0: { print("Error: division by zero"); return None }
        return a / b
    }
    print(str(div(10, 2)))
    print(str(div(5, 0)))
}
```

