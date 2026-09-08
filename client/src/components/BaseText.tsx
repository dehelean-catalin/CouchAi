import { useAppColors } from "@/theme/useAppColors";
import { StyleProp, Text, TextStyle } from "react-native";

interface BaseTextProps {
  text: string;
  type: "primary" | "secondary";
}

export function BaseText(props: BaseTextProps) {
  const { textColors } = useAppColors();

  let textStyle: StyleProp<TextStyle> = null;

  switch (props.type) {
    case "primary":
      textStyle = { color: textColors.primary, fontSize: 14 };
      break;
    default:
      textStyle = { color: textColors.primary, fontSize: 14 };
  }

  return <Text style={textStyle}>{props.text}</Text>;
}
