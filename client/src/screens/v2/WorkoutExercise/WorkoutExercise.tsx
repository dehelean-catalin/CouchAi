import React from "react";
import { View } from "react-native";
import { ScreenProps } from "@/navigation/routes";
import { BaseText } from "@/components/BaseText";
import { BaseButton } from "@/components/BaseButton";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  addSetToWorkoutExercise,
  WorkoutExerciseSet,
} from "@/redux/workoutSlice";
import { WorkoutExcerciseWheightAndRepsSet } from "./WorkoutExerciseSet";

export function WorkoutExerciseScreen(props: ScreenProps<"WorkoutExercise">) {
  const dispatch = useDispatch();
  const sets = useSelector<RootState, WorkoutExerciseSet[] | undefined>(
    (s) => s.workout.sets[props.route.params.exerciseId],
  );

  function handleAddSet(exerciseId: string) {
    dispatch(addSetToWorkoutExercise({ exerciseId }));
  }

  if (!sets) {
    return null;
  }

  return (
    <View>
      <BaseText text="Workout Exercise" type="primary" />
      {sets.map((set) => {
        return (
          <WorkoutExcerciseWheightAndRepsSet
            key={set.id}
            weight={set.weight}
            reps={set.reps}
          />
        );
      })}

      <BaseButton
        text="Create Set"
        type="normal"
        onPress={() => handleAddSet(props.route.params.exerciseId)}
      />
    </View>
  );
}
