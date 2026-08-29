import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import HomeNavigator from "./HomeNavigator";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Main"
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
