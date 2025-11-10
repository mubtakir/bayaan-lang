#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Evaluation metrics for Bayan datasets and (optionally) model predictions.

Two modes:
1) Dataset quality metrics (no predictions):
   - syntax_valid_rate (Bayan parser only, no execution)
   - logic checks (entities/actions/states presence; no_contradiction; all_pass_rate)
   - counts by language and split

2) Prediction metrics (optional, ref + pred):
   - action_suggestion_precision (micro-precision of predicted actions vs reference actions)
   - state_coverage_rate (aka causal_coverage proxy): fraction of reference states that are updated in predicted code

Predictions JSONL should align by id with reference and contain at least `id` and `bayan_code`.
"""
from __future__ import annotations

from dataclasses import dataclass
from typing import Dict, List, Tuple, Optional
import json
import re
from collections import Counter

from .syntax_checker import check_syntax
from .logic_validator import validate_example


# -- Utilities -----------------------------------------------------------------

def load_jsonl(path: str) -> List[Dict]:
    items: List[Dict] = []
    with open(path, "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
            items.append(json.loads(line))
    return items


CALL_RE = re.compile(r"([\w\u0600-\u06FF]+)\.([\w\u0600-\u06FF]+)\s*\(")
ASSIGN_POS_RE = re.compile(r"([\w\u0600-\u06FF]+)\s*\+=")
ASSIGN_NEG_RE = re.compile(r"([\w\u0600-\u06FF]+)\s*-=")
ASSIGN_EQ_RE = re.compile(r"([\w\u0600-\u06FF]+)\s*=(?!=)")  # '=' but not '=='


def extract_actions(code: str) -> List[str]:
    return [m.group(2) for m in CALL_RE.finditer(code or "")]


def extract_states(code: str) -> Tuple[set, set, set]:
    code = code or ""
    pos = {m.group(1) for m in ASSIGN_POS_RE.finditer(code)}
    neg = {m.group(1) for m in ASSIGN_NEG_RE.finditer(code)}
    eq = {m.group(1) for m in ASSIGN_EQ_RE.finditer(code)}
    return pos, neg, eq


# -- Dataset-only metrics -------------------------------------------------------

def dataset_quality_metrics(examples: List[Dict]) -> Dict:
    n = len(examples)
    langs = Counter(e.get("lang", "?") for e in examples)
    splits = Counter(e.get("split", "?") for e in examples)

    # Global counters
    ok_syntax = ent_ok = act_ok = st_ok = no_ctr = all_ok = 0

    # Grouped counters
    grp_lang: Dict[str, Dict[str, int]] = {}
    grp_split: Dict[str, Dict[str, int]] = {}

    def _ensure(d: Dict[str, Dict[str, int]], k: str) -> Dict[str, int]:
        if k not in d:
            d[k] = {"n": 0, "syn": 0, "ent": 0, "act": 0, "st": 0, "noc": 0, "all": 0}
        return d[k]

    # One pass
    for e in examples:
        code = e.get("bayan_code", "")
        lang = e.get("lang", "?")
        split = e.get("split", "?")

        syn_ok = check_syntax(code).ok
        ok_syntax += 1 if syn_ok else 0

        chk = validate_example(e)
        ent = 1 if chk.entities_ok else 0
        act = 1 if chk.actions_ok else 0
        stt = 1 if chk.states_ok else 0
        noc = 1 if chk.no_contradiction else 0
        allp = 1 if (ent and act and stt and noc) else 0

        ent_ok += ent
        act_ok += act
        st_ok += stt
        no_ctr += noc
        all_ok += allp

        gl = _ensure(grp_lang, lang)
        gs = _ensure(grp_split, split)
        gl["n"] += 1; gs["n"] += 1
        gl["syn"] += 1 if syn_ok else 0; gs["syn"] += 1 if syn_ok else 0
        gl["ent"] += ent; gs["ent"] += ent
        gl["act"] += act; gs["act"] += act
        gl["st"] += stt; gs["st"] += stt
        gl["noc"] += noc; gs["noc"] += noc
        gl["all"] += allp; gs["all"] += allp

    def rate(x: int, d: int | None = None) -> float:
        denom = n if d is None else d
        return round((x / denom) if denom else 0.0, 4)

    def pack_group(dd: Dict[str, Dict[str, int]]) -> Dict[str, Dict[str, float]]:
        out: Dict[str, Dict[str, float]] = {}
        for k, v in dd.items():
            nn = v.get("n", 0)
            out[k] = {
                "count": nn,
                "syntax_valid_rate": rate(v.get("syn", 0), nn),
                "logic": {
                    "entities_ok_rate": rate(v.get("ent", 0), nn),
                    "actions_ok_rate": rate(v.get("act", 0), nn),
                    "states_ok_rate": rate(v.get("st", 0), nn),
                    "no_contradiction_rate": rate(v.get("noc", 0), nn),
                    "all_pass_rate": rate(v.get("all", 0), nn),
                },
            }
        return out

    return {
        "counts": {"total": n, **dict(langs), **{f"split_{k}": v for k, v in splits.items()}},
        "syntax_valid_rate": rate(ok_syntax),
        "logic": {
            "entities_ok_rate": rate(ent_ok),
            "actions_ok_rate": rate(act_ok),
            "states_ok_rate": rate(st_ok),
            "no_contradiction_rate": rate(no_ctr),
            "all_pass_rate": rate(all_ok),
        },
        "per_lang": pack_group(grp_lang),
        "per_split": pack_group(grp_split),
    }


# -- Prediction metrics ---------------------------------------------------------

def align_by_id(ref: List[Dict], pred: List[Dict]) -> List[Tuple[Dict, Dict]]:
    m = {e.get("id"): e for e in pred}
    out: List[Tuple[Dict, Dict]] = []
    for r in ref:
        rid = r.get("id")
        if rid in m:
            out.append((r, m[rid]))
    return out


def prediction_metrics(ref: List[Dict], pred: List[Dict]) -> Dict:
    pairs = align_by_id(ref, pred)
    if not pairs:
        return {"pairs": 0}

    # Action micro-precision
    num_pred_actions = 0
    num_correct_actions = 0

    # State coverage (proxy for causal coverage)
    covered_states = 0
    total_ref_states = 0

    for r, p in pairs:
        ref_actions = set(r.get("actions", []) or [])
        pred_actions = extract_actions(p.get("bayan_code", ""))
        num_pred_actions += len(pred_actions)
        num_correct_actions += sum(1 for a in pred_actions if a in ref_actions)

        ref_states = set(r.get("states", []) or [])
        pos, neg, eq = extract_states(p.get("bayan_code", ""))
        pred_states = pos | neg | eq
        covered_states += len(ref_states & pred_states)
        total_ref_states += len(ref_states)

    action_precision = (num_correct_actions / num_pred_actions) if num_pred_actions else 0.0
    state_cov = (covered_states / total_ref_states) if total_ref_states else 0.0

    return {
        "pairs": len(pairs),
        "action_suggestion_precision": round(action_precision, 4),
        "state_coverage_rate": round(state_cov, 4),
        "causal_coverage": round(state_cov, 4),  # alias
    }


__all__ = [
    "load_jsonl",
    "dataset_quality_metrics",
    "prediction_metrics",
    "extract_actions",
    "extract_states",
]

