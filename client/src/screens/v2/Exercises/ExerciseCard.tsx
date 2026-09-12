import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Exercise } from "@/redux/exerciseReducer";
import { ExerciseCheckBox } from "./ExerciseCheckBox";
import { ExerciseListAction } from "../../../navigation/routes";
import { BaseText } from "@/components/BaseText";
import { BaseThumbnail } from "@/components/BaseThumbnail";

type CardProps = {
  data: Exercise;
  actionType: ExerciseListAction["type"];
  onSelect?: (id: string, isChecked: boolean) => void;
  onReplace?: (id: string) => void;
};

export function ExerciseCard({
  data,
  actionType,
  onSelect: select,
  onReplace: replace,
}: CardProps) {
  return (
    <Pressable style={styles.card}>
      <BaseThumbnail thumbnailUrl={data.thumbnailUrl} name={data.name} />
      <View style={styles.column}>
        <BaseText text={data.name} type="primary" />
        <BaseText
          text={data.primaryMuscleGroups.map(({ name }) => name).join(", ")}
          type="secondary"
        />
      </View>
      {actionType === "select" && (
        <ExerciseCheckBox
          onSelect={(isChecked) => select?.(data.id, isChecked)}
        />
      )}
      {actionType === "replace" && (
        <ExerciseCheckBox onSelect={() => replace?.(data.id)} />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    padding: 2,
  },
  column: {
    flex: 1,
    justifyContent: "center",
  },
});
