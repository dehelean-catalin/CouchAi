import { useAppColors } from "@/theme/useAppColors";
import { Image } from "expo-image";
import { BaseText } from "./BaseText";
import { StyleSheet, View } from "react-native";

const ThumbnailSize = 70;

interface BaseThumbnailProps {
  thumbnailUrl?: string | null;
  name: string;
}

export function BaseThumbnail({ thumbnailUrl, name }: BaseThumbnailProps) {
  const { colors } = useAppColors();
  const initialLetter = name.slice(0, 1).toUpperCase();

  if (thumbnailUrl) {
    return (
      <Image
        source={thumbnailUrl}
        style={[
          styles.tinyLogo,
          { width: ThumbnailSize, height: ThumbnailSize },
        ]}
      />
    );
  }

  return (
    <View
      style={[
        styles.emptyThumbnail,
        {
          backgroundColor: colors.surface1,
          width: ThumbnailSize,
          height: ThumbnailSize,
        },
      ]}
    >
      <BaseText text={initialLetter} type="primary_18" />
    </View>
  );
}

const styles = StyleSheet.create({
  tinyLogo: {
    borderRadius: 8,
  },
  emptyThumbnail: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
});
