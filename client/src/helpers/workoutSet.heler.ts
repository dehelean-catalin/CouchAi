import { WorkoutSet } from "../models/workoutModel";

export const computeWorkoutSets = (workoutSets: WorkoutSet[]) => {
	let maxVal = 0;
	let minVal = 100;

	workoutSets.forEach((set) => {
		maxVal = Math.max(maxVal, set.maxReps);
		minVal = Math.min(minVal, set.minReps);
	});

	const numberOfSets = workoutSets.length;

	const setFormat = numberOfSets === 1 ? " set" : " sets";

	const repsFormat =
		maxVal === 0 && (minVal === 100 || minVal === 0)
			? ""
			: minVal === 1 || maxVal === 1
			? " rep"
			: " reps";

	const minValFormat =
		minVal === 100 || minVal === 0 || minVal === maxVal ? "" : minVal;

	const maxValFormat =
		maxVal === 0
			? ""
			: minVal === 100 || minVal === 0
			? maxVal
			: `x ${maxVal} `;

	return {
		setFormat,
		repsFormat,
		maxValFormat,
		minValFormat,
		numberOfSets,
	};
};
