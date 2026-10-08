import { useAppColors } from "@/theme/useAppColors";
import { StyleProp, Text, TextStyle } from "react-native";

export interface BaseTextProps {
  text: string;
  type:
    | "primary"
    | "primary_18"
    | "secondary"
    | "primary_bold_16"
    | "primary_regular_16"
    | "primary_bold_24"
    | "light"
    | "success_bold_14"
    | "error_bold_14";
  transform?: "uppercase";
  numberOfLines?: 1 | 2;
}

export function BaseText({
  text,
  type,
  transform,
  numberOfLines = 1,
}: BaseTextProps) {
  const { textColors } = useAppColors();

  let textStyle: StyleProp<TextStyle> = null;

  switch (type) {
    case "primary":
      textStyle = { color: textColors.primary, fontSize: 16, lineHeight: 18 };
      break;
    case "primary_regular_16":
      textStyle = { color: textColors.primary, fontSize: 16, lineHeight: 18 };
      break;
    case "primary_18":
      textStyle = { color: textColors.primary, fontSize: 18, lineHeight: 18 };
      break;
    case "primary_bold_16":
      textStyle = {
        color: textColors.primary,
        fontSize: 16,
        lineHeight: 18,
        fontWeight: 600,
      };
      break;
    case "primary_bold_24":
      textStyle = {
        color: textColors.primary,
        fontSize: 24,
        lineHeight: 28,
        fontWeight: 600,
      };
      break;
    case "secondary":
      textStyle = { color: textColors.secondary, fontSize: 14, lineHeight: 18 };
      break;
    case "light":
      textStyle = {
        color: textColors.light,
        fontSize: 16,
        lineHeight: 18,
        fontWeight: 600,
      };
      break;
    case "success_bold_14": {
      textStyle = {
        color: textColors.green,
        fontSize: 14,
        lineHeight: 18,
        fontWeight: 600,
      };
      break;
    }
    case "error_bold_14": {
      textStyle = {
        color: textColors.error,
        fontSize: 14,
        lineHeight: 18,
        fontWeight: 600,
      };
      break;
    }
    default:
      textStyle = { color: textColors.primary, fontSize: 14 };
  }
  if (transform === "uppercase") {
    textStyle["textTransform"] = "uppercase";
  }

  return (
    <Text numberOfLines={numberOfLines} style={textStyle}>
      {text}
    </Text>
  );
}
