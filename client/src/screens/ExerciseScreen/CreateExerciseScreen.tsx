import { RootState } from "@/redux/store";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import React, { useLayoutEffect, useState } from "react";
import {
	Image,
	ImageBackground,
	Pressable,
	StyleSheet,
	View,
} from "react-native";
import { IconButton, Text, TextInput, useTheme } from "react-native-paper";
import uuid from "react-native-uuid";
import { useDispatch, useSelector } from "react-redux";
import routes from "../../constants/routes";
import { AppTheme } from "../../constants/theme";
import {
	Exercise,
	ExerciseCategory,
	TargetMuscle,
} from "../../models/exerciseModels";
import { addExercise, updateExercise } from "../../redux/exerciseReducer";

const CreateExerciseScreen = ({ navigation, route }) => {
	const { colors } = useTheme<AppTheme>();
	const dispatch = useDispatch();
	const id = uuid.v4().toString();
	const targetMuscleOptions = Object.values(TargetMuscle);
	const categoryOptions = Object.values(ExerciseCategory);
	const data = useSelector<RootState, Exercise>(
		(s) => s.exercise.value[route.params.id]
	);

	const [exerciseValues, setExerciseValues] = useState<Exercise>(
		data ?? {
			id,
			name: "",
			instructions: "",
			exerciseCategory: ExerciseCategory.WeightAndReps,
			targetMuscle: TargetMuscle.None,
			authorId: "local",
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
			<Pressable
				onPress={pickImage}
				style={{
					height: 250,
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				{exerciseValues.standardResolutionUrl ? (
					<ImageBackground
						source={{ uri: exerciseValues.standardResolutionUrl }}
						blurRadius={30}
						style={styles.image}
					>
						<Image
							source={{ uri: exerciseValues.standardResolutionUrl }}
							style={styles.image}
						/>
					</ImageBackground>
				) : (
					<IconButton icon="camera" size={40} />
				)}
			</Pressable>
			<TextInput
				placeholder="Add name"
				value={exerciseValues.name}
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
				onChangeText={(v) =>
					setExerciseValues({ ...exerciseValues, instructions: v })
				}
			/>
			<Picker
				selectedValue={exerciseValues.targetMuscle}
				onValueChange={(itemValue) =>
					setExerciseValues({ ...exerciseValues, targetMuscle: itemValue })
				}
			>
				{targetMuscleOptions.map((opt) => (
					<Picker.Item key={opt} label={opt} value={opt} />
				))}
			</Picker>
			<Picker
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
});
