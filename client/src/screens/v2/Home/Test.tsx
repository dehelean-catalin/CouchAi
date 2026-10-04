import React, { useEffect, useLayoutEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  SharedValue,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { WorkoutExerciseCard } from "../Workout/WorkoutExerciseCard";
import { ScrollView } from "@expo/ui";

type Item = { id: string; label: string };
type Positions = Record<string, number>; // item id -> current index

const ITEM_HEIGHT = 72;

type RowProps = {
  item: Item;
  positions: SharedValue<Positions>;
  count: number;
  onDrop: (positions: Positions) => void;
};

function DraggableRow({ item, positions, count, onDrop }: RowProps) {
  const isDragging = useSharedValue(false);
  const dragY = useSharedValue(0); // absolute top while dragging
  const startY = useSharedValue(0);

  const itemStartPosition = positions.value[item.id];

  const pan = Gesture.Pan()
    .activateAfterLongPress(200)
    .onStart(() => {
      isDragging.set(true);
      startY.set(positions.value[item.id] * ITEM_HEIGHT);
      dragY.set(startY.value);
    })
    .onUpdate((e) => {
      dragY.set(startY.value + e.translationY);

      const currentPostion = positions.value[item.id];
      const targetPosition = Math.max(
        0,
        Math.min(count - 1, Math.round(dragY.value / ITEM_HEIGHT)),
      );
      if (targetPosition !== currentPostion) {
        const next = { ...positions.value };

        for (const id in next) {
          if (next[id] === targetPosition) {
            next[id] = currentPostion;
          }
        }
        next[item.id] = targetPosition;
        positions.set(next);
      }
    })
    .onEnd(() => {
      //   dragY.set(
      //     withTiming(itemStartPosition * ITEM_HEIGHT, { duration: 150 }, () =>
      //       isDragging.set(false),
      //     ),
      //   );
      isDragging.set(false);
      runOnJS(onDrop)(positions.value);
    });

  const style = useAnimatedStyle(() => ({
    top: isDragging.get()
      ? dragY.value
      : withTiming(positions.value[item.id] * ITEM_HEIGHT, { duration: 150 }),
    zIndex: isDragging.value ? 1 : 0,
    transform: [{ scale: withTiming(isDragging.value ? 1.1 : 1) }],
    shadowOpacity: withTiming(isDragging.value ? 0.25 : 0),
  }));

  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={[styles.row, style]}>
        <WorkoutExerciseCard index={positions.value[item.id]} exercise={item} />
        <Text style={styles.label}>{item.label}</Text>
      </Animated.View>
    </GestureDetector>
  );
}

export function DraggableList({ items: test }) {
  const [items, setItems] = useState(test);
  const positions = useSharedValue<Positions>(
    Object.fromEntries(items.map((it, i) => [it.id, i])),
  );

  //   useEffect(() => {
  //     setItems(test);
  //     // positions.set(Object.fromEntries(items.map((it, i) => [it.id, i])));
  //   }, [test]);

  const handleDrop = (pos: Positions) => {
    setItems((prev) => [...prev].sort((a, b) => pos[a.id] - pos[b.id]));
  };

  return (
    <GestureHandlerRootView style={styles.root}>
      <Animated.ScrollView style={{ height: items.length * ITEM_HEIGHT }}>
        {items.map((item) => (
          <DraggableRow
            key={item.id}
            item={item}
            positions={positions}
            count={items.length}
            onDrop={handleDrop}
          />
        ))}
      </Animated.ScrollView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, padding: 8, paddingTop: 8, gap: 8 },
  row: {
    position: "absolute",
    left: 0,
    right: 0,
    height: ITEM_HEIGHT - 8,
    // borderWidth: StyleSheet.hairlineWidth,
  },
  label: { fontSize: 16 },
});
