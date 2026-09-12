import { BaseText } from "@/components/BaseText";
import { useAppColors } from "@/theme/useAppColors";
import { Pressable, StyleSheet } from "react-native";

interface BaseFloatingButtonProps {
  text: string;
  disabled?: boolean;
  type?: "fill" | "normal";
  onPress: () => void;
}

export function BaseButton({
  text,
  type = "fill",
  disabled,
  onPress: press,
}: BaseFloatingButtonProps) {
  const { colors } = useAppColors();
  let buttonStyle = null;
  if (type === "fill") {
    buttonStyle = { backgroundColor: colors.blue_0 };
  }

  return (
    <Pressable
      style={[styles.button, buttonStyle]}
      disabled={disabled}
      onPress={press}
    >
      <BaseText text={text} type="primary_bold_16" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 8,
    borderRadius: 4,
    alignItems: "center",
    margin: "auto",
  },
});
