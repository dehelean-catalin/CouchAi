import { Icon } from "@expo/ui";
import Trash from "@expo/material-symbols/delete.xml";

export const trashIcon = Icon.select({
  ios: "trash",
  android: Trash,
});
