const STORAGE_KEY = 'app_settings';

function getFieldValue(form, fieldName) {
  const field = form.querySelector(`[name="${fieldName}"]`);
  return field ? field.value : '';
}

function setError(form, fieldName, message) {
  const errorElement = form.querySelector(`#${fieldName}-error`);
  if (errorElement) {
    errorElement.textContent = message;
  }
}

function clearErrors(form) {
  const errorFields = form.querySelectorAll('.error-message');
  errorFields.forEach((field) => {
    field.textContent = '';
  });
}

function validateBudgetCap(value) {
  const numericValue = Number(value);
  if (value === '' || Number.isNaN(numericValue)) {
    return 'Monthly budget cap is required.';
  }

  if (numericValue <= 0) {
    return 'Monthly budget cap must be greater than 0.';
  }

  return '';
}

function validateForm(form) {
  clearErrors(form);

  const budgetCap = getFieldValue(form, 'budgetCap');
  const budgetError = validateBudgetCap(budgetCap);

  if (budgetError) {
    setError(form, 'budget-cap', budgetError);
    return false;
  }

  return true;
}

function saveSettings(form) {
  if (!validateForm(form)) {
    return false;
  }

  const data = {
    currency: getFieldValue(form, 'currency'),
    budgetCap: Number(getFieldValue(form, 'budgetCap')),
    emailAlerts: form.querySelector('[name="emailAlerts"]').checked,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  return true;
}

function initializeSettingsForm(form) {
  if (!form) {
    return;
  }

  const budgetInput = form.querySelector('[name="budgetCap"]');
  const submitButton = form.querySelector('button[type="submit"]');

  const updateSubmitState = () => {
    const isValid = validateForm(form);
    if (submitButton) {
      submitButton.disabled = !isValid;
    }
  };

  budgetInput?.addEventListener('input', () => {
    validateForm(form);
    updateSubmitState();
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const isSaved = saveSettings(form);
    if (!isSaved) {
      updateSubmitState();
    }
  });

  updateSubmitState();
}

export { initializeSettingsForm, STORAGE_KEY, saveSettings, validateBudgetCap, validateForm };

const form = document.getElementById('settings-form');
if (form) {
  initializeSettingsForm(form);
}
