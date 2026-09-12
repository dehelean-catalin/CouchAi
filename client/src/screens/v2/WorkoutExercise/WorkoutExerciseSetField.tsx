import { BaseText } from "@/components/BaseText";
import { BaseIcon } from "@/components/icons";
import { useAppColors } from "@/theme/useAppColors";
import { Pressable, StyleSheet, TextInput, View } from "react-native";

interface WorkoutExerciseSetFieldProps {
  label: string;
  value: string;
  keyboardType: "number-pad" | "decimal-pad";
  onChange: (value: string) => void;
  onIncreasePress: () => void;
  onDecreasePress: () => void;
}

export function WorkoutExerciseSetField(props: WorkoutExerciseSetFieldProps) {
  const { colors, textColors } = useAppColors();
  const iconStyle = [
    styles.icon,
    { backgroundColor: colors.surface1, borderColor: colors.surface0 },
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.surface_blue }]}>
      <View style={styles.label}>
        <BaseText text={props.label} type="primary_bold_16" />
      </View>
      <View style={styles.row}>
        <Pressable style={iconStyle} onPress={props.onDecreasePress}>
          <BaseIcon name="minus" />
        </Pressable>

        <TextInput
          value={props.value}
          onChangeText={props.onChange}
          keyboardType={props.keyboardType}
          style={[
            styles.input,
            {
              backgroundColor: colors.surface1,
              borderColor: colors.surface0,
              color: textColors.primary,
            },
          ]}
        />
        <Pressable style={iconStyle} onPress={props.onIncreasePress}>
          <BaseIcon name="plus" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minWidth: "100%",
    borderRadius: 16,
    padding: 12,
    paddingTop: 0,
  },
  label: {
    alignItems: "center",
    margin: 12,
  },
  row: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    gap: 8,
  },
  input: {
    height: 48,
    flex: 1,
    padding: 12,
    textAlign: "center",
    borderRadius: 24,
    borderWidth: 1,
    fontSize: 16,
    fontWeight: 600,
  },
  icon: {
    height: 48,
    width: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    borderWidth: 1,
  },
});
