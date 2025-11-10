# Prompt Templates Usage Guide

## Goal
Provide a unified structure to feed models with human contexts that can be transformed into Bayaan entities, actions, and effects.

## Structure
- File format: strict JSON
- Core fields:
  - `logical_context`: describe entities with states/properties
  - `human_description`: natural description of the event
  - `expected_output`: { `action`, `value` (0..1), `effect` }

## Minimal Example
```json
{
  "logical_context": "Entity Ahmed { states: energy=0.6 }",
  "human_description": "Ahmed is tired after work",
  "expected_output": {
    "action": "rest",
    "value": 0.9,
    "effect": "Ahmed.energy = Ahmed.energy + 0.3"
  }
}
```

## Suggested Usage
1) Pick the suitable template (social/physical)
2) Fill fields with clear text and numeric values
3) Send outputs to a converter/evaluator later (to be added in eval_framework)

## Notes
- UTF-8 encoding
- Numeric values must be numbers (not strings)
- Separate multiple effects with `;` inside `effect`

