import routes, { RootStackParamList } from "@/constant/routes";
import { RootState } from "@/redux/store";
import React, { FC, useEffect, useLayoutEffect } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { WorkoutState } from "@/redux/workoutSlice";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

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
    <View>
      <Text>{workout.name}</Text>
      <Button
        title="Add exercise"
        onPress={() => {
          props.navigation.navigate(routes.EXERCISE_LIST, {
            workoutId: workout.id,
          });
        }}
      />
    </View>
  );
}

export default WorkoutScreen;
