import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Image, SafeAreaView, StyleSheet, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import Slider from "../components/Slider";

const ImageUrl = require("../../assets/barbell.png");

export default function CreatePlanScreen() {
	const [planTitle, setPlanTitle] = useState("");

	const [image, setImage] = useState("");

	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		if (!result.canceled) {
			setImage(result.assets[0].uri);
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={{ flexDirection: "row", alignItems: "center" }}>
				<Button onPress={pickImage}>
					{image ? (
						<Image source={{ uri: image }} style={styles.image} />
					) : (
						<Image source={{ uri: ImageUrl }} style={styles.image} />
					)}
				</Button>
				<TextInput
					label="Name"
					value={planTitle}
					onChangeText={setPlanTitle}
					placeholder="Enter workout name"
				/>
			</View>
			<Slider />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: "10px",
		height: "100%",
		gap: 20,
	},

	image: { width: 48, height: 48, marginBottom: "0px", marginTop: "0px" },
});
