import { BaseCard } from "@/components/BaseCard";
import { BaseText } from "@/components/BaseText";
import { BaseIcon, BaseIconProps } from "@/components/icons";

import { Pressable, StyleSheet, View } from "react-native";

interface HomeScreenWorkoutCardProps {
  title: string;
  content: (
    | { type: "text"; value: string }
    | { type: "icon"; value: BaseIconProps["name"] }
  )[];
  iconRight: {
    name: BaseIconProps["name"];
    action?: () => void;
  };
  onPress: () => void;
}

export function HomeScreenWorkoutCard(props: HomeScreenWorkoutCardProps) {
  return (
    <BaseCard onPress={props.onPress}>
      <View style={styles.container}>
        <BaseText text={props.title} type="primary" numberOfLines={2} />
        <View style={styles.content}>
          {props.content.map((item) => {
            switch (item.type) {
              case "icon":
                return <BaseIcon key={item.value} name={item.value} />;
              case "text":
                return (
                  <BaseText
                    key={item.value}
                    text={item.value}
                    type="secondary"
                  />
                );
              default:
                throw new Error(`Type is not allowed`);
            }
          })}
        </View>
      </View>
      <View style={styles.iconContainer}>
        {props.iconRight.action ? (
          <Pressable onPress={props.iconRight.action}>
            <BaseIcon name={props.iconRight.name} />
          </Pressable>
        ) : (
          <BaseIcon name={props.iconRight.name} />
        )}
      </View>
    </BaseCard>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 4,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  iconContainer: {
    justifyContent: "center",
    paddingLeft: 8,
  },
});
