// currency conversion to IDR
type CurrencyCode = 'USD' | 'GBP' | 'EUR';

const exchangeRates: Record<CurrencyCode, number> = {
  USD: 17000,
  GBP: 23000,
  EUR: 20000
};

export function convertToIdr(amount: number, currency: CurrencyCode): number {
  const rate = exchangeRates[currency];
  return amount * rate;
}
// end currency conversion to IDR