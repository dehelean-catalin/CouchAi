import routes, { ScreenProps } from "@/navigation/routes";
import { RootState, store } from "@/redux/store";
import {
  deleteWorkout,
  startWorkout,
  WorkoutState,
} from "@/redux/workoutSlice";
import React from "react";
import { Button, Pressable, StyleSheet, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { RecentCompletedWorkout } from "./RecentCompletedWorkout";
import { BaseText } from "@/components/BaseText";
import { trashIcon } from "@/components/icons";
import { BaseFloatingButton } from "@/navigation/BaseFloatingButton";

export function HomeScreen(props: ScreenProps<"Home">) {
  const dispatch = useDispatch();
  const workouts = useSelector<RootState, WorkoutState[]>(
    (s) => s.workout.workouts,
  );

  function handleDeleteWorkout(workoutId: string) {
    dispatch(deleteWorkout(workoutId));
    props.navigation.goBack();
  }

  function handleViewWorkoutSummary(workoutId: string) {
    props.navigation.navigate(routes.WORKOUT_SUMMARY, {
      workoutId,
      headerOptions: [
        {
          label: "Delete",
          icon: trashIcon,
          action: () => handleDeleteWorkout(workoutId),
        },
      ],
    });
  }

  function handleStartWorkout() {
    dispatch(startWorkout());
    const latestState = store.getState();
    const latestWorkout =
      latestState.workout.workouts[latestState.workout.workouts.length - 1];
    props.navigation.navigate(routes.WORKOUT, {
      id: latestWorkout.id,
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {workouts
          .filter((w) => w.status === "in-progress")
          .map((workout) => (
            <Pressable
              key={workout.id}
              onPress={() =>
                props.navigation.navigate(routes.WORKOUT, { id: workout.id })
              }
            >
              <BaseText text="Resume" type="primary" />
              <BaseText text={workout.name} type="primary" />
              <Button
                title="X"
                onPress={() => dispatch(deleteWorkout(workout.id))}
              />
            </Pressable>
          ))}

        <BaseFloatingButton
          text="Start new workout"
          onPress={handleStartWorkout}
        />

        <View style={styles.recentActivityContainer}>
          <BaseText text="Recent Activity" type="primary_18" />
          {workouts
            .filter((workout) => workout.status === "completed")
            .map((completedWorkout) => (
              <RecentCompletedWorkout
                key={completedWorkout.id}
                id={completedWorkout.id}
                name={completedWorkout.name}
                onChange={() => handleViewWorkoutSummary(completedWorkout.id)}
              />
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 8,
    paddingRight: 8,
  },
  button: {
    backgroundColor: "#9abaff",
    padding: 12,
    borderRadius: 4,
    alignItems: "center",
  },
  pressed: {
    opacity: 0.7,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  recentActivityContainer: {
    gap: 8,
    marginTop: 8,
  },
});
