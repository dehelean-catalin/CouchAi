import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import ROUTES from "../constants/routes";
import CreatePlanScreen from "../screens/CreatePlanScreen";
import ExercisesScreen from "../screens/ExerciseScreen/ExercisesScreen";
import PlansScreen from "../screens/PlansScreen";

const Stack = createStackNavigator();

export default function PlanNavigator() {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name={ROUTES.PLAN}
				component={PlansScreen}
				options={{ headerTitle: "Plans" }}
			/>
			<Stack.Screen
				name={ROUTES.CREATE_PLAN}
				component={CreatePlanScreen}
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
		</Stack.Navigator>
	);
}

const styles = StyleSheet.create({
	headerStyle: {
		borderBottomWidth: 0,
		shadowColor: "#000",
		elevation: 10,
	},
});
