import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { memo } from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Button, Chip, Menu, Text } from "react-native-paper";
import { useDispatch } from "react-redux";
import CustomCard from "../components/CustomCard";
import CustomTextInput from "../components/CustomTextInput";
import CustomMenu from "../components/PaperMenu";
import routes from "../constants/routes";
import { theme } from "../constants/theme";
import { WorkoutDay } from "../models/workoutModel";
import { workoutFormActions } from "../redux/workoutFormReducer";

type Props = {
	item: WorkoutDay;
	index: number;
};

const WorkoutDayCard = ({ item: value, index }: Props) => {
	const { navigate } = useNavigation<NativeStackNavigationProp<any>>();
	const { width } = useWindowDimensions();
	const dispatch = useDispatch();

	return (
		<View
			style={{
				width: width,
				flex: 1,
				padding: 10,
			}}
		>
			<View style={styles.header}>
				<Chip style={styles.chip}>
					<Text>Day {index + 1}</Text>
				</Chip>
				<CustomTextInput
					placeholder="Workout name"
					value={value.name}
					onChangeText={(name) =>
						dispatch(workoutFormActions.setWorkoutName({ id: value.id, name }))
					}
					style={styles.input}
				/>
				<CustomMenu>
					<Menu.Item title="Delete" />
				</CustomMenu>
			</View>
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

export default memo(WorkoutDayCard);

const styles = StyleSheet.create({
	header: {
		flexDirection: "row",
		backgroundColor: theme.colors.surface,
		alignItems: "center",
		gap: 15,
	},
	chip: {
		borderRadius: 50,
		marginLeft: 10,
		justifyContent: "center",
		backgroundColor: theme.colors.primary,
	},
	input: {
		flex: 1,
		backgroundColor: "transparent",
	},
	emptyContainer: {
		flex: 1,
		height: "100%",
		alignItems: "center",
		justifyContent: "center",
	},
});
