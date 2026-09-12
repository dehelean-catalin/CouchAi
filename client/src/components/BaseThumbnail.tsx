import { useAppColors } from "@/theme/useAppColors";
import { Image } from "expo-image";
import { BaseText } from "./BaseText";
import { StyleSheet, View } from "react-native";

export enum ThumbnailSize {
  SMALL = 70,
  LARGE = 90,
}

type BaseThumbnailProps = {
  thumbnailUrl?: string | null;
  name: string;
  size?: ThumbnailSize.SMALL | ThumbnailSize.LARGE;
};

export function BaseThumbnail({
  thumbnailUrl,
  name,
  size = ThumbnailSize.LARGE,
}: BaseThumbnailProps) {
  const { colors } = useAppColors();
  const initialLetter = name.slice(0, 1).toUpperCase();

  if (thumbnailUrl) {
    return (
      <Image
        source={thumbnailUrl}
        style={[styles.tinyLogo, { width: size, height: size }]}
      />
    );
  }

  return (
    <View
      style={[
        styles.emptyThumbnail,
        { backgroundColor: colors.surface1, width: size, height: size },
      ]}
    >
      <BaseText text={initialLetter} type="primary_18" />
    </View>
  );
}

const styles = StyleSheet.create({
  tinyLogo: {
    width: 90,
    height: 90,
    borderRadius: 8,
  },
  emptyThumbnail: {
    width: 90,
    height: 90,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
});
