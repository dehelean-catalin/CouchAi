import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Pressable } from "react-native";
import { IconButton } from "react-native-paper";
import routes from "../constants/routes";
import CreateExerciseScreen from "../screens/ExerciseScreen/CreateExerciseScreen";
import ExerciseDetailsScreen from "../screens/ExerciseScreen/ExerciseDetailsScreen";
import ExercisesScreen from "../screens/ExerciseScreen/ExercisesScreen";

const Stack = createNativeStackNavigator();

export default function ExerciseNavigator() {
	return (
		<Stack.Navigator>
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
				}}
			/>
			<Stack.Screen
				name={routes.CREATE_EXERCISE}
				component={CreateExerciseScreen}
				options={{
					headerTitle: "Create",
					headerRight: () => (
						<Pressable>
							<IconButton icon="check" size={20} />
						</Pressable>
					),
				}}
			/>
		</Stack.Navigator>
	);
}
