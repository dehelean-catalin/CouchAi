import routes, { ScreenProps } from "@/navigation/routes";
import { RootState } from "@/redux/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeExerciseFromWorkout,
  WorkoutState,
  WorkoutExercise,
} from "@/redux/workoutSlice";
import { SafeAreaView } from "react-native-safe-area-context";
import { WorkoutExerciseCard } from "./WorkoutExerciseCard";
import { BaseHorizontalList } from "@/components/BaseHorizontalList";
import { BaseButton } from "@/components/BaseButton";
import { StyleSheet } from "react-native";

export function WorkoutScreen(props: ScreenProps<"Workout">) {
  const { id } = props.route.params;
  const dispatch = useDispatch();

  const workout = useSelector<RootState, WorkoutState | undefined>((s) =>
    s.workout.workouts.find((w) => w.id === id),
  );

  function handleRemoveExercise(
    workoutId: string,
    exerciseId: string,
    exercisePosition: number,
  ) {
    dispatch(
      removeExerciseFromWorkout({
        workoutId,
        exerciseId,
        exercisePosition,
      }),
    );
  }

  function handleReplaceExercise(
    workoutId: string,
    exerciseId: string,
    exercisePosition: number,
  ) {
    props.navigation.navigate(routes.EXERCISE_LIST, {
      workoutId,
      action: {
        type: "replace",
        payload: {
          exercisePosition,
          exerciseId,
        },
      },
    });
  }

  function handleAddExercise(workoutId: string) {
    props.navigation.navigate(routes.EXERCISE_LIST, {
      workoutId,
      action: { type: "select", payload: null },
    });
  }

  function handleNavigateToExercise({
    workoutId,
    exerciseId,
    exerciseName,
    thumbnailUrl,
  }: {
    workoutId: string;
    exerciseId: string;
    exerciseName: string;
    thumbnailUrl: string;
  }) {
    props.navigation.navigate(routes.WORKOUT_EXERCISE, {
      workoutId,
      exerciseId,
      exerciseName,
      thumbnailUrl,
    });
  }

  if (!workout) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <BaseHorizontalList<WorkoutExercise>
        data={workout.exercises}
        item={({ item: exercise, index }) => (
          <WorkoutExerciseCard
            index={index}
            exercise={exercise}
            onRemove={() =>
              handleRemoveExercise(workout.id, exercise.id, index)
            }
            onReplace={() =>
              handleReplaceExercise(workout.id, exercise.id, index)
            }
            onPress={() =>
              handleNavigateToExercise({
                workoutId: workout.id,
                exerciseId: exercise.id,
                exerciseName: exercise.name,
                thumbnailUrl: exercise.thumbnailUrl,
              })
            }
          />
        )}
        emptyComponentText="Search for an exercise"
      />

      <BaseButton
        text="Add exercise"
        onPress={() => handleAddExercise(workout.id)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 8,
  },
});
