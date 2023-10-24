import { WorkoutPlan } from "@/src/models/workoutModel";
import { findAllPlansByCategory } from "@/src/services/planService";
import React, { useEffect } from "react";
import { Pressable, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { IconButton } from "react-native-paper";
import uuid from "react-native-uuid";
import { useDispatch, useSelector } from "react-redux";
import routes from "../../constants/routes";
import { theme } from "../../constants/theme";
import { RootState } from "../../redux/store";
import { workoutFormActions } from "../../redux/workoutFormReducer";
import { initializeWorkoutPlans } from "../../redux/workoutPlanReducer";
import { WorkoutPlanSection } from "./WorkoutPlanSection";

export const WorkoutPlansScreen = ({ navigation }) => {
	const id = uuid.v4().toString();
	const dispatch = useDispatch();
	const workoutPlans = useSelector<RootState, WorkoutPlan[]>(
		(s) => s.workoutPlan.workoutPlans
	);

	useEffect(() => {
		if (!workoutPlans.length) {
			findAllPlansByCategory().then((res) => {
				dispatch(initializeWorkoutPlans(res.data));
			});
		}
	}, []);

	const onCreatePlanPress = () => {
		dispatch(workoutFormActions.initializeWorkout());
		navigation.navigate(routes.CREATE_PLAN, { id });
	};

	return (
		<>
			<ScrollView
				showsHorizontalScrollIndicator={false}
				style={styles.container}
			>
				<WorkoutPlanSection
					sectionTitle="Your plans"
					value={workoutPlans.filter(
						(workoutPlan) => workoutPlan.custom === true
					)}
				/>
				<WorkoutPlanSection
					sectionTitle="Gain Strength"
					value={workoutPlans.filter(
						(workoutPlan) => workoutPlan.mainGoal === "gain_strength"
					)}
				/>
				<WorkoutPlanSection
					sectionTitle="Build Muscle"
					value={workoutPlans.filter(
						(workoutPlan) => workoutPlan.mainGoal === "build_muscle"
					)}
				/>
				<WorkoutPlanSection
					sectionTitle="Lose Fat"
					value={workoutPlans.filter(
						(workoutPlan) => workoutPlan.mainGoal == "lose_fat"
					)}
				/>
			</ScrollView>
			<Pressable style={styles.icon}>
				<IconButton
					icon="plus"
					iconColor="white"
					style={styles.iconBtn}
					size={30}
					onPress={onCreatePlanPress}
				/>
			</Pressable>
		</>
	);
};

const styles = StyleSheet.create({
	container: { height: "100%", marginHorizontal: 15, marginBottom: 20 },
	icon: { position: "absolute", bottom: 0, right: 15 },
	iconBtn: { backgroundColor: theme.colors.primary },
});
