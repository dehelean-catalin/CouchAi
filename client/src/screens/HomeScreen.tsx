import React from "react";
import { StyleSheet, View } from "react-native";
import CustomTab from "../components/CustomTab";
import routes from "../constants/routes";

export default function HomeScreen({ navigation }) {
	const startEmptyWorkout = () => {
		navigation.navigate(routes.WORKOUT_SESION);
	};

	return (
		<View style={styles.container}>
			<CustomTab onPress={startEmptyWorkout} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 15,
	},
});
