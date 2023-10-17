import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import ROUTES from "../constants/routes";
import { ExerciseSelectionContextProvider } from "../context/ExerciseSelectionContext";
import { WorkoutPlanFormContextProvider } from "../context/WorkoutPlanFormContext";
import ExercisesScreen from "../screens/ExerciseScreen/ExercisesScreen";
import WorkoutPlanPreview from "../screens/PlanScreen/WorkoutPlanPreview";
import PlansScreen from "../screens/PlansScreen";
import WorkoutPlanForm from "../screens/Testt/WorkoutPlanForm";

const Stack = createStackNavigator();

export default function PlanNavigator() {
	return (
		<ExerciseSelectionContextProvider>
			<WorkoutPlanFormContextProvider>
				<Stack.Navigator>
					<Stack.Screen
						name={ROUTES.PLAN}
						component={PlansScreen}
						options={{ headerTitle: "Plans" }}
					/>
					<Stack.Screen
						name={ROUTES.CREATE_PLAN}
						component={WorkoutPlanForm}
						options={{
							headerTitle: "Create plan",
						}}
					/>
					<Stack.Screen
						name={ROUTES.EXERCISE}
						component={ExercisesScreen}
						options={{
							headerTitle: "Create plan",
							headerRight: () => <Button>Save</Button>,
						}}
					/>
					<Stack.Screen
						name={ROUTES.WORKOUT_PREVIEW}
						component={WorkoutPlanPreview}
						options={{ headerTitle: "" }}
					/>
				</Stack.Navigator>
			</WorkoutPlanFormContextProvider>
		</ExerciseSelectionContextProvider>
	);
}

const styles = StyleSheet.create({
	headerStyle: {
		borderBottomWidth: 0,
		shadowColor: "#000",
		elevation: 10,
	},
});
