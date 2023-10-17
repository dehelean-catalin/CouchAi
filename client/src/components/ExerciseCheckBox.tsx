import React, { memo, useContext, useState } from "react";
import { Checkbox } from "react-native-paper";
import { ExerciseSelectionContext } from "../context/ExerciseSelectionContext";

const ExerciseCheckBox = ({ data }) => {
	const { addExercise, removeExercise } = useContext(ExerciseSelectionContext);
	const [checked, setChecked] = useState(false);
	return (
		<Checkbox
			status={checked ? "checked" : "unchecked"}
			onPress={() => {
				setChecked(!checked);
				if (checked) {
					removeExercise(data.id);
				} else {
					addExercise(data);
				}
			}}
		/>
	);
};

export default memo(ExerciseCheckBox);
