import { Host, Icon } from "@expo/ui";
import Trash from "@expo/material-symbols/delete.xml";
import Home from "@expo/material-symbols/home.xml";
import PersonIcon from "@expo/material-symbols/person.xml";
import ReplaceIcon from "@expo/material-symbols/sync.xml";
import ClearIcon from "@expo/material-symbols/close.xml";
import MoreVert from "@expo/material-symbols/more_horiz.xml";
import PlusIcon from "@expo/material-symbols/add.xml";
import MinusIcon from "@expo/material-symbols/remove.xml";
import PencilIcon from "@expo/material-symbols/edit.xml";

import { StyleSheet } from "react-native";
import { useAppColors } from "@/theme/useAppColors";

const houseIcon = Icon.select({
  ios: "house",
  android: Home,
});

const personIcon = Icon.select({
  ios: "person",
  android: PersonIcon,
});

const trashIcon = Icon.select({
  ios: "trash",
  android: Trash,
});

const replaceIcon = Icon.select({
  ios: "arrow.2.circlepath",
  android: ReplaceIcon,
});

const clearIcon = Icon.select({
  ios: "xmark",
  android: ClearIcon,
});

const ellipsisIcon = Icon.select({
  ios: "ellipsis",
  android: MoreVert,
});

const plusIcon = Icon.select({
  ios: "plus",
  android: PlusIcon,
});

const minusIcon = Icon.select({
  ios: "minus",
  android: MinusIcon,
});

const editIcon = Icon.select({
  ios: "pencil",
  android: PencilIcon,
});

export interface BaseIconProps {
  name:
    | "trash"
    | "house"
    | "person"
    | "replace"
    | "clear"
    | "ellipsis"
    | "plus"
    | "minus"
    | "edit";
}

export function BaseIcon(props: BaseIconProps) {
  const { theme } = useAppColors();
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
    case "clear":
      iconName = clearIcon;
      break;
    case "ellipsis":
      iconName = ellipsisIcon;
      break;
    case "plus":
      iconName = plusIcon;
      break;
    case "minus":
      iconName = minusIcon;
      break;
    case "edit":
      iconName = editIcon;
      break;
    default:
      throw new Error("Invalid icon name");
  }

  return (
    <Host matchContents colorScheme={theme}>
      <Icon name={iconName} style={styles.icon} size={16} />
    </Host>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 20,
  },
});
