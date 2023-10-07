import { RootState } from "@/redux/store";
import React, { useLayoutEffect } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import ExerciseCard from "../../components/ExerciseCard";
import routes, { RouteValues } from "../../constants/routes";
import { Exercise } from "../../models/exerciseModels";

export default function ExercisesScreen({ navigation }) {
	const data = useSelector<RootState>((s) => s.exercise.value);

	const navigateToRoute = (route: RouteValues) => {
		console.log(route);
		navigation.navigate(route);
	};

	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<TouchableOpacity
					style={{ marginRight: 12 }}
					onPress={() => navigateToRoute(routes.CREATE_EXERCISE)}
				>
					<Text style={styles.rightHeader}>CREATE</Text>
				</TouchableOpacity>
			),
		});
	}, [navigation]);

	return (
		<FlatList<Exercise>
			data={Object.values(data)}
			renderItem={({ item }) => (
				<ExerciseCard
					key={item.id}
					data={item}
					onClick={() =>
						navigation.navigate(routes.EXERCISE_DETAILS, { id: item.id })
					}
				/>
			)}
		/>
	);
}

const styles = StyleSheet.create({
	rightHeader: { fontSize: 14, color: "white" },
});
