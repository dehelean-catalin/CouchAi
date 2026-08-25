import routes from "@/constant/routes";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  ParamListBase,
  RouteProp,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import React from "react";
import HomeNavigator from "./HomeNavigator";
import { Text, View } from "react-native";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeNavigator}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Plans"
          component={HomeNavigator}
          options={{
            headerShown: false,
          }}
        />
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

const getHomeRouteName = (route: RouteProp<ParamListBase, "Homes">) => {
  const routeName = getFocusedRouteNameFromRoute(route);
  const { CREATE_PLAN, WORKOUT_DAY_PREVIEW, WORKOUT_SESION } = routes;

  if (
    routeName?.includes(CREATE_PLAN) ||
    routeName?.includes(WORKOUT_DAY_PREVIEW) ||
    routeName?.includes(WORKOUT_SESION)
  ) {
    return "none";
  }

  return "flex";
};

const getPlanRouteName = (route: RouteProp<ParamListBase, "Plans">) => {
  const routeName = getFocusedRouteNameFromRoute(route);
  const {
    CREATE_PLAN,
    EXERCISE_LIST: EXERCISE,
    EXERCISE_DETAILS,
    WORKOUT_PREVIEW,
    WORKOUT_DAY_PREVIEW,
  } = routes;

  if (
    routeName?.includes(CREATE_PLAN) ||
    routeName?.includes(WORKOUT_PREVIEW) ||
    routeName?.includes(WORKOUT_DAY_PREVIEW) ||
    routeName?.includes(EXERCISE) ||
    routeName?.includes(EXERCISE_DETAILS)
  ) {
    return "none";
  }

  return "flex";
};
