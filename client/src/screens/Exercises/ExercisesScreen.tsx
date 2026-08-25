import { RootStackParamList, RouteValues } from "@/constant/routes";
import { Exercise } from "@/model/exerciseModel";
import { RootState } from "@/redux/store";
import React, { useState } from "react";
import { FlatList, Text, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type ExercisesProps = NativeStackScreenProps<
  RootStackParamList,
  "ExerciseList"
>;

function ExercisesScreen(props: ExercisesProps) {
  const data = useSelector<RootState, Record<string, Exercise>>(
    (s) => s.exercise.value,
  );

  const exercises = Object.values(data);

  if (!exercises.length) {
    return (
      <View>
        <Text>No exercise found</Text>
      </View>
    );
  }

  return (
    <FlatList<Exercise>
      data={exercises}
      ListHeaderComponent={<View style={[styles.searchContainer]}></View>}
      renderItem={() => <View></View>}
      contentContainerStyle={{ flexGrow: 1 }}
      ListEmptyComponent={
        <View style={styles.notFoundContainer}>
          <Text>Not found</Text>
        </View>
      }
      stickyHeaderIndices={[0]}
    />
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
    bottom: 0,
    width: "100%",
    padding: 10,
    gap: 10,
  },
  addButton: {
    flex: 1,
  },
});
