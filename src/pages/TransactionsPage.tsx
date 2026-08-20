export default function TransactionsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-slate-500">Overview</p>
          <h2 className="text-3xl font-bold text-slate-900">Transactions</h2>
        </div>
        <button className="rounded-xl bg-brand-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-600">
          + New transaction
        </button>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <div className="grid gap-3 md:grid-cols-3">
          <input
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand-500"
            placeholder="Search transactions"
          />
          <select className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand-500">
            <option>All categories</option>
            <option>Food</option>
            <option>Housing</option>
            <option>Income</option>
          </select>
          <select className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand-500">
            <option>This month</option>
            <option>Last month</option>
            <option>2026</option>
          </select>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200">
        <table className="min-w-full divide-y divide-slate-200 bg-white text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {[
              ['Salary', 'Income', 'Aug 02, 2026', '+$2,400'],
              ['Rent', 'Housing', 'Aug 01, 2026', '-$1,200'],
              ['Groceries', 'Food', 'Jul 30, 2026', '-$120'],
              ['Freelance', 'Income', 'Jul 28, 2026', '+$540']
            ].map(([title, category, date, amount]) => (
              <tr key={title} className="hover:bg-slate-50">
                <td className="px-4 py-3 font-medium text-slate-900">{title}</td>
                <td className="px-4 py-3 text-slate-600">{category}</td>
                <td className="px-4 py-3 text-slate-600">{date}</td>
                <td className={`px-4 py-3 font-semibold ${amount.startsWith('+') ? 'text-success' : 'text-slate-900'}`}>
                  {amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
