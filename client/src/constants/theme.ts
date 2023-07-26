import { MD3DarkTheme, MD3Theme } from "react-native-paper";

export const theme: MD3Theme = {
	...MD3DarkTheme,
	roundness: 2,
	colors: {
		...MD3DarkTheme.colors,
		primary: "#3498db",
		secondary: "#f1c40f",
		surface: "#121212",
		background: "#121212",

		surfaceVariant: "#1e1e1e",
		tertiaryContainer: "#2c2c2c",
		onBackground: "#fff",
		onSurface: "#fff",
		onSurfaceVariant: "#fff",
		onTertiary: "#fff",
		onTertiaryContainer: "#fff",
	},
};

export type AppTheme = typeof theme;
