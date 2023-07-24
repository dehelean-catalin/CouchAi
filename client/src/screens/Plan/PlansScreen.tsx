import { createNativeStackNavigator } from "@react-navigation/native-stack";
import axios from "axios";
import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { IconButton, Text, useTheme } from "react-native-paper";
import { useQuery } from "react-query";
import routes from "../../constants/routes";
import { Plan } from "../../models/planModels";

const Stack = createNativeStackNavigator();

export default function PlansScreen({ navigation }) {
	const theme = useTheme();
	const { data, isLoading, isError } = useQuery("getPlans", () =>
		axios.get<Plan[]>("http://localhost:4000/plan").then((res) => res.data)
	);
	const onPress = () => {
		axios.post("http://localhost:4000/plan").then((res) => res.data);
	};

	if (isLoading) return <></>;
	if (isError) return <></>;

	return (
		<SafeAreaView
			style={{ backgroundColor: theme.colors.primaryContainer, height: "100%" }}
		>
			<Text>PlansScreen</Text>
			<IconButton
				icon="plus"
				onPress={() => navigation.navigate(routes.CREATE_PLAN)}
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	plans: {},
	addButton: {},
});
