import { Host, Icon, IconSelectSpec } from "@expo/ui";
import Trash from "@expo/material-symbols/delete.xml";
import Home from "@expo/material-symbols/home.xml";
import PersonIcon from "@expo/material-symbols/person.xml";
import ReplaceIcon from "@expo/material-symbols/sync.xml";
import ClearIcon from "@expo/material-symbols/close.xml";
import MoreVert from "@expo/material-symbols/more_horiz.xml";
import PlusIcon from "@expo/material-symbols/add.xml";
import MinusIcon from "@expo/material-symbols/remove.xml";
import PencilIcon from "@expo/material-symbols/edit.xml";
import CalendarIcon from "@expo/material-symbols/calendar_clock.xml";
import ChevronRight from "@expo/material-symbols/chevron_right.xml";
import CheckList from "@expo/material-symbols/checklist.xml";
import Timer from "@expo/material-symbols/timer.xml";
import Dumbell from "@expo/material-symbols/weight.xml";

import { StyleSheet } from "react-native";
import { useAppColors } from "@/theme/useAppColors";

const iconsMap = {
  house: {
    ios: "house",
    android: Home,
  },
  person: {
    ios: "person",
    android: PersonIcon,
  },
  trash: {
    ios: "trash",
    android: Trash,
  },
  replace: {
    ios: "arrow.2.circlepath",
    android: ReplaceIcon,
  },
  clear: {
    ios: "xmark",
    android: ClearIcon,
  },
  ellipsis: {
    ios: "ellipsis",
    android: MoreVert,
  },
  plus: {
    ios: "plus",
    android: PlusIcon,
  },
  minus: {
    ios: "minus",
    android: MinusIcon,
  },
  edit: {
    ios: "pencil",
    android: PencilIcon,
  },
  calendar: {
    ios: "calendar",
    android: CalendarIcon,
  },
  chevronRight: {
    ios: "chevron.right",
    android: ChevronRight,
  },
  timer: {
    ios: "timer",
    android: Timer,
  },
  checkList: {
    ios: "checklist",
    android: CheckList,
  },
  weight: {
    ios: "dumbbell.fill",
    android: Dumbell,
  },
} satisfies Record<string, IconSelectSpec>;

export interface BaseIconProps {
  name: keyof typeof iconsMap;
}

export function BaseIcon(props: BaseIconProps) {
  const { theme, textColors } = useAppColors();

  return (
    <Host matchContents colorScheme={theme}>
      <Icon
        name={Icon.select(iconsMap[props.name])}
        style={styles.icon}
        size={16}
        color={textColors.secondary}
      />
    </Host>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 20,
  },
});
