import routes from "@/src/constants/routes";
import { scheduleActions } from "@/src/redux/scheduleReducer";
import React, { useLayoutEffect } from "react";
import { FlatList, ImageBackground, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import DefaultImage from "../../../assets/barbell.png";
import { WorkoutPlan } from "../../models/workoutModel";
import { RootState } from "../../redux/store";
import RightHeader from "./RightHeader";
import WokoutPlanPreviewCard from "./WokoutPlanPreviewCard";

const WorkoutPlanPreview = ({ navigation, route }) => {
	const { id } = route.params;
	const dispatch = useDispatch();

	const customPLanData = useSelector<RootState, WorkoutPlan>(
		(s) => s.workoutPlan.savedWorkoutPlans[id]
	);

	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => <RightHeader id={id} />,
		});
	}, [navigation, id]);

	const handleStartWorkout = () => {
		dispatch(scheduleActions.startSchedule(customPLanData));
		navigation.navigate(routes.HOME);
	};

	if (!customPLanData) return;

	return (
		<View style={styles.container}>
			<ImageBackground
				source={
					customPLanData.thumbnailURL
						? { uri: customPLanData.thumbnailURL }
						: DefaultImage
				}
				style={styles.imgContainer}
				imageStyle={{ height: 250 }}
				resizeMode="cover"
			>
				<Text variant="headlineSmall">{customPLanData.name}</Text>
			</ImageBackground>
			<View style={styles.workoutsContainer}>
				<Text>Workouts</Text>
				<FlatList
					data={Object.values(customPLanData.workoutDays)}
					renderItem={({ item }) => <WokoutPlanPreviewCard value={item} />}
					keyExtractor={(item) => item.id}
					horizontal
					ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
				/>
				<Button mode="contained" onPress={handleStartWorkout}>
					Start Plan
				</Button>
			</View>
		</View>
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
		gap: 10,
		paddingHorizontal: 10,
		paddingVertical: 20,
	},
});

export default WorkoutPlanPreview;
