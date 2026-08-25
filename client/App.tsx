import React from "react";
import { StyleSheet, Text, View } from "react-native";
import "./polyfills";
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import BottomTabNavigator from "@/navigation/BottomTabNavigator";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <BottomTabNavigator />
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
