import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Exercise } from "@/redux/exerciseReducer";
import { Image } from "expo-image";
import ExerciseCheckBox from "./ExerciseCheckBox";

type CardProps = {
  data: Exercise;
  mode?: "view" | "select";
  onSelect?: (id: string, isChecked: boolean) => void;
};

function Card({ data, mode, onSelect: select }: CardProps) {
  const initialLetter = data.name.slice(0, 1).toUpperCase();

  return (
    <Pressable style={styles.card}>
      {data.thumbnailUrl ? (
        <Image source={data.thumbnailUrl} style={styles.tinyLogo} />
      ) : (
        <View style={styles.imageContainer}>
          <Text style={styles.initial}>{initialLetter}</Text>
        </View>
      )}
      <View style={styles.column}>
        <Text style={styles.title}>{data.name}</Text>
        <Text style={styles.content}>
          {data.primaryMuscleGroups.map(({ name }) => name).join(", ")}
        </Text>
      </View>
      {mode === "select" && (
        <ExerciseCheckBox
          data={data}
          onSelect={(isChecked) => select?.(data.id, isChecked)}
        />
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
  title: { fontSize: 16 },
  content: {
    color: "gray",
    marginTop: 2,
    fontSize: 14,
  },
  column: {
    flex: 1,
    justifyContent: "center",
  },
  tinyLogo: {
    width: 90,
    height: 90,
  },
  imageContainer: {
    width: 80,
    height: 80,
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  initial: {
    fontSize: 20,
    color: "gray",
  },
  checkBoxContainer: {
    justifyContent: "center",
    padding: 4,
  },
});

export default Card;
