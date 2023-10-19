import React from "react";
import { Animated, StyleSheet, View, useWindowDimensions } from "react-native";

const Pagination = ({ data, scrollX }) => {
	const { width } = useWindowDimensions();

	return (
		<View style={styles.container}>
			{data.map((_, idx) => {
				const inputRange = [(idx - 1) * width, idx * width, (idx + 1) * width];

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
								backgroundColor: "#fff",
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
