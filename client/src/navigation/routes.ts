import { IconName } from "@expo/ui";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

const routes = {
  HOME: "Home",
  WORKOUT: "Workout",
  EXERCISE_LIST: "ExerciseList",
  WORKOUT_SUMMARY: "WorkoutSummary",

  //not reviewed yeat
  PLAN: "Plan",
  CREATE_PLAN: "CreatePlan",
  CREATE_EXERCISE: "CreateExercise",
  EXERCISE_DETAILS: "ExerciseDetails",
  WORKOUT_SESSION_SET: "WorkoutSessionSet",
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
      };
    };

export type RootStackParamList = {
  Home: undefined;
  Workout: { id: string; name: string };
  ExerciseList: {
    workoutId?: string;
    action: ExerciseListAction;
  };
  WorkoutSummary: {
    workoutId: string;
    bottomActions?: { label: string; action: () => void }[];
    headerOptions?: { label: string; icon: IconName; action: () => void }[];
  };
  /// not reviewed yeat
  ExerciseDetails: { id: string };
  Plan: undefined;
  CreatePlan: undefined;
  CreateExercise: undefined;
  WorkoutPreview: { id: string };
  WorkoutSessionSet: { id: string; workoutId: string };
  WorkoutDayPreview: { id: string; workoutDayId: string };
};

export type ScreenProps<T extends RouteValues> = NativeStackScreenProps<
  RootStackParamList,
  T
>;

export default routes;
