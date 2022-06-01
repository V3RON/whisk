export function round(number, decimals = 2) {
  return Math.round(number * 10^decimals) / 10^decimals;
}
