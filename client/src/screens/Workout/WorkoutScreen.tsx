import routes, { RootStackParamList } from "@/navigation/routes";
import { RootState } from "@/redux/store";
import React from "react";
import { Button, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { WorkoutState } from "@/redux/workoutSlice";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";

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
      {workout.exercises.map((exercise, index) => (
        <View key={index}>
          <Text>{exercise.name}</Text>
        </View>
      ))}
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
