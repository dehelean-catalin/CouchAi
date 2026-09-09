import routes, { RootStackParamList, RouteValues } from "@/navigation/routes";
import React from "react";
import { Pressable, Text } from "react-native";
import { HomeScreen } from "../screens/Home/HomeScreen";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { WorkoutScreen } from "@/screens/v2/Workout/WorkoutScreen";
import { ExercisesScreen } from "@/screens/v2/Exercises/ExercisesScreen";
import { useDispatch } from "react-redux";
import { completeWorkout } from "@/redux/workoutSlice";
import { WorkoutSummaryScreen } from "@/screens/v2/WorkoutSummary/WorkoutSummaryScreen";
import { BaseMenu } from "@/components/BaseMenu";
import { useAppColors } from "@/theme/useAppColors";
import { BaseText } from "@/components/BaseText";

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
          headerLeft: ({ tintColor }) => (
            <BackButton color={tintColor} navigation={navigation} />
          ),
          headerTitle: () => (
            <BaseText text={route.params.name} type="primary_18" />
          ),
          headerRight: ({ tintColor }) => (
            <Pressable
              onPress={() => {
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
                });
              }}
            >
              <Text style={{ color: tintColor }}>Complete</Text>
            </Pressable>
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
          headerLeft: ({ tintColor }) => (
            <BackButton color={tintColor} navigation={navigation} />
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

function BackButton({
  color,
  navigation,
}: {
  color?: string;
  navigation: NativeStackNavigationProp<RootStackParamList, RouteValues>;
}) {
  return (
    <Pressable onPress={() => navigation.goBack()}>
      <Text style={{ color }}>Back</Text>
    </Pressable>
  );
}
