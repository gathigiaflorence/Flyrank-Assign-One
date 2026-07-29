import { beforeEach, describe, expect, it } from 'vitest';
import { initializeSettingsForm, STORAGE_KEY } from './settings.js';

describe('settings form', () => {
  beforeEach(() => {
    localStorage.clear();
    document.body.innerHTML = `
      <form id="settings-form" novalidate>
        <div class="field">
          <label for="currency">Preferred Currency</label>
          <select id="currency" name="currency">
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="KES">KES</option>
            <option value="GBP">GBP</option>
          </select>
          <p class="error-message" id="currency-error" aria-live="polite"></p>
        </div>

        <div class="field">
          <label for="budget-cap">Monthly Budget Cap</label>
          <input id="budget-cap" name="budgetCap" type="number" value="0" />
          <p class="error-message" id="budget-cap-error" aria-live="polite"></p>
        </div>

        <div class="field">
          <label for="email-alerts">Email Alerts</label>
          <input id="email-alerts" name="emailAlerts" type="checkbox" />
          <p class="error-message" id="email-alerts-error" aria-live="polite"></p>
        </div>

        <button type="submit">Save Settings</button>
      </form>
    `;
  });

  it('shows an error and prevents saving when the budget cap is negative', () => {
    const form = document.getElementById('settings-form');
    initializeSettingsForm(form);

    const budgetInput = document.getElementById('budget-cap');
    budgetInput.value = '-5';
    budgetInput.dispatchEvent(new Event('input', { bubbles: true }));

    const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
    form.dispatchEvent(submitEvent);

    const errorMessage = document.getElementById('budget-cap-error');

    expect(submitEvent.defaultPrevented).toBe(true);
    expect(errorMessage.textContent).toMatch(/greater than 0/i);
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
  });
});
