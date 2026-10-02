import React from "react";
import { ScreenProps } from "@/navigation/routes";
import { BaseButton } from "@/components/BaseButton";
import { useDispatch, useSelector } from "react-redux";
import {
  addSetToWorkoutExercise,
  compleateWorkoutSet,
  deleteWorkoutSet,
  editWorkoutSet,
  selectSetsForExercise,
} from "@/redux/workoutSlice";
import { WorkoutExcerciseWheightAndRepsSet } from "./WorkoutExerciseSet";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { BaseIcon } from "@/components/icons";
import { BaseText } from "@/components/BaseText";
import { BaseThumbnail } from "@/components/BaseThumbnail";
import { RootState } from "@/redux/store";
import { BaseSafeAreaView } from "@/components/BaseSafeArea";

export function WorkoutExerciseScreen(props: ScreenProps<"WorkoutExercise">) {
  const dispatch = useDispatch();
  const sets = useSelector((s: RootState) =>
    selectSetsForExercise(s, props.route.params.exerciseId),
  );

  function handleAddSet(exerciseId: string) {
    dispatch(addSetToWorkoutExercise({ exerciseId }));
  }

  if (!sets || sets?.length === 0) {
    return null;
  }

  return (
    <BaseSafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={100}
        style={styles.container}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Pressable
            onPress={Keyboard.dismiss}
            style={styles.scrollViewContent}
          >
            <View style={styles.header}>
              <View style={styles.thumbnailContainer}>
                <BaseThumbnail
                  thumbnailUrl={props.route.params.thumbnailUrl}
                  name={props.route.params.exerciseName}
                />
              </View>
              <View style={styles.headerContent}>
                <BaseText
                  text={props.route.params.exerciseName}
                  type="primary_regular_16"
                />
                <BaseText text="Rest Time" type="secondary" />
              </View>
            </View>
            <View style={styles.setListContainer}>
              {sets.map((set, index) => {
                const { exerciseId } = props.route.params;
                return (
                  <WorkoutExcerciseWheightAndRepsSet
                    key={set.id}
                    data={set}
                    index={index}
                    onComplete={({ weight, reps }) =>
                      dispatch(
                        compleateWorkoutSet({
                          weight,
                          reps,
                          setId: set.id,
                          exerciseId,
                        }),
                      )
                    }
                    onEdit={() =>
                      dispatch(editWorkoutSet({ exerciseId, setId: set.id }))
                    }
                    onDelete={() =>
                      dispatch(deleteWorkoutSet({ exerciseId, setId: set.id }))
                    }
                  />
                );
              })}
            </View>
            <View style={styles.addButtonContainer}>
              <BaseIcon name="plus" />
              <BaseButton
                text="Add Set"
                type="normal"
                onPress={() => handleAddSet(props.route.params.exerciseId)}
              />
            </View>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </BaseSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 12,
  },
  headerContent: {
    gap: 2,
  },
  thumbnailContainer: {
    borderRadius: 12,
  },
  setListContainer: {
    gap: 8,
  },
  addButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollViewContent: {
    marginBottom: 240,
  },
});
