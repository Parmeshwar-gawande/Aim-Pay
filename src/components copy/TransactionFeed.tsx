import { useEffect, useState } from 'react';
import { ArrowRight, TrendingUp } from 'lucide-react';

interface Transaction {
  id: string;
  fromCurrency: string;
  toCurrency: string;
  fromAmount: number;
  toAmount: number;
  fromCountry: string;
  toCountry: string;
  timestamp: Date;
}

interface CurrencyData {
  rate: number;
  country: string;
}

interface CurrencyRates {
  [key: string]: CurrencyData;
}

interface TransactionFeedProps {
  rates: CurrencyRates;
}

export default function TransactionFeed({ rates }: TransactionFeedProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const generateTransaction = (): Transaction => {
      const currencies = Object.keys(rates);
      const toCurrency = currencies[Math.floor(Math.random() * currencies.length)];
      const fromAmount = Math.floor(Math.random() * 10000) + 100;
      const toAmount = fromAmount * rates[toCurrency].rate;

      return {
        id: `${Date.now()}-${Math.random()}`,
        fromCurrency: 'USD',
        toCurrency,
        fromAmount,
        toAmount,
        fromCountry: 'United States',
        toCountry: rates[toCurrency].country,
        timestamp: new Date(),
      };
    };

    setTransactions(Array.from({ length: 5 }, generateTransaction));

    const interval = setInterval(() => {
      setTransactions(prev => [generateTransaction(), ...prev].slice(0, 20));
    }, Math.random() * 2000 + 2000);

    return () => clearInterval(interval);
  }, [rates]);

  return (
    <div className="bg-slate-900/80 backdrop-blur-md rounded-xl border border-amber-500/20 shadow-xl overflow-hidden">

      {/* Header */}
      <div className="px-5 py-4 border-b border-amber-500/20 bg-slate-900/60">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-amber-400" />
          <h3 className="text-sm font-semibold tracking-tight text-amber-400">
            Live Transactions
          </h3>

          <div className="ml-auto flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-[11px] font-medium tracking-wide text-emerald-400">
              LIVE
            </span>
          </div>
        </div>
      </div>

      {/* List */}
      <div className="max-h-[600px] overflow-y-auto custom-scrollbar">
        <div className="divide-y divide-amber-500/10">
          {transactions.map((tx, index) => (
            <div
              key={tx.id}
              className="px-5 py-4 transition-colors hover:bg-amber-500/5 animate-fade-in"
              style={{ animationDelay: `${index * 40}ms` }}
            >
              <div className="flex items-center gap-3">

                <div className="flex-1">
                  {/* Amounts */}
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono font-semibold text-sm text-gray-100">
                      {tx.fromAmount.toLocaleString()} {tx.fromCurrency}
                    </span>

                    <ArrowRight className="w-4 h-4 text-slate-400" />

                    <span className="font-mono font-semibold text-sm text-amber-400">
                      {tx.toAmount.toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })}{' '}
                      {tx.toCurrency}
                    </span>
                  </div>

                  {/* Countries */}
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                    <span>{tx.fromCountry}</span>
                    <ArrowRight className="w-3 h-3 opacity-60" />
                    <span>{tx.toCountry}</span>
                  </div>
                </div>

                {/* Time */}
                <div className="text-right">
                  <span className="text-[11px] tracking-wide text-slate-500">
                    {tx.timestamp.toLocaleTimeString()}
                  </span>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Animation */}
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.25s ease-out both;
        }
      `}</style>

    </div>
  );
}
