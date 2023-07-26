import { StatusBar } from "expo-status-bar";
import { PaperProvider } from "react-native-paper";
import { QueryClient, QueryClientProvider } from "react-query";
import { theme } from "./src/constants/theme";
import BottomTabNavigator from "./src/navigations/BottomTabNavigator";

export default function App() {
	const queryClient = new QueryClient({
		defaultOptions: { queries: { retry: 0 } },
	});

	return (
		<QueryClientProvider client={queryClient}>
			<PaperProvider theme={theme}>
				<BottomTabNavigator />
				<StatusBar style="auto" />
			</PaperProvider>
		</QueryClientProvider>
	);
}
