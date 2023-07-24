import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { StyleSheet } from "react-native";
import ROUTES from "../constants/routes";
import CreatePlanScreen from "../screens/Plan/CreatePlanScreen";
import PlansScreen from "../screens/Plan/PlansScreen";

const Stack = createStackNavigator();

export default function PlanNavigator() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name={ROUTES.PLAN} component={PlansScreen} />
			<Stack.Screen name={ROUTES.CREATE_PLAN} component={CreatePlanScreen} />
		</Stack.Navigator>
	);
}

const styles = StyleSheet.create({});
