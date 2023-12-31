import routes from "@/constant/routes";
import { WorkoutDay } from "@/model/workoutModel";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { memo } from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Button, Chip, Menu, Text, useTheme } from "react-native-paper";
import { useDispatch } from "react-redux";
import CustomMenu from "../../components/CustomMenu";
import CustomTextInput from "../../components/CustomTextInput";
import { workoutFormActions } from "../../redux/workoutFormReducer";
import CustomCard from "./CustomCard";

type Props = {
	item: WorkoutDay;
	index: number;
};

export const WorkoutDayCard = memo(({ item: value, index }: Props) => {
	const { colors } = useTheme();
	const { navigate } = useNavigation<NativeStackNavigationProp<any>>();
	const { width } = useWindowDimensions();
	const dispatch = useDispatch();

	const handleDelete = () => {
		dispatch(workoutFormActions.deleteWorkout(value.id));
	};

	const data = Object.values(value.workoutExercises);

	return (
		<View
			style={{
				width,
				flex: 1,
				padding: 10,
			}}
		>
			<View style={[styles.header, { backgroundColor: colors.surface }]}>
				<Chip
					style={[
						styles.chip,
						{
							backgroundColor: colors.primary,
							// color: colors.surface,
						},
					]}
				>
					<Text style={{ color: colors.background }}>Day {index + 1}</Text>
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
					<Menu.Item title="Reorder" disabled={true} />
					<Menu.Item title="Duplicate" disabled={true} />
					<Menu.Item title="Delete" onPress={handleDelete} />
				</CustomMenu>
			</View>
			{!!data.length ? (
				<FlatList
					data={data}
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
});

const styles = StyleSheet.create({
	header: {
		flexDirection: "row",
		alignItems: "center",
		gap: 15,
	},
	chip: {
		borderRadius: 50,
		marginLeft: 10,
		justifyContent: "center",
	},
	input: {
		flex: 1,
		backgroundColor: "transparent",
	},
	emptyContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
});
