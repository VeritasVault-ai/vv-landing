import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';

// Mock @/lib/utils to provide a fake cn function
vi.mock('@shared/utils', () => ({
  cn: (...args: any[]) => args.filter(Boolean).join(' '),
}));

import { AIBadge } from '@/components/ai/ai-badge';
import { AIConfidenceIndicator } from '@/components/ai/ai-confidence-indicator';
import { AIFeedback } from '@/components/ai/ai-feedback';

describe('AI/Analytics Components', () => {
  it('renders AI badge', () => {
    render(<AIBadge type="generated" />);
    const badge = screen.queryByText('AI Generated');
    if (!badge) {
      // eslint-disable-next-line no-console
      console.log(document.body.innerHTML);
      throw new Error('AI Generated badge not found');
    }
    expect(badge).toBeInTheDocument();
  });
  it('renders AI confidence indicator', () => {
    render(<AIConfidenceIndicator confidence={0.95} />);
    expect(screen.getByText(/confidence|95|ai/i)).toBeInTheDocument();
  });
  it('renders AI feedback', async () => {
    render(<AIFeedback feedback="Great job!" />);
    const feedbackButton = screen.getByRole('button', { name: /provide feedback/i });
    fireEvent.click(feedbackButton);
    // Simulate typing in the textarea
    const textarea = screen.getByPlaceholderText(/share your thoughts/i);
    fireEvent.change(textarea, { target: { value: 'Great job!' } });
    // Simulate clicking the submit button
    const submitButton = screen.getByRole('button', { name: /submit feedback/i });
    fireEvent.click(submitButton);
    // Now check for the feedback text
    const feedback = await screen.findByText(/great job/i, {}, { container: document.body });
    expect(feedback).toBeInTheDocument();
  });
});
