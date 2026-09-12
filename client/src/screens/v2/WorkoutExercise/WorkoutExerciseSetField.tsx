import { BaseText } from "@/components/BaseText";
import { BaseIcon } from "@/components/icons";
import { useAppColors } from "@/theme/useAppColors";
import { Pressable, StyleSheet, TextInput, View } from "react-native";

interface WorkoutExerciseSetFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onIncreasePress: () => void;
  onDecreasePress: () => void;
}

export function WorkoutExerciseSetField(props: WorkoutExerciseSetFieldProps) {
  const { colors, textColors } = useAppColors();
  const iconStyle = [
    styles.icon,
    { backgroundColor: colors.surface2, borderColor: colors.surface0 },
  ];
  return (
    <View style={styles.container}>
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
          keyboardType="numeric"
          style={[
            styles.input,
            {
              backgroundColor: colors.surface2,
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
  },
  label: {
    alignItems: "center",
    marginBottom: 8,
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
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    borderWidth: 1,
  },
});
