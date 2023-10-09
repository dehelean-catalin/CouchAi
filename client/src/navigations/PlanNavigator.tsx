import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { StyleSheet, Text } from "react-native";
import ROUTES from "../constants/routes";
import CreatePlanScreen from "../screens/CreatePlanScreen";
import PlansScreen from "../screens/PlansScreen";

const Stack = createStackNavigator();

export default function PlanNavigator() {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name={ROUTES.PLAN}
				component={PlansScreen}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name={ROUTES.CREATE_PLAN}
				component={CreatePlanScreen}
				options={{
					headerTitle: "Create plan",
					headerRight: () => <Text>Save</Text>,
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
