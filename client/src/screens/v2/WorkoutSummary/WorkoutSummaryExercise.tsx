import { BaseCard } from "@/components/BaseCard";
import { BaseChip } from "@/components/BaseChip";
import { BaseText } from "@/components/BaseText";
import { WorkoutExerciseSet } from "@/redux/workoutSlice";

interface WorkoutSummaryExerciseProps {
  set: WorkoutExerciseSet;
  index: number;
}

export function WorkoutSummaryExercise(props: WorkoutSummaryExerciseProps) {
  return (
    <BaseCard>
      <BaseChip value={`${props.index + 1}`} />
      <BaseText
        text={`${props.set.weight} kg x ${props.set.reps} Reps`}
        type="primary"
      />
    </BaseCard>
  );
}
