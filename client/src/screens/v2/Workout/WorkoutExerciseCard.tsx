import React from "react";
import { StyleSheet, View } from "react-native";
import { BaseMenu } from "../../../components/BaseMenu";
import { WorkoutExercise } from "@/redux/workoutSlice";
import { BaseText } from "@/components/BaseText";
import { useAppColors } from "@/theme/useAppColors";

type WorkoutSessionCardProps = {
  index: number;
  exercise: WorkoutExercise;
  onRemove: () => void;
  onReplace: () => void;
};

export function WorkoutExerciseCard({
  index,
  exercise,
  onRemove: remove,
  onReplace: replace,
}: WorkoutSessionCardProps) {
  const { textColors, colors } = useAppColors();
  return (
    <View style={[styles.container, { backgroundColor: colors.surface1 }]}>
      <View style={styles.details}>
        <View style={[styles.chip, { borderColor: textColors.primary }]}>
          <BaseText text={`${index + 1}`} type="primary" />
        </View>
        <BaseText text={exercise.name} type="primary" />
      </View>

      <BaseMenu
        items={[
          {
            label: "Replace",
            icon: "replace",
            action: replace,
          },
          {
            label: "Delete",
            icon: "trash",
            action: remove,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
  },
  details: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  chip: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    borderWidth: 1,
  },
});
