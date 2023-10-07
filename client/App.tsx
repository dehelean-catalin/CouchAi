import { PaperProvider } from "react-native-paper";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { theme } from "./src/constants/theme";
import BottomTabNavigator from "./src/navigations/BottomTabNavigator";
import { persistor, store } from "./src/redux/store";

export default function App() {
	const queryClient = new QueryClient({
		defaultOptions: { queries: { retry: 0 } },
	});
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<QueryClientProvider client={queryClient}>
					<PaperProvider theme={theme}>
						<BottomTabNavigator />
					</PaperProvider>
				</QueryClientProvider>
			</PersistGate>
		</Provider>
	);
}
