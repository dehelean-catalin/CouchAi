import { ColorSchemeName } from "react-native";

interface ColorValue {
  surface0: string;
  surface1: string;
  surface2: string;
  blue0: string;
}

interface TextColorValue {
  primary: string;
  secondary: string;
}

const BLUE_0 = "rgb(51, 146, 234)";

export const COLORS: Record<ColorSchemeName, ColorValue> = {
  light: {
    surface0: "rgb(210, 217, 227)",
    surface1: "rgb(255, 255, 255)",
    surface2: "rgb(238, 242, 247)",

    blue0: BLUE_0,
  },
  dark: {
    surface0: "rgb(32, 38, 48)",
    surface1: "rgb(12, 14, 18)",
    surface2: "rgb(50, 58, 70)",

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
