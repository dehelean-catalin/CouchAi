import { RootStackParamList } from "@/constant/routes";
import { Exercise } from "@/model/exerciseModel";
import { activeWorkoutSessionActions } from "@/redux/activeWorkoutSessionReducer";
import { workoutFormActions } from "@/redux/workoutFormReducer";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { FC, memo, useState } from "react";
import { Checkbox } from "react-native-paper";
import { useDispatch } from "react-redux";

type Props = {
	data: Exercise;
};

const ExerciseCheckBox: FC<Props> = ({ data }) => {
	const dispatch = useDispatch();
	const { navigate, goBack } = useNavigation<StackNavigationProp<any>>();
	const { params } = useRoute<RouteProp<RootStackParamList, "Exercises">>();
	const [checked, setChecked] = useState(false);

	const handleCheckPress = () => {
		setChecked(!checked);
		if (params.replaceExerciseId) {
			dispatch(
				activeWorkoutSessionActions.replaceExercise({
					id: params.id,
					exerciseId: params.replaceExerciseId,
					exercise: data,
				})
			);
			goBack();
		} else if (params.session) {
			checked
				? dispatch(activeWorkoutSessionActions.removeExercise(data.id))
				: dispatch(activeWorkoutSessionActions.addExercise(data));
		} else if (checked) {
			dispatch(workoutFormActions.removeExercise(data.id));
		} else {
			dispatch(workoutFormActions.addExercise(data));
		}
	};

	return (
		<Checkbox
			status={checked ? "checked" : "unchecked"}
			onPress={handleCheckPress}
		/>
	);
};

export default memo(ExerciseCheckBox);
