import { RootState } from "@/redux/store";
import { WorkoutPlanState } from "@/redux/workoutPlanReducer";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { IconButton, useTheme } from "react-native-paper";
import { useSelector } from "react-redux";
import routes from "../constants/routes";
import { AppTheme } from "../constants/theme";
import PlanSection from "./PlanScreen/PlanSection";

export default function PlansScreen({ navigation }) {
	const theme = useTheme<AppTheme>();
	const plans = useSelector<RootState, WorkoutPlanState>((s) => s.workoutPlan);

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
			<Pressable style={{ position: "absolute", bottom: 20, right: 0 }}>
				<IconButton
					icon="plus"
					iconColor="white"
					style={{
						backgroundColor: theme.colors.primary,
					}}
					size={30}
					onPress={() => navigation.navigate(routes.CREATE_PLAN)}
				/>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { height: "100%", marginHorizontal: 15 },
});
