import { ReactElement, useCallback } from "react";
import { FlatList } from "react-native";
import { BaseText } from "./BaseText";

const ITEM_HEIGHT = 90;

interface BaseHorizontalListItem {
  id: string;
}

type BaseHorizontalListProps<T extends BaseHorizontalListItem> = {
  data: T[];
  item: (props: { item: T; index: number }) => ReactElement;
  emptyComponentText: string;
};

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
      ListEmptyComponent={() => {
        return <BaseText text={props.emptyComponentText} type="primary_18" />;
      }}
    />
  );
}
