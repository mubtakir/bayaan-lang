from bayan.bayan import HybridLexer, HybridParser, HybridInterpreter


def run_interp(code: str) -> HybridInterpreter:
    lexer = HybridLexer(code)
    tokens = lexer.tokenize()
    parser = HybridParser(tokens)
    program = parser.parse()
    interp = HybridInterpreter()
    interp.interpret(program)
    return interp


def test_data_encoders_wave10():
    code = """
    from ai.data import label_encoder_fit, label_encoder_transform, frequency_encoder_fit, frequency_encoder_transform, target_encoder_fit, target_encoder_transform
    hybrid {
      # Label encoder
      cats = ["red", "blue", "red", "green"]
      vocab = label_encoder_fit(cats)
      idx = label_encoder_transform(cats, vocab)

      # Frequency encoder
      freqs = frequency_encoder_fit(cats)
      fvals = frequency_encoder_transform(["red", "blue", "blue", "x"], freqs)

      # Target encoder
      xs = ["a", "b", "a", "b", "c"]
      ys = [1.0, 0.0, 3.0, 1.0, 10.0]
      enc = target_encoder_fit(xs, ys)
      te = target_encoder_transform(["a", "b", "x", "c"], enc)
    }
    """
    interp = run_interp(code)
    env = interp.traditional.global_env

    # Label encoder
    assert env.get('vocab') == ["red", "blue", "green"]
    assert env.get('idx') == [0, 1, 0, 2]

    # Frequency encoder
    fvals = env.get('fvals')
    assert fvals == [0.5, 0.25, 0.25, 0.0]

    # Target encoder (means: a=2.0, b=0.5, c=10.0; global=3.0)
    te = env.get('te')
    assert te == [2.0, 0.5, 3.0, 10.0]

