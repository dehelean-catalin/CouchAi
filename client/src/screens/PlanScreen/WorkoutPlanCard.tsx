import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { FC } from "react";
import {
	ImageBackground,
	Pressable,
	StyleSheet,
	Text,
	useWindowDimensions,
} from "react-native";
import routes from "../../constants/routes";
import { WorkoutPlan } from "../../models/workoutModel";

const WorkoutPlanCard: FC<{ value: WorkoutPlan }> = ({ value }) => {
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
			source={{ uri: "https://picsum.photos/700" }}
			style={{
				width: containerWidth,
				aspectRatio: 16 / 9,
			}}
			imageStyle={styles.image}
		>
			<Pressable style={styles.container} onPress={openPreview}>
				<Text numberOfLines={2} ellipsizeMode="tail" style={styles.text}>
					{value.name}
				</Text>
			</Pressable>
		</ImageBackground>
	);
};

export default WorkoutPlanCard;

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
		color: "white",
		fontWeight: "600",
		fontSize: 18,
	},
});
