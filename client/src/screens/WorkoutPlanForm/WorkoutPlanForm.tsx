import { theme } from "@/src/constants/theme";
import { RootState } from "@/src/redux/store";
import { workoutFormActions } from "@/src/redux/workoutFormReducer";
import React, { useLayoutEffect, useRef, useState } from "react";
import { Animated, FlatList, StyleSheet, View } from "react-native";
import { Button, IconButton, Text } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import CustomTextInput from "../../components/CustomTextInput";
import Pagination from "../../components/Pagination";
import { WorkoutDay, WorkoutPlan } from "../../models/workoutModel";
import { createWorkoutPlan } from "../../redux/workoutPlanReducer";
import DiscardChangesDialog from "./DiscardChangesDialog";
import WorkoutDayCard from "./WorkoutDayCard";

const WorkoutPlanForm = ({ navigation }) => {
	const dispatch = useDispatch();
	const workoutPlan = useSelector<RootState, WorkoutPlan>(
		(s) => s.workoutForm.workoutPlan
	);

	const [error, setError] = useState(false);

	const scrollX = useRef(new Animated.Value(0)).current;
	const viewabilityConfig = useRef({
		itemVisiblePercentThreshold: 100,
	}).current;

	const data = Object.values(workoutPlan.workoutDays);

	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => <Button onPress={onSavePress}>Save</Button>,
			headerLeft: () => (
				<IconButton
					style={styles.closeIcon}
					icon="close"
					onPress={() => dispatch(workoutFormActions.toggleDialog(true))}
				/>
			),
		});
	}, [navigation, workoutPlan]);

	const onSavePress = () => {
		if (!workoutPlan.name) {
			setError(true);
			return;
		}
		dispatch(createWorkoutPlan(workoutPlan));

		navigation.goBack();
	};

	if (!workoutPlan) return <></>;

	return (
		<View style={styles.container}>
			<View style={{ paddingBottom: 40 }}>
				<CustomTextInput
					placeholder="Workout name"
					value={workoutPlan.name}
					onChangeText={(name) => {
						if (!workoutPlan.name) {
							setError(false);
						}
						dispatch(workoutFormActions.setPlanName(name));
					}}
				/>
			</View>
			{error && <Text>Name is required</Text>}
			<View style={styles.formContainer}>
				<IconButton
					mode="contained-tonal"
					icon="plus"
					style={styles.icon}
					onPress={() => dispatch(workoutFormActions.addWorkoutToPlan())}
				/>
				<Pagination data={data} scrollX={scrollX} />
				<FlatList<WorkoutDay>
					data={data}
					renderItem={({ index, item }) => (
						<WorkoutDayCard index={index} item={item} />
					)}
					keyExtractor={(item) => item.id}
					horizontal
					showsHorizontalScrollIndicator={false}
					pagingEnabled
					bounces={false}
					onScroll={Animated.event(
						[{ nativeEvent: { contentOffset: { x: scrollX } } }],
						{ useNativeDriver: false }
					)}
					viewabilityConfig={viewabilityConfig}
				/>
			</View>
			<DiscardChangesDialog />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		gap: 10,
	},
	formContainer: {
		borderColor: theme.colors.surface,
		flex: 1,
		position: "relative",
	},
	icon: {
		position: "absolute",
		zIndex: 1,
		right: 10,
		top: -28,
	},
	closeIcon: {
		marginRight: 0,
	},
});

export default WorkoutPlanForm;
