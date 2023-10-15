import React, { FC } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { WorkoutPlan } from "../models/workoutModel";
import PlanCard from "./PlanCard";

const ItemSeparator = () => <View style={styles.separator} />;

type Props = {
	sectionTitle: string;
	value: WorkoutPlan[];
};

const PlanSection: FC<Props> = ({ value, sectionTitle }) => {
	return (
		<View style={styles.container}>
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
				ItemSeparatorComponent={ItemSeparator}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginBottom: 15,
	},
	title: {
		marginBottom: 5,
	},
	separator: { width: 10 },
});

export default PlanSection;
