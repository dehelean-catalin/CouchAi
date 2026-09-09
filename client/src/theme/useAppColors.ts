import { COLORS, textColors } from "./colors";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { ProfileTheme } from "@/redux/profileSlice";

export function useAppColors() {
  const theme = useSelector<RootState, ProfileTheme>((s) => s.profile.theme);
  return { colors: COLORS[theme], textColors: textColors[theme], theme };
}
