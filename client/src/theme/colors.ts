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
    surface0: "rgb(229, 229, 229)",
    surface1: "rgb(199, 199, 199)",

    blue0: BLUE_0,
  },
  dark: {
    surface0: "rgb(10, 10, 10)",
    surface1: "rgb(33, 33, 33)",

    blue0: BLUE_0,
  },
};

export const textColors: Record<ColorSchemeName, TextColorValue> = {
  light: {
    primary: "rgb(10, 10, 10)",
    secondary: "rgb(33, 33, 33)",
  },
  dark: {
    primary: "rgb(229, 229, 229)",
    secondary: "rgb(199, 199, 199)",
  },
};
