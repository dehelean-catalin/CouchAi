import { Exercise } from "@/models/exerciseModels";
import { RootState } from "@/redux/store";
import React from "react";
import { Linking, Pressable, StyleSheet, View } from "react-native";
import { Divider, IconButton, Text } from "react-native-paper";
import { useSelector } from "react-redux";
import CustomImageBackground from "../../components/CustomImageBackground";

export default function EDSummary({ id }) {
	const data = useSelector<RootState, Exercise | undefined>(
		(s) => s.exercise.value[id]
	);

	const navigateToYoutube = () =>
		Linking.openURL(`vnd.youtube://results?search_query=${data.name} Tutorial`);

	if (!data) return <></>;

	return (
		<View>
			{data.standardResolutionUrl ? (
				<CustomImageBackground url={data.standardResolutionUrl} />
			) : (
				<View style={styles.container}>
					<Text variant="displayLarge">{data.name[0]}</Text>
				</View>
			)}
			<View style={{ padding: 12, gap: 12 }}>
				<Text variant="headlineSmall">{data.name}</Text>
				{data.instructions && (
					<>
						<Divider bold />
						<Text variant="bodyLarge">{data.instructions}</Text>
					</>
				)}
				<Divider bold />
				<Pressable style={styles.youtubeContainer} onPress={navigateToYoutube}>
					<IconButton icon="youtube" style={{ margin: 0, width: 25 }} />
					<Text variant="bodyLarge">View on youtube</Text>
				</Pressable>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#fff",
		height: 250,
		alignItems: "center",
		justifyContent: "center",
	},
	youtubeContainer: { flexDirection: "row", alignItems: "center", gap: 20 },
});
