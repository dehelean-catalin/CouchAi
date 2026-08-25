import routes, { RootStackParamList } from "@/constant/routes";
import React from "react";
import { Pressable, Text } from "react-native";
import HomeScreen from "../screens/Home/HomeScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WorkoutScreen from "@/screens/Workout/WorkoutScreen";
import { StackScreen } from "react-native-screens";
import ExerciseCard from "@/screens/Exercises/ExerciseCard";
import ExercisesScreen from "@/screens/Exercises/ExercisesScreen";
import { useDispatch } from "react-redux";
import { completeWorkout } from "@/redux/workoutSlice";

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
            <Pressable onPress={() => navigation.goBack()}>
              <Text style={{ color: tintColor }}>Back</Text>
            </Pressable>
          ),
          headerTitle: "Workout Name",
          headerRight: ({ tintColor }) => (
            <Pressable
              onPress={() => {
                dispatch(completeWorkout(route.params.id));
                navigation.goBack();
              }}
            >
              <Text style={{ color: tintColor }}>Complete</Text>
            </Pressable>
          ),
          presentation: "fullScreenModal",
        })}
      />
      <Stack.Screen name={routes.EXERCISE_LIST} component={ExercisesScreen} />
    </Stack.Navigator>
  );
}
