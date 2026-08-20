export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-slate-500">Insights</p>
        <h2 className="text-3xl font-bold text-slate-900">Reports</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          ['Income', '$4,200', '+12.4%'],
          ['Expenses', '$2,180', '-3.1%'],
          ['Savings', '$2,020', '+5.8%']
        ].map(([label, value, delta]) => (
          <div key={label} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm text-slate-500">{label}</p>
            <div className="mt-3 flex items-end justify-between">
              <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
              <span className="text-sm font-medium text-success">{delta}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
        <h3 className="mb-4 text-xl font-bold">Monthly spending</h3>
        <div className="flex h-52 items-end gap-3">
          {[42, 56, 39, 58, 75, 62, 85].map((value, index) => (
            <div key={index} className="flex flex-1 flex-col items-center gap-3">
              <div className="w-full rounded-t-2xl bg-brand-500" style={{ height: `${value}%` }} />
              <span className="text-xs text-slate-500">M{index + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
