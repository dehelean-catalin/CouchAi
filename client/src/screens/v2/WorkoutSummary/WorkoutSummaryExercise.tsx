import { BaseChip } from "@/components/BaseChip";
import { BaseText } from "@/components/BaseText";
import { WorkoutExerciseSet } from "@/redux/workoutSlice";
import { StyleSheet, View } from "react-native";

interface WorkoutSummaryExerciseProps {
  set: WorkoutExerciseSet;
  index: number;
}

export function WorkoutSummaryExercise(props: WorkoutSummaryExerciseProps) {
  return (
    <View style={styles.container}>
      <BaseChip value={`${props.index + 1}`} />
      <BaseText
        text={`${props.set.weight} kg x ${props.set.reps} Reps`}
        type="primary"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
});
