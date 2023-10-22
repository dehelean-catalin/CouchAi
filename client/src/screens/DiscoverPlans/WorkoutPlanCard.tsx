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
import routes from "../../constants/routes";
import { WorkoutPlan } from "../../models/workoutModel";

export const WorkoutPlanCard: FC<{ value: WorkoutPlan }> = ({ value }) => {
	const { navigate } = useNavigation<NativeStackNavigationProp<any>>();
	const { width: screenWidth } = useWindowDimensions();
	const minWidth = 260;
	const maxWidth = 400;

	const containerWidth = Math.min(
		Math.max(screenWidth * 0.6, minWidth),
		maxWidth
	);

	const openPreview = () => navigate(routes.WORKOUT_PREVIEW, { id: value.id });

	return (
		<ImageBackground
			source={{ uri: value.thumbnailURL ?? "https://picsum.photos/700" }}
			style={{
				width: containerWidth,
				aspectRatio: 16 / 9,
			}}
			imageStyle={styles.image}
		>
			<Pressable style={styles.container} onPress={openPreview}>
				<Text
					variant="titleMedium"
					numberOfLines={2}
					ellipsizeMode="tail"
					style={styles.text}
				>
					{value.name}
				</Text>
				{value.trainingLevel && (
					<Text variant="bodyMedium" style={styles.text}>
						{value.trainingLevel}
					</Text>
				)}
			</Pressable>
		</ImageBackground>
	);
};

const styles = StyleSheet.create({
	image: {
		borderRadius: 6,
	},
	container: {
		height: "100%",

		borderRadius: 6,
		padding: 16,
		display: "flex",
		justifyContent: "center",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	text: {
		textAlign: "center",
	},
});
