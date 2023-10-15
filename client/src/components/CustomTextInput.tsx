import React, { FC } from "react";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";

type Props = {
	placeholder: string;
	value: string;
	onChangeText: (value: string) => void;
};

const CustomTextInput: FC<Props> = ({ placeholder, value, onChangeText }) => {
	return (
		<TextInput
			placeholder={placeholder}
			mode="outlined"
			value={value}
			onChangeText={onChangeText}
		/>
	);
};
const styles = StyleSheet.create({});

export default CustomTextInput;
