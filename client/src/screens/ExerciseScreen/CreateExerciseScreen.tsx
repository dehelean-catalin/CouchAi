import { RootState } from "@/redux/store";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import React, { useLayoutEffect, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { IconButton, Text, TextInput, useTheme } from "react-native-paper";
import uuid from "react-native-uuid";
import { useDispatch, useSelector } from "react-redux";
import CustomImageBackground from "../../components/CustomImageBackground";
import routes from "../../constants/routes";
import { AppTheme, theme } from "../../constants/theme";
import {
	Exercise,
	ExerciseCategory,
	MainMuscleGroup,
} from "../../models/exerciseModels";
import { addExercise, updateExercise } from "../../redux/exerciseReducer";

const CreateExerciseScreen = ({ navigation, route }) => {
	const { colors } = useTheme<AppTheme>();
	const dispatch = useDispatch();
	const id = uuid.v4().toString();
	const targetMuscleOptions = Object.values(MainMuscleGroup);
	const categoryOptions = Object.values(ExerciseCategory);
	const data = useSelector<RootState, Exercise>(
		(s) => s.exercise.value[route.params?.id]
	);

	const [exerciseValues, setExerciseValues] = useState<Exercise>(
		data ?? {
			id,
			name: "",
			instructions: "",
			category: ExerciseCategory.WeightAndReps,
			movementType: null,
			mainBodyPart: null,
			mainMuscleGroup: MainMuscleGroup.None,
			secondaryMuscleGroup: [],
			equipment: null,
			equipmentRequired: [],
			custom: true,
			deleted: false,
			standardResolutionUrl: null,
			thumbnailUrl: null,
		}
	);
	const [error, setError] = useState(false);

	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<Pressable onPress={handleSubmit}>
					<IconButton icon="check" size={20} />
				</Pressable>
			),
		});
	}, [navigation, exerciseValues]);

	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 4],
			quality: 1,
		});

		if (!result.canceled) {
			setExerciseValues({
				...exerciseValues,
				thumbnailUrl: result.assets[0].uri,
				standardResolutionUrl: result.assets[0].uri,
			});
		}
	};

	const handleSubmit = async () => {
		if (!exerciseValues.name) {
			setError(true);
			return;
		}

		if (data) {
			dispatch(addExercise(exerciseValues));
		} else {
			dispatch(updateExercise(exerciseValues));
		}

		navigation.navigate(routes.EXERCISE);
	};

	return (
		<View style={styles.container}>
			<Pressable onPress={pickImage} style={styles.imgBackgroundContainer}>
				{exerciseValues.standardResolutionUrl ? (
					<CustomImageBackground url={exerciseValues.standardResolutionUrl} />
				) : (
					<IconButton icon="camera" size={40} />
				)}
			</Pressable>
			<View style={styles.formContainer}>
				<TextInput
					placeholder="Name*"
					mode="outlined"
					style={styles.text}
					value={exerciseValues.name}
					onChangeText={(val) => {
						if (!exerciseValues.name) {
							setError(false);
						}
						setExerciseValues({ ...exerciseValues, name: val });
					}}
				/>
				{error && (
					<Text style={{ color: colors.error }}>Name is required*</Text>
				)}
				<TextInput
					mode="outlined"
					style={styles.text}
					placeholder="Instructions"
					value={exerciseValues.instructions}
					onChangeText={(v) =>
						setExerciseValues({ ...exerciseValues, instructions: v })
					}
				/>
				<View>
					<Text variant="bodyMedium" style={styles.text}>
						Muscle Group
					</Text>
					<Picker
						style={styles.picker}
						dropdownIconColor="#fff"
						selectedValue={exerciseValues.mainMuscleGroup}
						onValueChange={(itemValue) =>
							setExerciseValues({
								...exerciseValues,
								mainMuscleGroup: itemValue,
							})
						}
					>
						{targetMuscleOptions.map((opt) => (
							<Picker.Item key={opt} label={opt} value={opt} />
						))}
					</Picker>
				</View>
				<View>
					<Text variant="bodyMedium" style={styles.text}>
						Category
					</Text>
					<Picker
						style={styles.picker}
						dropdownIconColor="#fff"
						selectedValue={exerciseValues.category}
						onValueChange={(itemValue) =>
							setExerciseValues({ ...exerciseValues, category: itemValue })
						}
					>
						{categoryOptions.map((opt) => (
							<Picker.Item key={opt} label={opt} value={opt} />
						))}
					</Picker>
				</View>
			</View>
		</View>
	);
};
export default CreateExerciseScreen;

const styles = StyleSheet.create({
	container: {
		display: "flex",
	},
	image: {
		height: 250,
		width: "100%",
		objectFit: "contain",
	},
	imgBackgroundContainer: {
		height: 250,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: theme.colors.surfaceDisabled,
	},
	formContainer: {
		marginTop: 15,
		gap: 15,
	},
	picker: {
		color: "#fff",
		width: "60%",
	},
	text: {
		marginHorizontal: 15,
	},
});
