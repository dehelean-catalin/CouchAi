import { WorkoutExerciseSet } from "@/redux/workoutSlice";

export function calculateWorkoutVolume(
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

export function calculateDeltaForSets(sets: number, parentSets: number | null) {
  if (parentSets === null) {
    return 0;
  }
  return sets - parentSets;
}

export function calculateDeltaForWeight(
  weight: number,
  parentWeight: number | null,
) {
  if (
    weight === 0 ||
    parentWeight === 0 ||
    parentWeight === null ||
    weight === parentWeight
  ) {
    return 0;
  }

  let deltaProgress = 0;
  if (weight < parentWeight) {
    deltaProgress = (100 * weight) / parentWeight - 100;
  } else {
    deltaProgress = (100 * (weight - parentWeight)) / parentWeight;
  }

  return Math.round(deltaProgress * 10) / 10;
}
