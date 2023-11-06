import routes from "@/constant/routes";
import { WorkoutPlan } from "@/model/workoutModel";
import {
	WorkoutSessionExercise,
	WorkoutSessionSet,
} from "@/model/workoutSessionModel";
import { activeWorkoutSessionActions } from "@/redux/activeWorkoutSessionReducer";
import { RootState } from "@/redux/store";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { FC } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
import uuid from "react-native-uuid";
import { useDispatch, useSelector } from "react-redux";
import WorkoutExerciseCard from "./WorkoutExerciseCard";

type Props = {
	navigation: StackNavigationProp<any>;
	route: any;
};

const WorkoutPreview: FC<Props> = ({ route, navigation }) => {
	const { id, workoutDayId } = route.params;
	const dispatch = useDispatch();

	const workoutPlan = useSelector<RootState, WorkoutPlan | undefined>(
		(s) => s.workoutPlan.workoutPlans[id]
	);

	const workoutDay = workoutPlan?.workoutDays[workoutDayId];

	const handleStartWorkout = () => {
		if (!workoutDay) return;

		const id = uuid.v4().toString();
		const startDate = new Date().getTime() / 1000;
		navigation.navigate(routes.WORKOUT_SESION, { id });

		let workoutSessionExercises: WorkoutSessionExercise[] = [];

		Object.values(workoutDay.workoutExercises).forEach((ex, index) => {
			let workoutSessionSets: WorkoutSessionSet[] = [];
			ex.workoutSets.forEach((workoutSet, index) => {
				const set: WorkoutSessionSet = {
					id: uuid.v4().toString(),
					isComplete: false,
					measurementUnit: "kg",
					oneRepMax: 0,
					reps: 0,
					weight: 0,
					restTime: workoutSet.restTime,
					set: index + 1,
					untilFailure: workoutSet.untilFailure,
					warmUp: workoutSet.warmUp,
					rir: workoutSet.rir,
				};
				workoutSessionSets.push(set);
			});

			workoutSessionExercises.push({
				id: uuid.v4().toString(),
				exercise: ex.exercise,
				workoutSessionSets,
				supersetExercises: [],
			});
		});

		dispatch(
			activeWorkoutSessionActions.startWorkout({
				id,
				name: workoutDay?.name,
				isComplete: false,
				startDate,
				endDate: null,
				workoutSessionExercises,
			})
		);
	};

	if (!workoutDay) return;

	return (
		<>
			<FlatList
				data={Object.values(workoutDay.workoutExercises)}
				renderItem={({ item }) => <WorkoutExerciseCard value={item} />}
				keyExtractor={(item) => item.id}
				showsVerticalScrollIndicator={false}
				ItemSeparatorComponent={() => <View style={{ marginVertical: 10 }} />}
			/>
			<Button style={styles.btn} mode="contained" onPress={handleStartWorkout}>
				Start Workout
			</Button>
		</>
	);
};

export default WorkoutPreview;

const styles = StyleSheet.create({
	btn: {
		paddingVertical: 5,
		borderRadius: 0,
	},
});
