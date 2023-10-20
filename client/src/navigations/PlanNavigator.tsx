import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import routes, { default as ROUTES } from "../constants/routes";
import ExerciseDetailsScreen from "../screens/ExerciseDetails/ExerciseDetailsScreen";
import ExercisesScreen from "../screens/ExercisesScreen";
import WorkoutPlanForm from "../screens/WorkoutPlanForm/WorkoutPlanForm";
import WorkoutPlanPreview from "../screens/WorkoutPlanPreview/WorkoutPlanPreview";
import WorkoutPlansScreen from "../screens/WorkoutPlans/WorkoutPlansScreen";

const Stack = createStackNavigator();

export default function PlanNavigator() {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name={ROUTES.PLAN}
				component={WorkoutPlansScreen}
				options={{ headerTitle: "Plans" }}
			/>
			<Stack.Screen
				name={ROUTES.CREATE_PLAN}
				component={WorkoutPlanForm}
				options={{
					headerTitle: "Create plan",
				}}
			/>
			<Stack.Screen name={ROUTES.EXERCISE} component={ExercisesScreen} />
			<Stack.Screen
				name={routes.EXERCISE_DETAILS}
				component={ExerciseDetailsScreen}
				options={{
					headerTitle: "",
				}}
			/>
			<Stack.Screen
				name={ROUTES.WORKOUT_PREVIEW}
				component={WorkoutPlanPreview}
				options={{ headerTitle: "" }}
			/>
		</Stack.Navigator>
	);
}
