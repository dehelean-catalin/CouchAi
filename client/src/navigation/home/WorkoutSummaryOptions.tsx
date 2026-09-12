import { BaseButton } from "@/components/BaseButton";
import { BaseMenu } from "@/components/BaseMenu";
import { BaseText } from "@/components/BaseText";
import { deleteWorkout } from "@/redux/workoutSlice";
import { useDispatch } from "react-redux";
import { ScreenProps } from "../routes";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";

export function WorkoutSummaryOptions(
  props: ScreenProps<"WorkoutSummary">,
): NativeStackNavigationOptions {
  const defaultProps: NativeStackNavigationOptions = {
    headerTitle: () => <BaseText text="Summary" type="primary_18" />,
    headerLeft: () => (
      <BaseButton text="Back" onPress={() => props.navigation.goBack()} />
    ),
    presentation: "fullScreenModal",
  };

  if (props.route.params.action !== "review") {
    return defaultProps;
  }

  return {
    ...defaultProps,
    headerRight: () => (
      <WorkoutSummaryHeaderOptions
        workoutId={props.route.params.workoutId}
        navigation={props.navigation}
      />
    ),
  };
}

function WorkoutSummaryHeaderOptions(props: {
  navigation: ScreenProps<"WorkoutSummary">["navigation"];
  workoutId: string;
}) {
  const dispatch = useDispatch();
  function handleDeleteWorkout(workoutId: string) {
    dispatch(deleteWorkout(workoutId));
    props.navigation.goBack();
  }

  return (
    <BaseMenu
      items={[
        {
          label: "Delete",
          icon: "trash",
          action: () => handleDeleteWorkout(props.workoutId),
        },
      ]}
    />
  );
}
