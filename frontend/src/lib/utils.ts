export function formatIdr(amount: number, withSymbol: boolean = true): string {
  const formatter = new Intl.NumberFormat('id-ID', {
    style: withSymbol ? 'currency' : 'decimal',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return formatter.format(amount);
}