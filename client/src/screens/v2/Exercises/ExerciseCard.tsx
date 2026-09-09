import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Exercise } from "@/redux/exerciseReducer";
import { Image } from "expo-image";
import { ExerciseCheckBox } from "./ExerciseCheckBox";
import { ExerciseListAction } from "../../../navigation/routes";
import { BaseText } from "@/components/BaseText";
import { useAppColors } from "@/theme/useAppColors";

type CardProps = {
  data: Exercise;
  actionType: ExerciseListAction["type"];
  onSelect?: (id: string, isChecked: boolean) => void;
  onReplace?: (id: string) => void;
};

function Card({
  data,
  actionType,
  onSelect: select,
  onReplace: replace,
}: CardProps) {
  const { colors } = useAppColors();
  const initialLetter = data.name.slice(0, 1).toUpperCase();

  return (
    <Pressable style={styles.card}>
      {!data.thumbnailUrl ? (
        <Image source={data.thumbnailUrl} style={styles.tinyLogo} />
      ) : (
        <View
          style={[styles.emptyTumbnail, { backgroundColor: colors.surface1 }]}
        >
          <BaseText text={initialLetter} type="primary_18" />
        </View>
      )}
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
  tinyLogo: {
    width: 90,
    height: 90,
  },
  emptyTumbnail: {
    width: 90,
    height: 90,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Card;
