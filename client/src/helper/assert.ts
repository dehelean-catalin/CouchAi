export function assertIsPositive(value: number) {
  if (value < 0) {
    throw new Error(`${value} is not a positive value`);
  }
}
