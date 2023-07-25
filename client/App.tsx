import { StatusBar } from "expo-status-bar";
import { MD3LightTheme, PaperProvider } from "react-native-paper";
import { QueryClient, QueryClientProvider } from "react-query";
import BottomTabNavigator from "./src/navigations/BottomTabNavigator";

const theme = {
	...MD3LightTheme,
	roundness: 2,
	colors: {
		...MD3LightTheme.colors,
		primary: "#3498db",
		secondary: "#f1c40f",
		tertiary: "#a1b2c3",
		primaryGray: "#121212",
		secondaryGray: "#1c1c1c",
	},
};

export type AppTheme = typeof theme;

export default function App() {
	const queryClient = new QueryClient({
		defaultOptions: { queries: { retry: 2 } },
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
