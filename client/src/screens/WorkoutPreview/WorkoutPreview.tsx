import { WorkoutPlan } from "@/model/workoutModel";
import { RootState } from "@/redux/store";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import WorkoutExerciseCard from "./WorkoutExerciseCard";

const WorkoutPreview = ({ route, navigation }) => {
	const { id, workoutDayId } = route.params;
	const dispatch = useDispatch();

	const workoutPlans = useSelector<RootState, WorkoutPlan[]>(
		(s) => s.workoutPlan.workoutPlans
	);

	const workoutPlan = workoutPlans?.find((exercise) => exercise.id === id);

	const workoutDay = workoutPlan?.workoutDays[workoutDayId];

	const handleStartWorkout = () => {
		alert("not implemented");
		// dispatch(scheduleActions.startSchedule(workoutPlan));
		// navigation.navigate(routes.HOME);
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
