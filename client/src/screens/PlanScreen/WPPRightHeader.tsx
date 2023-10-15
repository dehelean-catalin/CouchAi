import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FC, useState } from "react";
import { Pressable } from "react-native";
import { IconButton, Menu } from "react-native-paper";
import { useDispatch } from "react-redux";
import { deleteWorkoutPlan } from "../../redux/workoutPlanReducer";

const WPPRightHeader: FC<{ id: string }> = ({ id }) => {
	const dispatch = useDispatch();
	const navigation = useNavigation<NativeStackNavigationProp<any>>();
	const [visible, setVisible] = useState(false);

	const closeMenu = () => setVisible(false);

	const onDeletePlan = () => {
		dispatch(deleteWorkoutPlan(id));
		setVisible(false);
		navigation.goBack();
	};

	return (
		<Pressable style={{ flexDirection: "row" }}>
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
				<Menu.Item title="Delete" onPress={onDeletePlan} />
			</Menu>
		</Pressable>
	);
};

export default WPPRightHeader;
