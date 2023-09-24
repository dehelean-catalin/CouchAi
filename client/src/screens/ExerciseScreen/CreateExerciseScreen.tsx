import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import React, { useLayoutEffect, useState } from "react";
import {
	Button,
	Image,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import { AppTheme } from "../../constants/theme";
import { useAxios } from "../../hooks/useAxios";
import {
	Exercise,
	ExerciseCategory,
	TargetMuscle,
} from "../../models/exerciseModels";

export default function CreateExerciseScreen({ navigation }) {
	const axios = useAxios();
	const { colors } = useTheme<AppTheme>();
	const [exerciseValues, setExerciseValues] = useState<Omit<Exercise, "id">>({
		picture: null,
		name: "",
		instructions: "",
		exerciseCategory: ExerciseCategory.WeightAndReps,
		targetMuscle: TargetMuscle.None,
		authorId: "",
	});
	const [error, setError] = useState(false);

	const targetMuscleOptions = Object.values(TargetMuscle);
	const categoryOptions = Object.values(ExerciseCategory);

	const handleSubmit = async () => {
		console.log(exerciseValues.name);
		if (!exerciseValues.name) {
			setError(true);
			return;
		}
		const formData = new FormData();
		formData.append("file", exerciseValues.picture);
		formData.append("data", JSON.stringify({ ...exerciseValues, picture: "" }));

		await axios.post("/Exercise", formData, {
			headers: { "Content-Type": "multipart/form-data" },
		});
	};

	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<TouchableOpacity style={{ marginRight: 16 }} onPress={handleSubmit}>
					<Icon
						name="check"
						size={20}
						style={{
							color: "white",
						}}
					/>
				</TouchableOpacity>
			),
		});
	}, [navigation, exerciseValues]);

	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 4],
			quality: 1,
		});

		if (!result.canceled) {
			const response = await fetch(result.assets[0].uri);
			const blob = await response.blob();

			setExerciseValues({
				...exerciseValues,
				picture: blob,
			});
		}
	};

	return (
		<View style={styles.container}>
			<Button title="Pick an image" onPress={pickImage} />
			{exerciseValues.picture && (
				<Image
					source={{ uri: exerciseValues.picture.uri }}
					style={{ width: 200, height: 200 }}
				/>
			)}
			<TextInput
				placeholder="Add name"
				value={exerciseValues.name}
				style={[styles.input, { backgroundColor: colors.surfaceVariant }]}
				onChangeText={(val) => {
					if (!exerciseValues.name) {
						setError(false);
					}
					setExerciseValues({ ...exerciseValues, name: val });
				}}
			/>
			{error && <Text style={{ color: colors.error }}>Name is required*</Text>}
			<TextInput
				placeholder="Add instructions"
				value={exerciseValues.instructions}
				style={[styles.input, { backgroundColor: colors.surfaceVariant }]}
				onChangeText={(v) =>
					setExerciseValues({ ...exerciseValues, instructions: v })
				}
			/>
			<Picker
				selectedValue={exerciseValues.targetMuscle}
				style={[styles.input, { backgroundColor: colors.surfaceVariant }]}
				onValueChange={(itemValue) =>
					setExerciseValues({ ...exerciseValues, targetMuscle: itemValue })
				}
			>
				{targetMuscleOptions.map((opt) => (
					<Picker.Item key={opt} label={opt} value={opt} />
				))}
			</Picker>
			<Picker
				style={[styles.input, { backgroundColor: colors.surfaceVariant }]}
				selectedValue={exerciseValues.exerciseCategory}
				onValueChange={(itemValue) =>
					setExerciseValues({ ...exerciseValues, exerciseCategory: itemValue })
				}
			>
				{categoryOptions.map((opt) => (
					<Picker.Item key={opt} label={opt} value={opt} />
				))}
			</Picker>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		display: "flex",
		gap: 12,
	},
	input: {
		padding: 12,
		color: "white",
	},
});
