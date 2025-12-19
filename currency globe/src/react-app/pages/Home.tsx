import { Loader2, RefreshCw, Globe2 } from 'lucide-react';
import { useCurrencyRates } from '@/react-app/hooks/useCurrencyRates';
import CurrencyGlobe from '@/react-app/components/CurrencyGlobe';
import TransactionFeed from '@/react-app/components/TransactionFeed';

export default function Home() {
  const { rates, loading, error, lastUpdated } = useCurrencyRates();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-orange-900 to-slate-900">
        <div className="animate-spin mb-4">
          <Loader2 className="w-12 h-12 text-orange-400" />
        </div>
        <p className="text-orange-200 text-lg">Loading currency rates...</p>
      </div>
    );
  }

  if (error || !rates) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-orange-900 to-slate-900">
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6 max-w-md">
          <p className="text-red-400 text-center">
            {error || 'Failed to load currency rates'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-orange-900 to-slate-900 text-white">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-10 p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-500/20 rounded-lg backdrop-blur-sm border border-orange-400/30">
              <Globe2 className="w-6 h-6 text-orange-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                CurrencyGlobe
              </h1>
              <p className="text-sm text-orange-300/70">Real-time exchange rates</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-slate-800/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-orange-500/20">
            <RefreshCw className="w-4 h-4 text-orange-400" />
            <span className="text-sm text-orange-200">
              Updated: {lastUpdated}
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative w-full h-screen">
        <CurrencyGlobe rates={rates} />
      </div>

      {/* Instructions */}
      <div className="absolute bottom-6 left-6 right-6 z-10">
        <div className="max-w-md mx-auto bg-slate-800/80 backdrop-blur-md px-6 py-4 rounded-xl border border-orange-500/30 shadow-2xl">
          <p className="text-sm text-orange-200 text-center">
            <span className="font-semibold text-orange-400">Drag to rotate</span> the globe
            <span className="mx-2">•</span>
            <span className="font-semibold text-orange-400">Hover over markers</span> to see rates
            <span className="mx-2">•</span>
            <span className="font-semibold text-orange-400">Scroll to zoom</span>
          </p>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="absolute top-24 right-6 z-10 w-80 space-y-4">
        {/* Legend */}
        <div className="bg-slate-800/80 backdrop-blur-md px-5 py-4 rounded-xl border border-orange-500/30 shadow-2xl">
          <h3 className="text-sm font-semibold text-orange-400 mb-3">Exchange Rates (USD)</h3>
          <div className="space-y-2 max-h-64 overflow-y-auto custom-scrollbar">
            {Object.entries(rates)
              .sort((a, b) => a[0].localeCompare(b[0]))
              .map(([currency, data]) => (
                <div key={currency} className="flex items-center justify-between text-xs">
                  <span className="text-orange-200 font-medium">{currency}</span>
                  <span className="text-white">{data.rate.toFixed(2)}</span>
                </div>
              ))}
          </div>
        </div>

        {/* Transaction Feed */}
        <TransactionFeed rates={rates} />
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(194, 65, 12, 0.1);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(251, 146, 60, 0.5);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(251, 146, 60, 0.7);
        }
      `}</style>
    </div>
  );
}
