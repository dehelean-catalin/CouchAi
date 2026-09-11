import { BaseButton } from "@/components/BaseButton";
import { useState } from "react";
import { TextInput, View } from "react-native";

interface WorkoutExcerciseWheightAndRepsSetProps {
  weight: number;
  reps: number;
}

// Check if value is number
// check if negativ number
// new component base button + icon
// keboard dismiss on compleate / click outside / add set
export function WorkoutExcerciseWheightAndRepsSet(
  props: WorkoutExcerciseWheightAndRepsSetProps,
) {
  const [weight, setWeight] = useState(props.weight.toString());
  const [reps, setReps] = useState(props.reps.toString());

  function handleChangeWeight(value: string) {
    setWeight(value);
  }
  function handleWeightDecrease() {
    setWeight((prev) => {
      return (Number(prev) - 2.5).toString();
    });
  }
  function handleChangeReps(value: string) {
    setReps(value);
  }

  return (
    <View>
      <BaseButton
        text="Decrease"
        type="normal"
        onPress={handleWeightDecrease}
      />
      <TextInput
        value={weight}
        onChangeText={handleChangeWeight}
        keyboardType="numeric"
      />
      <BaseButton
        text="Increase"
        type="normal"
        onPress={handleWeightDecrease}
      />
      <TextInput
        value={reps}
        onChangeText={handleChangeReps}
        keyboardType="numeric"
      />
      <BaseButton
        text="Compleate"
        type="normal"
        onPress={handleWeightDecrease}
      />
    </View>
  );
}
