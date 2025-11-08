# Bayan Tutorial (EN) — Part 2.D: Procedural & OOP — Part 4 (Advanced)

> Quick Nav: [PART1](02_PROCEDURAL_OOP_EN_PART1.md) | [PART2](02_PROCEDURAL_OOP_EN_PART2.md) | [PART3](02_PROCEDURAL_OOP_EN_PART3.md) | [PART4](02_PROCEDURAL_OOP_EN_PART4.md)

## 15) Decorators
```bayan
hybrid {
    def my_decorator(fn): {
        def wrapper(x): { print("before"); r = fn(x); print("after"); return r }
        return wrapper
    }
    @my_decorator
    def square(n): { return n * n }
    print(str(square(3)))
}
```

## 16) Generators
```bayan
hybrid {
    def count_up_to(n): {
        i = 1
        while i <= n: { yield i; i = i + 1 }
    }
    for v in count_up_to(3): { print(v) }
}
```

## 17) Async / Await
```bayan
hybrid {
    async def fetch(x): { return x + 1 }
    # Example only; actual event loop usage depends on host integration
}
```

## 18) Context Managers
```bayan
hybrid {
    class FileManager: {
        def __enter__(self): { print("enter"); return self }
        def __exit__(self, exc_type, exc, tb): { print("exit"); return False }
        def write(self, msg): { print("write: " + msg) }
    }
    with FileManager() as f: { f.write("hello") }
}
```

## 19) *args / **kwargs
```bayan
hybrid {
    def sum_all(*args): {
        s = 0
        for v in args: { s = s + v }
        return s
    }
    def print_info(**kwargs): { print(str(kwargs)) }
    print(str(sum_all(1, 2, 3)))
    print_info(name="Ali", age=30)
}
```

