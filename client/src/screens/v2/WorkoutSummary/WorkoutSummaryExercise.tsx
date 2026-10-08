import { BaseCard } from "@/components/BaseCard";
import { BaseText } from "@/components/BaseText";
import { WorkoutExerciseSet } from "@/redux/workoutSlice";

interface WorkoutSummaryExerciseProps {
  set: WorkoutExerciseSet;
  index: number;
}

export function WorkoutSummaryExercise(props: WorkoutSummaryExerciseProps) {
  return (
    <BaseCard>
      <BaseText text={`Set ${props.index + 1}`} type="secondary" />
      {props.set.isCompleted ? (
        <BaseText
          text={`${props.set.weight} kg x ${props.set.reps} reps`}
          type="primary_regular_16"
        />
      ) : (
        <BaseText text="Incomplete" type="secondary" />
      )}
    </BaseCard>
  );
}
