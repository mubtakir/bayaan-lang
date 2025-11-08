# الجزء الثالث (الجزء 2): قواعد مركبة وعودية

<div dir="rtl">

> (قريبًا) سيتم نقل قسم القواعد المركبة والعودية والأمثلة المرتبطة.



## 6. القواعد المركبة

```bayan
hybrid {
    parent("أحمد", "محمد"). parent("محمد", "علي").
    parent("فاطمة", "سارة"). parent("سارة", "ليان").

    ancestor(?X, ?Z) :- parent(?X, ?Z).
    ancestor(?X, ?Z) :- parent(?X, ?Y), ancestor(?Y, ?Z).
}
```

## 7. العودية (Recursion)

```bayan
hybrid {
    edge(a, b). edge(b, c). edge(c, d).

    path(?X, ?Z) :- edge(?X, ?Z).
    path(?X, ?Z) :- edge(?X, ?Y), path(?Y, ?Z).

    print(query path(a, d)?)
}
```

## 8. القوائم في المنطق

```bayan
hybrid {
    list_member(?X, [ ?X | ?_ ]).
    list_member(?X, [ ?_ | ?Rest ]) :- list_member(?X, ?Rest).
}
```

## 9. العمليات المنطقية (AND/OR/NOT)

```bayan
hybrid {
    male("أحمد"). female("فاطمة").
    likes("أحمد", "شاي"). likes("فاطمة", "قهوة").

    tea_lover(?X) :- likes(?X, "شاي").
    coffee_lover(?X) :- likes(?X, "قهوة").

    # AND
    both(?X) :- tea_lover(?X), coffee_lover(?X).

    # OR
    either(?X) :- tea_lover(?X).
    either(?X) :- coffee_lover(?X).
}
```

> التالي: [PART3](03_LOGIC_PROGRAMMING_AR_PART3.md) | السابق: [PART1](03_LOGIC_PROGRAMMING_AR_PART1.md)
