import { useEffect, useState } from 'react';

type HealthRecord = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export default function HealthCheckPage() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [data, setData] = useState<HealthRecord[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const apiUrl = `${import.meta.env.VITE_API_BASE_URL || 'https://jsonplaceholder.typicode.com'}/todos?_limit=3`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch health data');
        }
        return response.json();
      })
      .then((result) => {
        setData(result);
        setStatus('success');
      })
      .catch((fetchError) => {
        setStatus('error');
        setError(fetchError instanceof Error ? fetchError.message : 'Unknown error');
      });
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-slate-500">System status</p>
        <h2 className="text-3xl font-bold text-slate-900">Health check</h2>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-slate-600">API check</span>
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
              status === 'success'
                ? 'bg-emerald-100 text-emerald-700'
                : status === 'error'
                  ? 'bg-red-100 text-red-700'
                  : 'bg-amber-100 text-amber-700'
            }`}
          >
            {status === 'loading' ? 'Loading' : status === 'success' ? 'Healthy' : 'Error'}
          </span>
        </div>

        {status === 'loading' && <p className="mt-4 text-sm text-slate-500">Fetching health data…</p>}

        {status === 'success' && data && (
          <div className="mt-4 space-y-3">
            {data.map((item) => (
              <div key={item.id} className="rounded-xl bg-white p-3 shadow-sm">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-slate-900">{item.title}</p>
                  <span className={`text-xs ${item.completed ? 'text-emerald-600' : 'text-amber-600'}`}>
                    {item.completed ? 'Completed' : 'Pending'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {status === 'error' && (
          <p className="mt-4 text-sm text-red-600">{error}</p>
        )}
      </div>
    </div>
  );
}
