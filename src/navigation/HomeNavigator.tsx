import routes from "@/constant/routes";
import WorkoutPreview from "@/screens/WorkoutPreview/WorkoutPreview";
import WorkoutSession from "@/screens/WorkoutSession/WorkoutSession";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import HomeScreen from "../screens/Home/HomeScreen";

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
			<Stack.Screen
				name={routes.WORKOUT_DAY_PREVIEW}
				component={WorkoutPreview}
				options={{ headerTitle: "" }}
			/>
			<Stack.Screen
				name={routes.WORKOUT_SESION}
				component={WorkoutSession}
				options={{ headerTitle: "" }}
			/>
		</Stack.Navigator>
	);
}
