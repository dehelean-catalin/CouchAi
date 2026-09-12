import { NativeStackScreenProps } from "@react-navigation/native-stack";

const routes = {
  HOME: "Home",
  WORKOUT: "Workout",
  WORKOUT_EXERCISE: "WorkoutExercise",
  EXERCISE_LIST: "ExerciseList",
  WORKOUT_SUMMARY: "WorkoutSummary",
  EDIT_WORKOUT_SUMMARY: "EditWorkoutSummary",
  PROFILE: "Profile",

  //not reviewed yeat
  PLAN: "Plan",
  CREATE_PLAN: "CreatePlan",
  CREATE_EXERCISE: "CreateExercise",
  EXERCISE_DETAILS: "ExerciseDetails",
  WORKOUT_PREVIEW: "WorkoutPreview",
  WORKOUT_DAY_PREVIEW: "WorkoutDayPreview",
} as const;

type RouteKeys = keyof typeof routes;
export type RouteValues = (typeof routes)[RouteKeys];

export type ExerciseListAction =
  | { type: "select"; payload: null }
  | {
      type: "replace";
      payload: {
        exercisePosition: number;
        exerciseId: string;
      };
    };

export type RootStackParamList = {
  Home: undefined;
  Workout: { id: string };
  WorkoutExercise: { workoutId: string; exerciseId: string };
  ExerciseList: {
    workoutId?: string;
    action: ExerciseListAction;
  };
  WorkoutSummary: {
    workoutId: string;
    action: "preview" | "review";
  };
  EditWorkoutSummary: {
    workoutId: string;
    workoutName: string;
  };
  Profile: undefined;

  /// not reviewed yeat
  ExerciseDetails: { id: string };
  Plan: undefined;
  CreatePlan: undefined;
  CreateExercise: undefined;
  WorkoutPreview: { id: string };
  WorkoutDayPreview: { id: string; workoutDayId: string };
};

export type ScreenProps<T extends RouteValues> = NativeStackScreenProps<
  RootStackParamList,
  T
>;

export default routes;
