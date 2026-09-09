import routes, { RootStackParamList } from "@/navigation/routes";
import React from "react";
import { HomeScreen } from "../screens/Home/HomeScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { WorkoutScreen } from "@/screens/v2/Workout/WorkoutScreen";
import { ExercisesScreen } from "@/screens/v2/Exercises/ExercisesScreen";
import { useDispatch } from "react-redux";
import { completeWorkout } from "@/redux/workoutSlice";
import { WorkoutSummaryScreen } from "@/screens/v2/WorkoutSummary/WorkoutSummaryScreen";
import { BaseMenu } from "@/components/BaseMenu";
import { useAppColors } from "@/theme/useAppColors";
import { BaseText } from "@/components/BaseText";
import { BaseButton } from "@/components/BaseButton";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function HomeNavigator() {
  const { colors } = useAppColors();
  const dispatch = useDispatch();

  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: { backgroundColor: colors.surface0 },
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
                  bottomActions: [
                    {
                      label: "Save",
                      action: () => {
                        dispatch(completeWorkout(route.params.id));
                        navigation.popToTop();
                      },
                    },
                  ],
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
        options={({ navigation, route }) => ({
          headerTitle: () => <BaseText text="Summary" type="primary_18" />,
          headerLeft: () => (
            <BaseButton
              text="Back"
              type="normal"
              onPress={() => navigation.goBack()}
            />
          ),
          headerRight: () => {
            const headerOptions = route.params.headerOptions;
            if (!headerOptions?.length) {
              return null;
            }
            return <BaseMenu items={headerOptions} />;
          },
          presentation: "fullScreenModal",
        })}
      />
    </Stack.Navigator>
  );
}
