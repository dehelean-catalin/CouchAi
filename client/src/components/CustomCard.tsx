import React, { FC, useContext } from "react";
import { StyleSheet, View } from "react-native";
import { Menu, Text } from "react-native-paper";
import { theme } from "../constants/theme";
import WorkoutPlanFormContext from "../context/WorkoutPlanFormContext";
import { WorkoutExercise } from "../models/workoutModel";
import CustomMenu from "./PaperMenu";

type Props = {
	id: string;
	value: WorkoutExercise;
};

const CustomCard: FC<Props> = ({ id, value }) => {
	const { deleteByIdWorkoutExercise } = useContext(WorkoutPlanFormContext);
	let maxVal = 0;
	let minVal = 100;

	value.workoutSets.forEach((set) => {
		maxVal = Math.max(maxVal, set.maxReps);
		minVal = Math.min(minVal, set.minReps);
	});

	const numberOfSets = value.workoutSets.length;

	const setFormat = numberOfSets === 1 ? "set" : "sets";

	const repsFormat =
		maxVal === 0 && (minVal === 100 || minVal === 0)
			? ""
			: minVal === 1 || maxVal === 1
			? " rep"
			: " reps";

	const minValFormat =
		minVal === 100 || minVal === 0 || minVal === maxVal ? "" : minVal;

	const maxValFormat =
		maxVal === 0
			? ""
			: minVal === 100 || minVal === 0
			? maxVal
			: `x ${maxVal} `;

	return (
		<View style={styles.container}>
			<View>
				<Text>{value.exercise.name}</Text>
				{!!numberOfSets && (
					<View style={styles.setsInfo}>
						<Text>
							{numberOfSets}
							{setFormat}
						</Text>
						<Text>{minValFormat}</Text>
						<Text>
							{maxValFormat}
							{repsFormat}
						</Text>
					</View>
				)}
			</View>
			<CustomMenu>
				<Menu.Item
					title="Delete"
					onPress={() => deleteByIdWorkoutExercise(id, value.id)}
				/>
			</CustomMenu>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "space-between",
		borderBottomWidth: 1,
		borderBlockColor: theme.colors.surfaceVariant,
		padding: 10,
		paddingRight: 0,
	},
	setsInfo: {
		flexDirection: "row",
		gap: 4,
	},
});

export default CustomCard;
