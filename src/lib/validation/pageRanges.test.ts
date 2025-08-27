import { describe, it, expect } from 'vitest';
import { parsePageRanges } from './pageRanges';

describe('parsePageRanges', () => {
  it('should parse single page', () => {
    expect(parsePageRanges('5', 10)).toEqual([5]);
  });

  it('should parse page range', () => {
    expect(parsePageRanges('2-4', 10)).toEqual([2, 3, 4]);
  });

  it('should parse multiple ranges', () => {
    expect(parsePageRanges('1,3-5,8', 10)).toEqual([1, 3, 4, 5, 8]);
  });

  it('should handle overlapping ranges', () => {
    expect(parsePageRanges('1-3,2-4', 10)).toEqual([1, 2, 3, 4]);
  });

  it('should sort results', () => {
    expect(parsePageRanges('5,1,3', 10)).toEqual([1, 3, 5]);
  });

  it('should throw error for empty input', () => {
    expect(() => parsePageRanges('', 10)).toThrow('No ranges provided');
  });

  it('should throw error for invalid token', () => {
    expect(() => parsePageRanges('abc', 10)).toThrow('Invalid token: abc');
  });

  it('should throw error for out of range pages', () => {
    expect(() => parsePageRanges('15', 10)).toThrow('Out of range: 15');
  });

  it('should throw error for invalid range order', () => {
    expect(() => parsePageRanges('5-2', 10)).toThrow('Out of range: 5-2');
  });

  it('should throw error for zero or negative pages', () => {
    expect(() => parsePageRanges('0', 10)).toThrow('Out of range: 0');
    expect(() => parsePageRanges('-1', 10)).toThrow('Invalid token: -1');
  });

  it('should handle whitespace', () => {
    expect(parsePageRanges(' 1 , 3 - 5 , 8 ', 10)).toEqual([1, 3, 4, 5, 8]);
  });
});
