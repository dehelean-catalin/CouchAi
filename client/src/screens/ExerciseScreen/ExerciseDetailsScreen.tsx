import React, { useLayoutEffect, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Text } from "react-native-paper";
import ExerciseDetailsHeaderRight from "../../components/ExerciseDetailsHeaderRight";
import { theme } from "../../constants/theme";
import EDSummary from "./EDSummary";

export default function ExerciseDetailsScreen({ route, navigation }) {
	const { id } = route.params;

	const [isToggleTabName, setToggleTabName] = useState(false);

	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => <ExerciseDetailsHeaderRight />,
		});
	}, [navigation]);

	const toggleTabSummary = () => setToggleTabName(false);
	const toggleTabStats = () => setToggleTabName(true);

	return (
		<ScrollView>
			<View style={styles.header}>
				<Pressable
					style={[styles.tabName, !isToggleTabName && styles.active]}
					onPress={toggleTabSummary}
				>
					<Text variant="titleSmall">Summary</Text>
				</Pressable>
				<Pressable
					style={[styles.tabName, isToggleTabName && styles.active]}
					onPress={toggleTabStats}
				>
					<Text variant="titleSmall">Stats</Text>
				</Pressable>
			</View>
			{!isToggleTabName ? <EDSummary id={id} /> : <Text>No log found</Text>}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	header: {
		flexDirection: "row",
	},
	tabName: {
		flex: 1,
		padding: 15,
		alignItems: "center",
		borderBottomWidth: 1,
		borderBottomColor: theme.colors.background,
	},
	active: {
		borderBottomColor: theme.colors.primary,
	},
});
