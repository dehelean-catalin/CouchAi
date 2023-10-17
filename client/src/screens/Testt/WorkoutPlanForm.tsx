import React, { memo, useContext, useRef, useState } from "react";
import { Animated, FlatList, StyleSheet, View } from "react-native";
import { IconButton } from "react-native-paper";
import { useDispatch } from "react-redux";
import CustomTextInput from "../../components/CustomTextInput";
import Pagination from "../../components/Pagination";
import WorkoutPlanFormContext from "../../context/WorkoutPlanFormContext";
import { WorkoutDay } from "../../models/workoutModel";
import { createWorkoutPlan } from "../../redux/workoutPlanReducer";
import WorkoutDayCard from "./WorkoutDayCard";

const WorkoutPlanForm = ({ navigation }) => {
	const dispatch = useDispatch();
	const [currentIndex, setCurrentIndex] = useState(0);
	const slides = useRef(null);
	const scrollX = useRef(new Animated.Value(0)).current;

	const viewabilityConfig = useRef({
		itemVisiblePercentThreshold: 50,
	}).current;

	// const onViewableItemsChanged = useRef(({ viewableItems }) => {
	// 	setCurrentIndex(viewableItems[0].index);
	// }).current;

	const { workoutPlan, setWorkoutName, createWorkoutDay } = useContext(
		WorkoutPlanFormContext
	);

	// useLayoutEffect(() => {
	// 	navigation.setOptions({
	// 		headerRight: () => <Button onPress={onSavePress}>Save</Button>,
	// 	});
	// }, [navigation, workoutPlan]);

	const onSavePress = () => {
		dispatch(createWorkoutPlan(workoutPlan));
		navigation.goBack();
	};
	console.log("update");
	const data = Object.values(workoutPlan.workoutDays);

	if (!workoutPlan) return <></>;

	return (
		<View style={styles.container}>
			<CustomTextInput
				placeholder="Workout name"
				value={workoutPlan.name}
				onChangeText={(n) => setWorkoutName(n)}
			/>
			<IconButton icon="plus" onPress={createWorkoutDay} />
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
				// onViewableItemsChanged={onViewableItemsChanged}
				ref={slides}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 10,
		flex: 1,
		gap: 10,
	},
});

export default memo(WorkoutPlanForm);
