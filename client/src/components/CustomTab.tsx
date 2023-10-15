import React, { FC } from "react";
import { Pressable, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { theme } from "../constants/theme";

type Props = {
	onPress: () => void;
};

const CustomTab: FC<Props> = ({ onPress }) => {
	return (
		<Pressable style={styles.container} onPress={onPress}>
			<Text> Quick start your workout</Text>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 10,
		backgroundColor: theme.colors.backdrop,
	},
});

export default CustomTab;
