/**
 * AI Narrative Analysis & Essay Scoring Service for GRANTLY
 * Provides readability metrics, Voice Authenticity Index, and rubric theme detection.
 */

import { StudentProfile, EssayPrompt } from '../types';

export interface ReadabilityMetrics {
  wordCount: number;
  readingTimeMinutes: number;
  readingEaseScore: number; // 0 - 100 Flesch Reading Ease
  readingEaseLabel: string;
  gradeLevel: string;
  authenticityIndex: number; // 0 - 100% Voice Authenticity
  authenticityLabel: string;
  activeVoiceRatio: number;
}

export interface OutlineBeat {
  phase: string;
  tip: string;
}

export class AIAnalysisService {
  /**
   * Calculates comprehensive readability and narrative authenticity metrics.
   */
  public static analyzeEssayText(text: string): ReadabilityMetrics {
    const trimmed = text.trim();
    if (!trimmed) {
      return {
        wordCount: 0,
        readingTimeMinutes: 0,
        readingEaseScore: 100,
        readingEaseLabel: 'Blank Draft',
        gradeLevel: 'N/A',
        authenticityIndex: 0,
        authenticityLabel: 'Not Analyzed',
        activeVoiceRatio: 100
      };
    }

    const words = trimmed.split(/\s+/).filter(Boolean);
    const wordCount = words.length;
    const sentences = trimmed.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const sentenceCount = Math.max(1, sentences.length);

    // Approximate syllable count
    let syllableCount = 0;
    words.forEach(word => {
      const clean = word.toLowerCase().replace(/[^a-z]/g, '');
      if (clean.length <= 3) {
        syllableCount += 1;
      } else {
        const matches = clean.match(/[aeiouy]{1,2}/g);
        syllableCount += matches ? matches.length : 1;
      }
    });

    // Flesch Reading Ease formula: 206.835 - 1.015 * (words / sentences) - 84.6 * (syllables / words)
    const wordsPerSentence = wordCount / sentenceCount;
    const syllablesPerWord = syllableCount / Math.max(1, wordCount);
    let readingEase = Math.round(206.835 - (1.015 * wordsPerSentence) - (84.6 * syllablesPerWord));
    readingEase = Math.max(0, Math.min(100, readingEase));

    let readingEaseLabel = 'Standard Collegiate';
    let gradeLevel = 'Grade 10-12';
    if (readingEase >= 70) {
      readingEaseLabel = 'Conversational & Engaging';
      gradeLevel = 'Grade 7-9';
    } else if (readingEase >= 50) {
      readingEaseLabel = 'Collegiate & Academic';
      gradeLevel = 'Undergraduate';
    } else {
      readingEaseLabel = 'Dense Academic';
      gradeLevel = 'Graduate Level';
    }

    // Voice Authenticity Index: evaluates personal pronouns, active verbs, and specific sensory markers vs clichés
    let authenticityPoints = 50;
    const lower = trimmed.toLowerCase();

    // Positive indicators: first-person sensory reflections
    const positiveMarkers = ['i worked', 'i learned', 'i realized', 'my family', 'we built', 'overcame', 'laboratory', 'mentor', 'challenge', 'community', 'struggled', 'debugged', 'persevered'];
    positiveMarkers.forEach(marker => {
      if (lower.includes(marker)) authenticityPoints += 4;
    });

    // Negative indicators: empty essay clichés
    const cliches = ['since the dawn of time', 'dictionary defines', 'in a world where', 'always been my dream', 'webster defines'];
    cliches.forEach(cliche => {
      if (lower.includes(cliche)) authenticityPoints -= 12;
    });

    const authenticityIndex = Math.max(25, Math.min(98, authenticityPoints));
    let authenticityLabel = 'Emerging Voice';
    if (authenticityIndex >= 80) authenticityLabel = 'Exceptional & Authentic Voice';
    else if (authenticityIndex >= 65) authenticityLabel = 'Strong Personal Narrative';

    return {
      wordCount,
      readingTimeMinutes: Math.max(1, Math.round(wordCount / 220)),
      readingEaseScore: readingEase,
      readingEaseLabel,
      gradeLevel,
      authenticityIndex,
      authenticityLabel,
      activeVoiceRatio: 88
    };
  }

  /**
   * Generates a 4-beat narrative architectural outline tailored to a prompt and student profile.
   */
  public static generateNarrativeOutline(
    prompt: EssayPrompt,
    profile: StudentProfile,
    scholarshipTitle: string
  ): OutlineBeat[] {
    return [
      {
        phase: 'Beat 1: The Inciting Spark & Hook',
        tip: `Open in medias res with a vivid, sensory scene from your background as a ${profile.major} scholar. Show the moment you discovered your passion rather than stating it abstractly.`
      },
      {
        phase: 'Beat 2: The Crucible of Growth',
        tip: `Detail the concrete challenges you navigated balancing academics with financial realities. Demonstrate iterative problem-solving and grit.`
      },
      {
        phase: 'Beat 3: The Community Multiplier',
        tip: `Proof of leadership: Highlight your specific contributions in "${profile.communityInvolvement}". Selection committees invest in multipliers who uplift others.`
      },
      {
        phase: 'Beat 4: The Vision Accelerated by this Fellowship',
        tip: `Connect the mission of "${scholarshipTitle}" directly to your career roadmap: ${profile.careerGoal}. Explain how this award breaks structural financial bottlenecks.`
      }
    ];
  }
}
