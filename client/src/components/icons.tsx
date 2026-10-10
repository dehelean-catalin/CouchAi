import { useAppColors } from "@/theme/useAppColors";
import {
  Calendar,
  ChevronRight,
  Ellipsis,
  House,
  Minus,
  Pencil,
  Plus,
  RotateCcw,
  Trash2,
  User,
  X,
} from "lucide-react-native";
import { assertIsDefined } from "@/helper/assert";

const icons = {
  ellipsis: Ellipsis,
  house: House,
  person: User,
  trash: Trash2,
  replace: RotateCcw,
  plus: Plus,
  minus: Minus,
  clear: X,
  calendar: Calendar,
  edit: Pencil,
  chevronRight: ChevronRight,
} as const;

export interface BaseIconProps {
  name: keyof typeof icons;
  focused?: boolean;
}

export function BaseIcon(props: BaseIconProps) {
  const { textColors } = useAppColors();

  const LucideIcon = icons[props.name];
  assertIsDefined(LucideIcon);

  return (
    <LucideIcon
      size={20}
      color={props.focused ? textColors.primary : textColors.secondary}
    />
  );
}
