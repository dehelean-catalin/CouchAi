import React, { useLayoutEffect } from "react";
import {
	FlatList,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
} from "react-native";
import ExerciseCard from "../../components/ExerciseCard";
import routes from "../../constants/routes";
import { useAxios } from "../../hooks/useAxios";
import { useFetchQuery } from "../../hooks/useFetchQuery";
import { Exercise } from "../../models/exerciseModels";
import { getAllExercises } from "../../services/exerciseService";

export default function ExercisesScreen({ navigation }) {
	const axios = useAxios();
	const navigateToAnotherScreen = () => {
		navigation.navigate(routes.CREATE_EXERCISE);
	};

	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<TouchableOpacity
					style={{ marginRight: 12 }}
					onPress={navigateToAnotherScreen}
				>
					<Text style={styles.rightHeader}>CREATE</Text>
				</TouchableOpacity>
			),
		});
	}, [navigation]);

	const { data, isLoading, isError } = useFetchQuery("getAllExercises", () =>
		getAllExercises(axios)
	);

	if (isLoading) return <></>;
	if (isError) return <></>;

	return (
		<ScrollView>
			<FlatList<Exercise>
				data={data}
				renderItem={({ index, item }) => (
					<ExerciseCard key={index} data={item} />
				)}
			/>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	rightHeader: { fontSize: 14, color: "white" },
});
