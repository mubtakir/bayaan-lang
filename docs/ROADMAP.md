# nlp_bayan Roadmap (Pre–Model Build)

This roadmap lays out priorities and rough timelines before we begin the actual generative language model build on top of Bayan.

## Guiding Principles
- English-only programming identifiers inside `nlp_bayan/`; data can be Arabic/English freely.
- Modular, composable knowledge architecture; predictable loading and testing.
- Tests-first for every feature; keep CI green.
- Reuse Bayan’s built-in AI/NLP libraries where practical.

## Priority Key
- P0 = Must-have (blocks downstream work)
- P1 = High value
- P2 = Nice-to-have

## High-level Timeline (rough)
- Phase 1 (Weeks 1–2): Infra hardening + KB modularization
- Phase 2 (Weeks 3–5): Generator pipeline enhancements + AI/NLP integration hooks
- Phase 3 (Weeks 6+): Model-building experiments and iteration

---

## Milestone M1 — Infrastructure hardening (P0, Weeks 1–2)
Goals: Keep main branch stable, enforce policy, and run tests automatically.

Deliverables:
- CI: Linter + tests (DONE) — `.github/workflows/lint-and-test.yml`
- Pre-commit hook (DONE) — `.githooks/pre-commit` scoped to `nlp_bayan`
- Developer guide (DONE) — `docs/DEVELOPER_GUIDE.md`
- Test additions (IN PROGRESS): coverage baseline for `nlp_bayan`

Acceptance criteria:
- CI passes on PRs touching `bayan/**`, `nlp_bayan/**`, `tests/**`, `scripts/**`.
- Linter blocks Arabic identifiers in `nlp_bayan` only.
- New PRs include or update tests.

---

## Milestone M2 — Knowledge base modularization (P0, Weeks 1–2)
Goals: Make knowledge loading selective and maintainable.

Plan:
- Keep `load_selective(target_logical, only)` for back-compat (DONE).
- Split `nlp_bayan/core/integrated_kb.bayan` into topic-specific files:
  - `prob_kb.bayan`, `information_kb.bayan`, `family_kb.bayan`, `events_kb.bayan`, `shapes_kb.bayan` (P0)
- Add a small loader (e.g., `kb_loader.bayan`) with `load_domains(logical, [..])` that composes modules (P0)
- Update demos to showcase selective domain loading (P1)
- Expand tests to verify cross-domain independence (P0)

Acceptance criteria:
- Any subset of domains can be loaded without leaking unrelated predicates.
- Demos run deterministically with documented domains.

---

## Milestone M3 — Generator pipeline enhancements (P1, Weeks 3–5)
Goals: Context-aware, logic-verified generation path.

Plan:
- `generator_pipeline.bayan`:
  - Add templated surface forms + slot filling.
  - Optional retrieval of facts from selected KB domains.
  - Optional logical verification step before finalization (e.g., consistency check).
- Examples:
  - Minimal pairs showing the effect of KB on generation.

Acceptance criteria:
- At least 3 runnable demos showing: plain generation, KB-informed generation, and logic-verified generation.

---

## Milestone M4 — Integrate Bayan AI/NLP libraries (P1, starts Week 2, ongoing)
Goals: Leverage Bayan-provided capabilities (tokenization, morphology, etc.) where useful.

Plan:
- Survey available built-ins and libraries.
- Add thin wrappers in `nlp_bayan` for stable use.
- Replace ad-hoc logic with calls into Bayan libs where beneficial.

Acceptance criteria:
- Clear documentation: where and how Bayan AI/NLP is leveraged.
- Bench or example showing an improvement vs. baseline.

---

## Milestone M5 — Policy extension (optional) (P2, ~0.5 week)
Goals: Allow opt-in identifier policy beyond `nlp_bayan` without harming Arabic-first projects.

Plan:
- Add optional paths to linter invocation (e.g., CLI flags or config file).
- Provide a sample pre-push hook for teams that prefer server-side enforcement.

Acceptance criteria:
- Opt-in scope documented; default remains `nlp_bayan` only.

---

## Milestone M6 — Developer documentation upgrades (P1, ongoing)
Goals: Lower onboarding friction and keep architectural clarity.

Plan:
- Architecture map (modules, flows, and data paths).
- Contribution guide for `nlp_bayan` (tests, naming, examples).
- Coding conventions and examples for Bayan + `nlp_bayan`.

Acceptance criteria:
- New contributors can add a domain module + test + demo in under 1 hour, guided by docs.

---

## Risks & Mitigations
- Scope creep in KB domains → Keep small, test-backed increments; add only documented predicates.
- Ambiguity in generator semantics → Land minimal, testable steps and demos first.
- Over-reliance on ad-hoc utilities → Prefer Bayan’s built-in AI/NLP functions where possible.

## Dependencies & Sequencing
- M2 (KB modularization) is a prerequisite for M3 (generator enhancements).
- M1 (infra) underpins all milestones; keep CI green before merging.

## Status Summary
- M1: Partially done (CI, pre-commit, guide, selective load tests)
- M2: Started (selective API); splitting into topic modules planned
- M3–M6: Planned

