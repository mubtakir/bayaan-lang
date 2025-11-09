"""
Tests for event history logging and pronoun aliases for last participants.
"""

import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

# Ensure we import local package, not any globally installed one
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


def test_event_log_and_pronoun_aliases():
    code = """
    hybrid {
      entity Ahmed { "properties": {"x": {"type": "numeric", "value": 0.0}},
                     "actions": {"go": {"effects": [{"on": "x", "formula": "value + 2*sensitivity"}]}} }
      entity Ali   { "properties": {"x": {"type": "numeric", "value": 1.0}} }

      perform("go", ["Ahmed:1.0", "Ali:0.5"])     # Ahmed->Ahmed and Ahmed->Ali
      perform("go", ["they:0.2"])                   # reuse last via EN pronoun alias
    }
    """
    interp, _ = run(code)
    engine = interp._get_or_create_engine()

    # Last participants should be Ahmed, Ali
    assert engine._last_participants == ["Ahmed", "Ali"]

    # Four events: (Ahmed->Ahmed), (Ahmed->Ali), then same again via pronoun
    evts = engine.events
    assert len(evts) == 4
    assert evts[-1]['actor'] == 'Ahmed'
    assert evts[-1]['action'] == 'go'
    assert evts[-1]['target'] == 'Ali'
    assert abs(float(evts[-1]['sensitivity']) - 0.2) < 1e-9
    # There should be at least one change record
    assert evts[-1]['changes'] and isinstance(evts[-1]['changes'][0], dict)


def test_event_helpers_and_arabic_pronoun():
    code = """
    hybrid {
      entity Ahmed { "properties": {"x": {"type": "numeric", "value": 0.0}},
                     "actions": {"go": {"effects": [{"on": "x", "formula": "value + sensitivity"}]}} }
      entity Ali   { "properties": {"x": {"type": "numeric", "value": 1.0}} }

      perform("go", ["Ahmed:1.0", "Ali:0.5"])     
      perform("go", ["\u0647\u0645:0.4"])           # Arabic pronoun (hum)
    }
    """
    interp, _ = run(code)
    env = interp.traditional.global_env
    # Get events via helper and filter by target 'Ali'
    get_events = env['events']
    evts_ali = get_events(target='Ali')
    assert evts_ali and evts_ali[-1]['target'] == 'Ali'
    # last_participants helper
    last = env['last_participants']()
    assert last == ['Ahmed', 'Ali']

