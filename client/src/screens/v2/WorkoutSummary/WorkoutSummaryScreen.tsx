import { BaseHorizontalList } from "@/components/BaseHorizontalList";
import { BaseText } from "@/components/BaseText";
import { BaseButton } from "@/components/BaseButton";
import routes, { ScreenProps } from "@/navigation/routes";
import { RootState } from "@/redux/store";
import {
  completeWorkout,
  WorkoutExercise,
  WorkoutState,
} from "@/redux/workoutSlice";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export function WorkoutSummaryScreen(props: ScreenProps<"WorkoutSummary">) {
  const dispatch = useDispatch();
  const workout = useSelector<RootState, WorkoutState | undefined>((s) =>
    s.workout.workouts.find((w) => w.id === props.route.params.workoutId),
  );

  function handleSave() {
    dispatch(completeWorkout(props.route.params.workoutId));
    props.navigation.popToTop();
  }

  function handleEditWorkoutDetails(workoutId: string, workoutName: string) {
    props.navigation.navigate(routes.EDIT_WORKOUT_SUMMARY, {
      workoutId,
      workoutName,
    });
  }

  if (!workout) {
    return null;
  }

  return (
    <View>
      <BaseText text={workout.name} type="primary_18" />
      <BaseText text="Details" type="primary_18" />
      <BaseButton
        text="Edit Name and Date"
        type="normal"
        onPress={() => handleEditWorkoutDetails(workout.id, workout.name)}
      />

      <BaseHorizontalList<WorkoutExercise>
        data={workout.exercises}
        item={({ item }) => (
          <View>
            <BaseText text={item.name} type="primary" />
          </View>
        )}
        emptyComponentText="No exercises"
      />
      {props.route.params.action === "preview" && (
        <BaseButton text="Save" onPress={handleSave} />
      )}
    </View>
  );
}
