import routes, { ScreenProps } from "@/navigation/routes";
import { RootState, store } from "@/redux/store";
import {
  deleteWorkout,
  startWorkout,
  WorkoutState,
} from "@/redux/workoutSlice";
import React from "react";
import { Pressable, StyleSheet, View, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { BaseText } from "@/components/BaseText";
import { BaseButton } from "@/components/BaseButton";
import { BaseIcon } from "@/components/icons";
import { BaseCard } from "@/components/BaseCard";
import { BaseSafeAreaView } from "@/components/BaseSafeArea";

export function HomeScreen(props: ScreenProps<"Home">) {
  const dispatch = useDispatch();
  const workouts = useSelector<RootState, WorkoutState[]>(
    (s) => s.workout.workouts,
  );

  function handleViewWorkoutSummary(workoutId: string) {
    props.navigation.navigate(routes.WORKOUT_SUMMARY, {
      workoutId,
      action: "review",
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
  const completedWorkouts = workouts.filter(
    (workout) => workout.status === "completed",
  );

  return (
    <BaseSafeAreaView>
      <ScrollView>
        {workouts
          .filter((w) => w.status === "in-progress")
          .map((workout) => (
            <BaseCard
              key={workout.id}
              onPress={() =>
                props.navigation.navigate(routes.WORKOUT, {
                  id: workout.id,
                })
              }
            >
              <View>
                <BaseText text="Resume" type="secondary" />
                <BaseText text={workout.name} type="primary_18" />
              </View>
              <Pressable
                style={styles.icon}
                onPress={() => dispatch(deleteWorkout(workout.id))}
              >
                <BaseIcon name="clear" />
              </Pressable>
            </BaseCard>
          ))}

        <BaseButton text="Start new workout" onPress={handleStartWorkout} />

        {completedWorkouts.length > 0 && (
          <View style={styles.recentActivityContainer}>
            <BaseText text="Recent Activity" type="primary_18" />
            {completedWorkouts.map((completedWorkout) => (
              <BaseCard
                key={completedWorkout.id}
                onPress={() => handleViewWorkoutSummary(completedWorkout.id)}
              >
                <BaseText text={completedWorkout.name} type="primary" />
              </BaseCard>
            ))}
          </View>
        )}
      </ScrollView>
    </BaseSafeAreaView>
  );
}

const styles = StyleSheet.create({
  recentActivityContainer: {
    gap: 8,
    marginTop: 8,
  },
  icon: {
    marginLeft: "auto",
  },
});
