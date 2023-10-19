import { customColors, theme } from "@/src/constants/theme";
import { WorkoutDay } from "@/src/models/workoutModel";
import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { Chip, Text } from "react-native-paper";

type Props = {
	value: WorkoutDay;
	index: number;
};

const ScheduleCard: FC<Props> = ({ value, index }) => {
	const numberOfExericises = Object.values(value).length;

	return (
		<View style={styles.container}>
			<Chip style={styles.chip}>{index + 1}</Chip>
			<View>
				<Text variant="bodyLarge">{value.name}</Text>
				<Text style={styles.description}>
					{numberOfExericises}
					{numberOfExericises == 1 ? " exercise" : " exercises"}
				</Text>
			</View>
		</View>
	);
};

export default ScheduleCard;

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		gap: 15,
		backgroundColor: theme.colors.surface,
		padding: 15,
	},
	chip: {
		backgroundColor: theme.colors.primaryContainer,
		borderRadius: 50,
		aspectRatio: 1,
		borderWidth: 1,
		justifyContent: "center",
		borderColor: customColors.borderColor,
	},

	description: {
		color: customColors.textSecondary,
	},
});
