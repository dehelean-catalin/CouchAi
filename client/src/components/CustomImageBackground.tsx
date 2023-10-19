import React, { FC } from "react";
import { Image, ImageBackground, StyleSheet } from "react-native";

type Props = {
	url: string;
	height?: 250 | 300;
	fallback: React.ReactNode;
};

const CustomImageBackground: FC<Props> = ({ url, height = 250, fallback }) => {
	if (!url) return fallback;

	return (
		<ImageBackground
			source={{ uri: url }}
			blurRadius={30}
			resizeMode="cover"
			style={{ height }}
		>
			{<Image style={styles.image} source={{ uri: url }} />}
		</ImageBackground>
	);
};

const styles = StyleSheet.create({
	image: {
		height: "100%",
		objectFit: "contain",
	},
});

export default CustomImageBackground;
