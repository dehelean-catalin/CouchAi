import BottomTabNavigator from "@/navigation/BottomTabNavigator";
import { persistor, store } from "@/redux/store";
import {
	DarkTheme as NavigationDarkTheme,
	DefaultTheme as NavigationDefaultTheme,
} from "@react-navigation/native";
import merge from "deepmerge";
import React from "react";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
	MD3DarkTheme,
	MD3LightTheme,
	PaperProvider,
	adaptNavigationTheme,
	useTheme,
} from "react-native-paper";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

const { LightTheme, DarkTheme } = adaptNavigationTheme({
	reactNavigationLight: NavigationDefaultTheme,
	reactNavigationDark: NavigationDarkTheme,
});

const CombinedDefaultTheme = merge(MD3LightTheme, LightTheme);
export const CombinedDarkTheme = merge(MD3DarkTheme, DarkTheme);

export default function App() {
	const theme = useTheme();
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<GestureHandlerRootView style={{ flex: 1 }}>
					<PaperProvider theme={CombinedDarkTheme}>
						<BottomTabNavigator />
					</PaperProvider>
				</GestureHandlerRootView>
			</PersistGate>
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
