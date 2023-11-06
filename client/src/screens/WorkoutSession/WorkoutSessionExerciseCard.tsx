import CustomMenu from "@/components/CustomMenu";
import routes from "@/constant/routes";
import { WorkoutSessionExercise } from "@/model/workoutSessionModel";
import { activeWorkoutSessionActions } from "@/redux/activeWorkoutSessionReducer";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { FC } from "react";
import {
	Pressable,
	StyleProp,
	StyleSheet,
	View,
	ViewStyle,
} from "react-native";
import { Menu, Text, useTheme } from "react-native-paper";
import { useDispatch } from "react-redux";

type Props = {
	id: string;
	index: number;
	value: WorkoutSessionExercise;
};

const WorkoutSessionExerciseCard: FC<Props> = ({ value, id, index }) => {
	const { colors } = useTheme();
	const { navigate } = useNavigation<StackNavigationProp<any>>();
	const dispatch = useDispatch();

	const completedSets = value.workoutSessionSets.filter(
		(set) => set.isComplete
	).length;

	const totalSets = value.workoutSessionSets.length;

	const handleNavigateToSessionSet = () =>
		navigate(routes.WORKOUT_SESSION_SET, { id, workoutId: value.id });

	const handleDelete = () => {
		dispatch(
			activeWorkoutSessionActions.deleteExercise({ id, exerciseId: value.id })
		);
	};

	const handleReplace = () =>
		navigate(routes.EXERCISE, {
			id,
			replaceExerciseId: value.id,
			session: true,
		});

	const chipStyle: StyleProp<ViewStyle> = [
		styles.chip,
		{
			borderColor: colors.outline,
			backgroundColor:
				totalSets !== completedSets ? colors.primaryContainer : colors.surface,
		},
	];

	return (
		<Pressable
			style={[styles.container, { borderColor: colors.surfaceVariant }]}
			onPress={handleNavigateToSessionSet}
		>
			<View style={chipStyle}>
				<Text>{index + 1}</Text>
			</View>
			<View style={{ flex: 1 }}>
				<Text>{value.exercise.name}</Text>
				<Text style={{ color: colors.outline }}>
					{completedSets}/{totalSets} sets completed
				</Text>
			</View>
			<CustomMenu>
				<Menu.Item title="Replace" onPress={handleReplace} />
				<Menu.Item title="Delete" onPress={handleDelete} />
			</CustomMenu>
		</Pressable>
	);
};

export default WorkoutSessionExerciseCard;

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		borderBottomWidth: 1,
		padding: 15,
		gap: 15,
		alignItems: "center",
	},
	chip: {
		borderRadius: 50,
		width: 42,
		height: 42,
		justifyContent: "center",
		alignItems: "center",
		borderWidth: 1,
	},
});
