import React from "react";
import { Dimensions, StyleSheet, Text, TextInput, View } from "react-native";
import { SearchIcon } from "./Icons";

const { width } = Dimensions.get("window");
const guidelineBaseWidth = 375;
const scale = (size: number) => (width / guidelineBaseWidth) * size;

interface HeaderProps {
  title: string;
  showSearch?: boolean;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (text: string) => void;
}

export function Header({
  title,
  showSearch = true,
  searchPlaceholder = "Поиск",
  searchValue = "",
  onSearchChange,
}: HeaderProps) {
  return (
    <View style={styles.headerbar}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>

      {showSearch && (
        <View style={styles.searchRow}>
          <View style={styles.searchBox}>
            <View style={styles.searchIcon}>
              <SearchIcon size={scale(18)} color="#856D53" />
            </View>
            <TextInput
              placeholder={searchPlaceholder}
              placeholderTextColor="#C8B2A0"
              style={styles.searchInput}
              value={searchValue}
              onChangeText={onSearchChange}
            />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  headerbar: {
    backgroundColor: "#FFFBF8",
    paddingVertical: scale(14),
    paddingTop: 50,
  },
  header: {
    paddingTop: scale(4),
    paddingBottom: scale(12),
    alignItems: "center",
  },
  headerTitle: {
    fontSize: scale(18),
    fontWeight: "700",
    color: "#3A2816",
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: scale(16),
  },
  searchBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2E9E0",
    borderRadius: 999,
    paddingHorizontal: scale(14),
    paddingVertical: scale(8),
    marginHorizontal: scale(14),
  },
  searchIcon: {
    marginRight: scale(8),
  },
  searchInput: {
    flex: 1,
    fontSize: scale(15),
    color: "#3A2816",
    paddingVertical: 0,
  },
});
