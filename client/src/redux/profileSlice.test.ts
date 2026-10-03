import { profileReducer, toggleTheme } from "./profileSlice";
import { describe, expect, test } from "@jest/globals";

describe(toggleTheme.name, () => {
  test("it should toggle the theme between light and dark", () => {
    const darkStore = profileReducer({ theme: "light" }, toggleTheme("dark"));
    expect(darkStore.theme).toBe("dark");

    const lightStore = profileReducer({ theme: "dark" }, toggleTheme("light"));
    expect(lightStore.theme).toBe("light");
  });
});
