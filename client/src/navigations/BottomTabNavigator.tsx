import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { StyleSheet } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import HomeScreen from "../screens/HomeScreen";
import StatisticsScreen from "../screens/StatisticsScreen";
import ExerciseNavigator from "./ExerciseNavigator";
import PlanNavigator from "./PlanNavigator";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
	return (
		<NavigationContainer>
			<Tab.Navigator initialRouteName="Account">
				<Tab.Screen
					name="Home"
					component={HomeScreen}
					options={{
						headerShown: false,
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
						headerShown: false,
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

const styles = StyleSheet.create({});
