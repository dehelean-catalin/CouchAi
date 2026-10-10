import { BaseButton } from "@/components/BaseButton";
import { BaseText } from "@/components/BaseText";
import { useAppColors } from "@/theme/useAppColors";
import { StyleSheet, TextInput, View } from "react-native";

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
    <View style={[styles.container, { backgroundColor: colors.surface0 }]}>
      <View style={styles.label}>
        <BaseText text={props.label} type="primary_bold_16" />
      </View>
      <View style={styles.row}>
        <View style={[iconStyle, { borderColor: colors.surfaceShadow }]}>
          <BaseButton
            leftIcon="minus"
            type="normal"
            onPress={props.onDecreasePress}
          />
        </View>

        <TextInput
          value={props.value}
          onChangeText={props.onChange}
          keyboardType={props.keyboardType}
          style={[
            styles.input,
            {
              backgroundColor: colors.surface1,
              borderColor: colors.surfaceShadow,
              color: textColors.primary,
            },
          ]}
        />
        <View style={[iconStyle, { borderColor: colors.surfaceShadow }]}>
          <BaseButton
            leftIcon="plus"
            type="normal"
            onPress={props.onIncreasePress}
          />
        </View>
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
