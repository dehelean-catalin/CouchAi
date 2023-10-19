import { theme } from "@/src/constants/theme";
import { WorkoutDay } from "@/src/models/workoutModel";
import React, { FC } from "react";
import { Pressable, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

type Props = {
	value: WorkoutDay;
};

const WokoutPlanPreviewCard: FC<Props> = ({ value }) => {
	const handlePress = () => {
		console.log("press");
	};

	return (
		<Pressable style={styles.card} onPress={handlePress}>
			<Text>{value.name}</Text>
			<Text>{Object.values(value.exercises).length} exercises</Text>
		</Pressable>
	);
};

export default WokoutPlanPreviewCard;

const styles = StyleSheet.create({
	card: {
		backgroundColor: theme.colors.surface,
		width: 120,
		height: 140,
		padding: 15,
		justifyContent: "space-between",
	},
});
