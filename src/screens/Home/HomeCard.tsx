import React, { FC } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

type Props = {
	iconName: string;
	iconColor?: string;
	name: string;
	description: string;
	onPress: () => void;
	onClosePress?: () => void;
};

const HomeCard: FC<Props> = ({
	iconName,
	iconColor,
	name,
	description,
	onPress,
	onClosePress,
}) => {
	const { colors } = useTheme();

	const defaultColor = iconColor ? iconColor : colors.primaryContainer;
	return (
		<Pressable
			style={[styles.container, { backgroundColor: colors.backdrop }]}
			onPress={onPress}
		>
			<Icon
				name={iconName}
				color="white"
				style={[styles.icon, { backgroundColor: defaultColor }]}
				size={22}
			/>
			<View style={{ flex: 1 }}>
				<Text variant="bodyMedium">{name}</Text>
				<Text variant="bodyMedium" style={{ color: colors.outline }}>
					{description}
				</Text>
			</View>
			{onClosePress && (
				<Pressable onPress={onClosePress}>
					<Icon name="close" color="white" style={styles.icon} size={22} />
				</Pressable>
			)}
		</Pressable>
	);
};

export default HomeCard;

const styles = StyleSheet.create({
	container: { padding: 15, gap: 15, elevation: 2, flexDirection: "row" },
	icon: {
		borderRadius: 50,
		height: 40,
		width: 40,
		textAlignVertical: "center",
		textAlign: "center",
	},
});
