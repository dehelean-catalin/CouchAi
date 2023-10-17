import { createContext, FC, useState } from "react";
import { Exercise } from "../models/exerciseModel";
import WorkoutPlanFormContext from "./WorkoutPlanFormContext";

type Props = {
	children: JSX.Element;
};

export type ExerciseSelectionState = {
	exercises: { [key: string]: Exercise };
	addExercise: (exercise: Exercise) => void;
	removeExercise: (id: string) => void;
	deleteAllExercises: () => void;
};

export const ExerciseSelectionContext = createContext<ExerciseSelectionState>({
	exercises: {},
	addExercise: () => {},
	removeExercise: () => {},
	deleteAllExercises: () => {},
});

export const ExerciseSelectionContextProvider: FC<Props> = ({ children }) => {
	const [exercises, setExercises] = useState<{ [key: string]: Exercise }>({});

	const addExercise = (newExercise: Exercise) =>
		setExercises((prevExercises) => ({
			...prevExercises,
			[newExercise.id]: newExercise,
		}));

	const removeExercise = (id: string) => {
		setExercises((prevExercises) => {
			const newExercises = { ...prevExercises };
			delete newExercises[id];
			return newExercises;
		});
	};

	const deleteAllExercises = () => setExercises({});

	const contexValue = {
		exercises,
		addExercise,
		removeExercise,
		deleteAllExercises,
	};

	return (
		<ExerciseSelectionContext.Provider value={contexValue}>
			{children}
		</ExerciseSelectionContext.Provider>
	);
};

export default WorkoutPlanFormContext;
