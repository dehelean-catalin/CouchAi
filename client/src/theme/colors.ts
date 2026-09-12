interface ColorValue {
  surface0: string;
  surface1: string;
  surfaceShadow: string;
  blue_0: string;
  surface_blue: string;
}

interface TextColorValue {
  primary: string;
  secondary: string;
  light: string;
}

const BLUE_0 = "rgb(51, 146, 234)";

type Theme = "light" | "dark";

export const COLORS: Record<Theme, ColorValue> = {
  light: {
    surface0: "rgb(210, 217, 227)",
    surface1: "rgb(255, 255, 255)",

    surfaceShadow: "rgb(86, 88, 92)",

    blue_0: BLUE_0,
    surface_blue: "rgb(233, 242, 253)",
  },
  dark: {
    surface0: "rgb(16, 19, 23)",
    surface1: "rgb(51, 59, 72)",

    surfaceShadow: "rgb(77, 86, 102)",

    blue_0: BLUE_0,
    surface_blue: "rgba(16, 19, 23, 0.3)",
  },
};

const PRIMARY_LIGHT_TEXT_COLOR = "rgb(245, 245, 245)";
const PRIMARY_DARK_TEXT_COLOR = "rgb(40, 40, 40)";

export const textColors: Record<Theme, TextColorValue> = {
  light: {
    primary: PRIMARY_DARK_TEXT_COLOR,
    secondary: "rgb(80, 80, 80)",
    light: PRIMARY_LIGHT_TEXT_COLOR,
  },
  dark: {
    primary: PRIMARY_LIGHT_TEXT_COLOR,
    secondary: "rgba(229, 229, 229,0.6)",

    light: PRIMARY_LIGHT_TEXT_COLOR,
  },
};
