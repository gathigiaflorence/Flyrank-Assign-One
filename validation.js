export function validateSettings(payload) {
  const errors = {};

  const ownerName = (payload.ownerName || "").trim();
  if (!ownerName) {
    errors.ownerName = "Please enter your name.";
  } else if (ownerName.length < 2) {
    errors.ownerName = "Your name should have at least 2 characters.";
  }

  const rawBudget = payload.budget;
  const budget = Number(rawBudget);
  if (rawBudget === "" || rawBudget === null || rawBudget === undefined) {
    errors.budget = "Monthly budget is required.";
  } else if (Number.isNaN(budget)) {
    errors.budget = "Budget must be a valid number.";
  } else if (budget <= 0) {
    errors.budget = "Budget must be greater than zero.";
  } else if (budget > 1000000) {
    errors.budget = "Budget looks too high for this app.";
  }

  const currency = (payload.currency || "").trim();
  if (!currency) {
    errors.currency = "Please choose a currency.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function formatCurrency(amount, currency) {
  const formatter = new Intl.NumberFormat("en", {
    style: "currency",
    currency: currency || "USD",
    minimumFractionDigits: 2,
  });

  return formatter.format(amount);
}
