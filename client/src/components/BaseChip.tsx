import { useAppColors } from "@/theme/useAppColors";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { BaseText } from "./BaseText";

interface BaseChipProps {
  value: string;
  type?: "success";
}

export function BaseChip(props: BaseChipProps) {
  const { textColors, colors } = useAppColors();
  const chipStyle: StyleProp<ViewStyle> = [
    styles.chip,
    { borderColor: textColors.primary },
  ];
  if (props?.type === "success") {
    chipStyle.push({
      backgroundColor: colors.surface2,
    });
  }
  return (
    <View style={chipStyle}>
      <BaseText text={props.value} type="primary" />
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    borderWidth: 1,
  },
});
