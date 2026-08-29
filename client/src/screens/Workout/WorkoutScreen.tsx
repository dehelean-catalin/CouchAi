import routes, { RootStackParamList } from "@/navigation/routes";
import { RootState } from "@/redux/store";
import React from "react";
import { Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { removeExerciseFromWorkout, WorkoutState } from "@/redux/workoutSlice";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { WorkoutExerciseCard } from "./WorkoutExerciseCard";
import { BaseHorizontalList } from "@/components/BaseHorizontalList";
import { Exercise } from "@/redux/exerciseReducer";

type WorkoutProps = NativeStackScreenProps<RootStackParamList, "Workout">;

function WorkoutScreen(props: WorkoutProps) {
  const { id } = props.route.params;
  const dispatch = useDispatch();

  const workout = useSelector<RootState, WorkoutState | undefined>((s) =>
    s.workout.workouts.find((workout) => workout.id === id),
  );

  if (!workout) {
    return null;
  }

  return (
    <SafeAreaView>
      <BaseHorizontalList<Exercise>
        data={workout.exercises}
        item={({ item: exercise, index }) => (
          <WorkoutExerciseCard
            index={index}
            exercise={exercise}
            onRemove={() =>
              dispatch(
                removeExerciseFromWorkout({
                  workoutId: workout.id,
                  exercisePosition: index,
                }),
              )
            }
            onReplace={() =>
              props.navigation.navigate(routes.EXERCISE_LIST, {
                workoutId: workout.id,
                action: {
                  type: "replace",
                  payload: {
                    exercisePosition: index,
                  },
                },
              })
            }
          />
        )}
        emptyComponentText="Search for an exercise"
      />

      <Button
        title="Add exercise"
        onPress={() => {
          props.navigation.navigate(routes.EXERCISE_LIST, {
            workoutId: workout.id,
            action: { type: "select", payload: null },
          });
        }}
      />
    </SafeAreaView>
  );
}

export default WorkoutScreen;
