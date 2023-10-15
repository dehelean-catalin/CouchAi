import { Picker } from "@react-native-picker/picker";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { theme } from "../constants/theme";

export const CustomPicker = ({
	selectedValue,
	onValueChange,
	items,
	label,
}) => {
	return (
		<View>
			<Text variant="bodyMedium">{label}</Text>
			<Picker
				style={styles.picker}
				dropdownIconColor="#000"
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
		backgroundColor: theme.colors.background,
		borderWidth: 0,
		borderBottomWidth: 1,
		borderBottomColor: theme.colors.backdrop,
		color: "#fff",
		width: "60%",
		padding: 10,
	},
});
