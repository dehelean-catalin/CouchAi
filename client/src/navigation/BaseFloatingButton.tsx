import { BaseText } from "@/components/BaseText";
import { useAppColors } from "@/theme/useAppColors";
import { Pressable, StyleSheet } from "react-native";

interface BaseFloatingButtonProps {
  text: string;
  disabled?: boolean;
  onPress: () => void;
}

export function BaseFloatingButton(props: BaseFloatingButtonProps) {
  const { colors } = useAppColors();
  return (
    <Pressable
      style={[styles.button, { backgroundColor: colors.blue0 }]}
      disabled={props.disabled}
      onPress={props.onPress}
    >
      <BaseText text={props.text} type="primary_bold" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 16,
    paddingInline: 24,
    borderRadius: 4,
    width: "auto",
    alignItems: "center",
    margin: "auto",
  },
});
