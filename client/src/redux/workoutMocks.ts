import { WorkoutExerciseSet, WorkoutState } from "./workoutSlice";

export function SetBuilder() {
  const set: WorkoutExerciseSet = {
    id: "set-1",
    reps: 10,
    weight: 10,
    isCompleted: false,
  };

  return {
    setId(id: string) {
      set.id = id;
      return this;
    },
    withWeight(weight: number) {
      set.weight = weight;
      return this;
    },
    withReps(reps: number) {
      set.reps = reps;
      return this;
    },
    isCompleted(isCompleted: boolean) {
      set.isCompleted = isCompleted;
      return this;
    },
    build() {
      return { ...set };
    },
  };
}

export function WorkoutBuilder() {
  const workout: WorkoutState = {
    id: "workout-1",
    planId: "plan-1",
    name: "Push Day",
    status: "in-progress",
    startDate: "2026-09-14T17:00:00.000Z",
    endDate: "",
    notes: "",
    exercises: [],
  };

  return {
    withId(id: string) {
      workout.id = id;
      return this;
    },
    withStatus(status: WorkoutState["status"]) {
      workout.status = status;
      return this;
    },
    withName(name: string) {
      workout.name = name;
      return this;
    },
    withPlanId(planId: string) {
      workout.planId = planId;
      return this;
    },
    withStartDate(startDate: string) {
      workout.startDate = startDate;
      return this;
    },
    withEndDate(endDate: string) {
      workout.endDate = endDate;
      return this;
    },
    build() {
      return { ...workout };
    },
  };
}
