import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-2xl font-bold text-purple-400 mb-6">
        404
      </div>
      <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
        Page Not Found
      </h1>
      <p className="text-sm text-gray-400 max-w-md mb-8">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <a
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-lg shadow-purple-600/30 transition-all"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to RanginGfx</span>
      </a>
    </div>
  );
}
