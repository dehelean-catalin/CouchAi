import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import BottomTabNavigator from "@/navigation/BottomTabNavigator";
import { Provider } from "react-redux";
import { persistor, store } from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <BottomTabNavigator />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}
