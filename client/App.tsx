import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "@/redux/store";
import BottomTabNavigator from "@/navigation/BottomTabNavigator";
import { BaseSafeAreaProvider } from "@/components/BaseSafeAreaProvider";

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BaseSafeAreaProvider>
          <BottomTabNavigator />
        </BaseSafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}
