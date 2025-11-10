#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Generate a 500-line bilingual alignment dataset for Bayan.
- Primary: JSONL (one object per line)
- Mirror: CSV
- Deterministic generation with seed=42

Schema per line:
{id, lang, natural_text, bayan_code, logic_explanation, entities, actions, states, split}

Splits: train (1..400), val (401..450), test (451..500)
"""
from __future__ import annotations
import csv
import json
import random
from dataclasses import dataclass
from pathlib import Path

random.seed(42)

OUT_DIR = Path(__file__).parent
JSONL_PATH = OUT_DIR / "sample_social_interactions.jsonl"
CSV_PATH = OUT_DIR / "sample_social_interactions.csv"

# Pools
AR_NAMES = [
    "أحمد", "محمد", "خالد", "سارة", "مريم", "ليلى", "يوسف", "نور", "علي", "فاطمة",
]
EN_NAMES = [
    "Ahmed", "Mohammed", "Khaled", "Sarah", "Maryam", "Layla", "Youssef", "Noor", "Ali", "Fatimah",
]

# Social actions/states
AR_SOCIAL_ACTIONS = [
    ("تقديم_وجبة", "الطعام يقلل الجوع ويزيد الامتنان", [("جوع", -0.4), ("امتنان", +0.3)]),
    ("مواساة", "المواساة تقلل الحزن", [("حزن", -0.3)]),
    ("تشجيع", "التشجيع يرفع الثقة", [("ثقة", +0.25)]),
    ("نصح", "النصح بالهدوء يحسن التركيز", [("تركيز", +0.2)]),
    ("اعتذار", "الاعتذار يقلل الغضب ويزيد الثقة قليلًا", [("غضب", -0.2), ("ثقة", +0.1)]),
    ("تهنئة", "التهنئة ترفع السعادة", [("سعادة", +0.2)]),
]
EN_SOCIAL_ACTIONS = [
    ("serve_meal", "Serving food reduces hunger and increases gratitude", [("hunger", -0.4), ("gratitude", +0.3)]),
    ("comfort", "Comforting reduces sadness", [("sadness", -0.3)]),
    ("encourage", "Encouragement increases trust", [("trust", +0.25)]),
    ("advise", "Advice to stay calm improves focus", [("focus", +0.2)]),
    ("apologize", "Apology reduces anger and slightly increases trust", [("anger", -0.2), ("trust", +0.1)]),
    ("congratulate", "Congratulations increase happiness", [("happiness", +0.2)]),
]

# Physical actions/states
AR_PHYS_ACTIONS = [
    ("دفع", "الدفع يزيد السرعة وفق القوة والكتلة", [("سرعة", +0.2), ("طاقة", -0.05)]),
    ("سحب", "السحب يغير السرعة وقد يقلل الطاقة", [("سرعة", +0.1), ("طاقة", -0.05)]),
    ("تسخين", "التسخين يرفع الحرارة", [("حرارة", +0.3), ("طاقة", -0.05)]),
    ("تبريد", "التبريد يخفض الحرارة", [("حرارة", -0.3)]),
    ("تسريع", "التسريع يرفع السرعة", [("سرعة", +0.25)]),
]
EN_PHYS_ACTIONS = [
    ("push", "Pushing increases speed based on force and mass", [("speed", +0.2), ("energy", -0.05)]),
    ("pull", "Pulling changes speed and may reduce energy", [("speed", +0.1), ("energy", -0.05)]),
    ("heat", "Heating raises temperature", [("temperature", +0.3), ("energy", -0.05)]),
    ("cool", "Cooling lowers temperature", [("temperature", -0.3)]),
    ("accelerate", "Acceleration raises speed", [("speed", +0.25)]),
]

AR_PHYS_ENTITIES = ["كرة", "جسم", "ماء", "صندوق", "سيارة", "كرة_معدنية"]
EN_PHYS_ENTITIES = ["Ball", "Object", "Water", "Box", "Car", "MetalBall"]

# Mixed templates (social cause -> physical or performance effect)
AR_MIXED = [
    ("مدرب", "عدّاء", "تشجيع", "سرعة", +0.2, "التشجيع يرفع سرعة العدّاء"),
    ("معلّم", "طالب", "نصح", "تركيز", +0.2, "النصح يحسن تركيز الطالب"),
    ("طبيب", "مريض", "طمأنة", "خوف", -0.25, "الطمأنة تقلل الخوف"),
]
EN_MIXED = [
    ("Coach", "Runner", "encourage", "speed", +0.2, "Encouragement increases runner speed"),
    ("Teacher", "Student", "advise", "focus", +0.2, "Advice improves student focus"),
    ("Doctor", "Patient", "reassure", "fear", -0.25, "Reassurance reduces fear"),
]

CONTEXTS_AR = ["في المدرسة", "في المستشفى", "في السوق", "في البيت", "في العمل", "في الحديقة"]
CONTEXTS_EN = ["at school", "at the hospital", "at the market", "at home", "at work", "in the park"]

@dataclass
class Example:
    id: str
    lang: str
    natural_text: str
    bayan_code: str
    logic_explanation: str
    entities: list[str]
    actions: list[str]
    states: list[str]
    split: str


def make_id(i: int) -> str:
    return f"ex{i:03d}"


def split_for(i: int) -> str:
    if i <= 400:
        return "train"
    elif i <= 450:
        return "val"
    return "test"


def clip_delta(x: float) -> float:
    # Keep magnitudes reasonable
    return round(max(-1.0, min(1.0, x)), 3)


def ar_social_example(i: int) -> Example:
    a, b = random.sample(AR_NAMES, 2)
    action, rationale, effects = random.choice(AR_SOCIAL_ACTIONS)
    # Pick one context
    ctx = random.choice(CONTEXTS_AR)
    # Build natural text
    nt = f"{a} {ctx} يقوم بفعل '{action}' مع {b}"
    # Build code/effects
    stmts = [f"{a}.{action}({b})"]
    states = []
    for st, delta in effects:
        op = "+=" if delta > 0 else "-="
        stmts.append(f"{b}.{st} {op} {abs(clip_delta(delta))}")
        states.append(st)
    code = "; ".join(stmts)
    return Example(
        id=make_id(i),
        lang="ar",
        natural_text=nt,
        bayan_code=code,
        logic_explanation=rationale,
        entities=[a, b],
        actions=[action],
        states=states,
        split=split_for(i),
    )


def en_social_example(i: int) -> Example:
    a, b = random.sample(EN_NAMES, 2)
    action, rationale, effects = random.choice(EN_SOCIAL_ACTIONS)
    ctx = random.choice(CONTEXTS_EN)
    nt = f"{a} {ctx} performs '{action}' with {b}"
    stmts = [f"{a}.{action}({b})"]
    states = []
    for st, delta in effects:
        op = "+=" if delta > 0 else "-="
        stmts.append(f"{b}.{st} {op} {abs(clip_delta(delta))}")
        states.append(st)
    code = "; ".join(stmts)
    return Example(
        id=make_id(i),
        lang="en",
        natural_text=nt,
        bayan_code=code,
        logic_explanation=rationale,
        entities=[a, b],
        actions=[action],
        states=states,
        split=split_for(i),
    )


def ar_physical_example(i: int) -> Example:
    obj = random.choice(AR_PHYS_ENTITIES)
    action, rationale, effects = random.choice(AR_PHYS_ACTIONS)
    ctx = random.choice(CONTEXTS_AR)
    nt = f"{ctx}: {action} على {obj}"
    stmts = [f"{obj}.{action}()"]
    states = []
    for st, delta in effects:
        op = "+=" if delta > 0 else "-="
        stmts.append(f"{obj}.{st} {op} {abs(clip_delta(delta))}")
        states.append(st)
    code = "; ".join(stmts)
    return Example(
        id=make_id(i),
        lang="ar",
        natural_text=nt,
        bayan_code=code,
        logic_explanation=rationale,
        entities=[obj],
        actions=[action],
        states=states,
        split=split_for(i),
    )


def en_physical_example(i: int) -> Example:
    obj = random.choice(EN_PHYS_ENTITIES)
    action, rationale, effects = random.choice(EN_PHYS_ACTIONS)
    ctx = random.choice(CONTEXTS_EN)
    nt = f"{ctx}: {action} on {obj}"
    stmts = [f"{obj}.{action}()"]
    states = []
    for st, delta in effects:
        op = "+=" if delta > 0 else "-="
        stmts.append(f"{obj}.{st} {op} {abs(clip_delta(delta))}")
        states.append(st)
    code = "; ".join(stmts)
    return Example(
        id=make_id(i),
        lang="en",
        natural_text=nt,
        bayan_code=code,
        logic_explanation=rationale,
        entities=[obj],
        actions=[action],
        states=states,
        split=split_for(i),
    )


def ar_mixed_example(i: int) -> Example:
    a, b, action, st, delta, rationale = random.choice(AR_MIXED)
    ctx = random.choice(CONTEXTS_AR)
    nt = f"{ctx}: {a} يقوم بـ{action} لـ {b}"
    stmts = [f"{a}.{action}({b})", f"{b}.{st} {'+=' if delta>0 else '-='} {abs(clip_delta(delta))}"]
    code = "; ".join(stmts)
    return Example(
        id=make_id(i),
        lang="ar",
        natural_text=nt,
        bayan_code=code,
        logic_explanation=rationale,
        entities=[a, b],
        actions=[action],
        states=[st],
        split=split_for(i),
    )


def en_mixed_example(i: int) -> Example:
    a, b, action, st, delta, rationale = random.choice(EN_MIXED)
    ctx = random.choice(CONTEXTS_EN)
    nt = f"{ctx}: {a} performs {action} for {b}"
    stmts = [f"{a}.{action}({b})", f"{b}.{st} {'+=' if delta>0 else '-='} {abs(clip_delta(delta))}"]
    code = "; ".join(stmts)
    return Example(
        id=make_id(i),
        lang="en",
        natural_text=nt,
        bayan_code=code,
        logic_explanation=rationale,
        entities=[a, b],
        actions=[action],
        states=[st],
        split=split_for(i),
    )


def gen_examples(n: int = 500) -> list[Example]:
    examples: list[Example] = []
    # Distribution: 40% social, 30% physical, 30% mixed
    n_social = int(0.40 * n)
    n_physical = int(0.30 * n)
    n_mixed = n - n_social - n_physical

    # Build type schedule and language alternation
    schedule = (["social"] * n_social) + (["physical"] * n_physical) + (["mixed"] * n_mixed)
    random.shuffle(schedule)

    for i in range(1, n + 1):
        t = schedule[i - 1]
        lang = "ar" if (i % 2 == 1) else "en"  # alternate for balance
        if t == "social":
            ex = ar_social_example(i) if lang == "ar" else en_social_example(i)
        elif t == "physical":
            ex = ar_physical_example(i) if lang == "ar" else en_physical_example(i)
        else:  # mixed
            ex = ar_mixed_example(i) if lang == "ar" else en_mixed_example(i)
        examples.append(ex)
    # Sort by id for stable splits
    examples.sort(key=lambda e: e.id)
    return examples


def write_jsonl(examples: list[Example], path: Path) -> None:
    with path.open("w", encoding="utf-8", newline="\n") as f:
        for ex in examples:
            obj = {
                "id": ex.id,
                "lang": ex.lang,
                "natural_text": ex.natural_text,
                "bayan_code": ex.bayan_code,
                "logic_explanation": ex.logic_explanation,
                "entities": ex.entities,
                "actions": ex.actions,
                "states": ex.states,
                "split": ex.split,
            }
            # ensure_ascii=False to keep Arabic readable
            f.write(json.dumps(obj, ensure_ascii=False) + "\n")


def write_csv(examples: list[Example], path: Path) -> None:
    header = [
        "natural_text",
        "bayan_code",
        "logic_explanation",
        "lang",
        "entities",
        "actions",
        "states",
        "split",
        "id",
    ]
    with path.open("w", encoding="utf-8", newline="") as f:
        w = csv.writer(f)
        w.writerow(header)
        for ex in examples:
            w.writerow([
                ex.natural_text,
                ex.bayan_code,
                ex.logic_explanation,
                ex.lang,
                json.dumps(ex.entities, ensure_ascii=False),
                json.dumps(ex.actions, ensure_ascii=False),
                json.dumps(ex.states, ensure_ascii=False),
                ex.split,
                ex.id,
            ])


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    examples = gen_examples(500)
    write_jsonl(examples, JSONL_PATH)
    write_csv(examples, CSV_PATH)
    # Quick validation
    assert JSONL_PATH.exists() and CSV_PATH.exists()
    # Ensure 500 lines
    with JSONL_PATH.open("r", encoding="utf-8") as f:
        cnt = sum(1 for _ in f)
    assert cnt == 500, f"Expected 500 lines, got {cnt}"
    print("Generated:", JSONL_PATH, CSV_PATH)


if __name__ == "__main__":
    main()

