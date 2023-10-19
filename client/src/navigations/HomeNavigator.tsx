import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import routes from "../constants/routes";
import HomeScreen from "../screens/Home/HomeScreen";
import WorkoutSesion from "../screens/WorkoutSesion";

const Stack = createNativeStackNavigator();

export default function HomeNavigator() {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name={routes.HOME}
				component={HomeScreen}
				options={{
					headerTitle: "Home",
				}}
			/>
			<Stack.Screen name={routes.WORKOUT_SESION} component={WorkoutSesion} />
		</Stack.Navigator>
	);
}
