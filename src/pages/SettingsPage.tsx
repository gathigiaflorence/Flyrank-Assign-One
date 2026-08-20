export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-slate-500">Preferences</p>
        <h2 className="text-3xl font-bold text-slate-900">Settings</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {[
          'Currency',
          'Monthly reset date',
          'Notification preferences',
          'Export data'
        ].map((item) => (
          <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-sm text-slate-500">{item}</p>
            <div className="mt-3 flex items-center justify-between">
              <span className="font-medium text-slate-900">Default</span>
              <span className="text-brand-600">Edit</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
