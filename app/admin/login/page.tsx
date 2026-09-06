'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Lock, ArrowLeft, ArrowRight, ShieldCheck, AlertCircle, KeyRound } from 'lucide-react';

export default function AdminLoginPage() {
  const [passcode, setPasscode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!passcode.trim()) {
      setError('Please enter the administrative passcode.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode: passcode.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      // Success, navigate to admin dashboard
      router.push('/admin');
      router.refresh();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred. Please verify your passcode.');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center p-4 overflow-hidden font-sans">
      {/* Background ambient lighting */}
      <div className="ambient-glow w-[500px] h-[500px] bg-[#7c3aed] top-[10%] left-[30%] -z-10 opacity-20" />
      <div className="ambient-glow w-[400px] h-[400px] bg-indigo-700 bottom-[15%] right-[20%] -z-10 opacity-15" />

      {/* Back to website button */}
      <div className="absolute top-6 left-6 sm:top-8 sm:left-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Site</span>
        </Link>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl relative">
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-[#7c3aed]/15 border border-[#7c3aed]/30 flex items-center justify-center mb-4 shadow-lg shadow-[#7c3aed]/20">
            <Lock className="w-7 h-7 text-[#7c3aed]" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Rangin<span className="text-[#7c3aed]">Gfx</span> Admin
          </h1>
          <p className="text-xs text-gray-400 mt-2">
            Enter your secret passcode to access content controls
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-start gap-3 text-red-300 text-xs">
            <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="passcode"
              className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-2"
            >
              Admin Passcode
            </label>
            <div className="relative">
              <input
                id="passcode"
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter passcode..."
                disabled={loading}
                autoFocus
                required
                className="w-full px-4 py-3.5 pl-11 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/10 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#7c3aed] focus:ring-1 focus:ring-[#7c3aed] transition-all"
              />
              <KeyRound className="w-4 h-4 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2" />
            </div>
            <p className="text-[11px] text-gray-500 mt-2">
              Default passcode: <code className="text-[#a78bfa] bg-white/5 px-1.5 py-0.5 rounded border border-white/10">Rangin@123</code>
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#7c3aed] hover:bg-[#6d28d9] disabled:opacity-50 text-white font-bold text-sm shadow-lg shadow-[#7c3aed]/20 transition-all cursor-pointer"
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>Access Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <div className="inline-flex items-center gap-1.5 text-[11px] text-gray-500">
            <ShieldCheck className="w-3.5 h-3.5 text-[#7c3aed]" />
            <span>Encrypted with JWT & httpOnly 7-day session cookies</span>
          </div>
        </div>
      </div>
    </div>
  );
}
