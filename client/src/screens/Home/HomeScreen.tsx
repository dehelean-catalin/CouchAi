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

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen(props: HomeScreenProps) {
  const dispatch = useDispatch();
  const workouts = useSelector<RootState, WorkoutState[]>(
    (s) => s.workout.workouts,
  );

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
        <View>
          <Text>Recent Activity</Text>
          {workouts
            .filter((workout) => workout.status === "completed")
            .map((completedWorkout) => (
              <View key={completedWorkout.id}>
                <Text>{completedWorkout.name}</Text>
              </View>
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});
