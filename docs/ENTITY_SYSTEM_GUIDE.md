# Entity System Guide — دليل نظام الكيانات

هذا الدليل يشرح نظام "الكيانات" المدمج في لغة بيان لإدارة الحالة (0..1) والتفاعلات بشكل مباشر من داخل اللغة، مع دعمٍ ثنائي اللغة (English + العربية).

---

## Keywords — الكلمات المفتاحية
- English: `entity`, `apply`, body keys: `states`, `properties`, `actions`, `reactions`
- العربية: `كيان`, `طبق`, مفاتيح الجسم: `"حالات"`, `"خصائص"`, `"أفعال"`, `"ردود_أفعال"`

ملاحظة: مفاتيح القواميس ينبغي أن تكون نصوصاً صريحة (strings) مثل `"states"` أو `"حالات"`.

افتراضياً القيم رقمية ضبابية ضمن [0.0 .. 1.0] ويتم قصّها تلقائياً؛ ويمكن تعريف أنواع اختيارية تجعل بعض القيم غير محدودة (numeric) أو ذات نطاق مخصص (bounded).

---

## Basic Syntax — البنية الأساسية

مثال عربي مختصر:

```bayan
hybrid {
    # تعريف كيانين
    كيان أحمد { "حالات": {"جوع": 0.6} }
    كيان محمد { "أفعال": {
        "تقديم_وجبة": {"قوة": 1.0, "تأثيرات": [ {"on": "جوع", "formula": "value - 0.4*action_value"} ] }
    }}

    # تطبيق فعل على هدف
    طبق محمد.تقديم_وجبة(أحمد, قيمة_الفعل=1.0)
}

# الاستعلام (خارج الكتلة) كي يكون هو النتيجة الراجعة من البرنامج
query state("أحمد", "جوع", ?V).
```

English variant:

```bayan
hybrid {
    entity Ahmed { "states": {"hunger": 0.6} }
    entity John  { "actions": {
        "feed": {"power": 1.0, "effects": [ {"on": "hunger", "formula": "value - 0.4*action_value"} ] }
    }}

    apply John.feed(Ahmed, action_value=1.0)
}

query state("Ahmed", "hunger", ?V).
```

---

## Entity Body — محتوى الكيان
يدعم المفاتيح التالية (باللغتين):
- states | "حالات": قاموس لحالات الكيان (0..1)
- properties | "خصائص": قاموس لخصائص شبه ثابتة (0..1)
- actions | "أفعال": أفعال يملكها الفاعل (Actor)
  - داخل كل فعل:
    - power | "قوة": رقم 0..1 يؤثر في شدة التأثير
    - effects | "تأثيرات": قائمة تأثيرات، كل تأثير كائن JSON-like:
      - on: مفتاح الحالة المتأثرة عند الهدف
      - formula: معادلة نصية مبسطة (ترى أدناه)
      - condition (اختياري): شرط تفعيل التأثير
- reactions | "ردود_أفعال": ردود فعل لدى الهدف عند استقبال فعل معيّن
  - sensitivity: حساسية (0..1)
  - response: تعبير بسيط من الشكل `STATE += expr` أو `STATE -= expr`

مثال مختصر لرد فعل:

```bayan
كيان أحمد { "حالات": {"سعادة": 0.5}, "ردود_أفعال": {
  "تقديم_وجبة": {"sensitivity": 0.7, "response": "سعادة += sensitivity*0.3"}
}}
```

---

## Effect Formula — معادلة التأثير الآمنة
داخل `formula` و`condition` تتوفر أسماء:
- `value` (القيمة الحالية للحالة)
- `action_value` (القيمة الممرّرة إلى apply)
- `power` (قوة الفعل)
- `sensitivity` (حساسية الهدف)

وتتوفر دوال: `min`, `max`, `clamp(x, lo, hi)`, `sqrt`, `rand()`.

أمثلة:
- "value - 0.4*action_value"
- "clamp(value + power*0.2, 0, 1)"
- شرط: "value > 0.3"

افتراضياً تُقصّ نتائج التأثير إلى [0..1] (نوع fuzzy). إذا عرّفت نوع "numeric" فلن يُطبَّق قصّ، وإذا عرّفت نوعاً "bounded" فسيُقصّ إلى [min,max].

---
## Property/State Types (Optional) — أنواع الخصائص/الحالات (اختياري)
By default all values are fuzzy [0..1]. You can opt into other kinds per key:
- fuzzy (default): clamped to [0..1]
- numeric: unbounded real numbers (e.g., coordinates x,y)
- bounded[min,max]: custom range (e.g., temperature)

Use a typed entry with a small object: {"type": ..., "value": ...}. Arabic keys are accepted: "نوع" و"قيمة".

Example (EN):

```bayan
hybrid {
  entity Ball {
    "properties": {
      "x": {"type": "numeric", "value": 10.5},
      "y": {"type": "numeric", "value": -3.2}
    },
    "states": {
      "energy": {"type": "fuzzy", "value": 0.7},
      "temperature": {"type": {"bounded": [-273.0, 1000.0]}, "value": 25.0}
    }
  }
}
```

مثال (AR):

```bayan
hybrid {
  كيان كرة {
    "خصائص": {
      "س": {"نوع": "عددي", "قيمة": 10.5},
      "ص": {"نوع": "عددي", "قيمة": -3.2}
    },
    "حالات": {
      "طاقة": {"نوع": "ضبابي", "قيمة": 0.7},
      "درجة_الحرارة": {"نوع": {"نطاق": [-273.0, 1000.0]}, "قيمة": 25.0}
    }
  }
}
```

Runtime behavior — السلوك أثناء التنفيذ:
- fuzzy: values auto-clamped to [0..1]
- numeric: no clamping
- bounded: auto-clamped to [min,max]


## Logic Integration — التكامل مع المنطق
محرك الكيانات يزامن الحقائق التالية مع قاعدة المعرفة المنطقية:
- `entity(Name).`
- `state(Entity, Key, Value).`
- `property(Entity, Key, Value).`
- `event(Actor, Action, Target, ActionValue).`
- `changed(Target, Key, Old, New).`

لذلك يمكنك الاستعلام مباشرةً:

```bayan
query state("Ahmed", "hunger", ?V).
```

---

## Best Practices — أفضل الممارسات
- استخدم أسماء حالات وخصائص واضحة ودلالية.
- عرّف التأثيرات بصيغ بسيطة قابلة للتحقق.
- ضع الاستعلامات خارج كتلة `hybrid {}` إذا أردت أن تكون النتيجة النهائية للبرنامج.
- استعمل مفاتيح نصية صريحة في القواميس: "states"/"حالات" إلخ.
- اختبر تفاعلاتك تدريجياً، وتحقق من حقائق `changed/4` و`event/4` لتتبع الأثر.

---

## Notes — ملاحظات
- الكلمات المفتاحية ثنائية اللغة: `entity` ⇄ `كيان`، و`apply` ⇄ `طبق`.
- أسماء الكيانات والأفعال يمكن أن تكون عربية بالكامل (مسموح كمعرفات).
- القيم ضبابية ضمن [0..1] ويتم قصّها تلقائياً.

