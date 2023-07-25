import axios from "axios";
import React from "react";
import {
	FlatList,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import { IconButton } from "react-native-paper";
import { useQuery } from "react-query";
import PlanCard from "../../components/PlanCard";
import routes from "../../constants/routes";
import { Plan } from "../../models/planModels";

const ItemSeparator = () => <View style={styles.separator} />;

export default function PlansScreen({ navigation }) {
	const { data, isLoading, isError } = useQuery("getPlans", () =>
		axios
			.get<{ yourPlans: Plan[]; mostPopular: Plan[] }>(
				"http://localhost:4000/plan"
			)
			.then((res) => res.data)
	);

	if (isLoading) return <></>;
	if (isError) return <></>;

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView>
				<Text style={styles.text}>Your plans</Text>
				<FlatList
					data={data?.yourPlans}
					style={styles.list}
					renderItem={({ item }) => <PlanCard value={item} />}
					keyExtractor={(item) => item.id}
					horizontal
					pagingEnabled
					showsHorizontalScrollIndicator={false}
					ItemSeparatorComponent={ItemSeparator}
				/>
				<Text style={styles.text}>Favorite plans</Text>
				<FlatList
					data={data?.mostPopular}
					style={styles.list}
					renderItem={({ item }) => <PlanCard value={item} />}
					keyExtractor={(item) => item.id}
					horizontal
					pagingEnabled
					showsHorizontalScrollIndicator={false}
					ItemSeparatorComponent={ItemSeparator}
				/>
				<Text style={styles.text}>Favorite plans</Text>
				<FlatList
					data={data?.mostPopular}
					style={styles.list}
					renderItem={({ item }) => <PlanCard value={item} />}
					keyExtractor={(item) => item.id}
					horizontal
					pagingEnabled
					scrollEnabled
					showsHorizontalScrollIndicator={false}
					ItemSeparatorComponent={ItemSeparator}
				/>
				<IconButton
					icon="plus"
					onPress={() => navigation.navigate(routes.CREATE_PLAN)}
				/>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: { height: "100%", margin: "10px" },
	list: { marginBottom: "15px" },
	text: {
		fontSize: 16,
		marginBottom: "10px",
		alignContent: "center",
		fontWeight: "bold",
	},
	separator: { width: "10px" },
	image: {
		borderRadius: 4,
	},
	centeredText: {
		textAlign: "center", // Centers the text horizontally
		fontSize: 24,
		color: "white",
		backgroundColor: "rgba(0, 0, 0, 0.6)", // Adding a semi-transparent background to improve text visibility
		padding: 10,
	},
});
