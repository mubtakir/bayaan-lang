import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

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


def test_define_operator_en():
    code = """
    hybrid {
      entity Pusher { "properties": {"x": {"type": "numeric", "value": 0.0}},
                      "actions": {"go": {"effects": [{"on": "x", "formula": "value + sensitivity"}]}} }
      entity Box    { "properties": {"x": {"type": "numeric", "value": 1.0}} }

      define_operator("Push", action="go")
      Push(["Pusher:1.0", "Box:0.5"], value=1.0)
    }
    """
    interp, _ = run(code)
    engine = interp._get_or_create_engine()
    # Verify last participants and events created
    assert engine._last_participants == ["Pusher", "Box"]
    assert engine.events and engine.events[-1]['action'] == 'go'


def test_define_operator_ar():
    code = """
    hybrid {
      كيان دافع { "خصائص": {"س": {"type": "numeric", "value": 0.0}},
                  "أفعال": {"اذهب": {"تأثيرات": [{"on": "س", "formula": "value + sensitivity"}]}} }
      كيان صندوق { "خصائص": {"س": {"type": "numeric", "value": 1.0}} }

      عرّف_مشغل("ادفع", action="اذهب")
      ادفع(["دافع:1.0", "صندوق:0.5"], value=1.0)
    }
    """
    interp, _ = run(code)
    engine = interp._get_or_create_engine()
    assert engine._last_participants == ["دافع", "صندوق"]
    # Action stored is Arabic 'اذهب' because we mapped to that
    assert engine.events and engine.events[-1]['action'] == 'اذهب'

