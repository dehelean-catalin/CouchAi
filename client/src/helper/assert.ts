export function assertIsPositive(value: number) {
  if (value < 0) {
    throw new Error(`${value} is not a positive value`);
  }
}

export function assertIsDefined(value: unknown) {
  if (value === undefined) {
    throw new Error("Value is not defined");
  }
}
