import React, { useRef, useState } from "react";
import { Animated, FlatList, SafeAreaView, StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";
import { PlanItem } from "../models/planModels";
import DayCard from "./DayCard";
import Pagination from "./Pagination";

const Slider = () => {
	const [index, setIndex] = useState(0);
	const [slides, setSlides] = useState<PlanItem[]>([
		{
			id: new Date().getTime().toString(),
			name: "",
			exercises: [],
		},
	]);
	const scrollX = useRef(new Animated.Value(0)).current;

	const onAddItemPress = () => {
		const newItemPlan = {
			id: "lala",
			name: "",
			exercises: [],
		};
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

	const handleOnViewableItemsChanged = useRef(({ viewableItems }) => {
		setIndex(viewableItems[0].index);
	}).current;

	const viewabilityConfig = useRef({
		itemVisiblePercentThreshold: 50,
	}).current;

	return (
		<>
			<IconButton icon="plus" onPress={onAddItemPress} />
			<Pagination data={slides} scrollX={scrollX} index={index} />
			<SafeAreaView>
				<FlatList
					data={slides}
					renderItem={({ item, index: key }) => (
						<DayCard key={key} index={key} item={item} />
					)}
					style={{ marginHorizontal: "10px" }}
					horizontal
					pagingEnabled
					snapToAlignment="center"
					showsHorizontalScrollIndicator={false}
					onScroll={handleOnScroll}
					onViewableItemsChanged={handleOnViewableItemsChanged}
					viewabilityConfig={viewabilityConfig}
				/>
			</SafeAreaView>
		</>
	);
};

export default Slider;

const styles = StyleSheet.create({});
