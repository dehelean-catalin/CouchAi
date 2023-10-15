import * as ImagePicker from "expo-image-picker";
import React, { useLayoutEffect, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { IconButton, Text, useTheme } from "react-native-paper";
import uuid from "react-native-uuid";
import { useDispatch, useSelector } from "react-redux";
import CustomImageBackground from "../../components/CustomImageBackground";
import { CustomPicker } from "../../components/CustomPicker";
import CustomTextInput from "../../components/CustomTextInput";
import routes from "../../constants/routes";
import { AppTheme, theme } from "../../constants/theme";
import {
	Exercise,
	exerciseCategoryRecord,
	muscleRecord,
} from "../../models/exerciseModel";
import { addExercise, updateExercise } from "../../redux/exerciseReducer";
import { RootState } from "../../redux/store";

const CreateExerciseScreen = ({ navigation, route }) => {
	const { colors } = useTheme<AppTheme>();
	const dispatch = useDispatch();
	const id = uuid.v4().toString();

	const data = useSelector<RootState, Exercise>(
		(s) => s.exercise.value[route.params?.id]
	);

	const [exerciseValues, setExerciseValues] = useState<Exercise>(
		data ?? {
			id,
			name: "",
			instructions: "",
			category: exerciseCategoryRecord[0],
			compoundMovement: null,
			mainBodyPart: muscleRecord[0],
			primaryMuscleGroup: [],
			secondaryMuscleGroup: [],
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

	const handlePickerValueChange = (
		value: string,
		key: "category" | "mainBodyPart"
	) => {
		setExerciseValues({
			...exerciseValues,
			[key]: value,
		});
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
		<ScrollView style={styles.container}>
			<Pressable onPress={pickImage} style={styles.imgBackgroundContainer}>
				{exerciseValues.standardResolutionUrl ? (
					<CustomImageBackground url={exerciseValues.standardResolutionUrl} />
				) : (
					<IconButton icon="camera" size={40} />
				)}
			</Pressable>
			<View style={styles.formContainer}>
				<CustomTextInput
					placeholder="Name*"
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
				<CustomTextInput
					placeholder="Instructions"
					value={exerciseValues.instructions}
					onChangeText={(v) =>
						setExerciseValues({ ...exerciseValues, instructions: v })
					}
				/>

				<CustomPicker
					label="Muscle Group"
					selectedValue={exerciseValues.mainBodyPart}
					onValueChange={(itemValue) =>
						handlePickerValueChange(itemValue, "mainBodyPart")
					}
					items={muscleRecord}
				/>
				<CustomPicker
					label="Category"
					selectedValue={exerciseValues.category.split("_").join(" ")}
					onValueChange={(itemValue) =>
						handlePickerValueChange(itemValue, "category")
					}
					items={exerciseCategoryRecord}
				/>
			</View>
		</ScrollView>
	);
};
export default CreateExerciseScreen;

const styles = StyleSheet.create({
	container: {
		display: "flex",
		paddingBottom: 20,
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
		marginHorizontal: 15,
	},
});
