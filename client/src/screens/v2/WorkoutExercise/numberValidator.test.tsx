import { describe, expect, test } from "@jest/globals";

import {
  computeValidWeight,
  decreasePositiveValue,
  increasePositiveValue,
  isValidNumber,
  toFixedSize,
} from "./numericInput";

describe(toFixedSize.name, () => {
  test("it should return the new value if user delete a digit", () => {
    const previousValue = "9999999999"; // 10 digits - not allowed
    const newValue = "99999999"; // 8 digits

    const result = toFixedSize(newValue, previousValue, 9);

    expect(result).toBe(newValue);
  });

  test("it should return the previous value if the new value exceeds the specified size", () => {
    const previousValue = "999999999"; // 9 digits
    const newValue = "9999999999"; // 10 digits

    const result = toFixedSize(newValue, previousValue, 9);

    expect(result).toBe(previousValue);
  });

  test("it should return new value if it doesn't exceeds the specified size", () => {
    const previousValue = String(9_999_999);
    const newValue = String(99_999_991);

    const result = toFixedSize(newValue, previousValue, 9);

    expect(result).toBe(newValue);
  });
});

describe(increasePositiveValue.name, () => {
  test("it should increase a valid positive value by the given amount", () => {
    const result = increasePositiveValue("10", 2.5);
    expect(result).toBe("12.5");
  });

  test("it should not exceed the maximum allowed value", () => {
    const result = increasePositiveValue("999999998", 2.5);
    expect(result).toBe("999999998");
  });

  test("it should return the amount for invalid input", () => {
    const result = increasePositiveValue("", 2.5);
    expect(result).toBe("2.5");
  });
});

describe(decreasePositiveValue.name, () => {
  test("it should decrease a valid positive value by the given amount", () => {
    const result = decreasePositiveValue("10", 2.5);
    expect(result).toBe("7.5");
  });

  test("it should not go below zero", () => {
    const result = decreasePositiveValue("1", 2.5);
    expect(result).toBe("0");
  });

  test("it should return the amount for invalid input", () => {
    const result = decreasePositiveValue("", 2.5);
    expect(result).toBe("0");
  });
});

describe(computeValidWeight.name, () => {
  test("it should round a valid weight to 3 decimal places", () => {
    const result = computeValidWeight("10.12567");
    expect(result).toBe(10.126);
  });

  test("it should return zero for invalid input", () => {
    const result = computeValidWeight("");
    expect(result).toBe(0);
  });
});

describe(isValidNumber.name, () => {
  test("it should return false for empty string", () => {
    const result = isValidNumber("");
    expect(result).toBe(false);
  });

  test("it should return false for whitespace string", () => {
    const result = isValidNumber("   ");
    expect(result).toBe(false);
  });

  test("it should return false for numeric string with , ", () => {
    const result = isValidNumber("0,22");
    expect(result).toBe(false);
  });

  test("it should return false for numeric string with multiple , ", () => {
    const result = isValidNumber("0,22,,,");
    expect(result).toBe(false);
  });

  test("it should return false for string with only commas ", () => {
    const result = isValidNumber(",,,");
    expect(result).toBe(false);
  });

  test("it should return false for numeric string", () => {
    const result = isValidNumber("10");
    expect(result).toBe(true);
  });

  test("it should return false for numeric string", () => {
    const result = isValidNumber("10.5");
    expect(result).toBe(true);
  });
});
