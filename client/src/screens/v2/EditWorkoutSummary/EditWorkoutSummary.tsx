import { BaseButton } from "@/components/BaseButton";
import { ScreenProps } from "@/navigation/routes";
import { updateWorkoutDetails } from "@/redux/workoutSlice";
import { useState } from "react";
import { Keyboard, Pressable, StyleSheet, TextInput, View } from "react-native";
import { useDispatch } from "react-redux";

export function EditWorkoutSummaryScreen(
  props: ScreenProps<"EditWorkoutSummary">,
) {
  const dispatch = useDispatch();
  const [workoutName, setWorkoutName] = useState(
    props.route.params.workoutName,
  );

  function handleWorkoutNameChange(value: string) {
    setWorkoutName(value);
  }

  function handleSave() {
    if (!workoutName.length) {
      return;
    }
    dispatch(
      updateWorkoutDetails({
        workoutId: props.route.params.workoutId,
        newWorkoutName: workoutName,
      }),
    );
    Keyboard.dismiss();
    props.navigation.goBack();
  }

  return (
    <Pressable
      style={styles.container}
      onPress={Keyboard.dismiss}
      accessible={false}
    >
      <View>
        <TextInput
          value={workoutName}
          onChangeText={handleWorkoutNameChange}
          onBlur={Keyboard.dismiss}
        />
        <BaseButton
          text="Save"
          onPress={handleSave}
          disabled={!workoutName.length}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
