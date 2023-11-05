import React, { FC } from "react";
import { StyleProp, TextStyle } from "react-native";
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

export default CustomTextInput;
