import { BaseText } from "@/components/BaseText";
import { useAppColors } from "@/theme/useAppColors";
import { Pressable, StyleSheet } from "react-native";

interface RecentCompletedWorkoutProps {
  id: string;
  name: string;
  onChange: () => void;
}

export function RecentCompletedWorkout(props: RecentCompletedWorkoutProps) {
  const { colors } = useAppColors();
  return (
    <Pressable
      key={props.id}
      style={[styles.container, { backgroundColor: colors.surface1 }]}
      onPress={props.onChange}
    >
      <BaseText text={props.name} type="primary" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderRadius: 4,
  },
});
