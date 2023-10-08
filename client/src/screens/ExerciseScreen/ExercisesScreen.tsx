import { RootState } from "@/redux/store";
import React, { useLayoutEffect } from "react";
import { FlatList, Pressable } from "react-native";
import { Text } from "react-native-paper";
import { useSelector } from "react-redux";
import ExerciseCard from "../../components/ExerciseCard";
import routes, { RouteValues } from "../../constants/routes";
import { Exercise } from "../../models/exerciseModels";

export default function ExercisesScreen({ navigation }) {
	const data = useSelector<RootState>((s) => s.exercise.value);

	const navigateToRoute = (route: RouteValues) => {
		navigation.navigate(route);
	};

	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<Pressable
					style={{ marginRight: 12 }}
					onPress={() => navigateToRoute(routes.CREATE_EXERCISE)}
				>
					<Text variant="titleSmall">CREATE</Text>
				</Pressable>
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
