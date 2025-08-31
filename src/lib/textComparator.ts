export interface TextDifference {
  type: 'added' | 'removed' | 'unchanged';
  value: string;
  lineNumber?: number;
}

export interface ComparisonResult {
  differences: TextDifference[];
  statistics: {
    totalLines: number;
    addedLines: number;
    removedLines: number;
    unchangedLines: number;
    addedWords: number;
    removedWords: number;
    unchangedWords: number;
    addedCharacters: number;
    removedCharacters: number;
    unchangedCharacters: number;
    similarity: number; // percentage
  };
  timestamp: number;
}

export interface ComparisonOptions {
  ignoreWhitespace: boolean;
  ignoreCase: boolean;
  ignorePunctuation: boolean;
  compareBy: 'lines' | 'words' | 'characters';
}

export function compareTexts(
  text1: string,
  text2: string,
  options: ComparisonOptions = {
    ignoreWhitespace: false,
    ignoreCase: false,
    ignorePunctuation: false,
    compareBy: 'lines'
  }
): ComparisonResult {
  // Preprocess texts based on options
  const processedText1 = preprocessText(text1, options);
  const processedText2 = preprocessText(text2, options);

  let differences: TextDifference[];
  let statistics;

  switch (options.compareBy) {
    case 'lines':
      differences = compareByLines(processedText1, processedText2);
      statistics = calculateLineStatistics(differences, text1, text2);
      break;
    case 'words':
      differences = compareByWords(processedText1, processedText2);
      statistics = calculateWordStatistics(differences, text1, text2);
      break;
    case 'characters':
      differences = compareByCharacters(processedText1, processedText2);
      statistics = calculateCharacterStatistics(differences, text1, text2);
      break;
    default:
      differences = compareByLines(processedText1, processedText2);
      statistics = calculateLineStatistics(differences, text1, text2);
  }

  return {
    differences,
    statistics,
    timestamp: Date.now()
  };
}

function preprocessText(text: string, options: ComparisonOptions): string {
  let processed = text;

  if (options.ignoreCase) {
    processed = processed.toLowerCase();
  }

  if (options.ignoreWhitespace) {
    processed = processed.replace(/\s+/g, ' ').trim();
  }

  if (options.ignorePunctuation) {
    processed = processed.replace(/[^\w\s]/g, '');
  }

  return processed;
}

function compareByLines(text1: string, text2: string): TextDifference[] {
  const lines1 = text1.split('\n');
  const lines2 = text2.split('\n');
  
  return computeLCS(lines1, lines2, (a, b) => a === b);
}

function compareByWords(text1: string, text2: string): TextDifference[] {
  const words1 = text1.split(/\s+/).filter(word => word.length > 0);
  const words2 = text2.split(/\s+/).filter(word => word.length > 0);
  
  return computeLCS(words1, words2, (a, b) => a === b);
}

function compareByCharacters(text1: string, text2: string): TextDifference[] {
  const chars1 = text1.split('');
  const chars2 = text2.split('');
  
  return computeLCS(chars1, chars2, (a, b) => a === b);
}

// Longest Common Subsequence algorithm for diff computation
function computeLCS<T>(
  arr1: T[],
  arr2: T[],
  equals: (a: T, b: T) => boolean
): TextDifference[] {
  const m = arr1.length;
  const n = arr2.length;
  
  // Create LCS table
  const lcs: number[][] = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
  
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const item1 = arr1[i - 1];
      const item2 = arr2[j - 1];
      if (item1 !== undefined && item2 !== undefined && equals(item1, item2)) {
        lcs[i]![j] = (lcs[i - 1]?.[j - 1] ?? 0) + 1;
      } else {
        lcs[i]![j] = Math.max(lcs[i - 1]?.[j] ?? 0, lcs[i]?.[j - 1] ?? 0);
      }
    }
  }
  
  // Backtrack to find differences
  const differences: TextDifference[] = [];
  let i = m, j = n;
  
  while (i > 0 || j > 0) {
    const item1 = i > 0 ? arr1[i - 1] : undefined;
    const item2 = j > 0 ? arr2[j - 1] : undefined;
    
    if (i > 0 && j > 0 && item1 !== undefined && item2 !== undefined && equals(item1, item2)) {
      differences.unshift({
        type: 'unchanged',
        value: String(item1)
      });
      i--;
      j--;
    } else if (j > 0 && item2 !== undefined && (i === 0 || (lcs[i]?.[j - 1] ?? 0) >= (lcs[i - 1]?.[j] ?? 0))) {
      differences.unshift({
        type: 'added',
        value: String(item2)
      });
      j--;
    } else if (i > 0 && item1 !== undefined) {
      differences.unshift({
        type: 'removed',
        value: String(item1)
      });
      i--;
    } else {
      // Safety break to prevent infinite loop
      break;
    }
  }
  
  return differences;
}

