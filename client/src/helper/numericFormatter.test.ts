import { describe, expect, test } from "@jest/globals";

import {
  convertToNumericInput,
  convertZeroToEmptyString,
  decreaseByAmount,
  increaseByAmount,
  isValidNumber,
  toFixedSize,
} from "./numericFormatter";

describe(convertZeroToEmptyString.name, () => {
  test("it should return empty string when value is zero", () => {
    expect(convertZeroToEmptyString("0")).toBe("");
  });

  test("it should return the string value", () => {
    expect(convertZeroToEmptyString("10")).toBe("10");
  });
});

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

  test("it should allow the user", () => {
    const previousValue = String(99_999_999_999);
    const newValue = String(9_999_999_999);

    const result = toFixedSize(newValue, previousValue, 9);

    expect(result).toBe(newValue);
  });
});

describe(increaseByAmount.name, () => {
  test("it should increase a valid positive value by the given amount", () => {
    const result = increaseByAmount("10", 2.5);
    expect(result).toBe("12.5");
  });

  test("it should not exceed the maximum allowed value", () => {
    const result = increaseByAmount("999999998", 2.5);
    expect(result).toBe("999999998");
  });

  test("it should return the amount when input is empty or zero", () => {
    expect(increaseByAmount("", 2.5)).toBe("2.5");
    expect(increaseByAmount("0", 2.5)).toBe("2.5");
  });

  test("it  should return zero when the input is negative", () => {
    const result = increaseByAmount("-10", 2.5);
    expect(result).toBe("0");
  });
});

describe(decreaseByAmount.name, () => {
  test("it should decrease a valid positive value by the given amount", () => {
    const result = decreaseByAmount("10", 2.5);
    expect(result).toBe("7.5");
  });

  test("it should not go below zero", () => {
    const result = decreaseByAmount("1", 2.5);
    expect(result).toBe("0");
  });

  test("it should return the amount for invalid input", () => {
    const result = decreaseByAmount("", 2.5);
    expect(result).toBe("0");
  });
});

describe(convertToNumericInput.name, () => {
  test("it should convert to a number and rount to 3 decimals", () => {
    const result = convertToNumericInput("10.12567", 3);
    expect(result).toBe(10.126);
  });

  test("it should convert to a number", () => {
    const result = convertToNumericInput("10.12567", 3);
    expect(result).toBe(10.126);
  });

  test("it should remove leading zeros", () => {
    const result = convertToNumericInput("007.5");
    expect(result).toBe(7.5);
  });

  test("it should return zero for empty value", () => {
    const result = convertToNumericInput("");
    expect(result).toBe(0);
  });
});

describe(isValidNumber.name, () => {
  test("it should return false for blank string", () => {
    expect(isValidNumber("")).toBe(false);
    expect(isValidNumber("  ")).toBe(false);
  });

  test("it should return false for numeric string with , ", () => {
    expect(isValidNumber("0,22")).toBe(false);
    expect(isValidNumber("0,22,,,")).toBe(false);
    expect(isValidNumber(",022")).toBe(false);
    expect(isValidNumber("5,5")).toBe(false);
    expect(isValidNumber("5,")).toBe(false);
    expect(isValidNumber(",")).toBe(false);
    expect(isValidNumber(",,,")).toBe(false);
  });

  test("it should return true for numeric string", () => {
    expect(isValidNumber("10")).toBe(true);
    expect(isValidNumber("9.553")).toBe(true);
  });
});
