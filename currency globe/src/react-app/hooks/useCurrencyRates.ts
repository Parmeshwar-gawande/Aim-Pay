import { useState, useEffect } from 'react';

interface CurrencyData {
  rate: number;
  country: string;
  lat: number;
  lon: number;
}

interface CurrencyRates {
  [key: string]: CurrencyData;
}

interface CurrencyResponse {
  base: string;
  date: string;
  rates: CurrencyRates;
}

export function useCurrencyRates() {
  const [rates, setRates] = useState<CurrencyRates | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await fetch('/api/currency-rates');
        if (!response.ok) {
          throw new Error('Failed to fetch currency rates');
        }
        const data: CurrencyResponse = await response.json();
        setRates(data.rates);
        setLastUpdated(data.date);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
    
    // Refresh rates every 5 minutes
    const interval = setInterval(fetchRates, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  return { rates, loading, error, lastUpdated };
}
