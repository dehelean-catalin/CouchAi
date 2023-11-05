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
		dispatch(
			activeWorkoutSessionActions.startWorkout({
				id: uuid.v4().toString(),
				name: "Workout on the fly",
				isComplete: false,
				startDate: Date.now(),
				endDate: null,
				workoutSessionExercises: [],
			})
		);
		navigation.navigate(routes.WORKOUT_SESION);
	};
	const closeWorkoutInProgress = (index: number) => {
		dispatch(activeWorkoutSessionActions.finishWorkout(index));
	};

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
						onPress={() => alert("not implemented")}
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
						name="Search for a workout"
						description=""
						onPress={() => alert("not implemented")}
					/>
					<HomeCard
						iconName="creation"
						name="Build your first workout"
						description=""
						onPress={() => alert("not implemented")}
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
