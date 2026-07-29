import { formatCurrency, validateSettings } from "./validation.js";

const storageKey = "budget-tracker-state-v1";

const defaultState = {
  settings: {
    ownerName: "Alex",
    budget: 2500,
    currency: "USD",
  },
  transactions: [
    { id: crypto.randomUUID(), description: "Salary", amount: 3000, type: "income" },
    { id: crypto.randomUUID(), description: "Groceries", amount: 85, type: "expense" },
  ],
};

let state = loadState();

const elements = {
  settingsForm: document.querySelector("#settings-form"),
  transactionForm: document.querySelector("#transaction-form"),
  budgetValue: document.querySelector("#budget-value"),
  spentValue: document.querySelector("#spent-value"),
  remainingValue: document.querySelector("#remaining-value"),
  budgetStatus: document.querySelector("#budget-status"),
  settingsMessage: document.querySelector("#settings-message"),
  transactionMessage: document.querySelector("#transaction-message"),
  transactionsList: document.querySelector("#transactions-list"),
  ownerNameInput: document.querySelector("#owner-name"),
  budgetInput: document.querySelector("#monthly-budget"),
  currencyInput: document.querySelector("#currency"),
  ownerNameError: document.querySelector("#owner-name-error"),
  budgetError: document.querySelector("#budget-error"),
  currencyError: document.querySelector("#currency-error"),
};

function loadState() {
  try {
    const stored = localStorage.getItem(storageKey);
    if (!stored) {
      return defaultState;
    }

    const parsed = JSON.parse(stored);
    return {
      settings: { ...defaultState.settings, ...(parsed.settings || {}) },
      transactions: Array.isArray(parsed.transactions) ? parsed.transactions : defaultState.transactions,
    };
  } catch (error) {
    console.warn("Unable to read saved budget data", error);
    return defaultState;
  }
}

function saveState() {
  localStorage.setItem(storageKey, JSON.stringify(state));
}

function calculateTotals() {
  const expenses = state.transactions
    .filter((entry) => entry.type === "expense")
    .reduce((sum, entry) => sum + Number(entry.amount), 0);

  const income = state.transactions
    .filter((entry) => entry.type === "income")
    .reduce((sum, entry) => sum + Number(entry.amount), 0);

  const remaining = Number(state.settings.budget) - expenses;

  return { expenses, income, remaining };
}

function render() {
  const { expenses, income, remaining } = calculateTotals();
  const currency = state.settings.currency;

  elements.budgetValue.textContent = formatCurrency(Number(state.settings.budget), currency);
  elements.spentValue.textContent = formatCurrency(expenses, currency);
  elements.remainingValue.textContent = formatCurrency(remaining, currency);

  if (remaining >= 0) {
    elements.budgetStatus.textContent = `${state.settings.ownerName || "You"} has ${formatCurrency(remaining, currency)} left.`;
  } else {
    elements.budgetStatus.textContent = `You are ${formatCurrency(Math.abs(remaining), currency)} over budget.`;
  }

  elements.ownerNameInput.value = state.settings.ownerName || "";
  elements.budgetInput.value = state.settings.budget || "";
  elements.currencyInput.value = state.settings.currency || "";

  if (state.transactions.length === 0) {
    elements.transactionsList.innerHTML = '<li>No transactions yet. Add one to get started.</li>';
    return;
  }

  elements.transactionsList.innerHTML = state.transactions
    .slice()
    .reverse()
    .map((entry) => {
      const amountText = `${entry.type === "income" ? "+" : "-"}${formatCurrency(Number(entry.amount), currency)}`;
      return `
        <li>
          <div>
            <strong>${entry.description}</strong>
            <div class="type">${entry.type}</div>
          </div>
          <span class="${entry.type}">${amountText}</span>
        </li>
      `;
    })
    .join("");
}

function clearSettingsErrors() {
  elements.ownerNameError.textContent = "";
  elements.budgetError.textContent = "";
  elements.currencyError.textContent = "";
  elements.settingsMessage.textContent = "";
}

function handleSettingsSubmit(event) {
  event.preventDefault();
  clearSettingsErrors();

  const formData = new FormData(elements.settingsForm);
  const payload = Object.fromEntries(formData.entries());
  const validation = validateSettings(payload);

  if (!validation.isValid) {
    if (validation.errors.ownerName) {
      elements.ownerNameError.textContent = validation.errors.ownerName;
    }
    if (validation.errors.budget) {
      elements.budgetError.textContent = validation.errors.budget;
    }
    if (validation.errors.currency) {
      elements.currencyError.textContent = validation.errors.currency;
    }
    elements.settingsMessage.textContent = "Please fix the highlighted fields.";
    elements.settingsMessage.style.color = "#dc2626";
    return;
  }

  state.settings = {
    ownerName: payload.ownerName.trim(),
    budget: Number(payload.budget),
    currency: payload.currency,
  };

  saveState();
  render();
  elements.settingsMessage.textContent = "Settings saved successfully.";
  elements.settingsMessage.style.color = "#0f766e";
}

function handleTransactionSubmit(event) {
  event.preventDefault();
  const formData = new FormData(elements.transactionForm);
  const description = String(formData.get("description") || "").trim();
  const amount = Number(formData.get("amount"));
  const type = String(formData.get("type") || "expense");

  if (!description || Number.isNaN(amount) || amount <= 0) {
    elements.transactionMessage.textContent = "Please add a valid description and amount.";
    elements.transactionMessage.style.color = "#dc2626";
    return;
  }

  state.transactions.push({
    id: crypto.randomUUID(),
    description,
    amount,
    type,
  });

  saveState();
  elements.transactionForm.reset();
  render();
  elements.transactionMessage.textContent = "Transaction added.";
  elements.transactionMessage.style.color = "#0f766e";
}

function initialize() {
  elements.settingsForm.addEventListener("submit", handleSettingsSubmit);
  elements.transactionForm.addEventListener("submit", handleTransactionSubmit);
  render();
}

initialize();
