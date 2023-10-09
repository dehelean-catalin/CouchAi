import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { NavigatorColors } from "../constants/theme";
import HomeScreen from "../screens/HomeScreen";
import StatisticsScreen from "../screens/StatisticsScreen";
import ExerciseNavigator from "./ExerciseNavigator";
import PlanNavigator from "./PlanNavigator";

export type RootStackParamList = {
	Home: undefined;
	Exercises: undefined;
	ExerciseDetails: { id: string };
	CreateExercise: undefined;
};

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
	return (
		<NavigationContainer theme={{ dark: true, colors: NavigatorColors }}>
			<Tab.Navigator>
				<Tab.Screen
					name="Home"
					component={HomeScreen}
					options={{
						headerShown: true,
						tabBarLabel: "Home",
						tabBarIcon: ({ color }) => (
							<MaterialCommunityIcons name="home" color={color} size={26} />
						),
					}}
				/>
				<Tab.Screen
					name="Plans"
					component={PlanNavigator}
					options={{
						tabBarIcon: ({ color }) => (
							<MaterialCommunityIcons
								name="calendar-blank"
								color={color}
								size={26}
							/>
						),
					}}
				/>
				<Tab.Screen
					name="Exercises"
					component={ExerciseNavigator}
					options={{
						headerShown: false,
						tabBarIcon: ({ color }) => (
							<MaterialCommunityIcons name="dumbbell" color={color} size={26} />
						),
					}}
				/>
				<Tab.Screen
					name="Statistics"
					component={StatisticsScreen}
					options={{
						tabBarLabel: "Statistics",
						tabBarIcon: ({ color }) => (
							<MaterialCommunityIcons
								name="chart-line-variant"
								color={color}
								size={26}
							/>
						),
					}}
				/>
			</Tab.Navigator>
		</NavigationContainer>
	);
}
