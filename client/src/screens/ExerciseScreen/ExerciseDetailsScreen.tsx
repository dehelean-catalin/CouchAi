import { Exercise } from "@/models/exerciseModels";
import { RootState } from "@/redux/store";
import React, { useLayoutEffect } from "react";
import { Linking, Pressable, StyleSheet, View } from "react-native";
import { Divider, IconButton, Text } from "react-native-paper";
import { useSelector } from "react-redux";
import CustomImageBackground from "../../components/CustomImageBackground";
import ExerciseDetailsHeaderRight from "../../components/ExerciseDetailsHeaderRight";

export default function ExerciseDetailsScreen({ route, navigation }) {
	const { id } = route.params;
	const data = useSelector<RootState, Exercise | undefined>(
		(s) => s.exercise.value[id]
	);

	useLayoutEffect(() => {
		navigation.setOptions({
			headerRight: () => <ExerciseDetailsHeaderRight />,
		});
	}, [navigation]);

	const navigateToYoutube = () =>
		Linking.openURL(`vnd.youtube://results?search_query=${data.name} Tutorial`);

	if (!data) return <></>;

	return (
		<View>
			<View style={styles.header}>
				<Pressable>
					<Text>Summary</Text>
				</Pressable>
				<Pressable>
					<Text>Stats</Text>
				</Pressable>
			</View>
			{data.standardResolutionUrl ? (
				<CustomImageBackground url={data.standardResolutionUrl} />
			) : (
				<View style={styles.container}>
					<Text variant="displayLarge">{data.name[0]}</Text>
				</View>
			)}
			<View style={{ padding: 12, gap: 10 }}>
				<Text variant="headlineSmall">{data.name}</Text>
				<Divider bold />
				<Pressable
					style={{ flexDirection: "row", alignItems: "center", gap: 20 }}
					onPress={navigateToYoutube}
				>
					<IconButton icon="youtube" style={{ margin: 0, width: 25 }} />
					<Text variant="titleMedium">View on youtube</Text>
				</Pressable>

				<Text>{data.instructions}</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	header: {
		flexDirection: "row",
		justifyContent: "space-around",
		padding: 15,
	},
	container: {
		backgroundColor: "#fff",
		height: 250,
		alignItems: "center",
		justifyContent: "center",
	},
});
