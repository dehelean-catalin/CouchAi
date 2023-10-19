import React from "react";
import { Linking, Pressable, StyleSheet, View } from "react-native";
import { Divider, IconButton, Text } from "react-native-paper";
import { useSelector } from "react-redux";
import CustomImageBackground from "../../components/CustomImageBackground";
import { Exercise } from "../../models/exerciseModel";
import { RootState } from "../../redux/store";

export default function EDSummary({ id }) {
	const data = useSelector<RootState, Exercise | undefined>(
		(s) => s.exercise.value[id]
	);

	const navigateToYoutube = () =>
		Linking.openURL(
			`vnd.youtube://results?search_query=${data?.name} Tutorial`
		);

	if (!data) return <></>;

	return (
		<View>
			<CustomImageBackground
				url={data.standardResolutionUrl}
				height={300}
				fallback={
					<View style={styles.container}>
						<Text variant="displayLarge">{data.name[0]}</Text>
					</View>
				}
			/>

			<View style={styles.descriptionContainer}>
				<Text variant="headlineSmall">{data.name}</Text>
				{data.instructions && (
					<>
						<Divider bold />
						<Text variant="bodyMedium">{data.instructions}</Text>
					</>
				)}
				<Divider bold />
				<Pressable style={styles.youtubeContainer} onPress={navigateToYoutube}>
					<IconButton icon="youtube" style={styles.ytIcon} />
					<Text variant="bodyMedium">View on youtube</Text>
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
	descriptionContainer: {
		padding: 12,
		gap: 12,
	},
	youtubeContainer: { flexDirection: "row", alignItems: "center", gap: 20 },
	ytIcon: {
		margin: 0,
		width: 25,
	},
});
