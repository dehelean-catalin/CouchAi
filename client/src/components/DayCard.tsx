import React, { useState } from "react";
import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import { Card, Chip, TextInput, useTheme } from "react-native-paper";
import { AppTheme } from "../constants/theme";
import { PlanItem } from "../models/planModels";
import PaperMenu from "./PaperMenu";
type Props = {
	item: PlanItem;
	index: number;
};

export default function DayCard({ item, index }: Props) {
	const { colors } = useTheme<AppTheme>();
	const [value, setValue] = useState("");
	const options = [
		{ title: "Reorder", action: () => console.log("action") },
		{ title: "Duplicate", action: () => console.log("action") },
		{ title: "Delete", action: () => console.log("action") },
	];
	const { width } = useWindowDimensions();
	return (
		<View style={{ backgroundColor: "yellow", flex: 1 }}>
			<Card.Title
				style={{
					backgroundColor: colors.surfaceVariant,
					width: width - 20,
					minHeight: 60,
				}}
				title={
					<TextInput
						value={value}
						style={{ height: 30 }}
						onChangeText={(e) => setValue(e)}
						contentStyle={{ color: colors.onSurfaceVariant, height: 30 }}
						activeUnderlineColor="transparent"
						placeholder={`Add workout name`}
						placeholderTextColor="gray"
					/>
				}
				left={() => (
					<Chip style={{ backgroundColor: colors.primary }}>{index + 1}</Chip>
				)}
				right={() => <PaperMenu options={options} />}
			/>
			<Card.Content>
				<Text>Lorem ipsum dolor sit amet,</Text>
			</Card.Content>
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		flex: 1,
		backgroundColor: "yellow",
		elevation: 5,
	},
});
