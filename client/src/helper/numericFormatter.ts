const MAX_ALLOWED_VALUE = 999_999_999;
const ZERO = 0;

export function toFixedSize(
  value: string,
  previousValue: string,
  size: number,
) {
  if (value.length > size) {
    // allows user to delete
    if (previousValue.length > value.length) {
      return value;
    }
    return previousValue;
  }
  return value;
}

export function increaseByAmount(value: string, amount: number): string {
  if (!isValidNumber(value)) {
    return amount.toString();
  }
  const numericValue = Number(value);
  if (numericValue >= ZERO) {
    if (numericValue + amount > MAX_ALLOWED_VALUE) {
      return numericValue.toString();
    }
    return (numericValue + amount).toString();
  }
  return ZERO.toString();
}

export function decreaseByAmount(value: string, amount: number): string {
  if (!isValidNumber(value)) {
    return ZERO.toString();
  }
  const newValue = Number(value) - amount;
  if (newValue < ZERO) {
    return ZERO.toString();
  }
  return newValue.toString();
}

export function isValidNumber(value: string): boolean {
  return value.trim() !== "" && Number.isFinite(Number(value));
}

export function convertToNumericInput(
  value: string,
  numberOfDecimals?: number,
) {
  if (!isValidNumber(value)) {
    return ZERO;
  }

  const numericValue = Number(value);
  if (numberOfDecimals !== undefined) {
    return Number(numericValue.toFixed(numberOfDecimals));
  }

  return numericValue;
}

export function convertZeroToEmptyString(value: string) {
  return value === ZERO.toString() ? "" : value;
}
