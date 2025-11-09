import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

# Ensure fresh import
import sys as _sys
_sys.modules.pop('bayan', None)
_sys.modules.pop('bayan.bayan', None)

from bayan.bayan import HybridLexer, HybridParser, HybridInterpreter
from bayan.bayan.logical_engine import Predicate, Term


def run(code: str):
    lexer = HybridLexer(code)
    tokens = lexer.tokenize()
    parser = HybridParser(tokens)
    ast = parser.parse()
    interp = HybridInterpreter()
    interp.traditional.set_source(code, filename=None)
    last = interp.interpret(ast)
    return interp, last


def test_attributes_and_is_with_unary_predicates():
    code = """
    hybrid {
      # محمد كريم، حكيم، شجاع
      assert_attrs("محمد", ["كريم", "حكيم", "شجاع"])
      # محمد الطبيب = محمد يكون طبيب
      assert_is("محمد", "طبيب")

      # Queries
      ?- attribute("محمد", ?Adj).
      ?- كريم("محمد").
      ?- isa("محمد", ?Klass).
      ?- طبيب("محمد").
    }
    """
    interp, results = run(code)
    logical = interp.logical

    # attribute("محمد", ?Adj) should yield 3 solutions
    sols1 = logical.query(Predicate("attribute", [Term("محمد", False), Term("Adj", True)]))
    assert len(sols1) == 3

    # isa("محمد", ?Klass) should include "طبيب"
    sols2 = logical.query(Predicate("isa", [Term("محمد", False), Term("Klass", True)]))
    kl = [s.lookup("Klass") for s in sols2]
    assert any((getattr(v, 'value', v) == "طبيب") for v in kl)

    # Unary predicates should work due to bridging asserts
    assert logical.query(Predicate("طبيب", [Term("محمد", False)]))
    assert logical.query(Predicate("كريم", [Term("محمد", False)]))


def test_of_from_and_belongs_owner():
    code = """
    hybrid {
      # عصير العنب = عصير من العنب
      assert_of("عصير", "العنب")
      # مالك البيت = البيت يعود لل مالك
      assert_belongs("البيت", "المالك")

      # Queries
      ?- of("عصير", ?X).
      ?- owner_of(?O, "البيت").
      ?- belongs_to("البيت", ?O).
    }
    """
    interp, _ = run(code)
    logical = interp.logical

    # of -> from
    sols1 = logical.query(Predicate("from", [Term("عصير", False), Term("X", True)]))
    assert len(sols1) == 1
    xv = sols1[0].lookup("X")
    xv = getattr(xv, 'value', xv)
    assert xv == "العنب"

    # belongs_to <-> owner_of
    sols2 = logical.query(Predicate("owner_of", [Term("O", True), Term("البيت", False)]))
    assert len(sols2) == 1
    o1 = sols2[0].lookup("O")
    o1 = getattr(o1, 'value', o1)
    assert o1 == "المالك"

    sols3 = logical.query(Predicate("belongs_to", [Term("البيت", False), Term("O", True)]))
    assert len(sols3) == 1
    o2 = sols3[0].lookup("O")
    o2 = getattr(o2, 'value', o2)
    assert o2 == "المالك"


def test_attribute_degrees_three_arity():
    code = """
    hybrid {
      assert_attrs("محمد", ["كريم:0.7", "شجاع.0.3"])  
      ?- attribute("محمد", ?A, ?V).
    }
    """
    interp, _ = run(code)
    logical = interp.logical
    sols = logical.query(Predicate("attribute", [Term("محمد", False), Term("A", True), Term("V", True)]))
    # Expect two entries with numeric-like V
    vals = [(s.lookup("A"), s.lookup("V")) for s in sols]
    # Values can be raw numbers or Terms; normalize
    def _val(x):
        return getattr(x, 'value', x)
    pairs = [( _val(a), float(_val(v)) ) for (a,v) in vals]
    pairs_dict = {a:v for (a,v) in pairs}
    assert "كريم" in pairs_dict and abs(pairs_dict["كريم"] - 0.7) < 1e-6
    assert "شجاع" in pairs_dict and abs(pairs_dict["شجاع"] - 0.3) < 1e-6

