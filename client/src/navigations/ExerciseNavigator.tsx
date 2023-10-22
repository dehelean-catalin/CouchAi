import { createNativeStackNavigator } from "@react-navigation/native-stack";
import routes from "../constants/routes";
import CreateExerciseScreen from "../screens/CreateExerciseScreen";
import { ExerciseDetailsScreen } from "../screens/ExerciseDetails/ExerciseDetailsScreen";
import ExercisesScreen from "../screens/ExercisesScreen";

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
				}}
			/>
		</Stack.Navigator>
	);
}
