import routes from "@/constant/routes";
import CreateExerciseScreen from "@/screens/CreateExercise/CreateExerciseScreen";
import { ExerciseDetailsScreen } from "@/screens/ExerciseDetails/ExerciseDetailsScreen";
import ExercisesScreen from "@/screens/Exercises/ExercisesScreen";
import { WorkoutPlansScreen } from "@/screens/Plans/PlansScreen";
import { WorkoutPlanForm } from "@/screens/WorkoutPlanForm/WorkoutPlanForm";
import WorkoutPlanPreview from "@/screens/WorkoutPlanPreview/WorkoutPlanPreview";
import WorkoutPreview from "@/screens/WorkoutPreview/WorkoutPreview";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

const Stack = createStackNavigator();

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
			<Stack.Screen name={routes.EXERCISE} component={ExercisesScreen} />
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
			<Stack.Screen
				name={routes.WORKOUT_DAY_PREVIEW}
				component={WorkoutPreview}
				options={options}
			/>
		</Stack.Navigator>
	);
}
