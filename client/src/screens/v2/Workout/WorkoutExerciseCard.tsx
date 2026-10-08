import React from "react";
import { StyleSheet, View } from "react-native";
import { BaseMenu } from "../../../components/BaseMenu";
import { WorkoutExercise } from "@/redux/workoutSlice";
import { BaseText } from "@/components/BaseText";
import { BaseCard } from "@/components/BaseCard";
import { BaseChip } from "@/components/BaseChip";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { selectSetsForExercise } from "@/redux/workoutSelector";

interface WorkoutSessionCardProps {
  index: number;
  exercise: WorkoutExercise;
  onRemove: () => void;
  onReplace: () => void;
  onPress: () => void;
}

export function WorkoutExerciseCard({
  index,
  exercise,
  onRemove: remove,
  onReplace: replace,
  onPress: press,
}: WorkoutSessionCardProps) {
  const sets = useSelector((s: RootState) =>
    selectSetsForExercise(s, exercise.id),
  );

  if (!sets) {
    return null;
  }

  const numberOfTotalSets = sets.length;
  const numberOfCompletedSets = sets.filter((set) => set.isCompleted).length;

  return (
    <BaseCard onPress={press}>
      <BaseChip
        value={`${index + 1}`}
        type={
          numberOfTotalSets === numberOfCompletedSets ? "success" : undefined
        }
      />
      <View style={styles.container}>
        <BaseText text={exercise.name} type="primary_regular_16" />
        <BaseText
          text={`${numberOfCompletedSets}/${numberOfTotalSets} sets completed`}
          type="secondary"
        />
      </View>
      <View style={styles.menuContainer}>
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
    </BaseCard>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menuContainer: {
    justifyContent: "center",
  },
});
