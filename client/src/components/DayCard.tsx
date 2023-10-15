import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import { Button, Text } from "react-native-paper";
import routes from "../constants/routes";
import { PlanItem } from "../models/planModels";
type Props = {
	item: PlanItem;
	index: number;
};

export default function DayCard({ item, index }: Props) {
	const { navigate } = useNavigation<NativeStackNavigationProp<any>>();

	const [value, setValue] = useState("");
	const { width } = useWindowDimensions();

	const options = [
		{ title: "Reorder", action: () => console.log("action") },
		{ title: "Duplicate", action: () => console.log("action") },
		{ title: "Delete", action: () => console.log("action") },
	];

	return (
		<View style={{ width: width - 20 }}>
			{/* <View
				style={{
					backgroundColor: colors.surfaceVariant,
					alignItems: "center",
					flexDirection: "row",
					width: "100%",
				}}
			>
				<Chip style={{ backgroundColor: colors.primary }}>{index + 1}</Chip>
				<TextInput
					value={value}
					style={{ height: 30 }}
					onChangeText={setValue}
					contentStyle={{ color: colors.onSurfaceVariant, height: 30 }}
					activeUnderlineColor="transparent"
					placeholder="Workout name"
					placeholderTextColor="gray"
				/>
				<PaperMenu options={options} />
			</View> */}

			<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
				<Text>Add exercises to your workout</Text>
			</View>
			<Button
				onPress={() => navigate(routes.EXERCISE, { fromCreateWorkout: true })}
			>
				Add exercise
			</Button>
		</View>
	);
}

const styles = StyleSheet.create({});
