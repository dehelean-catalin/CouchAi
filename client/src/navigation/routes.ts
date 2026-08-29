const routes = {
  HOME: "Home",
  WORKOUT: "Workout",
  EXERCISE_LIST: "ExerciseList",

  //not reviewed yeat
  PLAN: "Plan",
  CREATE_PLAN: "CreatePlan",
  CREATE_EXERCISE: "CreateExercise",
  EXERCISE_DETAILS: "ExerciseDetails",
  WORKOUT_SESSION_SET: "Workout Session Set",
  WORKOUT_PREVIEW: "WorkoutPreview",
  WORKOUT_DAY_PREVIEW: "WorkoutDayPreview",
} as const;

type RouteKeys = keyof typeof routes;
export type RouteValues = (typeof routes)[RouteKeys];

export type ExeriseListMode = "select" | undefined;

export type RootStackParamList = {
  Home: undefined;
  Workout: { id: string };
  ExerciseList: { workoutId?: string; action: ExeriseListMode };

  /// not reviewed yeat
  ExerciseDetails: { id: string };
  Plan: undefined;
  CreatePlan: undefined;
  CreateExercise: undefined;
  WorkoutPreview: { id: string };
  WorkoutSessionSet: { id: string; workoutId: string };
  WorkoutDayPreview: { id: string; workoutDayId: string };
};

export default routes;
