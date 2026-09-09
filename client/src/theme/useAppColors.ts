import { COLORS, textColors } from "./colors";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { ProfileTheme } from "@/redux/profileSlice";

export function useAppColors() {
  const theme = useSelector<RootState, ProfileTheme>((s) => s.profile.theme);
  if (theme === "unspecified") {
    return { colors: COLORS["light"], textColors: textColors["light"] };
  }
  return { colors: COLORS[theme], textColors: textColors[theme] };
}
