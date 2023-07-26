import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Divider, IconButton, Menu, useTheme } from "react-native-paper";

export default function PaperMenu({ options }) {
	const { colors } = useTheme();
	const [isVisible, setIsVisible] = useState(false);

	const onClose = () => setIsVisible(false);
	const onShow = () => setIsVisible(true);

	return (
		<Menu
			visible={isVisible}
			onDismiss={onClose}
			contentStyle={{ backgroundColor: colors.tertiaryContainer }}
			anchor={
				<TouchableOpacity>
					<IconButton icon="dots-vertical" onPress={onShow} />
				</TouchableOpacity>
			}
		>
			{options.map((option, index) => (
				<View key={index}>
					<Menu.Item onPress={option.action} title={option.title} />
					{index === options.length - 2 && <Divider />}
				</View>
			))}
		</Menu>
	);
}

const styles = StyleSheet.create({});
