const budgets = [
  { name: 'Housing', spent: 980, total: 1200 },
  { name: 'Food', spent: 340, total: 600 },
  { name: 'Transport', spent: 130, total: 300 },
  { name: 'Entertainment', spent: 210, total: 250 }
];

export default function BudgetsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">Planning</p>
          <h2 className="text-3xl font-bold text-slate-900">Budgets</h2>
        </div>
        <button className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-100">
          + New budget
        </button>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {budgets.map((budget) => {
          const percent = Math.min((budget.spent / budget.total) * 100, 100);
          return (
            <div key={budget.name} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900">{budget.name}</h3>
                <span className="text-sm text-slate-500">${budget.spent} / ${budget.total}</span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-slate-200">
                <div className="h-full rounded-full bg-brand-500" style={{ width: `${percent}%` }} />
              </div>
              <p className="mt-3 text-sm text-slate-600">{Math.round(percent)}% used</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
