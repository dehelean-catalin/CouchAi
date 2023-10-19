const routes = {
	PLAN: "Plan",
	CREATE_PLAN: "Create_plan",
	EXERCISE: "Exercise",
	CREATE_EXERCISE: "Create exercise",
	EXERCISE_DETAILS: "Exercise details",
	HOME: "Home",
	WORKOUT_SESION: "Workout Sesion",
	WORKOUT_PREVIEW: "Workout Preview",
} as const;

type RouteKeys = keyof typeof routes;
export type RouteValues = (typeof routes)[RouteKeys];

export type RootStackParamList = {
	Home: undefined;
	Exercises: { id: string };
	ExerciseDetails: { id: string };
	CreateExercise: undefined;
	WorkoutPreview: { id: string };
};

export default routes;
