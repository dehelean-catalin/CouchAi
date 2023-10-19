import { MD3DarkTheme, MD3Theme } from "react-native-paper";

export const theme: MD3Theme = {
	...MD3DarkTheme,
	roundness: 2,
	colors: {
		...MD3DarkTheme.colors,
		surface: "#282a2d",
	},
};

export const customColors = {
	textSecondary: "#bdbdbd",
	borderColor: "#fff",
};

export const NavigatorColors = {
	primary: MD3DarkTheme.colors.primary,
	background: theme.colors.background,
	card: MD3DarkTheme.colors.background,
	text: MD3DarkTheme.colors.primary,
	border: MD3DarkTheme.colors.surface,
	notification: MD3DarkTheme.colors.background,
};

export type AppTheme = typeof theme;
