import routes from "@/constant/routes";
import { WorkoutPlan } from "@/model/workoutModel";
import { RootState } from "@/redux/store";
import { workoutFormActions } from "@/redux/workoutFormReducer";
import { initializeWorkoutPlans } from "@/redux/workoutPlanReducer";
import { findAllPlansByCategory } from "@/service/planService";
import React, { useEffect } from "react";
import { Pressable, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { IconButton, useTheme } from "react-native-paper";
import uuid from "react-native-uuid";
import { useDispatch, useSelector } from "react-redux";
import { PlanSection } from "./PlanSection";

export const WorkoutPlansScreen = ({ navigation }) => {
	const id = uuid.v4().toString();
	const { colors } = useTheme();
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
			<ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
				<PlanSection
					sectionTitle="Your plans"
					value={workoutPlans.filter(
						(workoutPlan) => workoutPlan.custom === true
					)}
				/>
				<PlanSection
					sectionTitle="Gain Strength"
					value={workoutPlans.filter(
						(workoutPlan) => workoutPlan.mainGoal === "gain_strength"
					)}
				/>
				<PlanSection
					sectionTitle="Build Muscle"
					value={workoutPlans.filter(
						(workoutPlan) => workoutPlan.mainGoal === "build_muscle"
					)}
				/>
				<PlanSection
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
					style={{ backgroundColor: colors.primary }}
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
});
