// eslint-disable-next-line import/no-extraneous-dependencies

import { describe, it, expect } from 'vitest'
// @ts-ignore
import { mockVoiceEntries } from '../src/lib/mockData.js'
import processEntries from '../src/lib/sampleFunction.js'

describe('processEntries', () => {
 // Commented out because tags_user are missing in the CSV
  /*
  it('counts reflection tag correctly', () => {
    const result = processEntries(mockVoiceEntries)
    expect(result.tagFrequencies.reflection).toBe(mockVoiceEntries.length)
  }); 
   */
  
  it('extracts structured tasks from transcripts', () => {
    const mockEntries = [
      {
        transcript_user: "I planned to work out today.",
        tags_user: [],
        transcript_raw: "",
        created_at: "",
        updated_at: "",
        tags_model: [],
        emotion_score_score: 0.2,
      },
      {
        transcript_user: "I said I’d help her with homework.",
        tags_user: [],
        transcript_raw: "",
        created_at: "",
        updated_at: "",
        tags_model: [],
        emotion_score_score: 0.2,
      },
      {
        transcript_user: "I turned down a promotion offer.",
        tags_user: [],
        transcript_raw: "",
        created_at: "",
        updated_at: "",
        tags_model: [],
        emotion_score_score: 0.2,
      }
    ] as any;

    const result = processEntries(mockEntries);

    expect(mockEntries[0].structured_tasks?.[0]).toEqual({
      task_text: "work out today",
      status: "planned",
      category: "self-care"
    });

    expect(mockEntries[1].structured_tasks?.[0]).toEqual({
      task_text: "help her with homework",
      status: "committed",
      category: "social"
    });

    expect(mockEntries[2].structured_tasks?.[0]).toEqual({
      task_text: "a promotion offer",
      status: "declined"
    });

    expect(result.summary).toContain("Analysed 3 entries");
  });
});
