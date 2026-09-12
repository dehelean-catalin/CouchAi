import { BaseButton } from "@/components/BaseButton";
import { BaseCard } from "@/components/BaseCard";
import { BaseText } from "@/components/BaseText";
import { WorkoutExerciseSet } from "@/redux/workoutSlice";
import { useState } from "react";
import { WorkoutExerciseSetField } from "./WorkoutExerciseSetField";
import { BaseChip } from "@/components/BaseChip";
import { BaseMenu } from "@/components/BaseMenu";
import { StyleSheet, View } from "react-native";

interface WorkoutExcerciseWheightAndRepsSetProps {
  index: number;
  data: WorkoutExerciseSet;
  onComplete: ({ weight, reps }: { weight: number; reps: number }) => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function WorkoutExcerciseWheightAndRepsSet(
  props: WorkoutExcerciseWheightAndRepsSetProps,
) {
  const [weight, setWeight] = useState(props.data.weight.toString());
  const [reps, setReps] = useState(props.data.reps.toString());

  function handleChangeWeight(value: string) {
    setWeight(value);
  }

  function handleWeightDecrease() {
    setWeight((currentValue) => decreasePositiveValue(currentValue, 2.5));
  }

  function handleWeightIncrease() {
    setWeight((currentValue) => increasePositiveValue(currentValue, 2.5));
  }

  function handleChangeReps(value: string) {
    setReps(value);
  }

  function handleRepsDecrease() {
    setReps((currentValue) => decreasePositiveValue(currentValue, 1));
  }

  function handleRepsIncrease() {
    setReps((currentValue) => increasePositiveValue(currentValue, 1));
  }

  if (props.data.isCompleted) {
    return (
      <BaseCard>
        <BaseChip value={`${props.index + 1}`} type="success" />
        <View style={styles.container}>
          <BaseText
            text={`${weight} kg x ${reps} reps`}
            type="primary_regular_16"
          />
        </View>
        <BaseMenu
          items={[
            { icon: "edit", label: "Edit", action: props.onEdit },
            {
              icon: "trash",
              label: "Delete",
              action: props.onDelete,
            },
          ]}
        />
      </BaseCard>
    );
  }
  return (
    <>
      <BaseCard flexDirection="column">
        <View style={styles.header}>
          <BaseText
            text={`Set ${props.index + 1}`}
            type="primary_bold_16"
            transform="uppercase"
          />

          <View style={styles.menuContainer}>
            <BaseMenu
              items={[
                {
                  icon: "trash",
                  label: "Delete",
                  action: props.onDelete,
                },
              ]}
            />
          </View>
        </View>
        <WorkoutExerciseSetField
          label="Weight"
          value={weight}
          onChange={handleChangeWeight}
          onIncreasePress={handleWeightIncrease}
          onDecreasePress={handleWeightDecrease}
        />
        <WorkoutExerciseSetField
          label="Reps"
          value={reps}
          onChange={handleChangeReps}
          onIncreasePress={handleRepsIncrease}
          onDecreasePress={handleRepsDecrease}
        />
        <BaseButton
          text="Compleate"
          type="rounded"
          onPress={() =>
            props.onComplete({ weight: Number(weight), reps: Number(reps) })
          }
        />
      </BaseCard>
    </>
  );
}

function increasePositiveValue(value: string, amount: number) {
  if (isPositiveNumber(value)) {
    return (Number(value) + amount).toString();
  }
  return value;
}

function decreasePositiveValue(value: string, amount: number) {
  if (isPositiveNumber(value)) {
    const numValue = Number(value);
    if (numValue === 0) {
      return value;
    }
    return (Number(value) - amount).toString();
  }
  return value;
}

function isPositiveNumber(value: string) {
  return (
    value.trim() !== "" && Number.isFinite(Number(value)) && Number(value) >= 0
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: "100%",
    paddingTop: 4,
    paddingBottom: 4,
    alignItems: "center",
  },
  menuContainer: {
    alignSelf: "flex-end",
    position: "relative",
    height: 0,
    bottom: 24,
  },
});
