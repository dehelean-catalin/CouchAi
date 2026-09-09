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
import { BaseButton } from "@/components/BaseFloatingButton";
import { StyleSheet } from "react-native";

export function WorkoutScreen(props: ScreenProps<"Workout">) {
  const { id } = props.route.params;
  const dispatch = useDispatch();

  const workout = useSelector<RootState, WorkoutState | undefined>((s) =>
    s.workout.workouts.find((w) => w.id === id),
  );

  function handleRemoveExercise(workoutId: string, exercisePosition: number) {
    dispatch(
      removeExerciseFromWorkout({
        workoutId,
        exercisePosition,
      }),
    );
  }

  function handleReplaceExercise(workoutId: string, exercisePosition: number) {
    props.navigation.navigate(routes.EXERCISE_LIST, {
      workoutId,
      action: {
        type: "replace",
        payload: {
          exercisePosition,
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
            onRemove={() => handleRemoveExercise(workout.id, index)}
            onReplace={() => handleReplaceExercise(workout.id, index)}
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
