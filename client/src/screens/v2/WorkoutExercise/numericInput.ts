export function toFixedSize(
  value: string,
  previousValue: string,
  size: number,
): string {
  if (value.length > size) {
    // allows user to delete
    if (previousValue.length > value.length) {
      return value;
    }
    return previousValue;
  }
  return value;
}

const MAX_ALLOWED_VALUE = 999_999_999;
const MIN_ALLOWED_VALUE = 0;
const ALLOWED_DECIMAL_PLACES = 3;

export function increasePositiveValue(value: string, amount: number): string {
  if (!isValidNumber(value)) {
    return amount.toString();
  }
  if (Number(value) >= MIN_ALLOWED_VALUE) {
    if (Number(value) + amount > MAX_ALLOWED_VALUE) {
      return Number(value).toString();
    }
    return (Number(value) + amount).toString();
  }
  return MIN_ALLOWED_VALUE.toString();
}

export function decreasePositiveValue(value: string, amount: number): string {
  if (!isValidNumber(value)) {
    return MIN_ALLOWED_VALUE.toString();
  }
  const newValue = Number(value) - amount;
  if (newValue < MIN_ALLOWED_VALUE) {
    return MIN_ALLOWED_VALUE.toString();
  }
  return newValue.toString();
}

export function isValidNumber(value: string): boolean {
  return value.trim() !== "" && Number.isFinite(Number(value));
}

export function computeValidWeight(weight: string): number {
  return isValidNumber(weight)
    ? Number(Number(weight).toFixed(ALLOWED_DECIMAL_PLACES))
    : MIN_ALLOWED_VALUE;
}
