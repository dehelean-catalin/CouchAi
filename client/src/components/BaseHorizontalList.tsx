import { ReactElement, useCallback } from "react";
import { FlatList, Text } from "react-native";

const ITEM_HEIGHT = 90;

type BaseHorizontalListProps<T> = {
  data: T[];
  item: (props: { item: T; index: number }) => ReactElement;
  emptyComponentText: string;
};

export function BaseHorizontalList<T>(props: BaseHorizontalListProps<T>) {
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
      keyExtractor={(_, index) => `${index}`}
      renderItem={props.item}
      getItemLayout={handleItemLayout}
      ListEmptyComponent={() => {
        return <Text>{props.emptyComponentText}</Text>;
      }}
    />
  );
}
