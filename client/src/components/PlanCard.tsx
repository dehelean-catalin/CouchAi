import { WorkoutPlan } from "@/models/workoutModel";
import React from "react";
import {
	ImageBackground,
	StyleSheet,
	Text,
	View,
	useWindowDimensions,
} from "react-native";

export default function PlanCard({ value }: { value: WorkoutPlan }) {
	const { width: screenWidth } = useWindowDimensions();
	const minWidth = 260;
	const maxWidth = 400;

	const containerWidth = Math.min(
		Math.max(screenWidth * 0.6, minWidth),
		maxWidth
	);

	return (
		<ImageBackground
			source={{ uri: "https://picsum.photos/700" }}
			style={{
				width: containerWidth,
				aspectRatio: 16 / 9,
			}}
			imageStyle={styles.image}
		>
			<View style={styles.container}>
				<Text numberOfLines={2} ellipsizeMode="tail" style={styles.text}>
					{value.name}
				</Text>
			</View>
		</ImageBackground>
	);
}

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
