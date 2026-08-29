import routes, { RootStackParamList } from "@/navigation/routes";
import { RootState } from "@/redux/store";
import React from "react";
import { Button } from "react-native";
import { useSelector } from "react-redux";
import { WorkoutState } from "@/redux/workoutSlice";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { WorkoutSessionCard } from "./WorkoutSessionCard";
import { BaseHorizontalList } from "@/components/BaseHorizontalList";
import { Exercise } from "@/redux/exerciseReducer";

type WorkoutProps = NativeStackScreenProps<RootStackParamList, "Workout">;

function WorkoutScreen(props: WorkoutProps) {
  const { id } = props.route.params;

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
        item={({ item, index }) => {
          return <WorkoutSessionCard index={index} value={item} />;
        }}
        emptyComponentText="Search for an exercise"
      />

      <Button
        title="Add exercise"
        onPress={() => {
          props.navigation.navigate(routes.EXERCISE_LIST, {
            workoutId: workout.id,
            action: "select",
          });
        }}
      />
    </SafeAreaView>
  );
}

export default WorkoutScreen;
