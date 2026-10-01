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
      <BaseText text={`Set ${props.index + 1}`} type="secondary" />
      <BaseText
        text={`${props.set.weight} kg x ${props.set.reps} reps`}
        type="primary_regular_16"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginBottom: 4,
  },
});
