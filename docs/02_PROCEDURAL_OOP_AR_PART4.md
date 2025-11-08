# دليل لغة البيان - الجزء الثاني (الجزء 4): ميزات متقدمة

<div dir="rtl">

> يشمل: Decorators, Generators, Async/Await, Context Managers, *args/**kwargs.

(قريبًا) سيتم نقل المادة التفصيلية والأمثلة.



> التنقل السريع: [PART1](02_PROCEDURAL_OOP_AR_PART1.md) | [PART2](02_PROCEDURAL_OOP_AR_PART2.md) | [PART3](02_PROCEDURAL_OOP_AR_PART3.md) | [PART4](02_PROCEDURAL_OOP_AR_PART4.md)


## 15. Decorators

### 15.1 Decorator بسيط
```bayan
hybrid {
    def my_decorator(func): {
        def wrapper(): {
            print("قبل التنفيذ")
            result = func()
            print("بعد التنفيذ")
            return result
        }
        return wrapper
    }

    @my_decorator
    def greet(): {
        print("مرحباً!")
    }

    greet()
}
```

---

## 16. Generators

### 16.1 Generator بسيط
```bayan
hybrid {
    def count_up_to(n): {
        i = 1
        while i <= n: {
            yield i
            i = i + 1
        }
    }

    for x in count_up_to(3): { print(x) }  # 1, 2, 3
}
```

---

## 17. Async/Await

### 17.1 دالة async بسيطة
```bayan
hybrid {
    async def fetch(): { return 42 }

    async def main(): {
        v = await fetch()
        print(v)
    }

    # ملاحظة: التنفيذ الفعلي يعتمد بيئة التشغيل
    # هنا نعرض البنية فقط
}
```

---

## 18. Context Managers

### 18.1 استخدام with
```bayan
hybrid {
    class FileManager: {
        def __init__(self, path): { self.path = path }
        def __enter__(self): { print("فتح الملف"); return self }
        def __exit__(self, exc_type, exc, tb): { print("إغلاق الملف") }
        def write(self, text): { print("كتابة:", text) }
    }

    with FileManager("/tmp/demo.txt") as f: {
        f.write("Hello")
    }
}
```

---

## 19. *args و **kwargs

### 19.1 استخدام *args
```bayan
hybrid {
    def sum_all(*numbers): {
        s = 0
        for n in numbers: { s = s + n }
        return s
    }

    print(sum_all(1, 2, 3))  # 6
}
```

### 19.2 استخدام **kwargs
```bayan
hybrid {
    def print_info(**info): {
        for key in info: { print(key + ": " + str(info[key])) }
    }

    print_info(name="Bayan", ver="0.1.0")
}
```
