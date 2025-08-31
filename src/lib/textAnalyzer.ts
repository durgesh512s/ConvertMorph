export interface TextStats {
  characters: number;
  charactersNoSpaces: number;
  words: number;
  sentences: number;
  paragraphs: number;
  readingTime: number; // in minutes
  averageWordsPerSentence: number;
  averageSentencesPerParagraph: number;
  mostCommonWords: Array<{ word: string; count: number }>;
  readabilityScore: number;
}

export interface TextAnalysisResult {
  text: string;
  stats: TextStats;
  timestamp: number;
}

export function analyzeText(text: string): TextStats {
  if (!text || text.trim().length === 0) {
    return {
      characters: 0,
      charactersNoSpaces: 0,
      words: 0,
      sentences: 0,
      paragraphs: 0,
      readingTime: 0,
      averageWordsPerSentence: 0,
      averageSentencesPerParagraph: 0,
      mostCommonWords: [],
      readabilityScore: 0,
    };
  }

  // Basic counts
  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s/g, '').length;
  
  // Word count - split by whitespace and filter out empty strings
  const words = text.trim().split(/\s+/).filter(word => word.length > 0);
  const wordCount = words.length;
  
  // Sentence count - split by sentence endings
  const sentences = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0);
  const sentenceCount = sentences.length;
  
  // Paragraph count - split by double line breaks or single line breaks
  const paragraphs = text.split(/\n\s*\n|\n/).filter(para => para.trim().length > 0);
  const paragraphCount = paragraphs.length;
  
  // Reading time (average 200 words per minute)
  const readingTime = Math.ceil(wordCount / 200);
  
  // Averages
  const averageWordsPerSentence = sentenceCount > 0 ? Math.round((wordCount / sentenceCount) * 10) / 10 : 0;
  const averageSentencesPerParagraph = paragraphCount > 0 ? Math.round((sentenceCount / paragraphCount) * 10) / 10 : 0;
  
  // Most common words (excluding common stop words)
  const stopWords = new Set([
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by',
    'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did',
    'will', 'would', 'could', 'should', 'may', 'might', 'can', 'must', 'shall',
    'i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them',
    'my', 'your', 'his', 'her', 'its', 'our', 'their', 'this', 'that', 'these', 'those'
  ]);
  
  const wordFrequency: { [key: string]: number } = {};
  words.forEach(word => {
    const cleanWord = word.toLowerCase().replace(/[^\w]/g, '');
    if (cleanWord.length > 2 && !stopWords.has(cleanWord)) {
      wordFrequency[cleanWord] = (wordFrequency[cleanWord] || 0) + 1;
    }
  });
  
  const mostCommonWords = Object.entries(wordFrequency)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([word, count]) => ({ word, count }));
  
  // Simple readability score (Flesch Reading Ease approximation)
  const avgSentenceLength = averageWordsPerSentence;
  const avgSyllablesPerWord = estimateAverageSyllables(words);
  const readabilityScore = Math.max(0, Math.min(100, 
    Math.round(206.835 - (1.015 * avgSentenceLength) - (84.6 * avgSyllablesPerWord))
  ));
  
  return {
    characters,
    charactersNoSpaces,
    words: wordCount,
    sentences: sentenceCount,
    paragraphs: paragraphCount,
    readingTime,
    averageWordsPerSentence,
    averageSentencesPerParagraph,
    mostCommonWords,
    readabilityScore,
  };
}

function estimateAverageSyllables(words: string[]): number {
  if (words.length === 0) return 0;
  
  const totalSyllables = words.reduce((total, word) => {
    return total + countSyllables(word);
  }, 0);
  
  return Math.round((totalSyllables / words.length) * 100) / 100;
}

function countSyllables(word: string): number {
  if (!word) return 0;
  
  word = word.toLowerCase().replace(/[^a-z]/g, '');
  if (word.length === 0) return 0;
  
  // Count vowel groups
  const vowels = 'aeiouy';
  let syllableCount = 0;
  let previousWasVowel = false;
  
  for (let i = 0; i < word.length; i++) {
    const char = word[i];
    const isVowel = char ? vowels.includes(char) : false;
    if (isVowel && !previousWasVowel) {
      syllableCount++;
    }
    previousWasVowel = isVowel;
  }
  
  // Handle silent 'e'
  if (word.endsWith('e') && syllableCount > 1) {
    syllableCount--;
  }
  
  // Every word has at least one syllable
  return Math.max(1, syllableCount);
}

export function getReadabilityLevel(score: number): string {
  if (score >= 90) return 'Very Easy';
  if (score >= 80) return 'Easy';
  if (score >= 70) return 'Fairly Easy';
  if (score >= 60) return 'Standard';
  if (score >= 50) return 'Fairly Difficult';
  if (score >= 30) return 'Difficult';
  return 'Very Difficult';
}

export function exportTextAnalysis(analysis: TextAnalysisResult, format: 'txt' | 'json' | 'csv'): Blob {
  const { stats } = analysis;
  
  switch (format) {
    case 'txt':
      const txtContent = `Text Analysis Report
Generated: ${new Date(analysis.timestamp).toLocaleString()}

BASIC STATISTICS
================
Characters: ${stats.characters.toLocaleString()}
Characters (no spaces): ${stats.charactersNoSpaces.toLocaleString()}
Words: ${stats.words.toLocaleString()}
Sentences: ${stats.sentences.toLocaleString()}
Paragraphs: ${stats.paragraphs.toLocaleString()}

READING METRICS
===============
Estimated reading time: ${stats.readingTime} minute${stats.readingTime !== 1 ? 's' : ''}
Average words per sentence: ${stats.averageWordsPerSentence}
Average sentences per paragraph: ${stats.averageSentencesPerParagraph}
Readability score: ${stats.readabilityScore}/100 (${getReadabilityLevel(stats.readabilityScore)})

MOST COMMON WORDS
=================
${stats.mostCommonWords.map((item, index) => `${index + 1}. ${item.word} (${item.count} times)`).join('\n')}

ORIGINAL TEXT
=============
${analysis.text}`;
      return new Blob([txtContent], { type: 'text/plain' });
      
    case 'json':
      return new Blob([JSON.stringify(analysis, null, 2)], { type: 'application/json' });
      
    case 'csv':
      const csvContent = `Metric,Value
Characters,${stats.characters}
Characters (no spaces),${stats.charactersNoSpaces}
Words,${stats.words}
Sentences,${stats.sentences}
Paragraphs,${stats.paragraphs}
Reading time (minutes),${stats.readingTime}
Average words per sentence,${stats.averageWordsPerSentence}
Average sentences per paragraph,${stats.averageSentencesPerParagraph}
Readability score,${stats.readabilityScore}
Readability level,"${getReadabilityLevel(stats.readabilityScore)}"`;
      return new Blob([csvContent], { type: 'text/csv' });
      
    default:
      throw new Error('Unsupported export format');
  }
}
