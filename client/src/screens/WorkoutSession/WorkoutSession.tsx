import routes from "@/constant/routes";
import { WorkoutSession } from "@/model/workoutSessionModel";
import { RootState } from "@/redux/store";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { FC, useLayoutEffect } from "react";
import { StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Button, useTheme } from "react-native-paper";
import { useSelector } from "react-redux";
import Counter from "./Counter";
import WorkoutSessionExerciseCard from "./WorkoutSessionExerciseCard";

type Props = {
	navigation: StackNavigationProp<any>;
	route: any;
};

const WorkoutSessionScreen: FC<Props> = ({ navigation, route }) => {
	const { id } = route.params;
	const { colors } = useTheme();
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

	if (!workoutInProgress) return;

	return (
		<>
			<FlatList
				data={workoutInProgress.workoutSessionExercises}
				renderItem={({ item, index }) => (
					<WorkoutSessionExerciseCard id={id} index={index} value={item} />
				)}
				keyExtractor={(item) => item.id}
			/>
			<Button
				style={{
					paddingVertical: 5,
					borderRadius: 0,
				}}
				mode="contained"
				onPress={handleAddExercises}
			>
				ADD EXERCISES
			</Button>
		</>
	);
};

export default WorkoutSessionScreen;

const styles = StyleSheet.create({});
