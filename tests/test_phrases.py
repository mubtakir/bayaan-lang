from bayan.bayan import HybridLexer, HybridParser, HybridInterpreter
from bayan.bayan.logical_engine import Predicate, Term


def run(code: str):
    lexer = HybridLexer(code)
    tokens = lexer.tokenize()
    parser = HybridParser(tokens)
    program = parser.parse()
    interp = HybridInterpreter()
    interp.interpret(program)
    return interp.logical


def test_phrase_isa_and_unary():
    code = """
    hybrid {
      phrase("محمد الطبيب", relation="isa")
    }
    """
    logical = run(code)
    sols = logical.query(Predicate("isa", [Term("محمد", False), Term("طبيب", False)]))
    assert len(sols) == 1
    # unary predicate الجسر
    sols2 = logical.query(Predicate("طبيب", [Term("محمد", False)]))
    assert len(sols2) == 1


def test_phrase_of():
    code = """
    hybrid {
      phrase("عصير العنب", relation="of")
    }
    """
    logical = run(code)
    sols = logical.query(Predicate("of", [Term("عصير", False), Term("X", True)]))
    assert len(sols) == 1
    xv = sols[0].lookup("X")
    xv = getattr(xv, 'value', xv)
    assert xv == "عنب"


def test_phrase_belongs_owner():
    code = """
    hybrid {
      phrase("مالك البيت", relation="belongs")
    }
    """
    logical = run(code)
    # belongs_to(البيت -> stripped to "بيت"), owner="مالك"
    sols1 = logical.query(Predicate("belongs_to", [Term("بيت", False), Term("مالك", False)]))
    assert len(sols1) == 1
    sols2 = logical.query(Predicate("owner_of", [Term("مالك", False), Term("بيت", False)]))
    assert len(sols2) == 1




def test_nominal_phrase_sugar_with_dot_and_relation_brackets():
    code = """
    hybrid {
      محمد الطبيب.
      عصير العنب[of].
      مالك البيت[belongs].
    }
    """
    logical = run(code)
    # isa
    sols_isa = logical.query(Predicate("isa", [Term("محمد", False), Term("طبيب", False)]))
    assert len(sols_isa) == 1
    # of
    sols_of = logical.query(Predicate("of", [Term("عصير", False), Term("X", True)]))
    assert len(sols_of) == 1
    xv = sols_of[0].lookup("X"); xv = getattr(xv, 'value', xv)
    assert xv == "عنب"
    # belongs (مالك البيت)
    sols_b = logical.query(Predicate("belongs_to", [Term("بيت", False), Term("مالك", False)]))
    assert len(sols_b) == 1


def test_nominal_phrase_head_hint():
    code = """
    hybrid {
      define_head_template("مالك", "belongs", order="BA")
      مالك البيت.
    }
    """
    logical = run(code)
    sols_b = logical.query(Predicate("belongs_to", [Term("بيت", False), Term("مالك", False)]))
    assert len(sols_b) == 1


def test_nominal_phrase_custom_template_via_brackets():
    code = """
    hybrid {
      define_nominal_template("ملك", relation="belongs", order="BA")
      مالك البيت[ملك].
    }
    """
    logical = run(code)
    sols_b = logical.query(Predicate("belongs_to", [Term("بيت", False), Term("مالك", False)]))
    assert len(sols_b) == 1
