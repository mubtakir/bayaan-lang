# الجزء الثالث (الجزء 3): مواد متقدمة ومنطق هجين

<div dir="rtl">

> (قريبًا) Meta-predicates، قاعدة معرفة ديناميكية، البرمجة الهجينة.



## 10. Meta-predicates

### 10.1 findall/3
```bayan
hybrid {
    score("أحمد", 85). score("فاطمة", 92). score("علي", 78). score("سارة", 95).

    results = query findall(?Score, score(?Name, ?Score), ?AllScores)?
    for r in results: { print(r["?AllScores"]) }  # [85, 92, 78, 95]
}
```

### 10.2 findall مع شرط
```bayan
hybrid {
    score("أحمد", 85). score("فاطمة", 92). score("علي", 78). score("سارة", 95).

    goal = score(?Name, ?Score), ?Score > 80
    results = query findall(?Score, goal, ?HighScores)?
    for r in results: { print(r["?HighScores"]) }  # [85, 92, 95]
}
```

### 10.3 bagof/3
```bayan
hybrid {
    class_member("أحمد", "class_a"). class_member("فاطمة", "class_a"). class_member("علي", "class_b").
    score("أحمد", 85). score("فاطمة", 92). score("علي", 78).

    goal = class_member(?Name, "class_a"), score(?Name, ?Score)
    results = query bagof(?Score, goal, ?Scores)?
    for r in results: { print(r["?Scores"]) }  # [85, 92]
}
```

### 10.4 setof/3
```bayan
hybrid {
    likes("أحمد", "برمجة"). likes("فاطمة", "برمجة"). likes("علي", "رياضيات"). likes("سارة", "برمجة").

    results = query setof(?Subject, likes(?Person, ?Subject), ?Subjects)?
    for r in results: { print(r["?Subjects"]) }  # ["برمجة", "رياضيات"]
}
```


## 11. قاعدة المعرفة الديناميكية

### 11.1 assertz - إضافة حقيقة في النهاية
```bayan
hybrid {
    student("أحمد"). student("فاطمة").
    assertz(student("علي"))
    results = query student(?S)?
    for r in results: { print(r["?S"]) }  # أحمد، فاطمة، علي
}
```

### 11.2 asserta - إضافة حقيقة في البداية
```bayan
hybrid {
    priority("task2", 2). priority("task3", 3).
    asserta(priority("task1", 1))
    results = query priority(?Task, ?P)?
    for r in results: { print(r["?Task"]) }  # task1، task2، task3
}
```

### 11.3 retract - حذف حقيقة
```bayan
hybrid {
    student("أحمد"). student("فاطمة"). student("علي").
    retract(student("فاطمة"))
    results = query student(?S)?
    for r in results: { print(r["?S"]) }  # أحمد، علي
}
```

### 11.4 retractall - حذف جميع المطابق
```bayan
hybrid {
    temp_data("item1", 100). temp_data("item2", 200). temp_data("item3", 300).
    retractall(temp_data(?X, ?Y))
    print(len(query temp_data(?I, ?V)?))  # 0
}
```

## 12. البرمجة الهجينة (دمج الإجرائي + الكائني + المنطقي)
```bayan
hybrid {
    # جزء إجرائي
    def bonus(score): { return score + 5 }

    # حقائق
    score("أحمد", 85). score("سارة", 95).

    # استعلام منطقي ثم استخدام الجزء الإجرائي
    results = query score(?Name, ?S)?
    for r in results: {
        s = r["?S"]
        print(bonus(s))
    }
}
```

> التالي: [PART4](03_LOGIC_PROGRAMMING_AR_PART4.md) | السابق: [PART2](03_LOGIC_PROGRAMMING_AR_PART2.md)
