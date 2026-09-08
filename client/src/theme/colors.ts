import { ColorSchemeName } from "react-native";

interface ColorValue {
  surface0: string;
  surface1: string;
}

interface TextColorValue {
  primary: string;
  secondary: string;
}

export const COLORS: Record<ColorSchemeName, ColorValue> = {
  light: {
    surface0: "rgb(229, 229, 229)",
    surface1: "rgb(199, 199, 199)",
  },
  dark: {
    surface0: "rgb(10, 10, 10)",
    surface1: "rgb(33, 33, 33)",
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
