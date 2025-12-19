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
      const fromCurrency = 'USD';
      const toCurrency = currencies[Math.floor(Math.random() * currencies.length)];
      const fromAmount = Math.floor(Math.random() * 10000) + 100;
      const toAmount = fromAmount * rates[toCurrency].rate;

      return {
        id: `${Date.now()}-${Math.random()}`,
        fromCurrency,
        toCurrency,
        fromAmount,
        toAmount,
        fromCountry: 'United States',
        toCountry: rates[toCurrency].country,
        timestamp: new Date(),
      };
    };

    // Add initial transactions
    const initial = Array.from({ length: 5 }, generateTransaction);
    setTransactions(initial);

    // Generate new transactions every 2-4 seconds
    const interval = setInterval(() => {
      const newTransaction = generateTransaction();
      setTransactions((prev) => [newTransaction, ...prev].slice(0, 20));
    }, Math.random() * 2000 + 2000);

    return () => clearInterval(interval);
  }, [rates]);

  return (
    <div className="bg-slate-800/80 backdrop-blur-md rounded-xl border border-orange-500/30 shadow-2xl overflow-hidden">
      <div className="px-5 py-4 border-b border-orange-500/20 bg-slate-900/50">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-orange-400" />
          <h3 className="text-lg font-semibold text-orange-400">Live Transactions</h3>
          <div className="ml-auto flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs text-green-400">Live</span>
          </div>
        </div>
      </div>

      <div className="max-h-[600px] overflow-y-auto custom-scrollbar">
        <div className="divide-y divide-orange-500/10">
          {transactions.map((tx, index) => (
            <div
              key={tx.id}
              className="px-5 py-4 hover:bg-orange-500/5 transition-colors animate-fade-in"
              style={{
                animationDelay: `${index * 50}ms`,
              }}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono font-bold text-orange-400">
                      {tx.fromAmount.toLocaleString()} {tx.fromCurrency}
                    </span>
                    <ArrowRight className="w-4 h-4 text-orange-300" />
                    <span className="font-mono font-bold text-orange-400">
                      {tx.toAmount.toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })}{' '}
                      {tx.toCurrency}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-orange-200/60">
                    <span>{tx.fromCountry}</span>
                    <ArrowRight className="w-3 h-3" />
                    <span>{tx.toCountry}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-orange-200/40">
                    {tx.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
