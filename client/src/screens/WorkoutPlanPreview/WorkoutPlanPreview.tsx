import routes from "@/src/constants/routes";
import { theme } from "@/src/constants/theme";
import { scheduleActions } from "@/src/redux/scheduleReducer";
import React, { useLayoutEffect } from "react";
import {
	FlatList,
	ImageBackground,
	ScrollView,
	StyleSheet,
	View,
} from "react-native";
import { Button, Text } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";
import DefaultImage from "../../../assets/barbell.png";
import { WorkoutPlan } from "../../models/workoutModel";
import { RootState } from "../../redux/store";
import RightHeader from "./RightHeader";
import WokoutPlanPreviewCard from "./WokoutPlanPreviewCard";

const WorkoutPlanPreview = ({ navigation, route }) => {
	const { id } = route.params;
	const dispatch = useDispatch();

	const data = useSelector<RootState, WorkoutPlan[]>(
		(s) => s.workoutPlan.workoutPlans
	);

	const previewPlan = data.find((plan) => plan.id === id);
	const source = previewPlan.thumbnailURL
		? { uri: previewPlan.thumbnailURL }
		: DefaultImage;

	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => <RightHeader id={id} />,
		});
	}, [navigation, id]);

	const handleStartWorkout = () => {
		dispatch(scheduleActions.startSchedule(previewPlan));
		navigation.navigate(routes.HOME);
	};

	if (!previewPlan) return;

	return (
		<>
			<ScrollView style={styles.container}>
				<ImageBackground
					source={source}
					style={styles.imgContainer}
					imageStyle={{ height: 250 }}
					resizeMode="cover"
				>
					<Text variant="headlineSmall">{previewPlan.name}</Text>
					<Text variant="headlineSmall">{previewPlan.trainingLevel}</Text>
				</ImageBackground>
				<View style={styles.workoutsContainer}>
					{!!previewPlan.description && (
						<Text style={styles.description}>{previewPlan.description}</Text>
					)}
					{!!previewPlan.mainGoal && (
						<View style={styles.rowContainer}>
							<MaterialCommunityIcons name="trophy" color="#fff" size={26} />
							<Text>{previewPlan.mainGoal}</Text>
						</View>
					)}

					{!!previewPlan.daysPerWeek && (
						<View style={styles.rowContainer}>
							<MaterialCommunityIcons
								name="calendar-range"
								color="#fff"
								size={26}
							/>
							<Text>{previewPlan.daysPerWeek} days per week</Text>
						</View>
					)}

					<Text>Workouts</Text>
					<FlatList
						data={Object.values(previewPlan.workoutDays)}
						renderItem={({ item }) => (
							<WokoutPlanPreviewCard id={previewPlan.id} value={item} />
						)}
						keyExtractor={(item) => item.id}
						horizontal
						showsHorizontalScrollIndicator={false}
						ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
					/>
				</View>
			</ScrollView>
			<Button mode="contained" onPress={handleStartWorkout}>
				Start Workout Plan
			</Button>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	imgContainer: {
		height: 250,
		alignItems: "center",
		justifyContent: "center",
	},
	workoutsContainer: {
		flex: 1,
		gap: 20,
		paddingHorizontal: 15,
		paddingVertical: 20,
	},
	description: {
		textAlign: "center",
		paddingBottom: 20,
		borderBottomWidth: 1,
		borderBottomColor: theme.colors.surfaceDisabled,
	},
	rowContainer: {
		flexDirection: "row",
		gap: 15,
		alignItems: "center",
		paddingBottom: 15,
		borderBottomWidth: 1,
		borderBottomColor: theme.colors.surfaceDisabled,
	},
});

export default WorkoutPlanPreview;
