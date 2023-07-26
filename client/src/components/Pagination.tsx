import React from "react";
import { Animated, Dimensions, StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";

const { width } = Dimensions.get("screen");

const Pagination = ({ data, scrollX, index }) => {
	const { colors } = useTheme();
	return (
		<View style={styles.container}>
			{data.map((_, idx) => {
				const inputRange = [(idx - 1) * width, idx * width, (idx + 1) * width];

				const dotWidth = scrollX.interpolate({
					inputRange,
					outputRange: [10, 16, 10],
					extrapolate: "clamp",
				});

				const opacity = scrollX.interpolate({
					inputRange,
					outputRange: [0.2, 1, 0.1],
					extrapolate: "clamp",
				});

				const backgroundColor = scrollX.interpolate({
					inputRange,
					outputRange: ["#ccc", "#fff", "#ccc"],
					extrapolate: "clamp",
				});

				return (
					<Animated.View
						key={idx.toString()}
						style={[
							styles.dot,
							{ width: dotWidth, backgroundColor, opacity },
							idx === index && {
								backgroundColor: colors.onBackground,
							},
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
	},
	dot: {
		width: 10,
		height: 10,
		borderRadius: 6,
		marginHorizontal: 3,
		backgroundColor: "#ccc",
	},
});
