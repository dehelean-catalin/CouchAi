import React, { FC, useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import { IconButton, Menu, useTheme } from "react-native-paper";

const CustomMenu: FC<{ children: React.ReactNode[] | React.ReactNode }> = ({
	children,
}) => {
	const { colors } = useTheme();
	const [isVisible, setIsVisible] = useState(false);

	const onClose = () => setIsVisible(false);
	const onShow = () => setIsVisible(true);

	return (
		<Menu
			visible={isVisible}
			onDismiss={onClose}
			contentStyle={{ backgroundColor: colors.surfaceVariant }}
			anchor={
				<Pressable>
					<IconButton
						icon="dots-vertical"
						onPress={onShow}
						style={styles.icon}
					/>
				</Pressable>
			}
		>
			{children}
		</Menu>
	);
};

const styles = StyleSheet.create({ icon: { margin: 0 } });

export default CustomMenu;
