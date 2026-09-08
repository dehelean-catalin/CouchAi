import routes, { RootStackParamList } from "@/navigation/routes";
import { RootState, store } from "@/redux/store";
import {
  deleteWorkout,
  startWorkout,
  WorkoutState,
} from "@/redux/workoutSlice";
import React from "react";
import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RecentCompletedWorkout } from "./RecentCompletedWorkout";
import { BaseText } from "@/components/BaseText";
import { useAppColors } from "@/theme/useAppColors";
import { trashIcon } from "@/components/icons";

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen(props: HomeScreenProps) {
  const dispatch = useDispatch();
  const { colors } = useAppColors();
  const workouts = useSelector<RootState, WorkoutState[]>(
    (s) => s.workout.workouts,
  );

  function handleDeleteWorkout(workoutId: string) {
    dispatch(deleteWorkout(workoutId));
    props.navigation.goBack();
  }

  function handleViewWorkoutSummary(workoutId: string) {
    props.navigation.navigate(routes.COMPLETED_WORKOUT_PREVIEW, {
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

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.surface0 }]}
    >
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
              <Text>Resume</Text>
              <Text>{workout.name}</Text>
              <Button
                title="X"
                onPress={() => dispatch(deleteWorkout(workout.id))}
              />
            </Pressable>
          ))}

        <Pressable
          style={({ pressed }) => [styles.button, pressed && styles.pressed]}
          onPress={() => {
            dispatch(startWorkout());
            const latestState = store.getState();
            const latestWorkout =
              latestState.workout.workouts[
                latestState.workout.workouts.length - 1
              ];
            props.navigation.navigate(routes.WORKOUT, {
              id: latestWorkout.id,
            });
          }}
        >
          <Text>Start Workout On The Fly</Text>
        </Pressable>

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
    paddingLeft: 4,
    paddingRight: 4,
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
