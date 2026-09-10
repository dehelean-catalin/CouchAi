import { BaseButton } from "@/components/BaseButton";
import { BaseIcon } from "@/components/icons";
import { BaseText } from "@/components/BaseText";
import { ScreenProps } from "@/navigation/routes";
import { updateWorkoutDetails } from "@/redux/workoutSlice";
import { useAppColors } from "@/theme/useAppColors";
import { useState } from "react";
import { Keyboard, Pressable, StyleSheet, TextInput, View } from "react-native";
import { useDispatch } from "react-redux";

export function EditWorkoutSummaryScreen(
  props: ScreenProps<"EditWorkoutSummary">,
) {
  const dispatch = useDispatch();
  const { colors, textColors } = useAppColors();
  const [isFocused, setIsFocused] = useState(false);
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
      <View style={[styles.card, { backgroundColor: colors.surface1 }]}>
        <BaseText text="Name" type="primary_bold" />
        <View
          style={[
            styles.inputRow,
            {
              backgroundColor: colors.surface2,
              borderColor: isFocused ? colors.blue0 : colors.surface0,
            },
          ]}
        >
          <TextInput
            value={workoutName}
            onChangeText={handleWorkoutNameChange}
            placeholder="Enter Workout Name"
            autoCapitalize="words"
            autoCorrect={false}
            placeholderTextColor={textColors.secondary}
            selectionColor={colors.blue0}
            cursorColor={colors.blue0}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            style={[
              styles.inputText,
              {
                color: textColors.primary,
              },
            ]}
          />
          {workoutName.length > 0 && (
            <Pressable
              onPress={() => setWorkoutName("")}
              style={styles.clearButton}
            >
              <BaseIcon name="clear" />
            </Pressable>
          )}
        </View>
      </View>
      <BaseButton
        text="Save"
        onPress={handleSave}
        disabled={!workoutName.length}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  card: {
    borderRadius: 16,
    padding: 16,
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    minHeight: 54,
    borderWidth: 1,
    borderRadius: 12,
    paddingLeft: 14,
    paddingRight: 10,
  },
  inputText: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 12,
  },
  clearButton: {
    padding: 6,
    justifyContent: "center",
    alignItems: "center",
  },
});
