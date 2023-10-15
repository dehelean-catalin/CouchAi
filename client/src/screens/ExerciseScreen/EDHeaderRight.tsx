import { Exercise } from "@/models/exerciseModel";
import { RootState } from "@/redux/store";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Pressable } from "react-native";
import { IconButton, Menu } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import routes, { RootStackParamList } from "../../constants/routes";
import { deleteExercise } from "../../redux/exerciseReducer";

const EDHeaderRight = () => {
	const dispatch = useDispatch();
	const { params } =
		useRoute<RouteProp<RootStackParamList, "ExerciseDetails">>();
	const navigation = useNavigation<NativeStackNavigationProp<any>>();
	const data = useSelector<RootState, Exercise | undefined>(
		(s) => s.exercise.value[params?.id]
	);

	const [visible, setVisible] = useState(false);

	const closeMenu = () => setVisible(false);

	const deleteExerciseItem = () => {
		setVisible(false);
		dispatch(deleteExercise(params.id));
		navigation.goBack();
	};

	const navigateToEditExercise = () =>
		navigation.navigate(routes.CREATE_EXERCISE, { id: params.id });

	if (!data) return;

	return (
		<Pressable style={{ flexDirection: "row" }}>
			{data.custom && (
				<IconButton icon="pencil" size={20} onPress={navigateToEditExercise} />
			)}
			{data.custom && (
				<Menu
					visible={visible}
					onDismiss={closeMenu}
					anchor={
						<IconButton
							icon="dots-vertical"
							size={20}
							onPress={() => setVisible(true)}
						/>
					}
				>
					<Menu.Item title="Delete" onPress={deleteExerciseItem} />
				</Menu>
			)}
		</Pressable>
	);
};

export default EDHeaderRight;
