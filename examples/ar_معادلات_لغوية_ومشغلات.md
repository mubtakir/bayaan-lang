# معادلات لغوية ومشغلات (مصغّر)
تعريفات مصغّرة لمفاهيم معادلات لغوية ومشغّلات وقاعدة تطبيق.

```bayan
hybrid {
    # معاني وكلمات ومعادلة لغوية
    fact word_meaning("ذهب", "movement", "Go").
    fact linguistic_equation("ذهب", "movement", "Go(h, g) -> h'").

    # مشغّل وحيثياته
    fact operator("Go").
    fact object("كرة").
    fact has_property("كرة", "position").

    # قاعدة تطبيق المشغّل
    rule can_apply("Go", ?obj) :- object(?obj), has_property(?obj, "position").

    print("تطبيق Go على أي كائن؟")
    query can_apply("Go", ?obj).
}
```
