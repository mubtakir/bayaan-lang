# دليل لغة البيان - الجزء الثالث (الجزء 1): مقدمة في البرمجة المنطقية
# Bayan Guide - Part 3 (Part 1): Intro to Logic Programming

<div dir="rtl">

> هذا الملف جزء من سلسلة مقسّمة. راجع PART2/3/4 لمزيد من المواضيع المتقدمة.

## المحتويات
- ما هي البرمجة المنطقية؟
- الحقائق (Facts)
- الاستعلامات (Queries)

---

## مقدمة سريعة

البرمجة المنطقية تصف "ما هو صحيح" عبر حقائق وقواعد؛ ثم نستعلم عمّا يترتب.

## الحقائق والاستعلامات

```bayan
hybrid {
    # حقائق
    parent("Ahmed", "Mohamed").
    parent("Ahmed", "Sara").

    # قاعدة
    sibling(?X, ?Y) :- parent(?P, ?X), parent(?P, ?Y), ?X != ?Y.
}

# استعلام
query sibling("Mohamed", ?S).
```

## مثال كيانات ضمن المنطق (إنجليزي)

```bayan
hybrid {
    entity Ahmed { "states": {"hunger": 0.6} }
    entity John  { "actions": {"feed": {"effects": [{"on": "hunger", "formula": "value - 0.4*action_value"}]}}}
    apply John.feed(Ahmed, action_value=1.0)
}
query state("Ahmed", "hunger", ?V).
```



---

## 1. مقدمة في البرمجة المنطقية

### 1.1 ما هي البرمجة المنطقية؟
- الحقائق (Facts): معلومات صحيحة.
- القواعد (Rules): علاقات منطقية تُشتق منها نتائج.
- الاستعلامات (Queries): أسئلة نستخرج بها النتائج.

### 1.2 الفرق بين الإجرائية والمنطقية

```bayan
hybrid {
    # إجرائي: نخبر الحاسوب كيف
    def is_parent(person1, person2): {
        if person1 == "أحمد" and person2 == "محمد": {
            return True
        }
        return False
    }
}
```

```bayan
hybrid {
    # منطقي: نعلن ما نريد
    parent("أحمد", "محمد").

    results = query parent("أحمد", ?X)?
}
```

---

## 2. الحقائق (Facts)

### 2.1 حقيقة بسيطة
```bayan
hybrid {
    parent("أحمد", "محمد").
}
```

### 2.2 حقائق متعددة
```bayan
hybrid {
    parent("أحمد", "محمد").
    parent("أحمد", "فاطمة").
    age("أحمد", 50).
    age("محمد", 25).
}
```

### 2.3 أنواع مختلفة
```bayan
hybrid {
    city("الرياض").
    city("جدة").
    temperature("الرياض", 35).
    is_capital("الرياض", True).
}
```


---

## 3. الاستعلامات (Queries)

### 3.1 استعلام بسيط
```bayan
hybrid {
    parent("أحمد", "محمد").
    results = query parent("أحمد", "محمد")?
    if len(results) > 0: { print("نعم") }
}
```

### 3.2 استعلام مع متغير
```bayan
hybrid {
    parent("أحمد", "محمد").
    parent("أحمد", "فاطمة").

    results = query parent("أحمد", ?Child)?
    for r in results: { print(r["?Child"]) }
}
```

### 3.3 استعلام متعدد المتغيرات
```bayan
hybrid {
    parent("أحمد", "محمد").
    parent("فاطمة", "سارة").

    results = query parent(?P, ?C)?
    for r in results: {
        print(r["?P"])  # parent
        print(r["?C"])  # child
    }
}
```

---

## 4. المتغيرات المنطقية

### 4.1 تعريف المتغيرات
```bayan
hybrid {
    parent("أحمد", "محمد").
    results = query parent(?X, "محمد")?
}
```

### 4.2 متغيرات متعددة
```bayan
hybrid {
    likes("أحمد", "برمجة").
    likes("فاطمة", "رياضيات").

    results = query likes(?Person, ?Thing)?
    for r in results: { print(r["?Person"] + " يحب " + r["?Thing"]) }
}
```

### 4.3 نفس المتغير في أكثر من موضع
```bayan
hybrid {
    likes("أحمد", "برمجة").
    likes("أحمد", "رياضيات").
    likes("فاطمة", "برمجة").

    results = query likes(?Person, "برمجة")?
    for r in results: { print(r["?Person"]) }
}
```

---

## 5. القواعد البسيطة (Rules)

### 5.1 قاعدة بسيطة
```bayan
hybrid {
    parent("أحمد", "محمد").
    parent("محمد", "علي").

    grandparent(?X, ?Z) :- parent(?X, ?Y), parent(?Y, ?Z).

    print(query grandparent("أحمد", ?Z)?)
}
```

### 5.2 قاعدة مع شرط
```bayan
hybrid {
    male("أحمد"). male("محمد"). female("فاطمة").
    parent("أحمد", "محمد"). parent("أحمد", "فاطمة").

    son(?X, ?Y) :- parent(?Y, ?X), male(?X).
    daughter(?X, ?Y) :- parent(?Y, ?X), female(?X).
}
```

### 5.3 قواعد متعددة لنفس الرأس
```bayan
hybrid {
    male("أحمد"). male("محمد"). female("فاطمة"). female("سارة").

    person(?X) :- male(?X).
    person(?X) :- female(?X).

    results = query person(?P)?
    for r in results: { print(r["?P"]) }
}
```

> التالي: [PART2](03_LOGIC_PROGRAMMING_AR_PART2.md)
