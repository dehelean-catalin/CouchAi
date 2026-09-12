import { BaseText, BaseTextProps } from "@/components/BaseText";
import { useAppColors } from "@/theme/useAppColors";
import { Pressable, StyleProp, StyleSheet, ViewStyle } from "react-native";

interface BaseFloatingButtonProps {
  text: string;
  disabled?: boolean;
  type?: "fill" | "normal" | "rounded";
  onPress: () => void;
}

export function BaseButton({
  text,
  type = "fill",
  disabled,
  onPress: press,
}: BaseFloatingButtonProps) {
  const { colors } = useAppColors();
  let buttonStyle: StyleProp<ViewStyle> = null;
  let textType: BaseTextProps["type"] = "primary_bold_16";

  if (type === "fill") {
    buttonStyle = { backgroundColor: colors.blue_0 };
    textType = "light";
  } else if (type === "rounded") {
    buttonStyle = {
      backgroundColor: colors.blue_0,
      width: "100%",
      borderRadius: 16,
      padding: 12,
    };
    textType = "light";
  }

  return (
    <Pressable
      style={[styles.button, buttonStyle]}
      disabled={disabled}
      onPress={press}
    >
      <BaseText text={text} type={textType} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 8,
    borderRadius: 4,
    alignItems: "center",
  },
});
