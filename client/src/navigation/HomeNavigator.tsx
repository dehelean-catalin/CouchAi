import routes from "@/constant/routes";
import CreateExerciseScreen from "@/screens/CreateExercise/CreateExerciseScreen";
import { ExerciseDetailsScreen } from "@/screens/ExerciseDetails/ExerciseDetailsScreen";
import ExercisesScreen from "@/screens/Exercises/ExercisesScreen";
import { WorkoutPlanForm } from "@/screens/WorkoutPlanForm/WorkoutPlanForm";
import WorkoutPreview from "@/screens/WorkoutPreview/WorkoutPreview";
import WorkoutSession from "@/screens/WorkoutSession/WorkoutSession";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { BottomNavigationProps } from "react-native-paper";
import HomeScreen from "../screens/Home/HomeScreen";

const Stack = createNativeStackNavigator();

export default function HomeNavigator({
	navigation,
}: {
	navigation: BottomNavigationProps<any>;
}) {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name={routes.HOME}
				component={HomeScreen}
				options={{
					headerTitle: "Home",
				}}
			/>
			<Stack.Screen
				name={routes.WORKOUT_DAY_PREVIEW}
				component={WorkoutPreview}
				options={{ headerTitle: "" }}
			/>
			<Stack.Screen
				name={routes.WORKOUT_SESION}
				component={WorkoutSession}
				options={{ headerTitle: "" }}
			/>
			<Stack.Screen
				name={routes.CREATE_PLAN}
				component={WorkoutPlanForm}
				options={{ headerTitle: "" }}
			/>
			<Stack.Screen name={routes.EXERCISE} component={ExercisesScreen} />
			<Stack.Screen
				name={routes.EXERCISE_DETAILS}
				component={ExerciseDetailsScreen}
				options={{ headerTitle: "" }}
			/>
			<Stack.Screen
				name={routes.CREATE_EXERCISE}
				component={CreateExerciseScreen}
			/>
		</Stack.Navigator>
	);
}
