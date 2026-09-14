import { BaseText } from "@/components/BaseText";
import { BaseButton } from "@/components/BaseButton";
import routes, { ScreenProps } from "@/navigation/routes";
import { RootState } from "@/redux/store";
import {
  completeWorkout,
  selectWorkout,
  selectWorkoutSummary,
} from "@/redux/workoutSlice";
import { SectionList, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { BaseCard } from "@/components/BaseCard";
import { useMemo } from "react";
import {
  calculateWorkoutStats,
  calculateWorkoutDuration,
  formatDuration,
} from "./workoutSummary.bussiness";
import { WorkoutSummaryExercise } from "./WorkoutSummaryExercise";
import { useAppColors } from "@/theme/useAppColors";

export function WorkoutSummaryScreen(props: ScreenProps<"WorkoutSummary">) {
  const { workoutId } = props.route.params;
  const { colors } = useAppColors();
  const dispatch = useDispatch();
  const workout = useSelector((s: RootState) => selectWorkout(s, workoutId));
  const workoutSummary = useSelector((s: RootState) =>
    selectWorkoutSummary(s, workoutId),
  );
  const workoutEndDate = useMemo(() => new Date().toISOString(), []);

  function handleSave(id: string, endDate: string) {
    dispatch(completeWorkout({ workoutId: id, endDate }));
    props.navigation.popToTop();
  }

  function handleEditWorkoutDetails(id: string, workoutName: string) {
    props.navigation.navigate(routes.EDIT_WORKOUT_SUMMARY, {
      workoutId: id,
      workoutName,
    });
  }

  if (!workout) {
    return null;
  }

  if (!workoutSummary) {
    return null;
  }

  const workoutDuration = calculateWorkoutDuration(
    workout.startDate,
    workoutEndDate,
  );

  return (
    <View style={styles.container}>
      <BaseText text={workout.name} type="primary_18" />
      <BaseButton
        text="Edit Name and Date"
        type="normal"
        onPress={() => handleEditWorkoutDetails(workout.id, workout.name)}
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

      <SectionList
        sections={workoutSummary.map((workoutExercise) => {
          return {
            title: workoutExercise.exercise.name,
            data: workoutExercise.sets,
          };
        })}
        keyExtractor={(item) => item.id}
        renderItem={({ item: set, index }) => (
          <WorkoutSummaryExercise key={set.id} set={set} index={index} />
        )}
        renderSectionHeader={({ section }) => (
          <View style={styles.sectionHeader}>
            <BaseText type="primary_regular_16" text={section.title} />
          </View>
        )}
        renderSectionFooter={() => (
          <View
            style={[
              styles.sectionFooter,
              { borderColor: colors.surfaceShadow },
            ]}
          ></View>
        )}
      />
      {props.route.params.action === "preview" && (
        <BaseButton
          text="Save"
          onPress={() => handleSave(workoutId, workoutEndDate)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionFooter: {
    borderBottomWidth: 1,
    marginBottom: 8,
  },
});
