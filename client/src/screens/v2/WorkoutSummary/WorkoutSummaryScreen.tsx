import { BaseText } from "@/components/BaseText";
import { BaseButton } from "@/components/BaseButton";
import routes, { ScreenProps } from "@/navigation/routes";
import { RootState } from "@/redux/store";
import {
  completeWorkout,
  selectWorkout,
  selectWorkoutSummary,
} from "@/redux/workoutSlice";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { BaseCard } from "@/components/BaseCard";
import { useMemo } from "react";
import { calculateWorkoutStats } from "./workoutSummary.bussiness";
import { WorkoutSummaryExercise } from "./WorkoutSummaryExercise";
import { BaseSafeAreaView } from "@/components/BaseSafeArea";
import {
  calculateDuration,
  formatDate,
  formatDuration,
} from "@/helper/dateFormatter";
import { BaseIcon } from "@/components/icons";
import { useAppColors } from "@/theme/useAppColors";

export function WorkoutSummaryScreen(props: ScreenProps<"WorkoutSummary">) {
  const { workoutId } = props.route.params;
  const { colors } = useAppColors();
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

  const workoutDuration = calculateDuration(workout.startDate, endDate);

  return (
    <BaseSafeAreaView>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.title}>
            <BaseText text={workout.name} type="primary_bold_24" />
            <Pressable
              onPress={() =>
                handleEditWorkoutDetails({
                  id: workout.id,
                  workoutName: workout.name,
                  workoutStartDate: workout.startDate,
                  workoutEndDate: endDate,
                })
              }
              style={styles.editIcon}
            >
              <BaseIcon name="edit" />
            </Pressable>
          </View>

          <View style={styles.dateContainer}>
            <BaseIcon name="calendar" />
            <BaseText text={formatDate(endDate, false)} type="secondary" />
          </View>
        </View>

        <BaseCard flexDirection="column">
          <View style={styles.statsRow}>
            <View
              style={[
                styles.statsItem,
                styles.statsItemBorder,
                { borderColor: colors.surfaceShadow },
              ]}
            >
              <BaseText text="Duration" type="secondary" />
              <BaseText
                text={formatDuration(workoutDuration)}
                type="primary_bold_24"
              />
            </View>
            <View
              style={[
                styles.statsItem,
                styles.statsItemBorder,
                { borderColor: colors.surfaceShadow },
              ]}
            >
              <BaseText text="Volume" type="secondary" />
              <BaseText
                text={`${calculateWorkoutStats(workoutSummary).totalSets} sets`}
                type="primary_bold_24"
              />
            </View>
            <View style={styles.statsItem}>
              <BaseText text="Weight" type="secondary" />
              <BaseText
                text={`${calculateWorkoutStats(workoutSummary).totalWeight} kg`}
                type="primary_bold_24"
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
              <View style={styles.setContainer}>
                {summary.sets.length > 0 ? (
                  summary.sets.map((set, index) => (
                    <WorkoutSummaryExercise
                      key={set.id}
                      set={set}
                      index={index}
                    />
                  ))
                ) : (
                  <BaseText text="No completed sets" type="secondary" />
                )}
              </View>
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
  header: {
    paddingTop: 8,
    marginBottom: 16,
  },
  title: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  editIcon: {
    height: 32,
    width: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  dateContainer: {
    flexDirection: "row",
    gap: 4,
  },
  statsRow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  statsItem: {
    marginRight: 16,
    gap: 4,
  },
  statsItemBorder: {
    paddingRight: 20,
    borderRightWidth: 1,
  },
  sectionHeader: {
    paddingTop: 12,
    paddingBottom: 12,
  },
  setContainer: {
    gap: 8,
  },
});
