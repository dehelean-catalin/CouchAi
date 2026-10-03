import { WorkoutExerciseSet } from "@/redux/workoutSlice";

export function calculateWorkoutTotalSetsAndReps(
  workoutExercises: { sets: WorkoutExerciseSet[] }[],
) {
  let totalSets = 0;
  const totalWeight = workoutExercises.reduce((total, { sets }) => {
    if (sets.length === 0) {
      return total;
    }
    const exerciseTotal = sets.reduce((exerciseSum, set) => {
      if (!set.isCompleted) {
        return exerciseSum;
      }
      totalSets++;
      return set.weight * set.reps + exerciseSum;
    }, 0);
    return total + exerciseTotal;
  }, 0);

  return {
    totalWeight,
    totalSets,
  };
}
