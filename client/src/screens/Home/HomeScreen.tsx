import { customColors } from "@/src/constants/theme";
import { WorkoutPlan } from "@/src/models/workoutModel";
import { RootState } from "@/src/redux/store";
import React from "react";
import { StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Text } from "react-native-paper";
import { useSelector } from "react-redux";
import routes from "../../constants/routes";
import ScheduleCard from "./ScheduleCard";

export default function HomeScreen({ navigation }) {
	const data = useSelector<RootState, WorkoutPlan>((s) => s.schedule.data);
	const startEmptyWorkout = () => {
		navigation.navigate(routes.WORKOUT_SESION);
	};

	return (
		<View style={styles.container}>
			{data && (
				<>
					<Text variant="titleSmall">My Workout Plan</Text>
					<Text style={styles.workoutName}>{data.name}</Text>
					<FlatList
						data={Object.values(data.workoutDays)}
						renderItem={({ item, index }) => (
							<ScheduleCard index={index} value={item} />
						)}
						keyExtractor={(item) => item.id}
						style={styles.listContainer}
						ItemSeparatorComponent={() => (
							<View style={{ paddingVertical: 10 }} />
						)}
					/>
				</>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 15,
	},
	listContainer: {
		marginVertical: 15,
	},
	workoutName: {
		color: customColors.textSecondary,
	},
});
