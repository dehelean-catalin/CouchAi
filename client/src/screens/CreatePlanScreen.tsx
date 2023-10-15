import React, { useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
import uuid from "react-native-uuid";
import { useDispatch } from "react-redux";
import CustomTextInput from "../components/CustomTextInput";
import Slider from "../components/Slider";
import { WorkoutPlan } from "../models/workoutModel";
import { createWorkoutPlan } from "../redux/workoutPlanReducer";

export default function CreatePlanScreen({ navigation }) {
	const dispatch = useDispatch();

	const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan>({
		id: uuid.v4().toString(),
		name: "",
		thumbnailURL: "",
		description: "",
		workoutDays: [],
	});

	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => <Button onPress={onSavePress}>Save</Button>,
		});
	}, [navigation, workoutPlan]);

	const onSavePress = () => {
		dispatch(createWorkoutPlan(workoutPlan));
		navigation.goBack();
	};

	return (
		<View style={styles.container}>
			<CustomTextInput
				placeholder="Workout name"
				value={workoutPlan.name}
				onChangeText={(val) => {
					console.log(val);
					setWorkoutPlan({ ...workoutPlan, name: val });
				}}
			/>
			<Slider />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 10,
		height: "100%",
		gap: 20,
	},
});
