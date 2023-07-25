import React from "react";
import {
	ImageBackground,
	StyleSheet,
	Text,
	View,
	useWindowDimensions,
} from "react-native";
import { Plan } from "../models/planModels";

export default function PlanCard({ value }: { value: Plan }) {
	const { width: screenWidth, height: screenHeight } = useWindowDimensions();
	const minWidth = 220;
	const maxWidth = 440;
	const minHeight = 124;
	const maxHeight = 247.5;

	const containerWidth = Math.min(
		Math.max(screenWidth * 0.6, minWidth),
		maxWidth
	);
	const containerHeight = Math.min(
		Math.max(screenWidth * 0.4, minHeight),
		maxHeight
	);

	return (
		<ImageBackground
			source={{ uri: "https://picsum.photos/700" }}
			style={{ width: containerWidth, height: containerHeight }}
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
		borderRadius: 4,
	},
	container: {
		height: "100%",
		borderRadius: 4,
		padding: "10px",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	text: {
		color: "white",
		fontWeight: "bold",
		fontSize: 20,
	},
});
