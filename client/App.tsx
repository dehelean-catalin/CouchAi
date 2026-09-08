import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import BottomTabNavigator from "@/navigation/BottomTabNavigator";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

var a;

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <BottomTabNavigator />
      </SafeAreaProvider>
    </Provider>
  );
}
