import { Host, Icon } from "@expo/ui";
import { useEffect, useRef, useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { IconName } from "@expo/ui";

interface WorkoutExerciseCardMenuProps {
  items: {
    label: string;
    icon: IconName;
    action: () => void;
  }[];
}

export function WorkoutExerciseCardMenu(props: WorkoutExerciseCardMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [menuPosition, setPosition] = useState({
    x: 0,
    y: 0,
    height: 0,
  });
  const { height: screenHeight } = useWindowDimensions();
  const ref = useRef<View>(null);
  const menuRef = useRef<View>(null);

  function handleOpenMenu() {
    ref.current?.measureInWindow((x, y, _, height) => {
      setPosition({ x, y, height });
    });
    setIsOpen(true);
  }

  function handleRequestClose() {
    setIsOpen(false);
  }

  useEffect(() => {
    if (isOpen) {
      menuRef.current?.measureInWindow((x, y, menuWidth, menuHeight) => {
        let newMenuYposition = menuPosition.y;
        if (screenHeight - menuHeight < menuPosition.y + menuPosition.height) {
          newMenuYposition = menuPosition.y - menuHeight - menuPosition.height;
        }

        setPosition((prevPosition) => ({
          ...prevPosition,
          y: newMenuYposition,
          x: prevPosition.x - menuWidth,
        }));
      });
    }
  }, [isOpen]);

  return (
    <View ref={ref}>
      <TouchableOpacity onPress={handleOpenMenu}>
        <Text>Test</Text>
      </TouchableOpacity>
      <SafeAreaView>
        <Modal
          visible={isOpen}
          onRequestClose={handleRequestClose}
          transparent
          animationType="fade"
        >
          <View style={styles.backdrop}>
            <Pressable
              style={StyleSheet.absoluteFill}
              onPress={handleRequestClose}
            />
            <View
              ref={menuRef}
              style={[
                styles.container,
                {
                  top: menuPosition.y + menuPosition.height,
                  left: menuPosition.x,
                },
              ]}
            >
              {props.items.map((menuItem, key) => (
                <Pressable
                  key={key}
                  onPress={menuItem.action}
                  style={styles.menuItem}
                >
                  <Text>{menuItem.label}</Text>
                  <Host matchContents>
                    <Icon name={menuItem.icon} size={16} />
                  </Host>
                </Pressable>
              ))}
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    backgroundColor: "gray",
    borderRadius: 8,
    padding: 8,
  },
  backdrop: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    padding: 8,
  },
});
