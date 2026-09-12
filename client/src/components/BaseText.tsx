import { useAppColors } from "@/theme/useAppColors";
import { StyleProp, Text, TextStyle } from "react-native";

interface BaseTextProps {
  text: string;
  type:
    | "primary"
    | "primary_18"
    | "secondary"
    | "primary_bold_16"
    | "primary_regular_16";
}

export function BaseText(props: BaseTextProps) {
  const { textColors } = useAppColors();

  let textStyle: StyleProp<TextStyle> = null;

  switch (props.type) {
    case "primary":
      textStyle = { color: textColors.primary, fontSize: 14 };
      break;
    case "primary_regular_16":
      textStyle = { color: textColors.primary, fontSize: 16 };
      break;
    case "primary_18":
      textStyle = { color: textColors.primary, fontSize: 18 };
      break;
    case "primary_bold_16":
      textStyle = { color: textColors.primary, fontSize: 16, fontWeight: 600 };
      break;
    case "secondary":
      textStyle = { color: textColors.secondary, fontSize: 14 };
      break;
    default:
      textStyle = { color: textColors.primary, fontSize: 14 };
  }

  return <Text style={textStyle}>{props.text}</Text>;
}
