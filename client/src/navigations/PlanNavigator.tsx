import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { StyleSheet, Text } from "react-native";
import { useTheme } from "react-native-paper";
import ROUTES from "../constants/routes";
import { AppTheme } from "../constants/theme";
import CreatePlanScreen from "../screens/CreatePlanScreen";
import PlansScreen from "../screens/PlansScreen";

const Stack = createStackNavigator();

export default function PlanNavigator() {
	const { colors } = useTheme<AppTheme>();
	const screenOptions = {
		headerStyle: [
			styles.headerStyle,
			{ backgroundColor: colors.surfaceVariant },
		],

		cardStyle: { backgroundColor: colors.surface },
		headerTintColor: colors.onSurface,
	};

	return (
		<Stack.Navigator screenOptions={screenOptions}>
			<Stack.Screen
				name={ROUTES.PLAN}
				component={PlansScreen}
				options={{
					headerTitle: "Plans",
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
