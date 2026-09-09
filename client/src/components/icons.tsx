import { Host, Icon } from "@expo/ui";
import Trash from "@expo/material-symbols/delete.xml";
import Home from "@expo/material-symbols/home.xml";
import PersonIcon from "@expo/material-symbols/person.xml";
import ReplaceIcon from "@expo/material-symbols/arrow_back_2.xml";
import { StyleSheet } from "react-native";

const trashIcon = Icon.select({
  ios: "trash",
  android: Trash,
});

const houseIcon = Icon.select({
  ios: "house",
  android: Home,
});

const personIcon = Icon.select({
  ios: "person",
  android: PersonIcon,
});

const replaceIcon = Icon.select({
  ios: "arrow.2.squarepath",
  android: ReplaceIcon,
});

export interface BaseIconProps {
  name: "trash" | "house" | "person" | "replace";
}

export function BaseIcon(props: BaseIconProps) {
  let iconName = null;
  switch (props.name) {
    case "trash":
      iconName = trashIcon;
      break;
    case "house":
      iconName = houseIcon;
      break;
    case "person":
      iconName = personIcon;
      break;
    case "replace":
      iconName = replaceIcon;
      break;
    default:
      throw new Error("Invalid icon name");
  }

  return (
    <Host matchContents>
      <Icon name={iconName} style={styles.icon} size={16} />
    </Host>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 20,
  },
});
