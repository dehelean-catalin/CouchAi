import routes, { RootStackParamList } from "@/constant/routes";
import CreateExerciseScreen from "@/screens/CreateExercise/CreateExerciseScreen";
import { ExerciseDetailsScreen } from "@/screens/ExerciseDetails/ExerciseDetailsScreen";
import ExercisesScreen from "@/screens/Exercises/ExercisesScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function ExerciseNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={routes.EXERCISE_LIST}
        component={ExercisesScreen}
        options={{
          headerTitle: "Exercises",
        }}
      />
      <Stack.Screen
        name={routes.CREATE_EXERCISE}
        component={CreateExerciseScreen}
        options={{
          headerTitle: "Create",
        }}
      />
      <Stack.Screen
        name={routes.EXERCISE_DETAILS}
        component={ExerciseDetailsScreen}
        options={{
          headerTitle: "",
        }}
      />
    </Stack.Navigator>
  );
}
