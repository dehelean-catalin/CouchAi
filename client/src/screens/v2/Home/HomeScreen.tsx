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
import { DraggableList } from "./Test";

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
  const inProgressWorkouts = workouts
    .filter((w) => w.status === "in-progress")
    .sort((a, b) => Date.parse(b.startDate) - Date.parse(a.startDate));

  return (
    <BaseSafeAreaView>
      <ScrollView>
        <View style={styles.inProgressContainer}>
        {inProgressWorkouts.map((workout) => (
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
        <BaseButton text="Start new workout" onPress={handleStartWorkout} />
      </View>

        {completedWorkouts.length > 0 && (
          <>
            <View style={styles.recentActivityHeader}>
              <BaseText text="Recent Activity" type="primary_18" />
            </View>
            <View style={styles.recentActivityContainer}>
              {completedWorkouts
                .sort((a, b) => Date.parse(b.endDate) - Date.parse(a.endDate))
                .map((completedWorkout) => (
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
    marginTop: 12,
  },
  recentActivityHeader: {
    paddingTop: 20,
    paddingBottom: 12,
  },
  recentActivityContainer: {
    gap: 8,
    marginBottom: 12,
  },
});
