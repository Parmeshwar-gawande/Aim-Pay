import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono<{ Bindings: Env }>();

app.use("/*", cors());

// Fetch real-time currency conversion rates
app.get("/api/currency-rates", async (c) => {
  try {
    // Using exchangerate-api.com free API
    const response = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
    
    if (!response.ok) {
      throw new Error("Failed to fetch currency rates");
    }

    const data = await response.json() as {
      base: string;
      date: string;
      rates: Record<string, number>;
    };
    
    // Return rates for major currencies with accurate geographic coordinates (capital cities/financial centers)
    const currencyData = {
      base: data.base,
      date: data.date,
      rates: {
        EUR: { rate: data.rates.EUR, country: "European Union", lat: 50.8503, lon: 4.3517 }, // Brussels
        GBP: { rate: data.rates.GBP, country: "United Kingdom", lat: 51.5074, lon: -0.1278 }, // London
        JPY: { rate: data.rates.JPY, country: "Japan", lat: 35.6762, lon: 139.6503 }, // Tokyo
        CNY: { rate: data.rates.CNY, country: "China", lat: 39.9042, lon: 116.4074 }, // Beijing
        AUD: { rate: data.rates.AUD, country: "Australia", lat: -33.8688, lon: 151.2093 }, // Sydney
        CAD: { rate: data.rates.CAD, country: "Canada", lat: 45.4215, lon: -75.6972 }, // Ottawa
        CHF: { rate: data.rates.CHF, country: "Switzerland", lat: 46.9480, lon: 7.4474 }, // Bern
        INR: { rate: data.rates.INR, country: "India", lat: 28.6139, lon: 77.2090 }, // New Delhi
        BRL: { rate: data.rates.BRL, country: "Brazil", lat: -15.8267, lon: -47.9218 }, // Brasília
        MXN: { rate: data.rates.MXN, country: "Mexico", lat: 19.4326, lon: -99.1332 }, // Mexico City
        ZAR: { rate: data.rates.ZAR, country: "South Africa", lat: -25.7479, lon: 28.2293 }, // Pretoria
        SGD: { rate: data.rates.SGD, country: "Singapore", lat: 1.3521, lon: 103.8198 }, // Singapore
        KRW: { rate: data.rates.KRW, country: "South Korea", lat: 37.5665, lon: 126.9780 }, // Seoul
        RUB: { rate: data.rates.RUB, country: "Russia", lat: 55.7558, lon: 37.6173 }, // Moscow
        NZD: { rate: data.rates.NZD, country: "New Zealand", lat: -41.2865, lon: 174.7762 }, // Wellington
        SEK: { rate: data.rates.SEK, country: "Sweden", lat: 59.3293, lon: 18.0686 }, // Stockholm
        NOK: { rate: data.rates.NOK, country: "Norway", lat: 59.9139, lon: 10.7522 }, // Oslo
        DKK: { rate: data.rates.DKK, country: "Denmark", lat: 55.6761, lon: 12.5683 }, // Copenhagen
        PLN: { rate: data.rates.PLN, country: "Poland", lat: 52.2297, lon: 21.0122 }, // Warsaw
        THB: { rate: data.rates.THB, country: "Thailand", lat: 13.7563, lon: 100.5018 }, // Bangkok
        AED: { rate: data.rates.AED, country: "UAE", lat: 24.4539, lon: 54.3773 }, // Abu Dhabi
        SAR: { rate: data.rates.SAR, country: "Saudi Arabia", lat: 24.7136, lon: 46.6753 }, // Riyadh
        TRY: { rate: data.rates.TRY, country: "Turkey", lat: 39.9334, lon: 32.8597 }, // Ankara
        ARS: { rate: data.rates.ARS, country: "Argentina", lat: -34.6037, lon: -58.3816 }, // Buenos Aires
        CLP: { rate: data.rates.CLP, country: "Chile", lat: -33.4489, lon: -70.6693 }, // Santiago
        EGP: { rate: data.rates.EGP, country: "Egypt", lat: 30.0444, lon: 31.2357 }, // Cairo
        IDR: { rate: data.rates.IDR, country: "Indonesia", lat: -6.2088, lon: 106.8456 }, // Jakarta
        MYR: { rate: data.rates.MYR, country: "Malaysia", lat: 3.1390, lon: 101.6869 }, // Kuala Lumpur
        PHP: { rate: data.rates.PHP, country: "Philippines", lat: 14.5995, lon: 120.9842 }, // Manila
        VND: { rate: data.rates.VND, country: "Vietnam", lat: 21.0285, lon: 105.8542 }, // Hanoi
      }
    };

    return c.json(currencyData);
  } catch (error) {
    return c.json({ error: "Failed to fetch currency rates" }, 500);
  }
});

export default app;
