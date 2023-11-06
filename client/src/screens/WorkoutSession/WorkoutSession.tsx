import routes from "@/constant/routes";
import { WorkoutSession } from "@/model/workoutSessionModel";
import { RootState } from "@/redux/store";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { FC, useLayoutEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { useSelector } from "react-redux";
import Counter from "./Counter";

type Props = {
	navigation: StackNavigationProp<any>;
	route: any;
};

const WorkoutSessionScreen: FC<Props> = ({ navigation, route }) => {
	const { id } = route.params;
	const data = useSelector<RootState, WorkoutSession[]>(
		(s) => s.activeWorkoutSession.data
	);

	const workoutInProgress = data.find((workout) => workout.id === id);

	useLayoutEffect(() => {
		if (workoutInProgress?.startDate) {
			const currentTimeInSeconds = new Date().getTime() / 1000;
			const startDate = Math.floor(
				currentTimeInSeconds - workoutInProgress.startDate
			);

			navigation.setOptions({
				headerRight: () => <Button>FINISH</Button>,
				headerTitle: () => <Counter startDate={startDate} />,
			});
		}
	}, [navigation]);

	const handleAddExercises = () => {
		navigation.navigate(routes.EXERCISE, {
			id: route?.params?.id,
			session: true,
		});
	};

	return (
		<View>
			<Text>WorkoutSession</Text>

			<Button onPress={handleAddExercises}>ADD EXERCISES</Button>
		</View>
	);
};

export default WorkoutSessionScreen;

const styles = StyleSheet.create({});
