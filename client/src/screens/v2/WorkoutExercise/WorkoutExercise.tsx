import React from "react";
import { View } from "react-native";
import { ScreenProps } from "@/navigation/routes";
import { BaseText } from "@/components/BaseText";

export function WorkoutExerciseScreen(props: ScreenProps<"WorkoutExercise">) {
  return (
    <View>
      <BaseText text="Workout Exercise" type="primary" />
    </View>
  );
}
