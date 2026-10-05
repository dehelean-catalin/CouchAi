import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { persistor, store } from "@/redux/store";
import BottomTabNavigator from "@/navigation/BottomTabNavigator";

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
