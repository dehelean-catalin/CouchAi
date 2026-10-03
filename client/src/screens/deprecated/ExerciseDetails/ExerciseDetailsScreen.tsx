import { useTheme } from "@react-navigation/native";
import React, { useLayoutEffect, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Text } from "react-native-paper";
import ExerciseDetailsHeader from "./ExerciseDetailsHeaderRight";
import EDSummary from "./ExerciseDetailsSummary";

export const ExerciseDetailsScreen = ({ route, navigation }) => {
	const { id } = route.params;
	const { colors } = useTheme();

	const [isToggleTabName, setToggleTabName] = useState(false);

	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => <ExerciseDetailsHeader />,
		});
	}, [navigation]);

	const toggleTabSummary = () => setToggleTabName(false);
	const toggleTabStats = () => setToggleTabName(true);

	return (
		<ScrollView>
			<View style={styles.header}>
				<Pressable
					style={[
						styles.tabName,
						!isToggleTabName && { borderBottomColor: colors.primary },
					]}
					onPress={toggleTabSummary}
				>
					<Text variant="titleSmall">Summary</Text>
				</Pressable>
				<Pressable
					style={[
						styles.tabName,
						isToggleTabName && { borderBottomColor: colors.primary },
					]}
					onPress={toggleTabStats}
				>
					<Text variant="titleSmall">Stats</Text>
				</Pressable>
			</View>
			{!isToggleTabName ? <EDSummary id={id} /> : <Text>No log found</Text>}
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	header: {
		flexDirection: "row",
	},
	tabName: {
		flex: 1,
		padding: 15,
		alignItems: "center",
		borderBottomWidth: 1,
		// borderBottomColor: theme.colors.background,
	},
});
