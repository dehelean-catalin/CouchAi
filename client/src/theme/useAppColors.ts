import { useColorScheme } from "react-native";
import { COLORS, textColors } from "./colors";

export function useAppColors() {
  const scheme = useColorScheme() ?? "light";
  console.log(scheme);
  if (scheme === "unspecified") {
    return { colors: COLORS["light"], textColors: textColors["light"] };
  }
  return { colors: COLORS[scheme], textColors: textColors[scheme] };
}
