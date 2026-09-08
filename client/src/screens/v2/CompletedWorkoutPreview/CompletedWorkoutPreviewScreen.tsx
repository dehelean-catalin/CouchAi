import { BaseText } from "@/components/BaseText";
import { BaseFloatingButton } from "@/navigation/BaseFloatingButton";
import { RootStackParamList } from "@/navigation/routes";
import { RootState } from "@/redux/store";
import { WorkoutState } from "@/redux/workoutSlice";
import { useAppColors } from "@/theme/useAppColors";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScrollView } from "react-native";
import { useSelector } from "react-redux";

type CompletedWorkoutPreviewProps = NativeStackScreenProps<
  RootStackParamList,
  "CompletedWorkoutPreview"
>;

export function CompletedWorkoutPreview(props: CompletedWorkoutPreviewProps) {
  const { colors } = useAppColors();
  const workout = useSelector<RootState, WorkoutState | undefined>((s) =>
    s.workout.workouts.find(
      (workout) => workout.id === props.route.params.workoutId,
    ),
  );
  if (!workout) {
    return null;
  }

  return (
    <ScrollView style={{ backgroundColor: colors.surface0 }}>
      <BaseText text={workout.name} type="primary_18" />
      {props.route.params.bottomActions?.map((bottomAction, index) => (
        <BaseFloatingButton
          key={index}
          text={bottomAction.label}
          onPress={bottomAction.action}
        />
      ))}
    </ScrollView>
  );
}
