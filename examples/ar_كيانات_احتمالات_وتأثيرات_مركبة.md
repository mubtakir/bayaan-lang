# كيانات + احتمالات + تأثيرات مركبة

هذا المثال يوضّح الدمج الهجين بين الكيانات والأفعال والحقائق الاحتمالية، مع آثار مركّبة لفعلٍ واحد.

```bayan
hybrid {
    # كيانات وحالات أولية
    fact entity("أحمد").
    fact state("أحمد", "hunger", "high").
    fact state("أحمد", "energy", "low").

    # إمكانات/أفعال
    fact affordance("وجبة", "feed").
    rule can_apply("feed", ?شخص) :- entity(?شخص), state(?شخص, "hunger", "high").

    # آثار مركبة للفعل الواحد
    rule decreased_hunger(?شخص) :- can_apply("feed", ?شخص).
    rule increased_energy(?شخص) :- can_apply("feed", ?شخص).

    # حقيقة احتمالية مستقلة (التشكيك)
    prob("is_full", "أحمد", 0.8).

    print("هل انخفض الجوع؟ من ازداد نشاطه؟ وما احتمال الشبع؟")
    query decreased_hunger(?من).
    query increased_energy(?من).
    query prob("is_full", "أحمد", ?p).
}
```

