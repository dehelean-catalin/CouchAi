import { useAppColors } from "@/theme/useAppColors";
import { ReactNode } from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";

interface BaseCardProps {
  children: ReactNode;
  flexDirection?: "row" | "column";
  onPress?: () => void;
}

export function BaseCard({
  flexDirection = "row",
  onPress: press,
  children,
}: BaseCardProps) {
  const { colors, theme } = useAppColors();
  const cardStyle: StyleProp<ViewStyle> = [
    [
      styles.card,
      {
        backgroundColor: colors.surface1,
        flexDirection,
      },
    ],
  ];
  if (theme === "dark") {
    cardStyle.push({
      borderWidth: 0.5,
      borderColor: colors.surfaceShadow,
    });
  }
  if (theme === "light") {
    cardStyle.push({
      shadowOpacity: 0.2,
      shadowRadius: 4,
      shadowOffset: { width: 0, height: 4 },
      shadowColor: colors.surfaceShadow,
    });
  }

  if (!!press) {
    return (
      <Pressable style={cardStyle} onPress={press}>
        {children}
      </Pressable>
    );
  }

  return <View style={cardStyle}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    gap: 12,
    borderRadius: 16,
    padding: 12,
  },
});
