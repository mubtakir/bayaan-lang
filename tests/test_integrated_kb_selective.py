import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))
from bayan import HybridLexer, HybridParser, HybridInterpreter


def run(code: str) -> HybridInterpreter:
    lexer = HybridLexer(code)
    tokens = lexer.tokenize()
    parser = HybridParser(tokens)
    ast = parser.parse()
    intr = HybridInterpreter()
    intr.interpret(ast)
    return intr


def test_kb_load_selective_prob_only():
    code = """
    import nlp_bayan.core.integrated_kb as kb
    hybrid {
        kb.load_selective(logical, ["prob"])
    }
    """
    intr = run(code)
    kb = intr.logical.knowledge_base
    assert "prob" in kb
    assert "threshold" in kb
    assert "maybe" in kb and "likely" in kb
    # family predicates should not be loaded
    assert "parent" not in kb
    assert "grandparent" not in kb
    assert "ancestor" not in kb


def test_kb_load_selective_prob_and_family():
    code = """
    import nlp_bayan.core.integrated_kb as kb
    hybrid {
        kb.load_selective(logical, ["prob", "family"])
    }
    """
    intr = run(code)
    kb = intr.logical.knowledge_base
    # both prob and family should be present
    for p in ("prob", "threshold", "maybe", "likely", "parent", "grandparent", "ancestor"):
        assert p in kb


if __name__ == "__main__":
    # Allow running this test file directly without pytest
    test_kb_load_selective_prob_only()
    print("✓ test_kb_load_selective_prob_only passed")
    test_kb_load_selective_prob_and_family()
    print("✓ test_kb_load_selective_prob_and_family passed")
    print("\n✅ All selective KB tests passed!")

