import { Exercise } from "@/redux/exerciseReducer";
import { generateRandomId, WorkoutExercise } from "@/redux/workoutSlice";

export function mapExerciseToWorkoutExercise(
  exercise: Exercise,
): WorkoutExercise {
  return {
    id: generateRandomId(),
    exerciseId: exercise.id,
    name: exercise.name,
    thumbnailUrl: exercise.thumbnailUrl,
  };
}
