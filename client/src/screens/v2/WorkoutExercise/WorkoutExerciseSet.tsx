import { BaseButton } from "@/components/BaseButton";
import { BaseCard } from "@/components/BaseCard";
import { BaseText } from "@/components/BaseText";
import { WorkoutExerciseSet } from "@/redux/workoutSlice";
import { useState } from "react";
import { WorkoutExerciseSetField } from "./WorkoutExerciseSetField";
import { BaseChip } from "@/components/BaseChip";
import { BaseMenu } from "@/components/BaseMenu";
import { Keyboard, StyleSheet, View } from "react-native";
import {
  decreaseByAmount,
  convertToNumericInput,
  convertZeroToEmptyString,
  increaseByAmount,
  toFixedSize,
} from "../../../helper/numericFormatter";

interface WorkoutExcerciseWheightAndRepsSetProps {
  index: number;
  data: WorkoutExerciseSet;
  onComplete: ({ weight, reps }: { weight: number; reps: number }) => void;
  onEdit: () => void;
  onDelete: () => void;
}
const MAX_DIGITS = 9;
const WEIGHT_AMOUNT = 2.5;

export function WorkoutExcerciseWheightAndRepsSet(
  props: WorkoutExcerciseWheightAndRepsSetProps,
) {
  const [weight, setWeight] = useState(props.data.weight.toString());
  const [reps, setReps] = useState(props.data.reps.toString());

  function handleChangeWeight(value: string) {
    setWeight((prev) => {
      const formattedValue = value.replace(",", ".");
      return toFixedSize(formattedValue, prev, MAX_DIGITS);
    });
  }
  function handleChangeReps(value: string) {
    setReps((prev) => toFixedSize(value, prev, MAX_DIGITS));
  }

  function handleWeightDecrease() {
    setWeight((currentValue) => decreaseByAmount(currentValue, WEIGHT_AMOUNT));
  }

  function handleWeightIncrease() {
    setWeight((currentValue) => increaseByAmount(currentValue, WEIGHT_AMOUNT));
  }

  function handleRepsDecrease() {
    setReps((currentValue) => decreaseByAmount(currentValue, 1));
  }

  function handleRepsIncrease() {
    setReps((currentValue) => increaseByAmount(currentValue, 1));
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
        <View style={styles.completeSetMenu}>
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
        </View>
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
          value={convertZeroToEmptyString(weight)}
          keyboardType="decimal-pad"
          onChange={handleChangeWeight}
          onIncreasePress={handleWeightIncrease}
          onDecreasePress={handleWeightDecrease}
        />
        <WorkoutExerciseSetField
          label="Reps"
          value={convertZeroToEmptyString(reps)}
          keyboardType="number-pad"
          onChange={handleChangeReps}
          onIncreasePress={handleRepsIncrease}
          onDecreasePress={handleRepsDecrease}
        />
        <BaseButton
          text="Compleate"
          type="rounded"
          onPress={() => {
            const validWeight = convertToNumericInput(weight, 3);
            const validReps = convertToNumericInput(reps);
            props.onComplete({
              weight: validWeight,
              reps: validReps,
            });
            setWeight(validWeight.toString());
            setReps(validReps.toString());
            Keyboard.dismiss();
          }}
        />
      </BaseCard>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  header: {
    width: "100%",
    paddingTop: 4,
    paddingBottom: 4,
    alignItems: "center",
  },
  completeSetMenu: {
    justifyContent: "center",
  },
  menuContainer: {
    alignSelf: "flex-end",
    position: "relative",
    height: 0,
    bottom: 24,
  },
});
