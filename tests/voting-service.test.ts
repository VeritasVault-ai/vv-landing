import { votingService } from '@/../backend/services/voting-service';
import { describe, expect, it, vi } from 'vitest';

describe('Voting Service', () => {
  it('should have a getVotingOverview method', () => {
    expect(typeof votingService.getVotingOverview).toBe('function');
  });

  it('calls getVotingOverview and returns data (mocked)', async () => {
    // Mock global fetch
    const mockData = { foo: 'bar' };
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockData,
    });
    const result = await votingService.getVotingOverview();
    expect(result).toEqual(mockData);
  });
});
