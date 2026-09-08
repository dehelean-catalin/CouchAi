import React from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  Text,
  ViewStyle,
} from "react-native";
import { Exercise } from "@/redux/exerciseReducer";
import { WorkoutExerciseCardMenu } from "./WorkoutExerciseCardMenu";
import { Icon } from "@expo/ui";

type WorkoutSessionCardProps = {
  index: number;
  exercise: Exercise;
  onRemove: () => void;
  onReplace: () => void;
};

const replaceIcon = Icon.select({
  ios: "arrow.2.squarepath",
  android: "",
});

const trashIcon = Icon.select({
  ios: "trash",
  android: "",
});

export function WorkoutExerciseCard({
  index,
  exercise,
  onRemove: remove,
  onReplace: replace,
}: WorkoutSessionCardProps) {
  function handleNavigateToSessionSet() {}

  const chipStyle: StyleProp<ViewStyle> = [styles.chip];

  return (
    <View style={styles.container}>
      <Pressable style={styles.details} onPress={handleNavigateToSessionSet}>
        <View style={chipStyle}>
          <Text>{index + 1}</Text>
        </View>
        <View>
          <Text>{exercise.name}</Text>
          <Text>
            {0}/{4} sets completed
          </Text>
        </View>
      </Pressable>

      <WorkoutExerciseCardMenu
        items={[
          {
            label: "Replace",
            icon: replaceIcon,
            action: replace,
          },
          {
            label: "Delete",
            icon: trashIcon,
            action: remove,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderBottomWidth: 1,
    padding: 16,
    gap: 16,
    alignItems: "center",
  },
  details: {
    flexDirection: "row",
    gap: 16,
    flex: 1,
  },
  chip: {
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
});
