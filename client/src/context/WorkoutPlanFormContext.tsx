import { FC, createContext, useContext, useState } from "react";
import uuid from "react-native-uuid";
import { WorkoutExercise, WorkoutPlan } from "../models/workoutModel";
import { ExerciseSelectionContext } from "./ExerciseSelectionContext";

type Props = {
	children: JSX.Element;
};

export type WorkooutPlanFormState = {
	workoutPlan: WorkoutPlan;
	setWorkoutName: (name: string) => void;
	createWorkoutDay: () => void;

	deleteByIdWorkoutExercise: (id: string, workoutId: string) => void;
	addWorkoutExercises: (id: string) => void;
};

export const WorkoutPlanFormContext = createContext<WorkooutPlanFormState>({
	workoutPlan: null,
	setWorkoutName: (name: string) => {},
	createWorkoutDay: () => {},
	deleteByIdWorkoutExercise: (id, workoutId) => {},
	addWorkoutExercises: () => {},
});

export const WorkoutPlanFormContextProvider: FC<Props> = ({ children }) => {
	const id = uuid.v4().toString();
	const itemId = uuid.v4().toString();
	const { exercises, deleteAllExercises } = useContext(
		ExerciseSelectionContext
	);
	const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan>({
		id,
		name: "",
		thumbnailURL: "",
		description: "",
		workoutDays: {
			[itemId]: {
				id: itemId,
				name: "",
				exercises: {},
			},
		},
	});

	const setWorkoutName = (name: string) => {
		setWorkoutPlan({ ...workoutPlan, name });
	};

	const createWorkoutDay = () => {
		const id = uuid.v4().toString();

		setWorkoutPlan({
			...workoutPlan,
			workoutDays: {
				...workoutPlan.workoutDays,
				[id]: { id: id, name: "", exercises: {} },
			},
		});
	};

	const addWorkoutExercises = (workoutId: string) => {
		let newWorkoutExercise: { [key: string]: WorkoutExercise } = {};

		Object.values(exercises).forEach((exercise) => {
			const id = uuid.v4().toString();
			newWorkoutExercise[id] = {
				id,
				exercise,
				workoutSets: [
					{
						id: uuid.v4().toString(),
						minReps: 0,
						maxReps: 0,
						restTime: 90,
						rir: null,
						untilFailure: false,
						warmUp: false,
					},
				],
			};
		});

		setWorkoutPlan({
			...workoutPlan,
			workoutDays: {
				...workoutPlan.workoutDays,
				[workoutId]: {
					...workoutPlan.workoutDays[workoutId],
					exercises: {
						...workoutPlan.workoutDays[workoutId].exercises,
						...newWorkoutExercise,
					},
				},
			},
		});
		deleteAllExercises();
	};

	const deleteByIdWorkoutExercise = (id: string, exerciseId: string) => {
		const newObj = { ...workoutPlan };
		delete newObj.workoutDays[id].exercises[exerciseId];

		setWorkoutPlan(newObj);
	};

	const contexValue = {
		workoutPlan,
		setWorkoutName,
		createWorkoutDay,
		deleteByIdWorkoutExercise,
		addWorkoutExercises,
	};

	return (
		<WorkoutPlanFormContext.Provider value={contexValue}>
			{children}
		</WorkoutPlanFormContext.Provider>
	);
};

export default WorkoutPlanFormContext;
