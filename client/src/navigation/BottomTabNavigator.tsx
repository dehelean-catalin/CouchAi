import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import HomeNavigator from "./HomeNavigator";
import { useAppColors } from "@/theme/useAppColors";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const { colors } = useAppColors();
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          sceneStyle: { backgroundColor: colors.surface0 },
          tabBarStyle: {
            backgroundColor: colors.surface1,
            borderTopWidth: 0,
            height: 70,
            paddingBottom: 8,
            paddingTop: 8,
          },
          tabBarActiveTintColor: colors.blue0,
        }}
      >
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
