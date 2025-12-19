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
        // Call the public exchange rate API directly during dev
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        if (!response.ok) {
          throw new Error('Failed to fetch currency rates');
        }

        const raw = await response.json() as {
          base: string;
          date: string;
          rates: Record<string, number>;
        };

        // Mirror the structure produced by the worker so the rest of the app works the same
        const data: CurrencyResponse = {
          base: raw.base,
          date: raw.date,
          rates: {
            EUR: { rate: raw.rates.EUR, country: 'European Union', lat: 50.8503, lon: 4.3517 },
            GBP: { rate: raw.rates.GBP, country: 'United Kingdom', lat: 51.5074, lon: -0.1278 },
            JPY: { rate: raw.rates.JPY, country: 'Japan', lat: 35.6762, lon: 139.6503 },
            CNY: { rate: raw.rates.CNY, country: 'China', lat: 39.9042, lon: 116.4074 },
            AUD: { rate: raw.rates.AUD, country: 'Australia', lat: -33.8688, lon: 151.2093 },
            CAD: { rate: raw.rates.CAD, country: 'Canada', lat: 45.4215, lon: -75.6972 },
            CHF: { rate: raw.rates.CHF, country: 'Switzerland', lat: 46.9480, lon: 7.4474 },
            INR: { rate: raw.rates.INR, country: 'India', lat: 28.6139, lon: 77.2090 },
            BRL: { rate: raw.rates.BRL, country: 'Brazil', lat: -15.8267, lon: -47.9218 },
            MXN: { rate: raw.rates.MXN, country: 'Mexico', lat: 19.4326, lon: -99.1332 },
            ZAR: { rate: raw.rates.ZAR, country: 'South Africa', lat: -25.7479, lon: 28.2293 },
            SGD: { rate: raw.rates.SGD, country: 'Singapore', lat: 1.3521, lon: 103.8198 },
            KRW: { rate: raw.rates.KRW, country: 'South Korea', lat: 37.5665, lon: 126.9780 },
            RUB: { rate: raw.rates.RUB, country: 'Russia', lat: 55.7558, lon: 37.6173 },
            NZD: { rate: raw.rates.NZD, country: 'New Zealand', lat: -41.2865, lon: 174.7762 },
            SEK: { rate: raw.rates.SEK, country: 'Sweden', lat: 59.3293, lon: 18.0686 },
            NOK: { rate: raw.rates.NOK, country: 'Norway', lat: 59.9139, lon: 10.7522 },
            DKK: { rate: raw.rates.DKK, country: 'Denmark', lat: 55.6761, lon: 12.5683 },
            PLN: { rate: raw.rates.PLN, country: 'Poland', lat: 52.2297, lon: 21.0122 },
            THB: { rate: raw.rates.THB, country: 'Thailand', lat: 13.7563, lon: 100.5018 },
            AED: { rate: raw.rates.AED, country: 'UAE', lat: 24.4539, lon: 54.3773 },
            SAR: { rate: raw.rates.SAR, country: 'Saudi Arabia', lat: 24.7136, lon: 46.6753 },
            TRY: { rate: raw.rates.TRY, country: 'Turkey', lat: 39.9334, lon: 32.8597 },
            ARS: { rate: raw.rates.ARS, country: 'Argentina', lat: -34.6037, lon: -58.3816 },
            CLP: { rate: raw.rates.CLP, country: 'Chile', lat: -33.4489, lon: -70.6693 },
            EGP: { rate: raw.rates.EGP, country: 'Egypt', lat: 30.0444, lon: 31.2357 },
            IDR: { rate: raw.rates.IDR, country: 'Indonesia', lat: -6.2088, lon: 106.8456 },
            MYR: { rate: raw.rates.MYR, country: 'Malaysia', lat: 3.1390, lon: 101.6869 },
            PHP: { rate: raw.rates.PHP, country: 'Philippines', lat: 14.5995, lon: 120.9842 },
            VND: { rate: raw.rates.VND, country: 'Vietnam', lat: 21.0285, lon: 105.8542 },
          },
        };

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
