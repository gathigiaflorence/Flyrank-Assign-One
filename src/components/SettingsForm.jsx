import React, { useEffect, useRef } from 'react';
import { initializeSettingsForm } from '../settings.js';

function SettingsForm() {
  const formRef = useRef(null);

  useEffect(() => {
    if (formRef.current) {
      initializeSettingsForm(formRef.current);
    }
  }, []);

  return (
    <form ref={formRef} id="settings-form" novalidate>
      <div className="field">
        <label htmlFor="currency">Preferred Currency</label>
        <select id="currency" name="currency">
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="KES">KES</option>
          <option value="GBP">GBP</option>
        </select>
        <p className="error-message" id="currency-error" aria-live="polite"></p>
      </div>

      <div className="field">
        <label htmlFor="budget-cap">Monthly Budget Cap</label>
        <input id="budget-cap" name="budgetCap" type="number" min="1" step="0.01" defaultValue="0" />
        <p className="error-message" id="budget-cap-error" aria-live="polite"></p>
      </div>

      <div className="field">
        <label htmlFor="email-alerts">Email Alerts</label>
        <input id="email-alerts" name="emailAlerts" type="checkbox" />
        <p className="error-message" id="email-alerts-error" aria-live="polite"></p>
      </div>

      <button type="submit">Save Settings</button>
    </form>
  );
}

export default SettingsForm;
