import { WorkoutSession } from "@/model/workoutSessionModel";
import { RootState } from "@/redux/store";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { FC, useLayoutEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import Counter from "../WorkoutSession/Counter";

type Props = {
	navigation: StackNavigationProp<any>;
	route: any;
};
const WorkoutSessionSetScreen: FC<Props> = ({ navigation, route }) => {
	const { id, workoutId } = route.params;
	const data = useSelector<RootState, WorkoutSession[]>(
		(s) => s.activeWorkoutSession.data
	);

	const workout = data.find((item) => item.id === id);

	useLayoutEffect(() => {
		if (!workout) return;
		const currentTimeInSeconds = new Date().getTime() / 1000;
		const startDate = Math.floor(currentTimeInSeconds - workout.startDate);

		navigation.setOptions({
			headerTitle: () => <Counter startDate={startDate} />,
		});
	}, [navigation]);

	return (
		<View>
			<Text>WorkoutSessionSetScreen</Text>
		</View>
	);
};

export default WorkoutSessionSetScreen;

const styles = StyleSheet.create({});
