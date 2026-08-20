const summaryCards = [
  { label: 'Total Balance', value: '$12,480', change: '+8.2%', tone: 'text-brand-600' },
  { label: 'Monthly Income', value: '$4,200', change: '+12.4%', tone: 'text-success' },
  { label: 'Monthly Expenses', value: '$2,180', change: '-3.1%', tone: 'text-danger' },
  { label: 'Remaining Budget', value: '$2,020', change: '+5.8%', tone: 'text-slate-900' }
];

const recentTransactions = [
  { title: 'Salary', category: 'Income', amount: '+$2,400', positive: true },
  { title: 'Rent', category: 'Housing', amount: '-$1,200', positive: false },
  { title: 'Groceries', category: 'Food', amount: '-$120', positive: false },
  { title: 'Freelance', category: 'Income', amount: '+$540', positive: true }
];

const budgetProgress = [
  { name: 'Housing', current: 82, limit: 1200, color: 'bg-brand-500' },
  { name: 'Food', current: 58, limit: 600, color: 'bg-success' },
  { name: 'Transport', current: 44, limit: 300, color: 'bg-warning' }
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 rounded-3xl bg-slate-900 p-6 text-white sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-slate-300">Welcome back</p>
          <h2 className="mt-1 text-3xl font-bold">Your monthly overview</h2>
        </div>
        <button className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-100">
          + Add transaction
        </button>
      </header>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((card) => (
          <div key={card.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm text-slate-500">{card.label}</p>
            <div className="mt-3 flex items-center justify-between gap-3">
              <h3 className="text-2xl font-bold text-slate-900">{card.value}</h3>
              <span className={`text-sm font-medium ${card.tone}`}>{card.change}</span>
            </div>
          </div>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-xl font-bold">Budget progress</h3>
            <span className="text-sm text-slate-500">This month</span>
          </div>

          <div className="space-y-5">
            {budgetProgress.map((item) => (
              <div key={item.name}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-700">{item.name}</span>
                  <span className="text-slate-500">${item.limit}</span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-200">
                  <div
                    className={`h-full rounded-full ${item.color}`}
                    style={{ width: `${Math.min(item.current, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <h3 className="mb-5 text-xl font-bold">Quick actions</h3>
          <div className="space-y-3">
            {['Add income', 'Add expense', 'Create budget', 'View report'].map((action) => (
              <button
                key={action}
                className="flex w-full items-center justify-between rounded-2xl bg-white px-4 py-3 text-left text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-100"
              >
                <span>{action}</span>
                <span aria-hidden="true">→</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-bold">Recent transactions</h3>
          <button className="text-sm font-medium text-brand-600">View all</button>
        </div>

        <div className="space-y-3">
          {recentTransactions.map((item) => (
            <div key={item.title} className="flex items-center justify-between rounded-2xl bg-white px-4 py-3">
              <div>
                <p className="font-medium text-slate-900">{item.title}</p>
                <p className="text-sm text-slate-500">{item.category}</p>
              </div>
              <span className={`font-semibold ${item.positive ? 'text-success' : 'text-slate-900'}`}>
                {item.amount}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
