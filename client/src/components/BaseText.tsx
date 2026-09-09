import { useAppColors } from "@/theme/useAppColors";
import { StyleProp, Text, TextStyle } from "react-native";

interface BaseTextProps {
  text: string;
  type: "primary" | "primary_18" | "primary_bold" | "secondary";
}

export function BaseText(props: BaseTextProps) {
  const { textColors } = useAppColors();

  let textStyle: StyleProp<TextStyle> = null;

  switch (props.type) {
    case "primary":
      textStyle = { color: textColors.primary, fontSize: 14 };
      break;
    case "primary_bold":
      textStyle = { color: textColors.primary, fontSize: 14, fontWeight: 600 };
      break;
    case "primary_18":
      textStyle = { color: textColors.primary, fontSize: 18 };
      break;
    case "secondary":
      textStyle = { color: textColors.secondary, fontSize: 14 };
      break;
    default:
      textStyle = { color: textColors.primary, fontSize: 14 };
  }

  return <Text style={textStyle}>{props.text}</Text>;
}
