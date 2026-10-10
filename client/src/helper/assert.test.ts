import { describe, expect, test } from "@jest/globals";

import { assertIsDefined, assertIsPositive } from "./assert";

describe(assertIsPositive.name, () => {
  test("it should not throw for a zero or positive value", () => {
    expect(() => assertIsPositive(0)).not.toThrow();
    expect(() => assertIsPositive(20)).not.toThrow();
  });

  test("it should throw for a negative value", () => {
    expect(() => assertIsPositive(-1)).toThrow("-1 is not a positive value");
  });

  test("it should throw when value is no defined", () => {
    expect(() => assertIsDefined(undefined)).toThrow("Value is not defined");
    expect(() => assertIsDefined(null)).not.toThrow();
    expect(() => assertIsDefined(false)).not.toThrow();
    expect(() => assertIsDefined("")).not.toThrow();
    expect(() => assertIsDefined(0)).not.toThrow();
    expect(() => assertIsDefined([])).not.toThrow();
    expect(() => assertIsDefined({})).not.toThrow();
  });
});
