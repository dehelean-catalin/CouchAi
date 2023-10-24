import { theme } from "@/src/constants/theme";
import { computeWorkoutSets } from "@/src/helpers/workoutSet.heler";
import { WorkoutExercise } from "@/src/models/workoutModel";
import React, { FC } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

type Props = {
	value: WorkoutExercise;
};

const WorkoutExerciseCard: FC<Props> = ({ value }) => {
	const { exercise, workoutSets } = value;
	const initialLetter = exercise.name.slice(0, 1).toUpperCase();

	const { numberOfSets, setFormat, minValFormat, maxValFormat, repsFormat } =
		computeWorkoutSets(workoutSets);

	return (
		<Pressable style={styles.container}>
			{exercise.thumbnailUrl ? (
				<Image
					source={{
						uri: exercise.thumbnailUrl,
					}}
					style={styles.tinyLogo}
				/>
			) : (
				<View style={styles.imageContainer}>
					<Text style={styles.initial}>{initialLetter}</Text>
				</View>
			)}
			<View style={styles.detailsContainer}>
				<Text>{exercise.name}</Text>
				{
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
				}
			</View>
		</Pressable>
	);
};

export default WorkoutExerciseCard;

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		backgroundColor: theme.colors.surface,
	},
	tinyLogo: {
		width: 80,
		height: 80,
	},
	imageContainer: {
		width: 80,
		height: 80,
		backgroundColor: "white",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	initial: {
		fontSize: 20,
		color: "gray",
	},
	detailsContainer: {
		justifyContent: "center",
		paddingLeft: 20,
	},
	setsInfo: {
		flexDirection: "row",
		gap: 4,
	},
});
