import { BaseCard } from "@/components/BaseCard";
import { BaseText } from "@/components/BaseText";
import { BaseIcon } from "@/components/icons";
import { formatDate } from "@/helper/dateFormatter";
import { WorkoutState } from "@/redux/workoutSlice";
import { StyleSheet, View } from "react-native";

interface HomeScreenWorkoutCardProps {
  workout: WorkoutState;
  onPress: () => void;
}

export function HomeScreenWorkoutCard(props: HomeScreenWorkoutCardProps) {
  return (
    <BaseCard onPress={props.onPress}>
      <View style={styles.container}>
        <BaseText text={props.workout.name} type="primary" />
        <View style={styles.content}>
          <BaseIcon name="calendar" />
          <BaseText text={formatDate(props.workout.endDate)} type="secondary" />
        </View>
      </View>
      <View style={styles.iconContainer}>
        <BaseIcon name="chevronRight" />
      </View>
    </BaseCard>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 4,
    marginRight: "auto",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  iconContainer: {
    justifyContent: "center",
  },
});
