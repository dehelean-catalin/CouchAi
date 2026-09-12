import React from "react";
import { ScreenProps } from "@/navigation/routes";
import { BaseButton } from "@/components/BaseButton";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  addSetToWorkoutExercise,
  compleateWorkoutSet,
  deleteWorkoutSet,
  editWorkoutSet,
  WorkoutExerciseSet,
} from "@/redux/workoutSlice";
import { WorkoutExcerciseWheightAndRepsSet } from "./WorkoutExerciseSet";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
} from "react-native";

export function WorkoutExerciseScreen(props: ScreenProps<"WorkoutExercise">) {
  const dispatch = useDispatch();
  const sets = useSelector<RootState, WorkoutExerciseSet[] | undefined>(
    (s) => s.workout.sets[props.route.params.exerciseId],
  );

  function handleAddSet(exerciseId: string) {
    dispatch(addSetToWorkoutExercise({ exerciseId }));
  }

  if (!sets) {
    return null;
  }

  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={100}
      >
        <ScrollView
          style={styles.container}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Pressable onPress={Keyboard.dismiss}>
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

            <BaseButton
              text="Add Set"
              type="normal"
              onPress={() => handleAddSet(props.route.params.exerciseId)}
            />
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginTop: 4,
  },
  scrollContent: {
    paddingBottom: 20,
  },
});
