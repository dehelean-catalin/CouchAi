import { BaseText } from "@/components/BaseText";
import { useAppColors } from "@/theme/useAppColors";
import {
  DatePickerDialog,
  Host,
  TimePickerDialog,
} from "@expo/ui/jetpack-compose";
import {
  Host as SwiftHost,
  DatePicker as SwiftDatePicker,
} from "@expo/ui/swift-ui";
import { useState } from "react";
import { Platform, Pressable, StyleSheet, View } from "react-native";

interface DateAndTimeFieldProps {
  label: string;
  value: Date;
  minimumDate?: Date;
  onChange: (newDate: Date) => void;
}

export function DateAndTimeField(props: DateAndTimeFieldProps) {
  const { theme, colors } = useAppColors();
  const [androidPickerMode, setAndroidPickerMode] = useState<
    "date" | "time" | null
  >(null);

  function handleAndroidDateChange(newDate: Date) {
    const updatedDate = new Date(props.value);
    updatedDate.setFullYear(
      newDate.getFullYear(),
      newDate.getMonth(),
      newDate.getDate(),
    );
    props.onChange(updatedDate);
    setAndroidPickerMode(null);
  }

  function handleAndroidTimeChange(newTime: Date) {
    const updatedDate = new Date(props.value);
    updatedDate.setHours(newTime.getHours(), newTime.getMinutes(), 0, 0);
    props.onChange(updatedDate);
    setAndroidPickerMode(null);
  }

  if (Platform.OS === "ios") {
    return (
      <SwiftHost
        matchContents={{ vertical: true }}
        colorScheme={theme}
        seedColor={colors.blue_0}
        style={styles.iosContainer}
      >
        <SwiftDatePicker
          title={props.label}
          selection={props.value}
          range={props.minimumDate ? { start: props.minimumDate } : undefined}
          displayedComponents={["date", "hourAndMinute"]}
          onDateChange={props.onChange}
        />
      </SwiftHost>
    );
  }

  return (
    <>
      <View style={styles.container}>
        <BaseText text={props.label} type="primary_bold_16" />
        <Pressable
          onPress={() => setAndroidPickerMode("date")}
          style={[
            styles.inputRow,
            styles.dateTimeInput,
            { borderColor: colors.surface0 },
          ]}
        >
          <BaseText text={props.value.toLocaleDateString()} type="primary" />
        </Pressable>
        <Pressable
          onPress={() => setAndroidPickerMode("time")}
          style={[styles.inputRow, { borderColor: colors.surface0 }]}
        >
          <BaseText
            text={props.value.toLocaleTimeString([], {
              hour: "numeric",
              minute: "2-digit",
            })}
            type="primary"
          />
        </Pressable>
      </View>
      {Platform.OS === "android" && (
        <>
          <Host colorScheme={theme} seedColor={colors.blue_0}>
            {androidPickerMode === "date" && (
              <DatePickerDialog
                initialDate={props.value.toISOString()}
                color={colors.blue_0}
                onDateSelected={handleAndroidDateChange}
                onDismissRequest={() => setAndroidPickerMode(null)}
              />
            )}
            {androidPickerMode === "time" && (
              <TimePickerDialog
                initialDate={props.value.toISOString()}
                color={colors.blue_0}
                elementColors={{
                  containerColor: colors.surface1,
                  clockDialColor: colors.surface0,
                  selectorColor: colors.blue_0,
                  periodSelectorBorderColor: colors.surface0,
                  periodSelectorSelectedContainerColor: colors.blue_0,
                  periodSelectorUnselectedContainerColor: colors.surface0,
                  timeSelectorSelectedContainerColor: colors.blue_0,
                  timeSelectorUnselectedContainerColor: colors.surface0,
                }}
                onDateSelected={handleAndroidTimeChange}
                onDismissRequest={() => setAndroidPickerMode(null)}
              />
            )}
          </Host>
        </>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  iosContainer: {
    marginTop: 12,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    padding: 12,
    borderWidth: 1,
    borderRadius: 12,
  },
  dateTimeInput: {
    marginLeft: "auto",
  },
});
