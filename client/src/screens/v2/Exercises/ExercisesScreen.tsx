import { ScreenProps } from "@/navigation/routes";
import { RootState } from "@/redux/store";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ExerciseCard } from "./ExerciseCard";
import { Exercise } from "@/redux/exerciseReducer";
import {
  addExerciseToWorkout,
  replaceExerciseFromWorkout,
} from "@/redux/workoutSlice";
import { BaseHorizontalList } from "@/components/BaseHorizontalList";
import { mapExerciseToWorkoutExercise } from "./exercise.bussines";
import { BaseButton } from "@/components/BaseButton";
import { BaseSafeAreaView } from "@/components/BaseSafeArea";

export function ExercisesScreen(props: ScreenProps<"ExerciseList">) {
  const dispatch = useDispatch();
  const {
    action: { type: actionType, payload },
    workoutId,
  } = props.route.params;
  const exercises = useSelector<RootState, Exercise[]>(
    (s) => s.exercises.value,
  );
  const [selectedExercises, setSelectedExercises] = useState<string[]>([]);

  function handleSelectExercise(id: string, isChecked: boolean) {
    if (!isChecked) {
      setSelectedExercises((prev) => [...prev, id]);
    } else {
      setSelectedExercises((prev) =>
        prev.filter((exerciseId) => exerciseId !== id),
      );
    }
  }

  function handleAddExercise() {
    if (!workoutId) {
      return;
    }
    const newExercises: Exercise[] = exercises.filter((exercise) =>
      selectedExercises.includes(exercise.id),
    );
    if (newExercises.length) {
      dispatch(
        addExerciseToWorkout({
          workoutId,
          exercises: newExercises.map((exercise) =>
            mapExerciseToWorkoutExercise(exercise),
          ),
        }),
      );
    }

    props.navigation.goBack();
  }

  function handleReplaceExercise(exerciseId: string) {
    if (!workoutId || payload?.exercisePosition === undefined) {
      return;
    }
    const newExercise = exercises.find(
      (exercise) => exercise.id === exerciseId,
    );
    if (newExercise) {
      dispatch(
        replaceExerciseFromWorkout({
          workoutId,
          exercisePosition: payload.exercisePosition,
          exerciseId: payload.exerciseId,
          newExercise: mapExerciseToWorkoutExercise(newExercise),
        }),
      );
    }

    // wait for checkbox animation to finish before going back
    setTimeout(props.navigation.goBack, 50);
  }

  return (
    <BaseSafeAreaView>
      <BaseHorizontalList<Exercise>
        data={exercises}
        item={({ item }) => (
          <ExerciseCard
            data={item}
            actionType={actionType}
            onSelect={handleSelectExercise}
            onReplace={handleReplaceExercise}
          />
        )}
        emptyComponentText="Not found"
      />
      {actionType === "select" && (
        <View style={styles.addContainer}>
          <BaseButton
            text={`Add exercises (${selectedExercises.length})`}
            disabled={!selectedExercises.length}
            onPress={handleAddExercise}
          />
        </View>
      )}
    </BaseSafeAreaView>
  );
}

const styles = StyleSheet.create({
  addContainer: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    justifyContent: "center",
  },
});
