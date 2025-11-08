"""
Entity Engine for Bayan Language
محرك الكيانات للغة بيان

Purpose
- Maintain entities with fuzzy states/properties [0..1]
- Define actions with effects and optional conditions
- Apply actions (actor -> action -> target) and update states
- Mirror states/properties as logical facts so they are queryable:
    - entity(Name).
    - state(Entity, Key, Value).
    - property(Entity, Key, Value).
    - event(Actor, Action, Target, Value).

This is a conservative library layer (no syntax changes). You can use it from
traditional Bayan code and query results in logic blocks or query expressions.

Example (inside a Bayan program):
    engine = EntityEngine(logical)
    engine.create_entity("أحمد", states={"جوع": 0.6})
    engine.create_entity("محمد")
    engine.define_action("محمد", "تقديم_وجبة", effects=[{"on": "جوع", "formula": "value - 0.4*action_value"}])
    engine.apply_action("محمد", "تقديم_وجبة", "أحمد", action_value=1.0)
    # Then you can query: result = query state("أحمد", "جوع", ?V)?
"""
from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any, Dict, List, Optional
import ast as _ast
import math as _math
import random as _random

from .logical_engine import Term, Predicate, Fact


# ----------------------------- Utilities ---------------------------------

def _clamp(x: float, lo: float = 0.0, hi: float = 1.0) -> float:
    return max(lo, min(hi, float(x)))


class _SafeExpr:
    """Very small safe arithmetic evaluator for effect formulas.
    Allowed:
      - Numbers, + - * / **, parentheses, unary +/-, names: value, action_value, power, sensitivity
      - Functions: min, max, clamp, sqrt, rand() (uniform 0..1)
    """

    ALLOWED_FUNCS = {
        'min': min,
        'max': max,
        'clamp': _clamp,
        'sqrt': _math.sqrt,
        'rand': lambda: _random.random(),
    }

    @classmethod
    def eval(cls, expr: str, variables: Dict[str, Any]) -> float:
        node = _ast.parse(expr, mode='eval')
        return float(cls._eval_node(node.body, variables))

    @classmethod
    def _eval_node(cls, node, vars):
        if isinstance(node, _ast.Constant):
            if isinstance(node.value, (int, float)):
                return node.value
            raise ValueError("Only numeric constants allowed")
        if isinstance(node, _ast.Name):
            if node.id in vars:
                return vars[node.id]
            if node.id in cls.ALLOWED_FUNCS and callable(cls.ALLOWED_FUNCS[node.id]):
                # zero-arg call form like rand used without () is not allowed
                raise ValueError("Function name used without call")
            raise ValueError(f"Unknown name: {node.id}")
        if isinstance(node, _ast.BinOp):
            left = cls._eval_node(node.left, vars)
            right = cls._eval_node(node.right, vars)
            if isinstance(node.op, _ast.Add):
                return left + right
            if isinstance(node.op, _ast.Sub):
                return left - right
            if isinstance(node.op, _ast.Mult):
                return left * right
            if isinstance(node.op, _ast.Div):
                return left / right
            if isinstance(node.op, _ast.Pow):
                return left ** right
            raise ValueError("Operator not allowed")
        if isinstance(node, _ast.UnaryOp) and isinstance(node.op, (_ast.UAdd, _ast.USub)):
            val = cls._eval_node(node.operand, vars)
            return +val if isinstance(node.op, _ast.UAdd) else -val
        if isinstance(node, _ast.Call):
            if not isinstance(node.func, _ast.Name):
                raise ValueError("Only simple function calls allowed")
            fname = node.func.id
            if fname not in cls.ALLOWED_FUNCS:
                raise ValueError(f"Function not allowed: {fname}")
            if node.keywords:
                raise ValueError("No keyword args allowed in formulas")
            args = [cls._eval_node(a, vars) for a in node.args]
            func = cls.ALLOWED_FUNCS[fname]
            return func(*args)
        if isinstance(node, _ast.Expr):
            return cls._eval_node(node.value, vars)
        raise ValueError("Unsupported expression in formula")


# ------------------------------ Data -------------------------------------

@dataclass
class _ActionEffect:
    on: str  # state key to affect
    formula: str  # expression string using names: value, action_value, power, sensitivity
    condition: Optional[str] = None  # optional expression returning truthy

@dataclass
class _Reaction:
    sensitivity: float = 1.0
    response: Optional[str] = None  # e.g., "غضب += 0.5" or "ثقة += sensitivity*action_value"

@dataclass
class _Entity:
    name: str
    states: Dict[str, float] = field(default_factory=dict)
    properties: Dict[str, float] = field(default_factory=dict)
    actions: Dict[str, Dict[str, Any]] = field(default_factory=dict)  # action_name -> {power, effects: List[_ActionEffect]}
    reactions: Dict[str, _Reaction] = field(default_factory=dict)     # action_name -> Reaction on receiving


# --------------------------- Entity Engine --------------------------------

