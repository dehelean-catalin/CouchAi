import { BaseHorizontalList } from "@/components/BaseHorizontalList";
import { BaseText } from "@/components/BaseText";
import { BaseFloatingButton } from "@/navigation/BaseFloatingButton";
import { ScreenProps } from "@/navigation/routes";
import { RootState } from "@/redux/store";
import { WorkoutExercise, WorkoutState } from "@/redux/workoutSlice";
import { View } from "react-native";
import { useSelector } from "react-redux";

export function WorkoutSummaryScreen(props: ScreenProps<"WorkoutSummary">) {
  const workout = useSelector<RootState, WorkoutState | undefined>((s) =>
    s.workout.workouts.find((w) => w.id === props.route.params.workoutId),
  );
  if (!workout) {
    return null;
  }

  return (
    <View>
      <BaseText text={workout.name} type="primary_18" />
      <BaseText text="Details" type="primary_18" />

      <BaseHorizontalList<WorkoutExercise>
        data={workout.exercises}
        item={({ item }) => (
          <View>
            <BaseText text={item.name} type="primary" />
          </View>
        )}
        emptyComponentText="No exercises"
      />
      {props.route.params.bottomActions?.map((bottomAction, index) => (
        <BaseFloatingButton
          key={index}
          text={bottomAction.label}
          onPress={bottomAction.action}
        />
      ))}
    </View>
  );
}
