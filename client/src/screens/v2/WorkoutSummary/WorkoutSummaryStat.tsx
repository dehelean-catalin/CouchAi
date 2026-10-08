import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { BaseText } from "@/components/BaseText";

const SYMBOLS = {
  percentage: "%",
};

interface WorkoutSummaryStatProps {
  label: string;
  value: string;
  progress: number;
  fixedWidth: boolean;
  symbol?: keyof typeof SYMBOLS;
}

export function WorkoutSummaryStat(props: WorkoutSummaryStatProps) {
  const style: StyleProp<ViewStyle> = [styles.statsItem];

  if (props.fixedWidth) {
    style.push(styles.statsItemWidth);
  }
  const absoluteValue = Math.abs(props.progress);
  const progress = props.symbol
    ? `${absoluteValue}${SYMBOLS[props.symbol]}`
    : `${absoluteValue}`;

  return (
    <View style={style}>
      <BaseText text={props.label} type="secondary" />
      <BaseText text={props.value} type="primary_bold_24" numberOfLines={2} />
      {props.progress !== 0 && (
        <View style={styles.progressBadgeContainer}>
          {props.progress > 0 ? (
            <>
              <BaseText text="+" type="success_bold_14" />
              <BaseText text={progress} type="success_bold_14" />
            </>
          ) : (
            <>
              <BaseText text="-" type="error_bold_14" />
              <BaseText text={progress} type="error_bold_14" />
            </>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  statsItem: {
    gap: 4,
  },
  statsItemWidth: {
    maxWidth: "30%",
  },
  progressBadgeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
});
