# دليل لغة البيان - الجزء الثاني (الجزء 2): التحكم في التدفق والدوال

<div dir="rtl">

> محتوى مفصّل منقول تدريجيًا من الملف الكبير 02_PROCEDURAL_OOP_AR.md.

## الموضوعات
- الشروط if/elif/else
- الحلقات for/while
- الدوال (Functions)

(قريبًا: سيتم نقل الأمثلة والشرح التفصيلي هنا.)

## 7. الشروط (if/elif/else)

### 7.1 الشرط البسيط

```bayan
hybrid {
    age = 18

    if age >= 18: {
        print("بالغ")
    }
}
```

### 7.2 if-else

```bayan
hybrid {
    temperature = 30

    if temperature > 25: {
        print("الجو حار")
    }
    else: {
        print("الجو معتدل")
    }
}
```

### 7.3 if-elif-else

```bayan
hybrid {
    score = 85

    if score >= 90: {
        print("ممتاز")
    }
    elif score >= 80: {
        print("جيد جداً")
    }
    elif score >= 70: {
        print("جيد")
    }
    elif score >= 60: {
        print("مقبول")
    }
    else: {
        print("راسب")
    }
}
```

### 7.4 شروط متداخلة

```bayan
hybrid {
    age = 20
    has_license = True

    if age >= 18: {
        if has_license: {
            print("يمكنك القيادة")
        }
        else: {
            print("تحتاج رخصة قيادة")
        }
    }
    else: {
        print("أنت صغير السن")
    }
}
```

---



## 8. الحلقات (for/while)

### 8.1 حلقة for

```bayan
hybrid {
    # التكرار على قائمة
    fruits = ["تفاح", "موز", "برتقال"]

    for fruit in fruits: {
        print(fruit)
    }

    # التكرار على range
    for i in range(5): {
        print(i)  # 0, 1, 2, 3, 4
    }

    # range مع بداية ونهاية
    for i in range(1, 6): {
        print(i)  # 1, 2, 3, 4, 5
    }

    # range مع خطوة
    for i in range(0, 10, 2): {
        print(i)  # 0, 2, 4, 6, 8
    }
}
```

### 8.2 حلقة while

```bayan
hybrid {
    # حلقة while بسيطة
    count = 0

    while count < 5: {
        print(count)
        count = count + 1
    }

    # حلقة while مع شرط
    number = 1

    while number <= 10: {
        if number % 2 == 0: {
            print(number)
        }
        number = number + 1
    }
}
```

### 8.3 break و continue

```bayan
hybrid {
    # break - إيقاف الحلقة
    for i in range(10): {
        if i == 5: {
            break
        }
        print(i)  # 0, 1, 2, 3, 4
    }

    # continue - تخطي التكرار الحالي
    for i in range(5): {
        if i == 2: {
            continue
        }
        print(i)  # 0, 1, 3, 4
    }
}
```

### 8.4 enumerate و zip

```bayan
hybrid {
    # enumerate - الحصول على الفهرس والقيمة
    fruits = ["تفاح", "موز", "برتقال"]

    for index_value in enumerate(fruits): {
        index = index_value[0]
        value = index_value[1]
        print(index)
        print(value)
    }

    # zip - دمج قائمتين
    names = ["أحمد", "فاطمة", "علي"]
    ages = [25, 22, 30]

    for pair in zip(names, ages): {
        name = pair[0]
        age = pair[1]
        print(name)
        print(age)
    }
}
```

---


## 9. الدوال (Functions)

### 9.1 تعريف دالة بسيطة

```bayan
hybrid {
    def greet(): {
        print("مرحباً!")
    }

    greet()  # استدعاء الدالة
}
```

### 9.2 دالة بمعاملات

```bayan
hybrid {
    def greet_person(name): {
        print("مرحباً " + name)
    }

    greet_person("أحمد")  # "مرحباً أحمد"
    greet_person("فاطمة")  # "مرحباً فاطمة"
}
```

### 9.3 دالة بقيمة إرجاع

```bayan
hybrid {
    def add(a, b): {
        return a + b
    }

    result = add(10, 20)
    print(result)  # 30
}
```

### 9.4 معاملات افتراضية

```bayan
hybrid {
    def greet(name, greeting="مرحباً"): {
        return greeting + " " + name
    }

    msg1 = greet("أحمد")
    print(msg1)  # "مرحباً أحمد"

    msg2 = greet("فاطمة", "أهلاً")
    print(msg2)  # "أهلاً فاطمة"
}
```

### 9.5 دوال متعددة القيم

```bayan
hybrid {
    def get_min_max(numbers): {
        minimum = min(numbers)
        maximum = max(numbers)
        return [minimum, maximum]
    }

    result = get_min_max([5, 2, 8, 1, 9])
    print(result[0])  # 1 (minimum)
    print(result[1])  # 9 (maximum)
}
```

### 9.6 دوال متداخلة

```bayan
hybrid {
    def outer_function(x): {
        def inner_function(y): {
            return x + y
        }

        return inner_function(10)
    }

    result = outer_function(5)
    print(result)  # 15
}
```

---


## 10. معالجة الاستثناءات

### 10.1 try-except الأساسي

```bayan
hybrid {
    try: {
        x = 10 / 0
    }
    except ZeroDivisionError: {
        print("خطأ: القسمة على صفر!")
    }
}
```

### 10.2 معالجة استثناءات متعددة

```bayan
hybrid {
    try: {
        number = int("abc")
    }
    except ValueError: {
        print("خطأ: قيمة غير صحيحة")
    }
    except TypeError: {
        print("خطأ: نوع غير صحيح")
    }
}
```

### 10.3 try-except-finally

```bayan
hybrid {
    try: {
        file = open("data.txt", "r")
        content = file.read()
    }
    except FileNotFoundError: {
        print("الملف غير موجود")
    }
    finally: {
        print("تم الانتهاء من المحاولة")
    }
}
```

### 10.4 رفع استثناء

```bayan
hybrid {
    def check_age(age): {
        if age < 0: {
            raise ValueError("العمر لا يمكن أن يكون سالباً")
        }
        return age
    }

    try: {
        check_age(-5)
    }
    except ValueError: {
        print("خطأ في العمر")
    }
}
```

---
