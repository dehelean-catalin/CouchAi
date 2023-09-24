import { MD3DarkTheme, MD3Theme } from "react-native-paper";

export const theme: MD3Theme = {
	...MD3DarkTheme,
	roundness: 2,
	colors: {
		...MD3DarkTheme.colors,
	},
};

export type AppTheme = typeof theme;
