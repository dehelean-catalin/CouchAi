import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface BaseSafeAreaViewProps {
  children: React.ReactNode;
}

export function BaseSafeAreaView(props: BaseSafeAreaViewProps) {
  return (
    <SafeAreaView style={styles.container} edges={["left", "right"]}>
      {props.children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
