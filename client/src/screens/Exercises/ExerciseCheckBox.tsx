import { Exercise } from "@/redux/exerciseReducer";
import Checkbox from "expo-checkbox";
import React, { FC, useState } from "react";
import { View } from "react-native";

type Props = {
  data: Exercise;
  onSelect?: (isChecked: boolean) => void;
};

const ExerciseCheckBox: FC<Props> = ({ data, onSelect: select }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckPress = () => {
    setIsChecked((value) => !value);
    select?.(isChecked);
  };

  return (
    <View style={{ padding: 16 }}>
      <Checkbox value={isChecked} onValueChange={handleCheckPress} />
    </View>
  );
};

export default ExerciseCheckBox;
