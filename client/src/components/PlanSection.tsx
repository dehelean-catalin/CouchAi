import React from "react";
import { FlatList, SectionList, StyleSheet, Text, View } from "react-native";
import { SectionPlan } from "../services/planService";
import PlanCard from "./PlanCard";

const ItemSeparator = () => <View style={styles.separator} />;

export default function PlanSection({ value }: { value: SectionPlan[] }) {
	return (
		<SectionList
			sections={value}
			keyExtractor={(item) => item.id}
			renderSectionHeader={({ section }) => (
				<>
					<Text style={styles.text}>{section.title}</Text>
					<FlatList
						data={section.data}
						style={styles.list}
						renderItem={({ item }) => <PlanCard value={item} />}
						keyExtractor={(item) => item.id}
						horizontal
						pagingEnabled
						showsHorizontalScrollIndicator={false}
						ItemSeparatorComponent={ItemSeparator}
					/>
				</>
			)}
			renderItem={({ item }) => {
				return null;
			}}
			stickySectionHeadersEnabled={false}
		/>
	);
}

const styles = StyleSheet.create({
	list: { marginBottom: "15px" },
	text: {
		color: "#fff",
		fontSize: 16,
		marginBottom: "15px",
		alignContent: "center",
		fontWeight: "600",
	},
	separator: { width: "10px" },
});
