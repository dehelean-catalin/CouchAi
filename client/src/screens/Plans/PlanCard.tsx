import routes from "@/constant/routes";
import { WorkoutPlan } from "@/model/workoutModel";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { FC } from "react";
import {
	ImageBackground,
	Pressable,
	StyleSheet,
	useWindowDimensions,
} from "react-native";
import { Text } from "react-native-paper";
import defaultImage from "../../../assets/barbell.png";

export const PlanCard: FC<{ value: WorkoutPlan }> = ({ value }) => {
	const { navigate } = useNavigation<NativeStackNavigationProp<any>>();
	const { height: screenHeight } = useWindowDimensions();
	const minWidth = 220;
	const maxWidth = 400;

	const containerWidth = Math.min(
		Math.max(screenHeight * 0.4, minWidth),
		maxWidth
	);

	const source = !!value.thumbnailURL
		? {
				uri: value.thumbnailURL,
		  }
		: defaultImage;

	const openPreview = () => navigate(routes.WORKOUT_PREVIEW, { id: value.id });

	return (
		<Pressable onPress={openPreview}>
			<ImageBackground
				source={source}
				style={[
					styles.imageContainer,
					{
						width: containerWidth,
					},
				]}
				imageStyle={{ borderRadius: 6 }}
			>
				<Text
					variant="titleMedium"
					numberOfLines={2}
					ellipsizeMode="tail"
					style={styles.text}
				>
					{value.name}
				</Text>
				{!!value.trainingLevel && (
					<Text variant="bodyMedium" style={styles.text}>
						{value.trainingLevel}
					</Text>
				)}
			</ImageBackground>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	imageContainer: {
		aspectRatio: 16 / 9,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "rgba(0, 0, 0, 0.4)",
		borderRadius: 6,
	},

	text: {
		textAlign: "center",
		color: "#fff",
		marginBottom: 5,
		backgroundColor: "rgba(0, 0, 0, 0.2)",
	},
});
