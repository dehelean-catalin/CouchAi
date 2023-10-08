import React, { FC } from "react";
import { Image, ImageBackground, StyleSheet } from "react-native";

type Props = {
	url: string;
};

const CustomImageBackground: FC<Props> = ({ url }) => {
	return (
		<ImageBackground source={{ uri: url }} blurRadius={30} style={styles.image}>
			<Image source={{ uri: url }} style={styles.image} />
		</ImageBackground>
	);
};

const styles = StyleSheet.create({
	image: {
		height: 250,
		width: "100%",
		objectFit: "contain",
	},
});

export default CustomImageBackground;
