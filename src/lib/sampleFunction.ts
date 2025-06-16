import { VoiceEntry, ProcessedResult, StructuredTask } from './types.js';

/**
 * Extract simple structured tasks using verb + object heuristics.
 * For now, we match patterns like "I planned to X today" or "I want to Y"
 */
function extractTasks(transcript: string): StructuredTask[] {
  const tasks: StructuredTask[] = [];

  const clean = transcript
  .toLowerCase()
  .replace(/[‘’‛‚`´]/g, "'"); // normalize fancy apostrophes


  const patterns: { regex: RegExp; status: string; category?: string }[] = [
    { regex: /i planned to ([^.,]+)/, status: 'planned', category: 'self-care' },
    { regex: /i want to ([^.,]+)/, status: 'desired' },
    { regex: /i said i'?d (help [^.,]+)/, status: 'committed', category: 'social' },
    { regex: /i turned down ([^.,]+)/, status: 'declined' },
    { regex: /i keep ([^.,]+)/, status: 'repeating' },
  ];

  for (const { regex, status, category } of patterns) {
    const match = clean.match(regex);
    if (match) {
      tasks.push({
        task_text: match[1].trim(),
        status,
        category,
      });
    }
  }

  return tasks;
}

export function processEntries(entries: VoiceEntry[]): ProcessedResult {
  const tagFrequencies: Record<string, number> = {};

  for (const entry of entries) {
    for (const tag of entry.tags_user) {
      tagFrequencies[tag] = (tagFrequencies[tag] || 0) + 1;
    }

    // Add structured task extraction here:
    entry.structured_tasks = extractTasks(entry.transcript_user || entry.transcript_raw);
  }

  return {
    summary: `Analysed ${entries.length} entries`,
    tagFrequencies,
  };
}

export default processEntries;
