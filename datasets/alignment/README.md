# Alignment Dataset (Social/Physical Interactions)

Primary format: JSONL (one JSON object per line)
Optional: CSV mirror of the same content
Encoding: UTF-8 (no BOM)
License: CC BY 4.0 (Attribution required)

## JSONL schema
Each line follows:

- id: string (e.g., "ex001")
- lang: "ar" | "en"
- natural_text: string (short description in the given language)
- bayan_code: string (concise Bayaan code: actions and effects)
- logic_explanation: string (1-line rationale)
- entities: array of strings
- actions: array of strings
- states: array of strings (affected states)
- split: "train" | "val" | "test"

Example (AR):
```
{"id":"ex001","lang":"ar","natural_text":"محمد قدم وجبة لأحمد","bayan_code":"محمد.تقديم_وجبة(أحمد); أحمد.امتنان += 0.3","logic_explanation":"تقديم الطعام يزيد الامتنان","entities":["محمد","أحمد"],"actions":["تقديم_وجبة"],"states":["امتنان"],"split":"train"}
```

Example (EN):
```
{"id":"ex002","lang":"en","natural_text":"Mohammed serves a meal to Ahmed","bayan_code":"Mohammed.serve_meal(Ahmed); Ahmed.gratitude += 0.3","logic_explanation":"Food offering increases gratitude","entities":["Mohammed","Ahmed"],"actions":["serve_meal"],"states":["gratitude"],"split":"train"}
```

## Splits
- train: ex001–ex400
- val: ex401–ex450
- test: ex451–ex500

## Notes
- Keep numbers in [0,1] when modeling fuzzy states
- Prefer short, concrete sentences
- Actions and states should be consistent with Bayaan's entity system style
- CSV mirror uses columns:
  - natural_text,bayan_code,logic_explanation,lang,entities,actions,states,split,id
- Arrays are serialized as JSON strings inside CSV cells

