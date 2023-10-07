import { Exercise } from "@/models/exerciseModels";
import { RootState } from "@/redux/store";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { useSelector } from "react-redux";

export default function ExerciseDetailsScreen({ route, navigation }) {
	const { id } = route.params;
	const data = useSelector<RootState, Exercise | undefined>(
		(s) => s.exercise.value[id]
	);

	if (!data) return <></>;

	return (
		<View>
			<Text>{data?.name}</Text>
			<Text>{data?.targetMuscle}</Text>
			<Text>{data?.exerciseCategory}</Text>
			<Text>{data?.instructions}</Text>
		</View>
	);
}

const styles = StyleSheet.create({});
