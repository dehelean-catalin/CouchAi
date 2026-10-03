import { WorkoutDay } from "@/model/workoutModel";
import React, { FC } from "react";
import { Animated, StyleSheet, View, useWindowDimensions } from "react-native";
import { useTheme } from "react-native-paper";

type Props = {
	data: WorkoutDay[];
	scrollX: Animated.Value;
};

const Pagination: FC<Props> = ({ data, scrollX }) => {
	const { colors } = useTheme();
	const { width } = useWindowDimensions();

	return (
		<View style={styles.container}>
			{data.map((_, idx) => {
				const inputRange = [(idx - 1) * width, idx * width, (idx + 1) * width];

				const bgColor = scrollX.interpolate({
					inputRange,
					outputRange: [
						colors.onBackground,
						colors.inverseSurface,
						colors.onBackground,
					],
					extrapolate: "clamp",
				});

				const dotWidth = scrollX.interpolate({
					inputRange,
					outputRange: [9, 12, 9],
					extrapolate: "clamp",
				});

				const opacity = scrollX.interpolate({
					inputRange,
					outputRange: [0.1, 1, 0.1],
					extrapolate: "clamp",
				});

				return (
					<Animated.View
						key={idx.toString()}
						style={[
							styles.dot,
							{
								width: dotWidth,
								height: dotWidth,
								backgroundColor: bgColor,
								opacity,
							},
							,
						]}
					/>
				);
			})}
		</View>
	);
};

export default Pagination;

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		width: "100%",
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 15,
		height: 16,
	},
	dot: {
		width: 10,
		height: 10,
		borderRadius: 10,
		marginHorizontal: 3,
		backgroundColor: "#ccc",
	},
});
