import React, { useRef, useState } from "react";
import { Animated, FlatList, StyleSheet, View } from "react-native";
import { IconButton } from "react-native-paper";
import uuid from "react-native-uuid";
import { PlanItem } from "../models/planModels";
import DayCard from "./DayCard";
import Pagination from "./Pagination";

const Slider = () => {
	const scrollX = useRef(new Animated.Value(0)).current;

	const handleOnViewableItemsChanged = useRef(({ viewableItems }) => {
		setIndex(viewableItems[0].index);
	}).current;

	const viewabilityConfig = useRef({
		itemVisiblePercentThreshold: 10,
		waitForInteraction: true,
		viewAreaCoveragePercentThreshold: 10,
	}).current;

	const [index, setIndex] = useState(0);
	const [slides, setSlides] = useState<PlanItem[]>([
		{
			id: uuid.v4().toString(),
			name: "",
			exercises: [],
		},
	]);

	const newItemPlan = {
		id: uuid.v4().toString(),
		name: "",
		exercises: [],
	};

	const onAddItemPress = () => {
		setSlides([...slides, newItemPlan]);
	};

	const handleOnScroll = (event) => {
		Animated.event(
			[
				{
					nativeEvent: {
						contentOffset: {
							x: scrollX,
						},
					},
				},
			],
			{
				useNativeDriver: false,
			}
		)(event);
	};

	const renderItem = ({ item, index }) => <DayCard index={index} item={item} />;

	return (
		<View style={styles.container}>
			<IconButton icon="plus" onPress={onAddItemPress} />
			<Pagination data={slides} scrollX={scrollX} index={index} />
			<FlatList
				data={slides}
				renderItem={renderItem}
				keyExtractor={(item) => item.id}
				horizontal
				onScroll={handleOnScroll}
				pagingEnabled
				bounces={false}
				viewabilityConfig={viewabilityConfig}
				showsHorizontalScrollIndicator={false}
			/>
		</View>
	);
};

export default Slider;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
