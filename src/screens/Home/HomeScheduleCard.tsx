import routes from "@/constant/routes";
import { WorkoutDay } from "@/model/workoutModel";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { FC } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Chip, Text, useTheme } from "react-native-paper";

type Props = {
	value: WorkoutDay;
	index: number;
	id: string;
};

const HomeScheduleCard: FC<Props> = ({ value, id, index }) => {
	const { colors } = useTheme();
	const { navigate } = useNavigation<NativeStackNavigationProp<any>>();
	const numberOfExericises = Object.values(value).length;

	const handlePress = () =>
		navigate(routes.WORKOUT_DAY_PREVIEW, { id, workoutDayId: value.id });

	return (
		<Pressable
			style={[styles.container, { backgroundColor: colors.backdrop }]}
			onPress={handlePress}
		>
			<Chip
				style={[
					styles.chip,
					{
						backgroundColor: colors.primaryContainer,
					},
				]}
			>
				{index + 1}
			</Chip>
			<View>
				<Text variant="bodyLarge">{value.name}</Text>
				<Text>
					{numberOfExericises}
					{numberOfExericises == 1 ? " exercise" : " exercises"}
				</Text>
			</View>
		</Pressable>
	);
};

export default HomeScheduleCard;

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		gap: 15,
		padding: 15,
	},
	chip: {
		borderRadius: 50,
		aspectRatio: 1,
		borderWidth: 1,
		justifyContent: "center",
	},
});
