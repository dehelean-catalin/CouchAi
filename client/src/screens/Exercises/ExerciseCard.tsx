import routes from "@/constant/routes";
import { Exercise } from "@/model/exerciseModel";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { FC, memo } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useTheme } from "react-native-paper";
import ExerciseCheckBox from "./ExerciseCheckBox";

type CardModel = {
	data: Exercise;
	showCheckbox?: boolean;
};

const Card: FC<CardModel> = ({ data, showCheckbox }) => {
	const initialLetter = data.name.slice(0, 1).toUpperCase();
	const { colors } = useTheme();
	const { navigate } = useNavigation<NativeStackNavigationProp<any>>();

	const handlePress = () => {
		navigate(routes.EXERCISE_DETAILS, { id: data.id });
	};

	return (
		<Pressable style={styles.card} onPress={handlePress}>
			{!data.thumbnailUrl ? (
				<Image
					source={{
						uri: data.thumbnailUrl,
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
					{data.mainBodyPart[0].toUpperCase() + data.mainBodyPart.slice(1)}
				</Text>
			</View>
			<View style={styles.checkBoxContainer}>
				{showCheckbox && <ExerciseCheckBox data={data} />}
			</View>
		</Pressable>
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
		width: 80,
		height: 80,
	},
	imageContainer: {
		width: 80,
		height: 80,
		backgroundColor: "white",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	initial: {
		fontSize: 20,
		color: "gray",
	},
	checkBoxContainer: {
		justifyContent: "center",
		marginRight: 10,
	},
});

export default memo(Card);
