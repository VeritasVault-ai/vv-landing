import { describe, it, expect } from 'vitest';

// Example: Replace with your actual analytics service logic
function calculateAverage(data: number[]) {
  if (data.length === 0) return 0;
  return data.reduce((a, b) => a + b, 0) / data.length;
}

describe('Analytics Service', () => {
  it('calculates average correctly', () => {
    expect(calculateAverage([2, 4, 6])).toBe(4);
  });
  // Add more tests for edge cases, error handling, etc.
}); 