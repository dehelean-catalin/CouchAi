import { ColorSchemeName } from "react-native";

interface ColorValue {
  surface0: string;
  surface1: string;
  blue0: string;
}

interface TextColorValue {
  primary: string;
  secondary: string;
}

const BLUE_0 = "rgb(51, 146, 234)";

export const COLORS: Record<ColorSchemeName, ColorValue> = {
  light: {
    surface0: "rgb(180, 187, 213)",
    surface1: "rgb(220, 220, 220)",

    blue0: BLUE_0,
  },
  dark: {
    surface0: "rgb(10, 10, 10)",
    surface1: "rgb(30, 30, 30)",

    blue0: BLUE_0,
  },
};

export const textColors: Record<ColorSchemeName, TextColorValue> = {
  light: {
    primary: "rgb(40, 40, 40)",
    secondary: "rgb(80, 80, 80)",
  },
  dark: {
    primary: "rgb(229, 229, 229)",
    secondary: "rgba(229, 229, 229,0.6)",
  },
};
