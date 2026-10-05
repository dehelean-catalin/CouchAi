import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import React from "react";
import { HomeStackNavigator } from "./home/HomeStackNavigator";
import { useAppColors } from "@/theme/useAppColors";
import { BaseIcon } from "@/components/icons";
import { Platform, StyleSheet } from "react-native";
import { ProfileStackNavigator } from "./profile/ProfileStackNavigator";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const { colors } = useAppColors();
  const { bottom } = useSafeAreaInsets();

  return (
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: colors.surface0,
        },
      }}
    >
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: [
            styles.tabBarContainer,
            {
              backgroundColor: colors.surface1,
              marginBottom: Platform.OS === "android" ? bottom : 0,
              height:
                Platform.OS === "android" ? 52 : styles.tabBarContainer.height,
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
    height: 70,
    paddingBottom: 8,
    paddingTop: 8,
    borderTopWidth: 0,
    elevation: 0,
  },
});
