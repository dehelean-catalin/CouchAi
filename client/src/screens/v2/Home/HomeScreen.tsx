import routes, { ScreenProps } from "@/navigation/routes";
import { RootState, store } from "@/redux/store";
import {
  deleteWorkout,
  startWorkout,
  WorkoutState,
} from "@/redux/workoutSlice";
import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { BaseText } from "@/components/BaseText";
import { BaseButton } from "@/components/BaseButton";
import { BaseSafeAreaView } from "@/components/BaseSafeArea";
import { HomeScreenWorkoutCard } from "./HomeScreenWorkoutCard";
import { formatDate } from "@/helper/dateFormatter";

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

  const completedWorkouts = workouts
    .filter((workout) => workout.status === "completed")
    .sort((a, b) => {
      return new Date(b.endDate).getTime() - new Date(a.endDate).getTime();
    });

  return (
    <BaseSafeAreaView>
      <ScrollView>
        <View style={styles.inProgressContainer}>
          {workouts
            .filter((w) => w.status === "in-progress")
            .map((workout) => (
              <HomeScreenWorkoutCard
                key={workout.id}
                title={workout.name}
                onPress={() =>
                  props.navigation.navigate(routes.WORKOUT, {
                    id: workout.id,
                  })
                }
                content={[{ type: "text", value: "Click to Resume" }]}
                iconRight={{
                  name: "clear",
                  action: () => dispatch(deleteWorkout(workout.id)),
                }}
              />
            ))}
        </View>
        <BaseButton text="Start new workout" onPress={handleStartWorkout} />

        {completedWorkouts.length > 0 && (
          <>
            <View style={styles.recentActivityHeader}>
              <BaseText text="Recent Activity" type="primary_18" />
            </View>
            <View style={styles.recentActivityContainer}>
              {completedWorkouts.map((completedWorkout) => (
                <HomeScreenWorkoutCard
                  key={completedWorkout.id}
                  title={completedWorkout.name}
                  iconRight={{ name: "chevronRight" }}
                  content={[
                    { type: "icon", value: "calendar" },
                    {
                      type: "text",
                      value: formatDate(completedWorkout.endDate),
                    },
                  ]}
                  onPress={() => handleViewWorkoutSummary(completedWorkout.id)}
                />
              ))}
            </View>
          </>
        )}
      </ScrollView>
    </BaseSafeAreaView>
  );
}

const styles = StyleSheet.create({
  inProgressContainer: {
    gap: 8,
    marginBottom: 12,
  },
  recentActivityHeader: {
    paddingTop: 12,
    paddingBottom: 12,
  },
  recentActivityContainer: {
    gap: 8,
  },
});
