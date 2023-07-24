import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { StyleSheet } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ExercisesScreen from "../screens/ExercisesScreen";
import HomeScreen from "../screens/HomeScreen";
import StatisticsScreen from "../screens/StatisticsScreen";
import PlanNavigator from "./PlanNavigator";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
	return (
		<NavigationContainer>
			<Tab.Navigator initialRouteName="Account">
				<Tab.Screen
					name="Feed"
					component={HomeScreen}
					options={{
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
						tabBarLabel: "Plans",
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
					name="Profile"
					component={ExercisesScreen}
					options={{
						tabBarLabel: "Exercises",
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
