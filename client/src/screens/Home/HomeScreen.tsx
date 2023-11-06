import routes from "@/constant/routes";
import { WorkoutPlan } from "@/model/workoutModel";
import { RootState } from "@/redux/store";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Text } from "react-native-paper";

import { WorkoutSession } from "@/model/workoutSessionModel";
import { activeWorkoutSessionActions } from "@/redux/activeWorkoutSessionReducer";
import { workoutFormActions } from "@/redux/workoutFormReducer";
import uuid from "react-native-uuid";
import { useDispatch, useSelector } from "react-redux";
import HomeCard from "./HomeCard";
import HomeScheduleCard from "./HomeScheduleCard";

type Props = {
	navigation: StackNavigationProp<any>;
};

export default function HomeScreen({ navigation }: Props) {
	const dispatch = useDispatch();

	const data = useSelector<RootState, WorkoutPlan | null>(
		(s) => s.schedule.data
	);

	const activeWorkoutSession = useSelector<RootState, WorkoutSession[]>(
		(s) => s.activeWorkoutSession.data
	);

	const startEmptyWorkout = () => {
		const id = uuid.v4().toString();
		const startDate = new Date().getTime() / 1000;
		navigation.navigate(routes.WORKOUT_SESION, { id });

		dispatch(
			activeWorkoutSessionActions.startWorkout({
				id,
				name: "Workout on the fly",
				isComplete: false,
				startDate,
				endDate: null,
				workoutSessionExercises: [],
			})
		);
	};

	const onFindWorkoutPress = () =>
		navigation.navigate("Plans", { screen: routes.PLAN });

	const onCreateWorkoutPress = () => {
		const id = uuid.v4().toString();
		dispatch(workoutFormActions.initializeWorkout());
		navigation.navigate(routes.CREATE_PLAN, { id });
	};

	const closeWorkoutInProgress = (index: number) => {
		dispatch(activeWorkoutSessionActions.finishWorkout(index));
	};

	const handleResumeWorkout = (id: string) =>
		navigation.navigate(routes.WORKOUT_SESION, { id });

	return (
		<View style={styles.container}>
			<FlatList
				data={activeWorkoutSession}
				renderItem={({ item, index }) => (
					<HomeCard
						iconName="run"
						iconColor="#ffaf23"
						name="Workout in progress"
						description={item.name}
						onPress={() => handleResumeWorkout(item.id)}
						onClosePress={() => closeWorkoutInProgress(index)}
					/>
				)}
				keyExtractor={(item) => item.id}
				ItemSeparatorComponent={() => <View style={{ paddingVertical: 10 }} />}
			/>

			{data ? (
				<View>
					<Text variant="titleSmall">My Workout Plan</Text>
					<Text>{data.name}</Text>
					<FlatList
						data={Object.values(data.workoutDays)}
						renderItem={({ item, index }) => (
							<HomeScheduleCard id={data.id} index={index} value={item} />
						)}
						keyExtractor={(item) => item.id}
						style={styles.listContainer}
						ItemSeparatorComponent={() => (
							<View style={{ paddingVertical: 10 }} />
						)}
					/>
				</View>
			) : (
				<>
					<HomeCard
						iconName="magnify"
						name="Find a workout plan"
						description="Find a workout plan that meets your fitness goals"
						onPress={onFindWorkoutPress}
					/>
					<HomeCard
						iconName="creation"
						iconColor="#0288d1"
						name="Build a workout plan"
						description="Create your personalized workout plan"
						onPress={onCreateWorkoutPress}
					/>
				</>
			)}
			<Text variant="titleSmall">Quick start</Text>
			<HomeCard
				iconName="dumbbell"
				name="Start logging a workout"
				description="Start a workout and add exercises as you go"
				onPress={startEmptyWorkout}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 15,
		gap: 15,
	},
	listContainer: {
		marginVertical: 15,
	},
	icon: {},
});
