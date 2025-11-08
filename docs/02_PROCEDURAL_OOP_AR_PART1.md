# دليل لغة البيان - الجزء الثاني (الجزء 1): الأساسيات
# Bayan Guide - Part 2 (Part 1): Basics

<div dir="rtl">

> هذا الملف جزء من سلسلة مقسّمة. راجع الأجزاء الأخرى للمحتوى الكامل: PART2/3/4.

## المحتويات
- المتغيرات وأنواع البيانات
- العمليات الحسابية والمنطقية
- النصوص والقوائم والقواميس (مختصر)
- أمثلة سريعة

---

## المتغيرات وأنواع البيانات

```bayan
hybrid {
    # أرقام
    a = 42
    pi = 3.14159

    # نصوص
    name = "أحمد"
    city = "Riyadh"

    # قوائم
    items = [1, 2, 3]

    # قواميس
    person = {name: "Ali", age: 25}
}
```

## العمليات الحسابية والمنطقية

```bayan
hybrid {
    x = 10
    y = 3

    sum = x + y
    diff = x - y
    prod = x * y
    quot = x / y

    ok1 = (sum > 10) and (y < 5)
    ok2 = not (x == y)
}
```

## نصوص وقوائم وقواميس (مختصر)

```bayan
hybrid {
    text = "Hello Bayan"
    print(upper(text))

    lst = ["a", "b", "c"]
    print(len(lst))

    user = {name: "Sara", score: 0.9}
    print(user[name] + ": " + str(user[score]))
}
```

## أمثلة سريعة

- راجع أمثلة إضافية في docs/EXAMPLES.md وفي مجلد examples/.
- جرب أمثلة نظام الكيانات بالإنجليزية:
  - examples/entity_food_interaction_en.by
  - examples/entity_reactions_en.by
  - examples/social_trust_en.by
  - examples/bread_market_en.by

