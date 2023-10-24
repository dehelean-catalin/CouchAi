import { computeWorkoutSets } from "@/src/helpers/workoutSet.heler";
import React, { FC } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Menu, Text } from "react-native-paper";
import { useDispatch } from "react-redux";
import CustomMenu from "../../components/PaperMenu";
import { theme } from "../../constants/theme";
import { WorkoutExercise } from "../../models/workoutModel";
import { workoutFormActions } from "../../redux/workoutFormReducer";

type Props = {
	id: string;
	value: WorkoutExercise;
};

const CustomCard: FC<Props> = ({ id, value }) => {
	const dispatch = useDispatch();

	const { numberOfSets, setFormat, minValFormat, maxValFormat, repsFormat } =
		computeWorkoutSets(value.workoutSets);

	return (
		<Pressable style={styles.container}>
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
					onPress={() =>
						dispatch(
							workoutFormActions.deleteWorkoutExercise({
								id,
								exerciseId: value.id,
							})
						)
					}
				/>
			</CustomMenu>
		</Pressable>
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
