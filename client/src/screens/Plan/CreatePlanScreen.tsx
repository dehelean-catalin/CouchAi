import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Button, Card, Dialog, Portal, TextInput } from "react-native-paper";
const ImageUrl = require("../../../assets/barbell.png");

export default function CreatePlanScreen() {
	const [planTitle, setPlanTitle] = useState("");
	const [visible, setVisible] = useState(false);

	const hideDialog = () => setVisible(false);
	const onPress = () => setVisible(true);

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
					mode="outlined"
				/>
			</View>

			<Card style={styles.card}>
				<Card.Title title="Day 1" />
				<Card.Content>
					<Text>lala</Text>
				</Card.Content>
			</Card>
			<Portal>
				<Dialog visible={visible} onDismiss={hideDialog}>
					<Dialog.Title>This is a title</Dialog.Title>
					<Dialog.Content>
						<Text>This is simple dialog</Text>
					</Dialog.Content>
				</Dialog>
			</Portal>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingTop: "10px",
		padding: "10px",
		height: "100%",
		gap: 20,
	},
	card: { flex: 1 },
	image: { width: 48, height: 48, marginBottom: "0px", marginTop: "0px" },
});
