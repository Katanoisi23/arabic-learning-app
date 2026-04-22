// components/BottomTabs.tsx
import { Ionicons } from "@expo/vector-icons";
import { usePathname, useRouter } from "expo-router";
import React from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";

const { width } = Dimensions.get("window");
const guidelineBaseWidth = 375;
const scale = (size: number) => (width / guidelineBaseWidth) * size;

import { BookIcon, DictionaryIcon, SettingsIcon } from "./Icons";

const TABS = [
  {
    key: "books",
    IconComponent: BookIcon,
    route: "/",
  },
  {
    key: "lessons",
    IconComponent: DictionaryIcon,
    route: "/dictionary",
  },
  {
    key: "settings",
    IconComponent: SettingsIcon,
    route: "/settings",
  },
];

export function BottomTabs() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <View style={styles.container}>
      {TABS.map((tab) => {
        const isActive = pathname === tab.route;

        return (
          <TouchableOpacity
            key={tab.key}
            style={styles.tabButton}
            activeOpacity={0.7}
            onPress={() => router.push(tab.route as any)}
          >
            <tab.IconComponent
              size={scale(24)}
              color={isActive ? "#FFFFFF" : "#E5D8C8"}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "#876E52",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: scale(12),
    paddingBottom: scale(18),
    borderTopLeftRadius: scale(4),
    borderTopRightRadius: scale(4),
  },
  tabButton: {
    paddingHorizontal: scale(8),
    paddingVertical: scale(4),
  },
});
