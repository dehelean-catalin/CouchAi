import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { HomeStackNavigator } from "./home/HomeStackNavigator";
import { useAppColors } from "@/theme/useAppColors";
import { BaseIcon } from "@/components/icons";
import { StyleSheet } from "react-native";
import { ProfileStackNavigator } from "./profile/ProfileStackNavigator";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const { colors } = useAppColors();
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: [
            styles.tabBarContainer,
            {
              backgroundColor: colors.surface1,
            },
          ],
          tabBarShowLabel: false,
          headerShown: false,
        }}
      >
        <Tab.Screen
          name="Main"
          component={HomeStackNavigator}
          options={{
            tabBarIcon: () => <BaseIcon name="house" />,
          }}
        />
        <Tab.Screen
          name="MainProfile"
          component={ProfileStackNavigator}
          options={{
            tabBarIcon: () => <BaseIcon name="person" />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    borderTopWidth: 0,
    height: 70,
    paddingBottom: 8,
    paddingTop: 8,
  },
});
