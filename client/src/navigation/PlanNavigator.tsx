import routes, { RootStackParamList } from "@/navigation/routes";
import CreateExerciseScreen from "@/screens/deprecated/CreateExercise/CreateExerciseScreen";
import { ExerciseDetailsScreen } from "@/screens/deprecated/ExerciseDetails/ExerciseDetailsScreen";
import { ExercisesScreen } from "@/screens/v2/Exercises/ExercisesScreen";
import { WorkoutPlansScreen } from "@/screens/deprecated/Plans/PlansScreen";
import { WorkoutPlanForm } from "@/screens/deprecated/WorkoutPlanForm/WorkoutPlanForm";
import WorkoutPlanPreview from "@/screens/deprecated/WorkoutPlanPreview/WorkoutPlanPreview";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function PlanNavigator() {
  const options = { headerTitle: "" };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={routes.PLAN}
        component={WorkoutPlansScreen}
        options={{ headerTitle: "Plans" }}
      />
      <Stack.Screen
        name={routes.CREATE_PLAN}
        component={WorkoutPlanForm}
        options={{
          headerTitle: "Create plan",
        }}
      />
      <Stack.Screen name={routes.EXERCISE_LIST} component={ExercisesScreen} />
      <Stack.Screen
        name={routes.EXERCISE_DETAILS}
        component={ExerciseDetailsScreen}
        options={options}
      />
      <Stack.Screen
        name={routes.CREATE_EXERCISE}
        component={CreateExerciseScreen}
      />
      <Stack.Screen
        name={routes.WORKOUT_PREVIEW}
        component={WorkoutPlanPreview}
        options={options}
      />
    </Stack.Navigator>
  );
}
