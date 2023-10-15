import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { theme } from "./src/constants/theme";
import BottomTabNavigator from "./src/navigations/BottomTabNavigator";
import { persistor, store } from "./src/redux/store";

export default function App() {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<GestureHandlerRootView style={{ flex: 1 }}>
					<PaperProvider theme={theme}>
						<BottomTabNavigator />
					</PaperProvider>
				</GestureHandlerRootView>
			</PersistGate>
		</Provider>
	);
}
