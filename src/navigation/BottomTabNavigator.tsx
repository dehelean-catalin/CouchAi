import routes from "@/constant/routes";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
	NavigationContainer,
	ParamListBase,
	RouteProp,
	getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import { CombinedDarkTheme } from "App";
import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ExerciseNavigator from "./ExerciseNavigator";
import HomeNavigator from "./HomeNavigator";
import PlanNavigator from "./PlanNavigator";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
	return (
		<NavigationContainer theme={CombinedDarkTheme}>
			<Tab.Navigator>
				<Tab.Screen
					name="Homes"
					component={HomeNavigator}
					options={{
						headerShown: false,
						tabBarIcon: ({ color }) => (
							<MaterialCommunityIcons name="home" color={color} size={26} />
						),
					}}
				/>
				<Tab.Screen
					name="Plans"
					component={PlanNavigator}
					options={({ route }) => ({
						headerShown: false,
						tabBarIcon: ({ color }) => (
							<MaterialCommunityIcons
								name="calendar-blank"
								color={color}
								size={26}
							/>
						),
						tabBarStyle: {
							display: getPlanRouteName(route),
						},
					})}
				/>
				<Tab.Screen
					name="Exercises"
					component={ExerciseNavigator}
					options={({ route }) => ({
						headerShown: false,
						tabBarIcon: ({ color }) => (
							<MaterialCommunityIcons name="dumbbell" color={color} size={26} />
						),
						tabBarStyle: {
							display: getRouteName(route),
						},
					})}
				/>
				{/* <Tab.Screen
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
				/> */}
			</Tab.Navigator>
		</NavigationContainer>
	);
}

const getRouteName = (route: RouteProp<ParamListBase, "Exercises">) => {
	const routeName = getFocusedRouteNameFromRoute(route);
	const { CREATE_EXERCISE, EXERCISE_DETAILS } = routes;

	if (
		routeName?.includes(CREATE_EXERCISE) ||
		routeName?.includes(EXERCISE_DETAILS)
	) {
		return "none";
	}

	return "flex";
};

const getPlanRouteName = (route: RouteProp<ParamListBase, "Plans">) => {
	const routeName = getFocusedRouteNameFromRoute(route);
	const { CREATE_PLAN, WORKOUT_PREVIEW, WORKOUT_DAY_PREVIEW } = routes;

	if (
		routeName?.includes(CREATE_PLAN) ||
		routeName?.includes(WORKOUT_PREVIEW) ||
		routeName?.includes(WORKOUT_DAY_PREVIEW)
	) {
		return "none";
	}

	return "flex";
};
