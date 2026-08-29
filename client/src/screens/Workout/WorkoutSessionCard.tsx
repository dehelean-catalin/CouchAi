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

type WorkoutSessionCardProps = {
  index: number;
  value: Exercise;
};

export function WorkoutSessionCard({ value, index }: WorkoutSessionCardProps) {
  function handleNavigateToSessionSet() {}

  const chipStyle: StyleProp<ViewStyle> = [styles.chip];

  return (
    <Pressable style={styles.container} onPress={handleNavigateToSessionSet}>
      <View style={chipStyle}>
        <Text>{index + 1}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text>{value.name}</Text>
        <Text>
          {0}/{4} sets completed
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderBottomWidth: 1,
    padding: 15,
    gap: 15,
    alignItems: "center",
  },
  chip: {
    borderRadius: 50,
    width: 42,
    height: 42,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
});
