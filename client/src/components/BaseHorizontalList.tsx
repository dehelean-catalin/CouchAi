import { ReactElement, useCallback } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { BaseText } from "./BaseText";

const ITEM_HEIGHT = 90;

interface BaseHorizontalListItem {
  id: string;
}

interface BaseHorizontalListProps<T extends BaseHorizontalListItem> {
  data: T[];
  item: (props: { item: T; index: number }) => ReactElement;
  emptyComponentText: string;
}

export function BaseHorizontalList<T extends BaseHorizontalListItem>(
  props: BaseHorizontalListProps<T>,
) {
  const handleItemLayout = useCallback(
    (_: unknown, index: number) => ({
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index,
      index,
    }),
    [],
  );

  return (
    <FlatList<T>
      data={props.data}
      keyExtractor={(item) => item.id}
      renderItem={props.item}
      getItemLayout={handleItemLayout}
      contentContainerStyle={styles.listContainer}
      ListEmptyComponent={() => {
        return (
          <View style={styles.emptyContainer}>
            <BaseText text={props.emptyComponentText} type="primary_18" />
          </View>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    gap: 8,
  },
  emptyContainer: {
    alignItems: "center",
    padding: 12,
  },
});
