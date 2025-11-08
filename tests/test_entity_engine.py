"""
EntityEngine integration tests


- Creates entities and actions
- Applies action and verifies logical query sees updated state
"""

import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))
import importlib
# Ensure we import the local package, not any globally installed package with same name
import sys as _sys
_sys.modules.pop('bayan', None)
_sys.modules.pop('bayan.bayan', None)


from bayan.bayan import HybridLexer, HybridParser, HybridInterpreter

def run(code: str):
    lexer = HybridLexer(code)
    tokens = lexer.tokenize()
    parser = HybridParser(tokens)
    ast = parser.parse()
    interp = HybridInterpreter()
    interp.traditional.set_source(code, filename=None)
    last = interp.interpret(ast)
    return interp, last


def test_entity_engine_action_updates_state_and_is_queryable():
    code = """
    # Create engine bound to logical engine
    engine = EntityEngine(logical)
    # Entities
    engine.create_entity("أحمد", states={"جوع": 0.6})
    engine.create_entity("محمد")
    # Define action on actor: تقديم_وجبة reduces target's جوع by 0.4 * action_value
    engine.define_action("محمد", "تقديم_وجبة", effects=[{"on": "جوع", "formula": "value - 0.4*action_value"}])
    # Apply: محمد يقدم وجبة لأحمد
    engine.apply_action("محمد", "تقديم_وجبة", "أحمد", action_value=1.0)

    # Query updated state via logic
    query state("أحمد", "جوع", ?V).
    """
    interp, result = run(code)
    assert isinstance(result, list) and result, "Expected non-empty query results"
    v = result[0].get('V')
    num = getattr(v, 'value', v)
    assert abs(num - 0.2) < 1e-6, f"Expected hunger 0.2, got {v}"


def test_entity_engine_reaction_response():
    code = """
    engine = EntityEngine(logical)
    # Target has a reaction to this action: increase سعادة by sensitivity * 0.3
    engine.create_entity("أحمد", states={"جوع": 0.6}, reactions={"تقديم_وجبة": {"sensitivity": 0.7, "response": "سعادة += sensitivity*0.3"}})
    engine.create_entity("محمد")

    engine.define_action("محمد", "تقديم_وجبة", effects=[{"on": "جوع", "formula": "value - 0.4*action_value"}])
    engine.apply_action("محمد", "تقديم_وجبة", "أحمد", action_value=1.0)

    # Check سعادة increase: 0.5 default + 0.21 = 0.71
    query state("أحمد", "سعادة", ?S).
    """
    interp, resS = run(code)
    assert resS, "Expected non-empty query results"
    s = resS[0]['S']
    sval = getattr(s, 'value', s)
    assert abs(sval - 0.71) < 1e-6

