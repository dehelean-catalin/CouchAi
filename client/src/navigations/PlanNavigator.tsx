import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Button, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import { AppTheme } from "../../App";
import ROUTES from "../constants/routes";
import CreatePlanScreen from "../screens/Plan/CreatePlanScreen";
import PlansScreen from "../screens/Plan/PlansScreen";

const Stack = createStackNavigator();

export default function PlanNavigator() {
	const { colors } = useTheme<AppTheme>();
	return (
		<Stack.Navigator
			screenOptions={{
				headerStyle: {
					backgroundColor: colors.secondaryGray,
					borderBottomWidth: 0,
					shadowColor: "#000",
				},
				cardStyle: { backgroundColor: colors.primaryGray },
				headerTintColor: "#fff",
			}}
		>
			<Stack.Screen
				name={ROUTES.PLAN}
				component={PlansScreen}
				options={{
					title: "Plans",
				}}
			/>
			<Stack.Screen
				name={ROUTES.CREATE_PLAN}
				component={CreatePlanScreen}
				options={{
					title: "Create plan",
					headerRight: () => <Button title="Save" />,
				}}
			/>
		</Stack.Navigator>
	);
}

const styles = StyleSheet.create({});
