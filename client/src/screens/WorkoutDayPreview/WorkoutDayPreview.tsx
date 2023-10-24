import routes from "@/src/constants/routes";
import { WorkoutPlan } from "@/src/models/workoutModel";
import { scheduleActions } from "@/src/redux/scheduleReducer";
import { RootState } from "@/src/redux/store";
import React from "react";
import { FlatList, View } from "react-native";
import { Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import WorkoutExerciseCard from "./WorkoutExerciseCard";

const WorkoutDayPreview = ({ route, navigation }) => {
	const { id, workoutDayId } = route.params;
	const dispatch = useDispatch();

	const workoutPlans = useSelector<RootState, WorkoutPlan[]>(
		(s) => s.workoutPlan.workoutPlans
	);

	const workoutPlan = workoutPlans?.find((exercise) => exercise.id === id);

	const workoutDay = workoutPlan?.workoutDays[workoutDayId];

	const handleStartWorkout = () => {
		dispatch(scheduleActions.startSchedule(workoutPlan));
		navigation.navigate(routes.HOME);
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
			<Button mode="contained" onPress={handleStartWorkout}>
				Start Workout Plan
			</Button>
		</>
	);
};

export default WorkoutDayPreview;
