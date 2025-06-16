# Sentari Candidate Submission – Veera Jeeshitha Kolla

Email: vk536@scarletmail.rutgers.edu

---

## Project Overview

This project processes natural language diary entries to extract structured tasks using deterministic logic.  
Implemented a pure TypeScript function (`processEntries`) that identifies and classifies user actions.

---

## Features

- Parses transcripts for actionable patterns (plans, commitments, rejections, etc.)
- Extracts `task_text`, `status`, and optional `category`
- Returns a `ProcessedResult` with summary and tag frequencies
- Unit-tested using `vitest`
- Uses real `Expanded_Diary_Entries.csv` (200 rows) for test coverage

---

## Files of Interest

- `src/lib/sampleFunction.ts` → Core logic
- `src/lib/mockData.ts` → Loads CSV into `VoiceEntry[]`
- `src/lib/types.ts` → Type definitions
- `tests/sampleFunction.test.ts` → Unit test for structured task extraction

---

## Candidate Submission Notes

- Implemented structured task extraction inside `processEntries()`
- All tests pass (`pnpm test`)
- CSV file `Expanded_Diary_Entries.csv` used via `mockData.ts`
- Lint fails due to TypeScript parsing and strict config (permitted per rules)
- Removed `openai.ts` (unused and triggered unnecessary lint errors)

---
