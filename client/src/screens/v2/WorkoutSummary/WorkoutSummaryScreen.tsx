import { BaseText } from "@/components/BaseText";
import { BaseButton } from "@/components/BaseButton";
import routes, { ScreenProps } from "@/navigation/routes";
import { RootState } from "@/redux/store";
import {
  completeWorkout,
  generateRandomId,
  performAgainThisWorkout,
} from "@/redux/workoutSlice";
import { ScrollView, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { BaseCard } from "@/components/BaseCard";
import { useMemo } from "react";
import { WorkoutSummaryExercise } from "./WorkoutSummaryExercise";
import { BaseSafeAreaView } from "@/components/BaseSafeArea";
import {
  formatTimestamp,
  calculateTimestampInSeconds,
  formatDate,
} from "@/helper/dateFormatter";
import { BaseIcon } from "@/components/icons";
import { useAppColors } from "@/theme/useAppColors";
import {
  calculateDeltaForSets,
  calculateDeltaForWeight,
  calculateWorkoutVolume,
} from "@/helper/workoutFormatter";
import { WorkoutSummaryStat } from "./WorkoutSummaryStat";
import {
  selectParentWorkoutSummary,
  selectWorkout,
  selectWorkoutSummary,
} from "@/redux/workoutSelector";

export function WorkoutSummaryScreen(props: ScreenProps<"WorkoutSummary">) {
  const { workoutId } = props.route.params;
  const dispatch = useDispatch();
  const workout = useSelector((s: RootState) => selectWorkout(s, workoutId));
  const workoutSummary = useSelector((s: RootState) =>
    selectWorkoutSummary(s, workoutId),
  );
  const parentWorkoutSummary = useSelector((s: RootState) =>
    selectParentWorkoutSummary(s, props.route.params.parentId),
  );
  const endDate = useMemo(
    () => workout?.endDate || new Date().toISOString(),
    [workout?.endDate],
  );

  function handleSave(id: string, workoutEndDate: string) {
    dispatch(completeWorkout({ workoutId: id, endDate: workoutEndDate }));
    props.navigation.popToTop();
  }

  function handlePerformAgain(originalWorkoutId: string, newWorkoutId: string) {
    dispatch(
      performAgainThisWorkout({
        originalWorkoutId,
        newWorkoutId,
      }),
    );
    props.navigation.replace(routes.WORKOUT, {
      id: newWorkoutId,
      parentId: originalWorkoutId,
    });
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

  const timeStamp = formatTimestamp(
    calculateTimestampInSeconds(workout.startDate, endDate),
  );
  const { totalSets, totalWeight } = calculateWorkoutVolume(workoutSummary);

  const { totalSets: parentTotalSets, totalWeight: parentTotalWeight } =
    parentWorkoutSummary
      ? calculateWorkoutVolume(parentWorkoutSummary)
      : { totalSets: null, totalWeight: null };

  const deltaSets = calculateDeltaForSets(totalSets, parentTotalSets);
  const deltaWeight = calculateDeltaForWeight(totalWeight, parentTotalWeight);

  return (
    <BaseSafeAreaView>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.title}>
            <BaseText
              text={workout.name}
              type="primary_bold_24"
              numberOfLines={2}
            />
            <View style={styles.dateContainer}>
              <BaseIcon name="calendar" />
              <BaseText text={formatDate(endDate, false)} type="secondary" />
            </View>
          </View>
          <BaseButton
            leftIcon="edit"
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
        </View>

        <BaseCard flexDirection="column">
          <View style={styles.statsRow}>
            <WorkoutSummaryStat
              label="Duration"
              value={timeStamp}
              fixedWidth={false}
              progress={0}
              symbol="percentage"
            />
            <Divider />
            <WorkoutSummaryStat
              label="Volume"
              value={`${totalSets} ${totalSets === 1 ? "set" : "sets"}`}
              progress={deltaSets}
              fixedWidth={true}
            />
            <Divider />
            <WorkoutSummaryStat
              label="Weight"
              value={`${totalWeight} kg`}
              fixedWidth={true}
              progress={deltaWeight}
              symbol="percentage"
            />
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
                  <BaseCard>
                    <BaseText text="No sets logged" type="secondary" />
                  </BaseCard>
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
      {props.route.params.action === "review" && (
        <BaseButton
          text="Perform Again"
          onPress={() => handlePerformAgain(workoutId, generateRandomId())}
        />
      )}
    </BaseSafeAreaView>
  );
}

function Divider() {
  const { colors } = useAppColors();
  return (
    <View style={[styles.divier, { backgroundColor: colors.surfaceShadow }]} />
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingTop: 8,
    marginBottom: 16,
  },
  title: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    marginBottom: 4,
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
  sectionHeader: {
    paddingTop: 12,
    paddingBottom: 12,
  },
  setContainer: {
    gap: 8,
  },
  divier: {
    height: "100%",
    minWidth: 1,
  },
});
