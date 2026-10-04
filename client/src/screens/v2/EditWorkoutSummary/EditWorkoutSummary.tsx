import { BaseButton } from "@/components/BaseButton";
import { BaseText } from "@/components/BaseText";
import { ScreenProps } from "@/navigation/routes";
import { updateWorkoutDetails } from "@/redux/workoutSlice";
import { useAppColors } from "@/theme/useAppColors";
import { useState } from "react";
import { Keyboard, Pressable, StyleSheet, TextInput, View } from "react-native";
import { useDispatch } from "react-redux";
import { DateAndTimeField } from "./DateAndTimeField";
import { EMPTY_WORKOUT_NAME } from "@/redux/constants";

export function EditWorkoutSummaryScreen(
  props: ScreenProps<"EditWorkoutSummary">,
) {
  const dispatch = useDispatch();
  const { workoutName: workoutNameProp } = props.route.params;
  const { colors, textColors } = useAppColors();
  const [isFocused, setIsFocused] = useState(false);
  const [workoutName, setWorkoutName] = useState(
    workoutNameProp === EMPTY_WORKOUT_NAME ? "" : workoutNameProp,
  );

  const [workoutStartDate, setWorkoutStartDate] = useState(
    new Date(props.route.params.workoutStartDate),
  );
  const [workoutEndDate, setWorkoutEndDate] = useState(
    new Date(props.route.params.workoutEndDate),
  );

  function handleWorkoutNameChange(value: string) {
    if (value.length > 200) {
      return;
    }
    setWorkoutName(value);
  }

  function handleWorkoutStartDateChange(newDate: Date) {
    setWorkoutStartDate(newDate);
    if (workoutEndDate < newDate) {
      setWorkoutEndDate(newDate);
    }
  }

  function handleWorkoutEndDateChange(newDate: Date) {
    setWorkoutEndDate(newDate);
    if (workoutStartDate > newDate) {
      setWorkoutStartDate(newDate);
    }
  }

  function handleUpdateWorkoutDetails({
    workoutId,
    newWorkoutName,
    newWorkoutStartDate,
    newWorkoutEndDate,
  }: {
    workoutId: string;
    newWorkoutName: string;
    newWorkoutStartDate: Date;
    newWorkoutEndDate: Date;
  }) {
    dispatch(
      updateWorkoutDetails({
        workoutId,
        newWorkoutName,
        newWorkoutStartDate: newWorkoutStartDate.toISOString(),
        newWorkoutEndDate: newWorkoutEndDate.toISOString(),
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
        <BaseText text="Name" type="primary_bold_16" />
        <View
          style={[
            styles.inputRow,
            {
              borderColor: isFocused ? colors.blue_0 : colors.surfaceShadow,
            },
          ]}
        >
          <TextInput
            value={workoutName}
            onChangeText={handleWorkoutNameChange}
            placeholder={EMPTY_WORKOUT_NAME}
            autoCapitalize="words"
            autoCorrect={false}
            placeholderTextColor={textColors.secondary}
            selectionColor={colors.blue_0}
            cursorColor={colors.blue_0}
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
            <BaseButton
              leftIcon="clear"
              type="normal"
              onPress={() => setWorkoutName("")}
            />
          )}
        </View>
        <DateAndTimeField
          label="Start Date"
          value={workoutStartDate}
          onChange={handleWorkoutStartDateChange}
        />
        <DateAndTimeField
          label="End Date"
          value={workoutEndDate}
          minimumDate={workoutStartDate}
          onChange={handleWorkoutEndDateChange}
        />
      </View>
      <View style={styles.saveButtonContainer}>
        <BaseButton
          text="Save"
          onPress={() =>
            handleUpdateWorkoutDetails({
              workoutId: props.route.params.workoutId,
              newWorkoutName: workoutName,
              newWorkoutStartDate: workoutStartDate,
              newWorkoutEndDate: workoutEndDate,
            })
          }
        />
      </View>
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

  saveButtonContainer: {
    marginTop: "auto",
  },
});
