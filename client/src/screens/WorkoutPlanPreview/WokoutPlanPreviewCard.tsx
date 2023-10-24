import routes from "@/src/constants/routes";
import { theme } from "@/src/constants/theme";
import { WorkoutDay } from "@/src/models/workoutModel";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { FC } from "react";
import { Pressable, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

type Props = {
	id: string;
	value: WorkoutDay;
};

const WokoutPlanPreviewCard: FC<Props> = ({ value, id }) => {
	const { navigate } = useNavigation<NativeStackNavigationProp<any>>();

	const handlePress = () => {
		navigate(routes.WORKOUT_DAY_PREVIEW, { id, workoutDayId: value.id });
	};

	return (
		<Pressable style={styles.card} onPress={handlePress}>
			<Text>{value.name}</Text>
			<Text>{Object.values(value.workoutExercises).length} exercises</Text>
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
