"""
Tests for equation/constraint system: defining equations between states/properties
and verifying automatic enforcement after updates.
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


def test_equation_complement_state_ar():
    code = """
    hybrid {
      كيان الطقس { "حالات": {"حر": {"نوع": "ضبابي", "قيمة": 0.0},
                               "برد": {"نوع": "ضبابي", "قيمة": 1.0} } }

      # معادلة: حر = 1 - برد
      عرّف_معادلة("الطقس", "حالة", "حر", "1 - برد")

      # تغيير البرد يفعّل المعادلة لتحديث حر
      عين_حالة("الطقس", "برد", 0.2)
    }

    query state("الطقس", "حر", ?H).
    """
    interp, res = run(code)
    assert res and 'H' in res[0]
    H = getattr(res[0]['H'], 'value', res[0]['H'])
    assert abs(H - 0.8) < 1e-6


def test_equation_complement_property_en():
    code = """
    hybrid {
      entity Light { "properties": {"on": {"type": "fuzzy", "value": 0.0},
                                     "off": {"type": "fuzzy", "value": 1.0} } }

      # Equation: on = 1 - off
      define_equation("Light", "property", "on", "1 - off")

      set_property("Light", "off", 0.3)
    }

    query property("Light", "on", ?V).
    """
    interp, res = run(code)
    assert res and 'V' in res[0]
    V = getattr(res[0]['V'], 'value', res[0]['V'])
    assert abs(V - 0.7) < 1e-6




def test_define_opposites_helpers():
    code = """
    hybrid {
      entity Light { "properties": {"on": {"type": "fuzzy", "value": 0.0},
                                     "off": {"type": "fuzzy", "value": 1.0} } }

      define_opposites("Light", "property", "on", "off", 1.0)
      set_property("Light", "off", 0.25)
    }

    query property("Light", "on", ?V).
    """
    interp, res = run(code)
    V = getattr(res[0]['V'], 'value', res[0]['V'])
    assert abs(V - 0.75) < 1e-6
