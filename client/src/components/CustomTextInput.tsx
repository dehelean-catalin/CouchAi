import React, { FC } from "react";
import { StyleProp, StyleSheet, TextStyle } from "react-native";
import { TextInput } from "react-native-paper";

type Props = {
	placeholder: string;
	value: string;
	style?: StyleProp<TextStyle>;
	onChangeText: (value: string) => void;
};

const CustomTextInput: FC<Props> = ({
	placeholder,
	value,
	onChangeText,
	style,
}) => {
	return (
		<TextInput
			style={style}
			placeholder={placeholder}
			mode="outlined"
			value={value}
			onChangeText={onChangeText}
		/>
	);
};
const styles = StyleSheet.create({});

export default CustomTextInput;
