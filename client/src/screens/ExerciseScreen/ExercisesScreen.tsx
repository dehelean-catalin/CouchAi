import { RootStackParamList } from "@/navigations/BottomTabNavigator";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { RouteProp, useRoute } from "@react-navigation/native";
import axios from "axios";
import React, {
	useCallback,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import { Button, IconButton, Searchbar, Text } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import ExerciseCard from "../../components/ExerciseCard";
import routes, { RouteValues } from "../../constants/routes";
import { theme } from "../../constants/theme";
import { Exercise } from "../../models/exerciseModel";
import { addExercises } from "../../redux/exerciseReducer";
import { RootState } from "../../redux/store";

export default function ExercisesScreen({ navigation }) {
	const { params } = useRoute<RouteProp<RootStackParamList, "Exercises">>();
	const bottomSheetModalRef = useRef<BottomSheetModal>(null);
	const data = useSelector<RootState, { [key: string]: Exercise }>(
		(s) => s.exercise.value
	);
	const [searchQuery, setSearchQuery] = useState("");

	const dispatch = useDispatch();

	useEffect(() => {
		if (!Object.keys(data).length) {
			axios
				.get<{ [key: string]: Exercise }>(
					"http://192.168.1.5:8090/api/exercises"
				)
				.then((res) => dispatch(addExercises(res.data)));
		}
	}, []);

	const result = Object.values(data)?.filter((item) =>
		item.name.includes(searchQuery)
	);

	useLayoutEffect(() => {
		navigation.setOptions({
			headerTitle: params?.fromCreateWorkout ? "Choose exercises" : "Exercises",
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

	const handlePresentModalPress = useCallback(() => {
		bottomSheetModalRef.current?.present();
	}, []);

	if (!Object.keys(data).length) return;

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
					<IconButton icon="filter" onPress={handlePresentModalPress} />
				</View>
			}
			renderItem={({ item }) => (
				<ExerciseCard
					key={item.id}
					data={item}
					showCheckbox={params?.fromCreateWorkout}
				/>
			)}
			contentContainerStyle={{ flexGrow: 1 }}
			ListEmptyComponent={
				<View style={styles.notFoundContainer}>
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
	notFoundContainer: {
		alignItems: "center",
		justifyContent: "center",
		gap: 10,
		flex: 1,
	},
});
