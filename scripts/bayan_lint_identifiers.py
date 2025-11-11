#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Lint Bayan files to enforce: programming identifiers must be English-only.

- Flags Arabic letters (\u0600-\u06FF) in identifiers and variables
- Allows Arabic (and any language) inside string literals and data
- Intended for .bayan files in nlp_bayan/* and elsewhere

Exit codes:
  0 = no violations found
  1 = violations found

Usage:
  python scripts/bayan_lint_identifiers.py [PATH ...]
If no PATH is given, defaults to: nlp_bayan
"""
from __future__ import annotations

import argparse
import os
import re
import sys
from typing import Iterable, List, Tuple

# Ensure repository root is on sys.path so we can import the local 'bayan' package
REPO_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), os.pardir))
if REPO_ROOT not in sys.path:
    sys.path.insert(0, REPO_ROOT)

# Import lexer/token types from local Bayan package
from bayan.bayan.lexer import HybridLexer, TokenType  # type: ignore

ARABIC_RE = re.compile(r"[\u0600-\u06FF]")

# Token types we want to inspect for Arabic characters
ID_TOKEN_TYPES = {
    TokenType.IDENTIFIER,
    TokenType.VARIABLE,
}

# Token types we explicitly ignore
IGNORE_TOKEN_TYPES = {
    TokenType.STRING,
    TokenType.NUMBER,
    TokenType.COMMENT,
}

def has_arabic(text: str) -> bool:
    return bool(ARABIC_RE.search(text))


def iter_bayan_files(paths: Iterable[str]) -> Iterable[str]:
    for p in paths:
        if os.path.isfile(p):
            if p.endswith(('.bayan', '.by')):
                yield p
        elif os.path.isdir(p):
            for root, _, files in os.walk(p):
                for fn in files:
                    if fn.endswith(('.bayan', '.by')):
                        yield os.path.join(root, fn)


def lint_file(filepath: str) -> List[Tuple[int, int, str, str]]:
    """Return list of (line, col, tok_type, value) for violations."""
    with open(filepath, 'r', encoding='utf-8') as f:
        code = f.read()

    lexer = HybridLexer(code)
    tokens = lexer.tokenize()

    violations: List[Tuple[int, int, str, str]] = []
    for tok in tokens:
        if tok.type in IGNORE_TOKEN_TYPES:
            continue
        if tok.type in ID_TOKEN_TYPES:
            if has_arabic(tok.value):
                violations.append((tok.line, tok.column, tok.type.name, tok.value))
    return violations


def main(argv: List[str]) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('paths', nargs='*', default=['nlp_bayan'], help='Files or directories to lint (default: nlp_bayan)')
    args = parser.parse_args(argv)

    total = 0
    all_violations = 0

    for fp in iter_bayan_files(args.paths):
        total += 1
        violations = lint_file(fp)
        if violations:
            for (line, col, tok_type, value) in violations:
                # Keep the value as-is; terminals can display UTF-8
                print(f"{fp}:{line}:{col}: Arabic letters in {tok_type} '{value}'")
            all_violations += len(violations)

    if all_violations == 0:
        print(f"OK: {total} file(s) checked; no violations found.")
        return 0
    else:
        print(f"Found {all_violations} violation(s) across {total} file(s).")
        return 1


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))

