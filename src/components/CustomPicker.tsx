import { Picker } from "@react-native-picker/picker";
import {} from "@react-navigation/native";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";

export const CustomPicker = ({
	selectedValue,
	onValueChange,
	items,
	label,
}) => {
	const { colors } = useTheme();
	return (
		<View>
			<Text variant="bodyMedium">{label}</Text>
			<Picker
				style={[
					styles.picker,
					{
						backgroundColor: colors.background,
						borderBottomColor: colors.backdrop,
					},
				]}
				dropdownIconColor="#fff"
				selectedValue={selectedValue}
				onValueChange={onValueChange}
			>
				{items.map((opt) => (
					<Picker.Item
						key={opt}
						label={opt.split("_").join(" ")}
						value={opt.split("_").join(" ")}
					/>
				))}
			</Picker>
		</View>
	);
};

const styles = StyleSheet.create({
	picker: {
		borderWidth: 0,
		borderBottomWidth: 1,
		color: "#fff",
		width: "60%",
		padding: 10,
	},
});
