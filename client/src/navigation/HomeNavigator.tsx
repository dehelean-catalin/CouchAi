import routes, { RootStackParamList, RouteValues } from "@/navigation/routes";
import React from "react";
import { Pressable, Text } from "react-native";
import HomeScreen from "../screens/Home/HomeScreen";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import WorkoutScreen from "@/screens/v2/Workout/WorkoutScreen";
import ExercisesScreen from "@/screens/v2/Exercises/ExercisesScreen";
import { useDispatch } from "react-redux";
import { completeWorkout } from "@/redux/workoutSlice";
import { CompletedWorkoutPreview } from "@/screens/v2/CompletedWorkoutPreview/CompletedWorkoutPreviewScreen";
import { BaseMenu } from "@/components/BaseMenu";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function HomeNavigator() {
  const dispatch = useDispatch();

  return (
    <Stack.Navigator>
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
          headerTitle: "Workout Name",
          headerRight: ({ tintColor }) => (
            <Pressable
              onPress={() => {
                navigation.navigate(routes.COMPLETED_WORKOUT_PREVIEW, {
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
      <Stack.Screen name={routes.EXERCISE_LIST} component={ExercisesScreen} />
      <Stack.Screen
        name={routes.COMPLETED_WORKOUT_PREVIEW}
        component={CompletedWorkoutPreview}
        options={({ navigation, route }) => ({
          headerTitle: "Summary",
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