function calculateLineStatistics(differences: TextDifference[], originalText1: string, originalText2: string) {
  const addedLines = differences.filter(d => d.type === 'added').length;
  const removedLines = differences.filter(d => d.type === 'removed').length;
  const unchangedLines = differences.filter(d => d.type === 'unchanged').length;
  const totalLines = Math.max(originalText1.split('\n').length, originalText2.split('\n').length);

  // Calculate word and character statistics
  const addedWords = differences
    .filter(d => d.type === 'added')
    .reduce((sum, d) => sum + d.value.split(/\s+/).filter(w => w.length > 0).length, 0);
  
  const removedWords = differences
    .filter(d => d.type === 'removed')
    .reduce((sum, d) => sum + d.value.split(/\s+/).filter(w => w.length > 0).length, 0);
  
  const unchangedWords = differences
    .filter(d => d.type === 'unchanged')
    .reduce((sum, d) => sum + d.value.split(/\s+/).filter(w => w.length > 0).length, 0);

  const addedCharacters = differences
    .filter(d => d.type === 'added')
    .reduce((sum, d) => sum + d.value.length, 0);
  
  const removedCharacters = differences
    .filter(d => d.type === 'removed')
    .reduce((sum, d) => sum + d.value.length, 0);
  
  const unchangedCharacters = differences
    .filter(d => d.type === 'unchanged')
    .reduce((sum, d) => sum + d.value.length, 0);

  const similarity = totalLines > 0 ? Math.round((unchangedLines / totalLines) * 100) : 100;

  return {
    totalLines,
    addedLines,
    removedLines,
    unchangedLines,
    addedWords,
    removedWords,
    unchangedWords,
    addedCharacters,
    removedCharacters,
    unchangedCharacters,
    similarity
  };
}

function calculateWordStatistics(differences: TextDifference[], originalText1: string, originalText2: string) {
  const addedWords = differences.filter(d => d.type === 'added').length;
  const removedWords = differences.filter(d => d.type === 'removed').length;
  const unchangedWords = differences.filter(d => d.type === 'unchanged').length;
  
  const words1 = originalText1.split(/\s+/).filter(w => w.length > 0);
  const words2 = originalText2.split(/\s+/).filter(w => w.length > 0);
  const totalWords = Math.max(words1.length, words2.length);

  // Calculate line and character statistics
  const text1Lines = originalText1.split('\n');
  const text2Lines = originalText2.split('\n');
  const totalLines = Math.max(text1Lines.length, text2Lines.length);
  
  const addedCharacters = differences
    .filter(d => d.type === 'added')
    .reduce((sum, d) => sum + d.value.length, 0);
  
  const removedCharacters = differences
    .filter(d => d.type === 'removed')
    .reduce((sum, d) => sum + d.value.length, 0);
  
  const unchangedCharacters = differences
    .filter(d => d.type === 'unchanged')
    .reduce((sum, d) => sum + d.value.length, 0);

  const similarity = totalWords > 0 ? Math.round((unchangedWords / totalWords) * 100) : 100;

  return {
    totalLines,
    addedLines: 0, // Not applicable for word comparison
    removedLines: 0,
    unchangedLines: 0,
    addedWords,
    removedWords,
    unchangedWords,
    addedCharacters,
    removedCharacters,
    unchangedCharacters,
    similarity
  };
}

