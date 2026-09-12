import { useAppColors } from "@/theme/useAppColors";
import { ReactNode } from "react";
import { Pressable, StyleSheet, View } from "react-native";

interface BaseCardProps {
  children: ReactNode;
  onPress?: () => void;
}

export function BaseCard(props: BaseCardProps) {
  const { colors } = useAppColors();
  const cardStyle = [
    [
      styles.card,
      {
        backgroundColor: colors.surface1,
        shadowColor: colors.surfaceShadow,
      },
    ],
  ];

  if (!!props.onPress) {
    return (
      <Pressable style={cardStyle} onPress={props.onPress}>
        {props.children}
      </Pressable>
    );
  }

  return <View style={cardStyle}>{props.children}</View>;
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    borderRadius: 16,
    padding: 12,
    marginBottom: 8,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
});
