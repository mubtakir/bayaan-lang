from bayan.bayan import HybridLexer, HybridParser, HybridInterpreter


def run_interp(code: str) -> HybridInterpreter:
    lexer = HybridLexer(code)
    tokens = lexer.tokenize()
    parser = HybridParser(tokens)
    program = parser.parse()
    interp = HybridInterpreter()
    interp.interpret(program)
    return interp


def test_data_csv_text_helpers():
    code = """
    import ai.data as data
    hybrid {
      txt = "a,b\n1,2\nx,y"
      rows1 = data.read_csv_string(txt, ",")
      rows2 = data.parse_csv_rows(["a,b", "1,2", "x,y"], ",")
      out1 = data.write_csv_string(rows1, ",")
      # Arabic wrappers
      rows3 = data.قراءة_CSV_نص(txt, ",")
      out2 = data.كتابة_CSV_نص(rows1, ",")
    }
    """
    interp = run_interp(code)
    env = interp.traditional.global_env
    rows1 = env.get('rows1'); rows2 = env.get('rows2'); rows3 = env.get('rows3')
    out1 = env.get('out1'); out2 = env.get('out2'); txt = env.get('txt')
    assert rows1 == rows2 == rows3
    assert out1 == txt == out2

