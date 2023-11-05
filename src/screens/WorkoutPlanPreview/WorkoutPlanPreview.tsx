import routes from "@/constant/routes";
import { WorkoutPlan } from "@/model/workoutModel";
import { scheduleActions } from "@/redux/scheduleReducer";
import React, { useLayoutEffect } from "react";
import {
	FlatList,
	ImageBackground,
	ScrollView,
	StyleSheet,
	View,
} from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";
import DefaultImage from "../../../assets/barbell.png";
import { RootState } from "../../redux/store";
import RightHeader from "./RightHeader";
import WokoutPlanPreviewCard from "./WokoutPlanPreviewCard";

const WorkoutPlanPreview = ({ navigation, route }) => {
	const { id } = route.params;
	const { colors } = useTheme();
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
						<Text
							style={[
								styles.description,
								{ borderBottomColor: colors.surfaceDisabled },
							]}
						>
							{previewPlan.description}
						</Text>
					)}
					{!!previewPlan.mainGoal && (
						<View
							style={[
								styles.rowContainer,
								{ borderBottomColor: colors.surfaceDisabled },
							]}
						>
							<MaterialCommunityIcons name="trophy" color="#fff" size={26} />
							<Text>{previewPlan.mainGoal}</Text>
						</View>
					)}

					{!!previewPlan.daysPerWeek && (
						<View
							style={[
								styles.rowContainer,
								{ borderBottomColor: colors.surfaceDisabled },
							]}
						>
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
			<Button style={styles.btn} mode="contained" onPress={handleStartWorkout}>
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
	},
	rowContainer: {
		flexDirection: "row",
		gap: 15,
		alignItems: "center",
		paddingBottom: 15,
		borderBottomWidth: 1,
	},
	btn: {
		paddingVertical: 5,
		borderRadius: 0,
	},
});

export default WorkoutPlanPreview;
