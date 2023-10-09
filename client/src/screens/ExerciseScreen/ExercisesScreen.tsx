import { RootState } from "@/redux/store";
import React, { useLayoutEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import { Button, Searchbar, Text } from "react-native-paper";
import { useSelector } from "react-redux";
import ExerciseCard from "../../components/ExerciseCard";
import routes, { RouteValues } from "../../constants/routes";
import { theme } from "../../constants/theme";
import { Exercise } from "../../models/exerciseModels";

export default function ExercisesScreen({ navigation }) {
	const data = useSelector<RootState, { [key: string]: Exercise }>(
		(s) => s.exercise.value
	);
	const [searchQuery, setSearchQuery] = useState("");

	const result = Object.values(data).filter((item) =>
		item.name.includes(searchQuery)
	);

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

	const onChangeSearch = (query) => setSearchQuery(query);
	const navigateToRoute = (route: RouteValues) => {
		navigation.navigate(route);
	};

	return (
		<FlatList<Exercise>
			data={result}
			ListHeaderComponent={
				<View style={styles.searchContainer}>
					<Searchbar
						placeholder="Search"
						onChangeText={onChangeSearch}
						value={searchQuery}
						style={{ flex: 1 }}
					/>
				</View>
			}
			renderItem={({ item }) => (
				<ExerciseCard
					key={item.id}
					data={item}
					onClick={() =>
						navigation.navigate(routes.EXERCISE_DETAILS, { id: item.id })
					}
				/>
			)}
			contentContainerStyle={{ flexGrow: 1 }}
			ListEmptyComponent={
				<View
					style={{
						alignItems: "center",
						justifyContent: "center",
						gap: 10,
						flex: 1,
					}}
				>
					<Text variant="titleLarge">"{searchQuery}" not found</Text>
					<Button mode="contained">Create Exercise</Button>
				</View>
			}
			stickyHeaderIndices={[0]}
		/>
	);
}

const styles = StyleSheet.create({
	searchContainer: {
		backgroundColor: theme.colors.background,
		flexDirection: "row",
		paddingBottom: 10,
		paddingHorizontal: 10,
	},
});
