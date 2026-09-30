import { BaseText } from "@/components/BaseText";
import { BaseButton } from "@/components/BaseButton";
import routes, { ScreenProps } from "@/navigation/routes";
import { RootState } from "@/redux/store";
import {
  completeWorkout,
  selectWorkout,
  selectWorkoutSummary,
} from "@/redux/workoutSlice";
import { ScrollView, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { BaseCard } from "@/components/BaseCard";
import { useMemo } from "react";
import {
  calculateWorkoutStats,
  calculateWorkoutDuration,
  formatDuration,
} from "./workoutSummary.bussiness";
import { WorkoutSummaryExercise } from "./WorkoutSummaryExercise";
import { BaseSafeAreaView } from "@/components/BaseSafeArea";

export function WorkoutSummaryScreen(props: ScreenProps<"WorkoutSummary">) {
  const { workoutId } = props.route.params;
  const dispatch = useDispatch();
  const workout = useSelector((s: RootState) => selectWorkout(s, workoutId));
  const workoutSummary = useSelector((s: RootState) =>
    selectWorkoutSummary(s, workoutId),
  );
  const endDate = useMemo(
    () => workout?.endDate || new Date().toISOString(),
    [workout?.endDate],
  );

  function handleSave(id: string, workoutEndDate: string) {
    dispatch(completeWorkout({ workoutId: id, endDate: workoutEndDate }));
    props.navigation.popToTop();
  }

  function handleEditWorkoutDetails({
    id,
    workoutName,
    workoutStartDate,
    workoutEndDate,
  }: {
    id: string;
    workoutName: string;
    workoutStartDate: string;
    workoutEndDate: string;
  }) {
    props.navigation.navigate(routes.EDIT_WORKOUT_SUMMARY, {
      workoutId: id,
      workoutName,
      workoutStartDate,
      workoutEndDate,
    });
  }

  if (!workout) {
    return null;
  }

  if (!workoutSummary) {
    return null;
  }

  const workoutDuration = calculateWorkoutDuration(workout.startDate, endDate);

  return (
    <BaseSafeAreaView>
      <ScrollView>
        <BaseText text={workout.name} type="primary_18" />
        <BaseButton
          text="Edit Name and Date"
          type="normal"
          onPress={() =>
            handleEditWorkoutDetails({
              id: workout.id,
              workoutName: workout.name,
              workoutStartDate: workout.startDate,
              workoutEndDate: endDate,
            })
          }
        />
        <BaseCard flexDirection="column">
          <BaseText text="Statistics" type="primary_18" />
          <View style={styles.statsRow}>
            <View>
              <BaseText text="Duration" type="secondary" />
              <BaseText
                text={formatDuration(workoutDuration)}
                type="primary_bold_16"
              />
            </View>
            <View>
              <BaseText text="Volume" type="secondary" />
              <BaseText
                text={`${calculateWorkoutStats(workoutSummary).totalSets} sets`}
                type="primary_bold_16"
              />
            </View>
            <View>
              <BaseText text="Weight" type="primary" />
              <BaseText
                text={`${calculateWorkoutStats(workoutSummary).totalWeight} kg`}
                type="primary_bold_16"
              />
            </View>
          </View>
        </BaseCard>

        {workoutSummary.map((summary) => {
          return (
            <View key={summary.exercise.id}>
              <View style={styles.sectionHeader}>
                <BaseText
                  type="primary_regular_16"
                  text={summary.exercise.name}
                />
              </View>
              {summary.sets.map((set, index) => (
                <WorkoutSummaryExercise key={set.id} set={set} index={index} />
              ))}
            </View>
          );
        })}
      </ScrollView>
      {props.route.params.action === "preview" && (
        <BaseButton
          text="Save"
          onPress={() => handleSave(workoutId, endDate)}
        />
      )}
    </BaseSafeAreaView>
  );
}

const styles = StyleSheet.create({
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  sectionHeader: {
    marginBottom: 8,
  },
});
