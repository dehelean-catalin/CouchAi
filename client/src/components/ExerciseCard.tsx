import React, { FC } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useTheme } from "react-native-paper";
import { AppTheme } from "../constants/theme";
import { Exercise } from "../models/exerciseModels";

const Card: FC<{ data: Exercise }> = ({ data }) => {
	const initialLetter = data.name.slice(0, 1).toUpperCase();
	const { colors } = useTheme<AppTheme>();

	return (
		<View style={styles.card}>
			{!!data.picture ? (
				<Image
					source={{
						uri: data.picture,
					}}
					style={styles.tinyLogo}
				/>
			) : (
				<View style={styles.imageContainer}>
					<Text style={styles.initial}>{initialLetter}</Text>
				</View>
			)}
			<View style={styles.column}>
				<Text style={styles.title}>{data.name}</Text>
				<Text style={[styles.content, { color: colors.primary }]}>
					{data.targetMuscle}
				</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	card: {
		display: "flex",
		flexDirection: "row",
		gap: 16,
		borderBottomColor: "gray",
		borderBottomWidth: 1,
	},
	title: { color: "white", fontSize: 16 },
	content: {
		color: "white",
		marginTop: 2,
		fontSize: 14,
	},
	column: {
		flex: 1,
		justifyContent: "center",
	},
	tinyLogo: {
		width: 70,
		height: 70,
	},
	imageContainer: {
		width: 70,
		height: 70,
		backgroundColor: "white",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	initial: {
		fontSize: 20,
		color: "gray",
	},
});

export default Card;
