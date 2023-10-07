import React from "react";
import {
	ActivityIndicator,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
} from "react-native";
import { IconButton, useTheme } from "react-native-paper";
import { useQuery } from "react-query";
import PlanSection from "../components/PlanSection";
import routes from "../constants/routes";
import { AppTheme } from "../constants/theme";
import { getAllPlans } from "../services/planService";

export default function PlansScreen({ navigation }) {
	const theme = useTheme<AppTheme>();
	const { data, isLoading, isError } = useQuery("getPlans", () =>
		getAllPlans()
	);

	if (isLoading)
		return <ActivityIndicator size="large" color={theme.colors.primary} />;
	if (isError || !data) return <></>;

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView>
				<PlanSection value={data} />
			</ScrollView>
			<TouchableOpacity style={{ position: "absolute", bottom: 15, right: 0 }}>
				<IconButton
					icon="plus"
					iconColor="white"
					style={{
						backgroundColor: theme.colors.primary,
					}}
					size={30}
					onPress={() => navigation.navigate(routes.CREATE_PLAN)}
				/>
			</TouchableOpacity>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: { height: "100%", margin: 10 },
});
