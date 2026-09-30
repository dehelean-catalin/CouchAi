import { WorkoutExerciseSet } from "@/redux/workoutSlice";

export function calculateWorkoutStats(
  workoutExercises: { sets: WorkoutExerciseSet[] }[],
) {
  let totalSets = 0;
  const totalWeight = workoutExercises.reduce((total, { sets }) => {
    if (sets.length === 0) {
      return total;
    }
    totalSets += sets.length;
    const exerciseTotal = sets.reduce((exerciseSum, set) => {
      if (set.weight === 0 || set.reps === 0) {
        return exerciseSum;
      }
      return set.weight * set.reps + exerciseSum;
    }, 0);
    return total + exerciseTotal;
  }, 0);

  return {
    totalWeight,
    totalSets,
  };
}
