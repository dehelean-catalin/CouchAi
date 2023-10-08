import { RootStackParamList } from "@/navigations/BottomTabNavigator";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Pressable } from "react-native";
import { IconButton, Menu } from "react-native-paper";
import { useDispatch } from "react-redux";
import routes from "../constants/routes";
import { deleteExercise } from "../redux/exerciseReducer";

const ExerciseDetailsHeaderRight = () => {
	const { params } =
		useRoute<RouteProp<RootStackParamList, "ExerciseDetails">>();
	const dispatch = useDispatch();
	const navigate = useNavigation<NativeStackNavigationProp<any>>();
	const [visible, setVisible] = useState(false);

	const closeMenu = () => setVisible(false);

	const deleteExerciseItem = () => {
		setVisible(false);
		dispatch(deleteExercise(params.id));
		navigate.goBack();
	};

	const navigateToEditExercise = () =>
		navigate.navigate(routes.CREATE_EXERCISE, { id: params.id });

	return (
		<Pressable style={{ flexDirection: "row" }}>
			<IconButton icon="pencil" size={20} onPress={navigateToEditExercise} />
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
		</Pressable>
	);
};

export default ExerciseDetailsHeaderRight;