class EntityEngine:
    def __init__(self, logical_engine):
        if logical_engine is None:
            raise ValueError("EntityEngine requires a logical engine (pass 'logical')")
        self.logical = logical_engine
        self.entities: Dict[str, _Entity] = {}

    # --------- Logical KB helpers ---------
    def _assert_fact(self, name: str, *args: Any) -> None:
        terms = [Term(a, is_variable=False) for a in args]
        self.logical.add_fact(Fact(Predicate(name, terms)))

    def _retractall(self, name: str, *args: Any) -> None:
        # Replace any wildcard with a fresh variable; concrete constants keep as-is
        subterms = []
        for a in args:
            if a is None:
                # variable to match anything
                subterms.append(Term('X', is_variable=True))
            else:
                subterms.append(Term(a, is_variable=False))
        self.logical.retractall(Predicate(name, subterms))

    def _sync_entity_facts(self, ent: _Entity) -> None:
        # entity(Name).
        self._retractall('entity', ent.name)
        self._assert_fact('entity', ent.name)
        # states
        for k, v in ent.states.items():
            self._retractall('state', ent.name, k, None)
            self._assert_fact('state', ent.name, k, float(v))
        # properties
        for k, v in ent.properties.items():
            self._retractall('property', ent.name, k, None)
            self._assert_fact('property', ent.name, k, float(v))

    # ------------- API -------------
    def create_entity(self, name: str, *, states: Optional[Dict[str, float]] = None,
                      properties: Optional[Dict[str, float]] = None,
                      reactions: Optional[Dict[str, Dict[str, Any]]] = None) -> None:
        ent = _Entity(name=name)
        if states:
            ent.states = {k: _clamp(v) for k, v in states.items()}
        if properties:
            ent.properties = {k: _clamp(v) for k, v in properties.items()}
        if reactions:
            for act_name, spec in reactions.items():
                sens = float(spec.get('sensitivity', 1.0))
                resp = spec.get('response')
                ent.reactions[act_name] = _Reaction(sensitivity=_clamp(sens), response=resp)
        self.entities[name] = ent
        self._sync_entity_facts(ent)

    def set_state(self, name: str, key: str, value: float) -> float:
        ent = self.entities.setdefault(name, _Entity(name=name))
        ent.states[key] = _clamp(value)
        self._retractall('state', name, key, None)
        self._assert_fact('state', name, key, ent.states[key])
        return ent.states[key]

    def get_state(self, name: str, key: str, default: float = 0.5) -> float:
        ent = self.entities.get(name)
        if not ent:
            return _clamp(default)
        return float(ent.states.get(key, _clamp(default)))

    def set_property(self, name: str, key: str, value: float) -> float:
        ent = self.entities.setdefault(name, _Entity(name=name))
        ent.properties[key] = _clamp(value)
        self._retractall('property', name, key, None)
        self._assert_fact('property', name, key, ent.properties[key])
        return ent.properties[key]

    def define_action(self, actor_name: str, action_name: str, *, power: float = 1.0,
                      effects: List[Dict[str, Any]] | List[_ActionEffect]) -> None:
        ent = self.entities.setdefault(actor_name, _Entity(name=actor_name))
        eff_list: List[_ActionEffect] = []
        for e in effects:
            if isinstance(e, _ActionEffect):
                eff_list.append(e)
            else:
                eff_list.append(_ActionEffect(on=e['on'], formula=e['formula'], condition=e.get('condition')))
        ent.actions[action_name] = {"power": _clamp(power), "effects": eff_list}
        # No facts asserted for actions for now (could add action/2 later)

    def apply_action(self, actor_name: str, action_name: str, target_name: str, *, action_value: float = 1.0) -> Dict[str, float]:
        actor = self.entities.setdefault(actor_name, _Entity(name=actor_name))
        target = self.entities.setdefault(target_name, _Entity(name=target_name))
        spec = actor.actions.get(action_name)
        if not spec:
            raise ValueError(f"Unknown action '{action_name}' for actor '{actor_name}'")

        power = float(spec.get('power', 1.0))
        results: Dict[str, float] = {}

        # Reaction sensitivity on receiver
        reaction = target.reactions.get(action_name, _Reaction())
        sensitivity = float(reaction.sensitivity)

        for eff in spec['effects']:
            # Evaluate condition if present
            if eff.condition:
                cond_val = _SafeExpr.eval(eff.condition, {
                    'value': self.get_state(target_name, eff.on, 0.5),
                    'action_value': action_value,
                    'power': power,
                    'sensitivity': sensitivity,
                })
                if not cond_val:
                    continue

            old = self.get_state(target_name, eff.on, 0.5)
            new_val = _SafeExpr.eval(eff.formula, {
                'value': old,
                'action_value': action_value,
                'power': power,
                'sensitivity': sensitivity,
            })
            new_val = _clamp(new_val)
            self.set_state(target_name, eff.on, new_val)
            results[eff.on] = new_val
            # Record change as fact: changed(Target, Key, Old, New)
            self._assert_fact('changed', target_name, eff.on, float(old), float(new_val))

        # Apply simple reaction response if specified (STATE += expr or STATE -= expr)
        if reaction.response:
            key, op, expr = self._parse_response(reaction.response)
            base = self.get_state(target_name, key, 0.5)
            delta = _SafeExpr.eval(expr, {
                'action_value': action_value,
                'power': power,
                'sensitivity': sensitivity,
                'value': base,
            })
            if op == '+=':
                self.set_state(target_name, key, _clamp(base + delta))
                results[key] = self.get_state(target_name, key)
            elif op == '-=':
                self.set_state(target_name, key, _clamp(base - delta))
                results[key] = self.get_state(target_name, key)

        # Record event
        self._assert_fact('event', actor_name, action_name, target_name, float(action_value))
        return results

    @staticmethod
    def _parse_response(s: str) -> (str, str, str):
        # Very small parser for forms: "NAME += EXPR" or "NAME -= EXPR"
        if '+=' in s:
            parts = s.split('+=', 1)
            return parts[0].strip(), '+=', parts[1].strip()
        if '-=' in s:
            parts = s.split('-=', 1)
            return parts[0].strip(), '-=', parts[1].strip()
        # Fallback: treat as absolute assignment NAME = EXPR
        if '=' in s:
            parts = s.split('=', 1)
            return parts[0].strip(), '+=', parts[1].strip()  # emulate set by += expr-base in apply
        raise ValueError("Unsupported reaction response format")

