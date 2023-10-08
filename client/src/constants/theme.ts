import { MD3DarkTheme, MD3Theme } from "react-native-paper";

export const theme: MD3Theme = {
	...MD3DarkTheme,
	roundness: 2,
	colors: {
		...MD3DarkTheme.colors,
	},
};

export const NavigatorColors = {
	primary: MD3DarkTheme.colors.primary,
	background: MD3DarkTheme.colors.background,
	card: MD3DarkTheme.colors.background,
	text: MD3DarkTheme.colors.primary,
	border: MD3DarkTheme.colors.background,
	notification: MD3DarkTheme.colors.background,
};

export type AppTheme = typeof theme;
