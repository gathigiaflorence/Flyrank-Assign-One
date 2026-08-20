import { NavLink, Outlet } from 'react-router-dom';

const navigation = [
  { to: '/', label: 'Dashboard' },
  { to: '/transactions', label: 'Transactions' },
  { to: '/budgets', label: 'Budgets' },
  { to: '/reports', label: 'Reports' },
  { to: '/settings', label: 'Settings' },
  { to: '/health-check', label: 'Health Check' }
];

export default function Layout() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 p-4 lg:flex-row lg:p-6">
        <aside className="w-full rounded-3xl border border-slate-200 bg-white p-4 shadow-soft lg:w-72">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-500 text-lg font-bold text-white">
              B
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Finance</p>
              <h1 className="text-xl font-bold">BudgetFlow</h1>
            </div>
          </div>

          <nav className="space-y-2">
            {navigation.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `flex items-center rounded-2xl px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? 'bg-brand-50 text-brand-700 ring-1 ring-brand-100'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </aside>

        <main className="flex-1 rounded-3xl border border-slate-200 bg-white p-4 shadow-soft sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
