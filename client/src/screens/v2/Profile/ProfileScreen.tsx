import { BaseText } from "@/components/BaseText";
import { ScreenProps } from "@/navigation/routes";
import { ProfileTheme, toggleTheme } from "@/redux/profileSlice";
import { RootState } from "@/redux/store";
import { useAppColors } from "@/theme/useAppColors";
import { Host, Switch } from "@expo/ui";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export function ProfileScreen(props: ScreenProps<"Profile">) {
  const dispatch = useDispatch();
  const { colors } = useAppColors();
  const theme = useSelector<RootState, ProfileTheme>((s) => s.profile.theme);

  function handleThemeToggle(value: boolean): void {
    dispatch(toggleTheme(value ? "dark" : "light"));
  }

  return (
    <View>
      <View
        style={[
          styles.sectionTitle,
          {
            borderColor: colors.surface1,
          },
        ]}
      >
        <BaseText text="Appearance" type="primary_18" />
      </View>
      <View style={styles.row}>
        <BaseText text="Enable Dark Mode" type="primary" />
        <Host matchContents seedColor={colors.blue0}>
          <Switch value={theme === "dark"} onValueChange={handleThemeToggle} />
        </Host>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: { paddingBottom: 4, borderBottomWidth: 2 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 8,
    paddingBottom: 8,
  },
});
