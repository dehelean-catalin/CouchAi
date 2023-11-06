import { WorkoutDay, WorkoutPlan } from "@/model/workoutModel";
import { RootState } from "@/redux/store";
import { workoutFormActions } from "@/redux/workoutFormReducer";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { FC, useLayoutEffect, useRef, useState } from "react";
import { Animated, FlatList, StyleSheet, View } from "react-native";
import { Button, IconButton, Text, useTheme } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import CustomTextInput from "../../components/CustomTextInput";
import { createWorkoutPlan } from "../../redux/workoutPlanReducer";
import DiscardChangesDialog from "./DiscardChangesDialog";
import Pagination from "./Pagination";
import { WorkoutDayCard } from "./WorkoutDayCard";

type Props = {
	navigation: StackNavigationProp<any>;
};

export const WorkoutPlanForm: FC<Props> = ({ navigation }) => {
	const { colors } = useTheme();
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
		console.log(workoutPlan);
		dispatch(createWorkoutPlan(workoutPlan));
		dispatch(workoutFormActions.clearState());

		navigation.goBack();
	};

	if (!workoutPlan) return <></>;

	return (
		<View style={styles.container}>
			<View style={{ marginBottom: 40 }}>
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
			<View
				style={[styles.formContainer, { backgroundColor: colors.backdrop }]}
			>
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
					style={{ flex: 1 }}
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
