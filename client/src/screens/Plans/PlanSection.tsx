import { WorkoutPlan } from "@/model/workoutModel";
import React, { FC, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Text } from "react-native-paper";
import { PlanCard } from "./PlanCard";

const ItemSeparator = () => <View style={styles.separator} />;

type Props = {
	sectionTitle: string;
	value: WorkoutPlan[];
};

export const PlanSection: FC<Props> = ({ value, sectionTitle }) => {
	const scrollX = useRef(new Animated.Value(0)).current;
	const viewabilityConfig = useRef({
		itemVisiblePercentThreshold: 100,
	}).current;

	if (!value.length) return <></>;

	return (
		<View style={{ flex: 1 }}>
			<Text variant="titleSmall" style={styles.title}>
				{sectionTitle}
			</Text>
			<FlatList
				data={value}
				renderItem={({ item }) => <PlanCard value={item} />}
				keyExtractor={(item) => item.id}
				horizontal
				pagingEnabled
				showsHorizontalScrollIndicator={false}
				bounces={false}
				onScroll={Animated.event(
					[{ nativeEvent: { contentOffset: { x: scrollX } } }],
					{ useNativeDriver: false }
				)}
				decelerationRate="fast"
				snapToAlignment="start"
				snapToInterval={200}
				viewabilityConfig={viewabilityConfig}
				ItemSeparatorComponent={ItemSeparator}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	title: {
		marginVertical: 15,
	},
	separator: { marginHorizontal: 10 },
});
