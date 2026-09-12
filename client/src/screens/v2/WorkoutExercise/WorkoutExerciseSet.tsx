import { BaseButton } from "@/components/BaseButton";
import { BaseCard } from "@/components/BaseCard";
import { BaseText } from "@/components/BaseText";
import { WorkoutExerciseSet } from "@/redux/workoutSlice";
import { useState } from "react";
import { WorkoutExerciseSetField } from "./WorkoutExerciseSetField";
import { BaseChip } from "@/components/BaseChip";

interface WorkoutExcerciseWheightAndRepsSetProps {
  index: number;
  data: WorkoutExerciseSet;
  onComplete: ({ weight, reps }: { weight: number; reps: number }) => void;
}

// keboard dismiss on compleate / click outside / add set
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
        <BaseText text={`${weight} kg x ${reps} reps`} type="primary" />
      </BaseCard>
    );
  }
  return (
    <>
      <BaseCard>
        <WorkoutExerciseSetField
          label="Weight"
          value={weight}
          onChange={handleChangeWeight}
          onIncreasePress={handleWeightIncrease}
          onDecreasePress={handleWeightDecrease}
        />
      </BaseCard>
      <BaseCard>
        <WorkoutExerciseSetField
          label="Reps"
          value={reps}
          onChange={handleChangeReps}
          onIncreasePress={handleRepsIncrease}
          onDecreasePress={handleRepsDecrease}
        />
      </BaseCard>
      <BaseButton
        text="Compleate"
        type="normal"
        onPress={() =>
          props.onComplete({ weight: Number(weight), reps: Number(reps) })
        }
      />
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
