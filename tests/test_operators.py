"""
Tests for linguistic operator wrappers (Go/اذهب etc.) which are thin wrappers over perform().
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


def test_operator_go_en():
    code = """
    hybrid {
      entity Ahmed {
        "properties": {"x": {"type": "numeric", "value": 0.0}},
        "actions": {"go": {"effects": [{"on": "x", "formula": "value + 3*sensitivity"}]}}
      }
      Go(["Ahmed.0.5"])  # x += 1.5
    }
    query property("Ahmed", "x", ?X).
    """
    interp, res = run(code)
    assert res and 'X' in res[0]
    X = getattr(res[0]['X'], 'value', res[0]['X'])
    assert abs(X - 1.5) < 1e-6


def test_operator_go_ar():
    code = """
    hybrid {
      كيان أحمد {
        "خصائص": {"س": {"نوع": "عددي", "قيمة": 0.0}},
        "أفعال": {"اذهب": {"تأثيرات": [{"on": "س", "formula": "value + 2*sensitivity"}]}}
      }
      اذهب(["أحمد.0.5"])  # س += 1.0
    }
    query property("أحمد", "س", ?X).
    """
    interp, res = run(code)
    assert res and 'X' in res[0]
    X = getattr(res[0]['X'], 'value', res[0]['X'])
    assert abs(X - 1.0) < 1e-6

