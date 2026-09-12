import React from "react";
import { StyleSheet, View } from "react-native";
import { BaseMenu } from "../../../components/BaseMenu";
import { WorkoutExercise } from "@/redux/workoutSlice";
import { BaseText } from "@/components/BaseText";
import { BaseCard } from "@/components/BaseCard";
import { BaseChip } from "@/components/BaseChip";

type WorkoutSessionCardProps = {
  index: number;
  exercise: WorkoutExercise;
  onRemove: () => void;
  onReplace: () => void;
  onPress: () => void;
};

export function WorkoutExerciseCard({
  index,
  exercise,
  onRemove: remove,
  onReplace: replace,
  onPress: press,
}: WorkoutSessionCardProps) {
  return (
    <BaseCard onPress={press}>
      <BaseChip value={`${index + 1}`} />
      <View style={styles.container}>
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
    </BaseCard>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
