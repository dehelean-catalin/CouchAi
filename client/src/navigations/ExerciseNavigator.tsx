import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { IconButton, useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import routes from "../constants/routes";
import { AppTheme } from "../constants/theme";
import CreateExerciseScreen from "../screens/ExerciseScreen/CreateExerciseScreen";
import ExerciseDetailsScreen from "../screens/ExerciseScreen/ExerciseDetailsScreen";
import ExercisesScreen from "../screens/ExerciseScreen/ExercisesScreen";

const Stack = createStackNavigator();

export default function ExerciseNavigator() {
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
				name={routes.EXERCISE}
				component={ExercisesScreen}
				options={{
					headerTitle: "Exercises",
				}}
			/>
			<Stack.Screen
				name={routes.EXERCISE_DETAILS}
				component={ExerciseDetailsScreen}
				options={{
					headerTitle: "",
					headerRight: () => (
						<TouchableOpacity style={{ marginRight: 16, flexDirection: "row" }}>
							<IconButton icon="pencil" size={20} style={{}} />
							<IconButton
								icon="dots-vertical"
								size={20}
								onPress={() => console.log("Pressed")}
							/>
						</TouchableOpacity>
					),
				}}
			/>
			<Stack.Screen
				name={routes.CREATE_EXERCISE}
				component={CreateExerciseScreen}
				options={{
					headerTitle: "Create",
					headerRight: () => (
						<TouchableOpacity style={{ marginRight: 16 }}>
							<Icon name="check" size={20} style={{}} />
						</TouchableOpacity>
					),
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
