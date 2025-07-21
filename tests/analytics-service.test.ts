import { describe, expect, it } from 'vitest';
import { createEventPayload } from '../packages/shared/analytics/track-event';

describe('Analytics Service', () => {
  it('creates a valid event payload', () => {
    const payload = createEventPayload('login', 'authentication', { label: 'Test', value: 42 });
    expect(payload).toHaveProperty('action', 'login');
    expect(payload).toHaveProperty('category', 'authentication');
    expect(payload).toHaveProperty('label', 'Test');
    expect(payload).toHaveProperty('value', 42);
  });
});
