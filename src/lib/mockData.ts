import fs from 'fs'
import path from 'path'
import Papa from 'papaparse'
import { VoiceEntry } from './types.js'

const csvPath = path.resolve(__dirname, '../../../Expanded_Diary_Entries.csv')
const csvContent = fs.readFileSync(csvPath, 'utf8')

// Parse CSV and cast to VoiceEntry[]
const { data: rawRows } = Papa.parse(csvContent, {
  header: true,
  skipEmptyLines: true,
  dynamicTyping: true,
})

export const mockVoiceEntries: VoiceEntry[] = rawRows.map((row: any, index: number) => ({
  id: `entry-${index}`,
  user_id: 'mock-user',
  audio_url: null,
  transcript_raw: row.transcript_raw || '',
  transcript_user: row.transcript_user || row.transcript_raw || '',
  language_detected: 'en',
  language_rendered: 'en',
  tags_model: row.tags_model ? row.tags_model.split(',').map((t: string) => t.trim()) : [],
  tags_user: row.tags_user ? row.tags_user.split(',').map((t: string) => t.trim()) : [],
  category: null,
  created_at: row.created_at,
  updated_at: row.updated_at,
  emotion_score_score: parseFloat(row.emotion_score_score) || 0,
  embedding: null, // optional, not used in logic currently

  // Optional fields for compatibility
  emotion_score_log: null,
  tags_log: null,
  tags_log_user_original: null,
  entry_emoji: null,
  emoji_source: null,
  emoji_log: null,
  reminder_date: null,
  idea_status: null,

  structured_tasks: [],
}))
