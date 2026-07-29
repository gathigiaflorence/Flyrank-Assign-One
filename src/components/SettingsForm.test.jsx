import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SettingsForm from './SettingsForm';

describe('SettingsForm', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('blocks form submission when the budget cap is negative', () => {
    render(<SettingsForm />);

    const budgetInput = screen.getByLabelText(/monthly budget cap/i);
    fireEvent.change(budgetInput, { target: { value: '-5' } });

    const submitButton = screen.getByRole('button', { name: /save settings/i });
    expect(submitButton).toBeDisabled();

    fireEvent.click(submitButton);

    expect(localStorage.getItem('app_settings')).toBeNull();
    expect(screen.getByText(/monthly budget cap must be greater than 0/i)).toBeInTheDocument();
  });
});
