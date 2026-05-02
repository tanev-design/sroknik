const DUAL_DISPLAY_END = new Date('2026-08-08T00:00:00+03:00');

export function isDualPeriod(): boolean {
  return new Date() < DUAL_DISPLAY_END;
}

export function formatFee(euroAmount: number, bgnAmount: number): string {
  const eur = `${euroAmount.toFixed(2)} €`;
  if (isDualPeriod()) {
    return `${eur} (${bgnAmount} лв.)`;
  }
  return eur;
}

export function formatFeeRange(
  euroMin: number,
  euroMax: number,
  bgnMin: number,
  bgnMax: number
): string {
  const eur = `${euroMin.toFixed(2)}–${euroMax.toFixed(2)} €`;
  if (isDualPeriod()) {
    return `${eur} (${bgnMin}–${bgnMax} лв.)`;
  }
  return eur;
}
