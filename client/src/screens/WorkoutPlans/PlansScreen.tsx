import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { IconButton } from "react-native-paper";
import uuid from "react-native-uuid";
import { useDispatch, useSelector } from "react-redux";
import routes from "../../constants/routes";
import { theme } from "../../constants/theme";
import { RootState } from "../../redux/store";
import { workoutFormActions } from "../../redux/workoutFormReducer";
import { WorkoutPlanState } from "../../redux/workoutPlanReducer";
import PlanSection from "../PlanSection";

const PlansScreen = ({ navigation }) => {
	const id = uuid.v4().toString();
	const dispatch = useDispatch();
	const plans = useSelector<RootState, WorkoutPlanState>((s) => s.workoutPlan);

	const onCreatePlanPress = () => {
		dispatch(workoutFormActions.initializeWorkout());
		navigation.navigate(routes.CREATE_PLAN, { id });
	};

	return (
		<View style={styles.container}>
			<PlanSection
				sectionTitle="Your plans"
				value={Object.values(plans.savedWorkoutPlans)}
			/>
			<PlanSection
				sectionTitle="Intermediate"
				value={Object.values(plans.workoutPlans)}
			/>
			<Pressable style={styles.icon}>
				<IconButton
					icon="plus"
					iconColor="white"
					style={styles.iconBtn}
					size={30}
					onPress={onCreatePlanPress}
				/>
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	container: { height: "100%", marginHorizontal: 15 },
	icon: { position: "absolute", bottom: 20, right: 0 },
	iconBtn: { backgroundColor: theme.colors.primary },
});

export default PlansScreen;
