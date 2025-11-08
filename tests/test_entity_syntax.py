"""
Entity syntax tests for Bayan: bilingual keywords and body keys
- Arabic: كيان / طبق، حالات/خصائص/أفعال/ردود_أفعال
- English: entity / apply, states/properties/actions/reactions
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


def test_entity_apply_arabic_keywords():
    code = """
    hybrid {
        # تعريف كيانين
        كيان أحمد { "حالات": {"جوع": 0.6} }
        كيان محمد { "أفعال": {
            "تقديم_وجبة": {"قوة": 1.0, "تأثيرات": [ {"on": "جوع", "formula": "value - 0.4*action_value"} ] }
        }}

        # تطبيق الفعل: محمد يقدم وجبة لأحمد
        طبق محمد.تقديم_وجبة(أحمد, قيمة_الفعل=1.0)

    }
    # الاستعلام عن قيمة الجوع بعد التأثير
    query state("أحمد", "جوع", ?V).
    """
    _, result = run(code)
    assert isinstance(result, list) and result, "Expected non-empty query results"
    v = result[0].get('V')
    num = getattr(v, 'value', v)
    assert abs(num - 0.2) < 1e-6, f"Expected hunger 0.2, got {v}"


def test_entity_apply_english_keywords():
    code = """
    hybrid {
        entity Ahmed { "states": {"hunger": 0.6} }
        entity John  { "actions": {
            "feed": {"power": 1.0, "effects": [ {"on": "hunger", "formula": "value - 0.4*action_value"} ] }
        }}

        apply John.feed(Ahmed, action_value=1.0)
    }

    query state("Ahmed", "hunger", ?V).
    """
    _, result = run(code)
    assert isinstance(result, list) and result, "Expected non-empty query results"
    v = result[0].get('V')
    num = getattr(v, 'value', v)
    assert abs(num - 0.2) < 1e-6, f"Expected hunger 0.2, got {v}"

