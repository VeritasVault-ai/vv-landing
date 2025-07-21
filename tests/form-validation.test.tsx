import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';

// Mock @/lib/utils to provide a fake cn function
vi.mock('@shared/utils', () => ({
  cn: (...args: any[]) => args.filter(Boolean).join(' '),
}));

import { LoginForm } from '@/components/auth/login-form';

describe('Form Validation', () => {
  it('shows error message on submit with empty fields', async () => {
    render(
      <LoginForm
        onLogin={async () => {}}
        onSSOLogin={() => {}}
        isLoading={false}
        error={null}
        loginFlag="default"
      />
    );
    const form = document.querySelector('form');
    fireEvent.submit(form);
    // Debug log after submit
    // eslint-disable-next-line no-console
    console.log(document.body.innerHTML);
    let error;
    try {
      error = await screen.findByRole('alert');
    } catch {
      try {
        error = await screen.findByText(/required/i);
      } catch {
        // eslint-disable-next-line no-console
        console.log(document.body.innerHTML);
        throw new Error('No error message found after submitting empty form');
      }
    }
    expect(error).toBeInTheDocument();
  });
  // Add more tests for validation rules, error states, etc.
});
