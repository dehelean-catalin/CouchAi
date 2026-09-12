import { useAppColors } from "@/theme/useAppColors";
import { Checkbox } from "expo-checkbox";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

type ExerciseCheckBoxProps = {
  onSelect?: (isChecked: boolean) => void;
};

export function ExerciseCheckBox({ onSelect: select }: ExerciseCheckBoxProps) {
  const { colors } = useAppColors();
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckPress = () => {
    setIsChecked((value) => !value);
    select?.(isChecked);
  };

  return (
    <View style={styles.container}>
      <Checkbox
        value={isChecked}
        onValueChange={handleCheckPress}
        color={colors.blue_0}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});