function calculateCharacterStatistics(differences: TextDifference[], originalText1: string, originalText2: string) {
  const addedCharacters = differences.filter(d => d.type === 'added').length;
  const removedCharacters = differences.filter(d => d.type === 'removed').length;
  const unchangedCharacters = differences.filter(d => d.type === 'unchanged').length;
  const totalCharacters = Math.max(originalText1.length, originalText2.length);

  // Calculate line and word statistics
  const text1Lines = originalText1.split('\n');
  const text2Lines = originalText2.split('\n');
  const totalLines = Math.max(text1Lines.length, text2Lines.length);
  
  const words1 = originalText1.split(/\s+/).filter(w => w.length > 0);
  const words2 = originalText2.split(/\s+/).filter(w => w.length > 0);
  const totalWords = Math.max(words1.length, words2.length);

  const similarity = totalCharacters > 0 ? Math.round((unchangedCharacters / totalCharacters) * 100) : 100;

  return {
    totalLines,
    addedLines: 0, // Not applicable for character comparison
    removedLines: 0,
    unchangedLines: 0,
    addedWords: 0, // Not applicable for character comparison
    removedWords: 0,
    unchangedWords: 0,
    addedCharacters,
    removedCharacters,
    unchangedCharacters,
    similarity
  };
}

export function exportComparison(result: ComparisonResult, format: 'txt' | 'json' | 'html'): Blob {
  switch (format) {
    case 'txt':
      const txtContent = `Text Comparison Report
Generated: ${new Date(result.timestamp).toLocaleString()}

STATISTICS
==========
Similarity: ${result.statistics.similarity}%
Total Lines: ${result.statistics.totalLines}
Added Lines: ${result.statistics.addedLines}
Removed Lines: ${result.statistics.removedLines}
Unchanged Lines: ${result.statistics.unchangedLines}
Added Words: ${result.statistics.addedWords}
Removed Words: ${result.statistics.removedWords}
Unchanged Words: ${result.statistics.unchangedWords}
Added Characters: ${result.statistics.addedCharacters}
Removed Characters: ${result.statistics.removedCharacters}
Unchanged Characters: ${result.statistics.unchangedCharacters}

DIFFERENCES
===========
${result.differences.map(diff => {
  const prefix = diff.type === 'added' ? '+ ' : diff.type === 'removed' ? '- ' : '  ';
  return prefix + diff.value;
}).join('\n')}`;
      return new Blob([txtContent], { type: 'text/plain' });
      
    case 'json':
      return new Blob([JSON.stringify(result, null, 2)], { type: 'application/json' });
      
    case 'html':
      const htmlContent = `<!DOCTYPE html>
<html>
<head>
    <title>Text Comparison Report</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .added { background-color: #d4edda; color: #155724; }
        .removed { background-color: #f8d7da; color: #721c24; }
        .unchanged { background-color: #f8f9fa; color: #495057; }
        .diff-line { padding: 2px 4px; margin: 1px 0; border-radius: 3px; }
        .stats { background-color: #e9ecef; padding: 15px; border-radius: 5px; margin-bottom: 20px; }
    </style>
</head>
<body>
    <h1>Text Comparison Report</h1>
    <p>Generated: ${new Date(result.timestamp).toLocaleString()}</p>
    
    <div class="stats">
        <h2>Statistics</h2>
        <p><strong>Similarity:</strong> ${result.statistics.similarity}%</p>
        <p><strong>Total Lines:</strong> ${result.statistics.totalLines}</p>
        <p><strong>Added Lines:</strong> ${result.statistics.addedLines}</p>
        <p><strong>Removed Lines:</strong> ${result.statistics.removedLines}</p>
        <p><strong>Unchanged Lines:</strong> ${result.statistics.unchangedLines}</p>
        <p><strong>Added Words:</strong> ${result.statistics.addedWords}</p>
        <p><strong>Removed Words:</strong> ${result.statistics.removedWords}</p>
        <p><strong>Unchanged Words:</strong> ${result.statistics.unchangedWords}</p>
        <p><strong>Added Characters:</strong> ${result.statistics.addedCharacters}</p>
        <p><strong>Removed Characters:</strong> ${result.statistics.removedCharacters}</p>
        <p><strong>Unchanged Characters:</strong> ${result.statistics.unchangedCharacters}</p>
    </div>
    
    <h2>Differences</h2>
    <div class="differences">
        ${result.differences.map(diff => 
          `<div class="diff-line ${diff.type}">${escapeHtml(diff.value)}</div>`
        ).join('')}
    </div>
</body>
</html>`;
      return new Blob([htmlContent], { type: 'text/html' });
      
    default:
      throw new Error('Unsupported export format');
  }
}

function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

export function getSimilarityLevel(similarity: number): string {
  if (similarity >= 95) return 'Nearly Identical';
  if (similarity >= 85) return 'Very Similar';
  if (similarity >= 70) return 'Similar';
  if (similarity >= 50) return 'Somewhat Similar';
  if (similarity >= 30) return 'Different';
  return 'Very Different';
}
