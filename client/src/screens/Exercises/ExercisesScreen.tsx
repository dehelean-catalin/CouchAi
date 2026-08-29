import { RootStackParamList } from "@/navigation/routes";
import { RootState } from "@/redux/store";
import React, { useState } from "react";
import { FlatList, Text, StyleSheet, View, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import ExerciseCard from "./ExerciseCard";
import { Exercise } from "@/redux/exerciseReducer";
import { SafeAreaView } from "react-native-safe-area-context";
import { addExerciseToWorkout } from "@/redux/workoutSlice";

type ExercisesProps = NativeStackScreenProps<
  RootStackParamList,
  "ExerciseList"
>;

function ExercisesScreen(props: ExercisesProps) {
  const dispatch = useDispatch();
  const exercises = useSelector<RootState, Exercise[]>(
    (s) => s.exercises.value,
  );
  const [selectedExercises, setSelectedExercises] = useState<string[]>([]);

  function handleExerciseSelect(id: string, isChecked: boolean) {
    if (!isChecked) {
      setSelectedExercises((prev) => [...prev, id]);
    } else {
      setSelectedExercises((prev) =>
        prev.filter((exerciseId) => exerciseId !== id),
      );
    }
  }

  function handleAddExercise() {
    dispatch(
      addExerciseToWorkout({
        workoutId: props.route.params.workoutId,
        exercises: exercises.filter((exercise) =>
          selectedExercises.includes(exercise.id),
        ),
      }),
    );
    props.navigation.goBack();
  }

  return (
    <SafeAreaView style={{ height: "100%" }}>
      <FlatList<Exercise>
        data={exercises}
        renderItem={({ item }) => (
          <ExerciseCard
            data={item}
            mode={props.route.params.action}
            onSelect={handleExerciseSelect}
          />
        )}
        ListEmptyComponent={
          <View style={styles.notFoundContainer}>
            <Text>Not found</Text>
          </View>
        }
      />
      <View style={styles.addContainer}>
        <Pressable
          style={styles.addButton}
          onPress={handleAddExercise}
          disabled={!selectedExercises.length}
        >
          <Text style={{ color: "white" }}>
            Add exercises ({selectedExercises.length})
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

export default ExercisesScreen;

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
  notFoundContainer: {
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    flex: 1,
  },
  addContainer: {
    flexDirection: "row",
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    bottom: 40,
    width: "100%",
  },
  addButton: {
    backgroundColor: "lightblue",
    padding: 10,
    borderRadius: 4,
  },
});
