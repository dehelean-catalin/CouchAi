import routes, { RootStackParamList } from "@/navigation/routes";
import React from "react";
import { HomeScreen } from "../../screens/v2/Home/HomeScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { WorkoutScreen } from "@/screens/v2/Workout/WorkoutScreen";
import { ExercisesScreen } from "@/screens/v2/Exercises/ExercisesScreen";
import { WorkoutSummaryScreen } from "@/screens/v2/WorkoutSummary/WorkoutSummaryScreen";
import { useAppColors } from "@/theme/useAppColors";
import { BaseText } from "@/components/BaseText";
import { BaseButton } from "@/components/BaseButton";
import { WorkoutSummaryOptions } from "./WorkoutSummaryOptions";
import { EditWorkoutSummaryScreen } from "@/screens/v2/EditWorkoutSummary/EditWorkoutSummary";
import { WorkoutExerciseScreen } from "@/screens/v2/WorkoutExercise/WorkoutExercise";

const Stack = createNativeStackNavigator<RootStackParamList>();

export function HomeStackNavigator() {
  const { colors } = useAppColors();

  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: { backgroundColor: colors.surface0, padding: 8 },
        headerStyle: { backgroundColor: colors.surface1 },
      }}
    >
      <Stack.Screen
        name={routes.HOME}
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={routes.WORKOUT}
        component={WorkoutScreen}
        options={({ navigation, route }) => ({
          headerLeft: () => (
            <BaseButton
              text="Back"
              type="normal"
              onPress={() => navigation.goBack()}
            />
          ),
          headerTitle: () => (
            <BaseText text={route.params.name} type="primary_18" />
          ),
          headerRight: () => (
            <BaseButton
              text="Complete"
              type="normal"
              onPress={() =>
                navigation.navigate(routes.WORKOUT_SUMMARY, {
                  workoutId: route.params.id,
                  action: "preview",
                })
              }
            />
          ),
          presentation: "fullScreenModal",
        })}
      />
      <Stack.Screen
        name={routes.EXERCISE_LIST}
        component={ExercisesScreen}
        options={{
          headerTitle: () => <BaseText text="Exercises" type="primary_18" />,
        }}
      />
      <Stack.Screen
        name={routes.WORKOUT_SUMMARY}
        component={WorkoutSummaryScreen}
        options={WorkoutSummaryOptions}
      />
      <Stack.Screen
        name={routes.EDIT_WORKOUT_SUMMARY}
        component={EditWorkoutSummaryScreen}
        options={{
          headerTitle: () => <BaseText text="Edit Workout" type="primary_18" />,
        }}
      />
      <Stack.Screen
        name={routes.WORKOUT_EXERCISE}
        component={WorkoutExerciseScreen}
        options={({ navigation }) => ({
          presentation: "fullScreenModal",
          headerTitle: "",
          headerLeft: () => (
            <BaseButton text="Back" onPress={() => navigation.goBack()} />
          ),
        })}
      />
    </Stack.Navigator>
  );
}
