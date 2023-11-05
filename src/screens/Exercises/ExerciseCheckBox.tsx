import { workoutFormActions } from "@/redux/workoutFormReducer";
import React, { memo, useState } from "react";
import { Checkbox } from "react-native-paper";
import { useDispatch } from "react-redux";

const ExerciseCheckBox = ({ data }) => {
	const dispatch = useDispatch();
	const [checked, setChecked] = useState(false);
	return (
		<Checkbox
			status={checked ? "checked" : "unchecked"}
			onPress={() => {
				setChecked(!checked);
				if (checked) {
					dispatch(workoutFormActions.removeExercise(data.id));
				} else {
					dispatch(workoutFormActions.addExercise(data));
				}
			}}
		/>
	);
};

export default memo(ExerciseCheckBox);
