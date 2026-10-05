import { useAppColors } from "@/theme/useAppColors";
import { ReactNode } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

interface BaseSafeAreaProviderProps {
  children: ReactNode;
}

export function BaseSafeAreaProvider(props: BaseSafeAreaProviderProps) {
  const { colors } = useAppColors();
  return (
    <SafeAreaProvider style={{ backgroundColor: colors.surface0 }}>
      {props.children}
    </SafeAreaProvider>
  );
}
