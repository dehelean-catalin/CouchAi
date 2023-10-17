import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { FlatList, StyleSheet, View, useWindowDimensions } from "react-native";
import { Button, Text } from "react-native-paper";
import CustomCard from "../../components/CustomCard";
import routes from "../../constants/routes";
import { WorkoutDay } from "../../models/workoutModel";

type Props = {
	item: WorkoutDay;
	index: number;
};

const WorkoutDayCard = ({ item: value }: Props) => {
	const { navigate } = useNavigation<NativeStackNavigationProp<any>>();
	const { width } = useWindowDimensions();
	console.log("test");

	return (
		<View
			style={{
				width: width - 20,
			}}
		>
			{/* <Chip style={{ backgroundColor: theme.colors.primary }}>
					{index + 1}
				</Chip> */}
			{/* <CustomTextInput value={""}/>
				<TextInput
					value={value}
					style={{ height: 30 }}
					onChangeText={setValue}
					contentStyle={{ color: colors.onSurfaceVariant, height: 30 }}
					activeUnderlineColor="transparent"
					placeholder="Workout name"
					placeholderTextColor="gray"
				/> */}
			{!!Object.values(value.exercises).length ? (
				<FlatList
					data={Object.values(value.exercises)}
					renderItem={({ item }) => <CustomCard id={value.id} value={item} />}
					keyExtractor={(item) => item.id}
					showsVerticalScrollIndicator={false}
				/>
			) : (
				<View style={styles.emptyContainer}>
					<Text>Add exercises to your workout</Text>
				</View>
			)}
			<Button
				mode="contained"
				onPress={() => navigate(routes.EXERCISE, { id: value.id })}
			>
				Add exercise
			</Button>
		</View>
	);
};

const styles = StyleSheet.create({
	emptyContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
});
export default WorkoutDayCard;
