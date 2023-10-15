import React, { useLayoutEffect } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { useSelector } from "react-redux";
import DefaultImage from "../../../assets/barbell.png";
import { WorkoutPlan } from "../../models/workoutModel";
import { RootState } from "../../redux/store";
import WPPRightHeader from "./WPPRightHeader";

const WorkoutPlanPreview = ({ navigation, route }) => {
	const { id } = route.params;

	const customPLanData = useSelector<RootState, WorkoutPlan>(
		(s) => s.workoutPlan.savedWorkoutPlans[id] ?? s.workoutPlan.workoutPlans[id]
	);

	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => <WPPRightHeader id={id} />,
		});
	}, [navigation, id]);

	if (!customPLanData) return;

	return (
		<View style={styles.container}>
			<ImageBackground
				source={
					customPLanData.thumbnailURL
						? { uri: customPLanData.thumbnailURL }
						: DefaultImage
				}
				style={{
					maxHeight: 200,
					alignItems: "center",
					justifyContent: "center",
				}}
				imageStyle={{ height: 200 }}
				resizeMode="cover"
			>
				<Text variant="headlineSmall">{customPLanData.name}</Text>
			</ImageBackground>
		</View>
	);
};

const styles = StyleSheet.create({
	container: { flex: 1 },
});

export default WorkoutPlanPreview;
