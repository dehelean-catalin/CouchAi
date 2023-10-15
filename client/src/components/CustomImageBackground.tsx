import React, { FC } from "react";
import { Image, ImageBackground, StyleSheet } from "react-native";

type Props = {
	url: string;
};

const CustomImageBackground: FC<Props> = ({ url }) => {
	return (
		<ImageBackground
			source={{ uri: url }}
			blurRadius={30}
			style={styles.imageContainer}
		>
			<Image source={{ uri: url }} style={styles.image} />
		</ImageBackground>
	);
};

const styles = StyleSheet.create({
	image: {
		height: "100%",
		width: 300,
		objectFit: "fill",
		aspectRatio: 1,
	},
	imageContainer: {
		alignItems: "center",
		height: 300,
	},
});

export default CustomImageBackground;
