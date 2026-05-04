import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

// Базовая ширина макета (например, iPhone 11 / 375)
const guidelineBaseWidth = 375;

// Функция масштабирования под ширину экрана
export const scale = (size: number) => (width / guidelineBaseWidth) * size;

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5F0E8",
  },

  statusBarSpacer: {
    height: scale(46),
  },
  root: {
    flex: 1,
    backgroundColor: "#F5F0E8",
    paddingHorizontal: scale(16), 
  },

  headerbar: {
    backgroundColor: "#FFFBF8",
    paddingVertical: scale(14),
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
    backgroundColor: "#EBE2D8",
    borderRadius: 999, 
    paddingHorizontal: scale(14),
    paddingVertical: scale(8),
    marginRight: scale(14),
    marginLeft: scale(14),
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

  filterButton: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(12),
    backgroundColor: "#8D7456",
    justifyContent: "center",
    alignItems: "center",
  },

  scroll: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: scale(16),
  },

  currentCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: scale(18),
    paddingHorizontal: scale(16),
    paddingVertical: scale(16),
    marginBottom: scale(15),
    marginTop: scale(14),
    alignSelf: "stretch",
  },

  currentLeft: {
    flex: 1,
    marginRight: scale(12),
  },

  currentTitle: {
    fontSize: scale(18),
    fontWeight: "600",
    color: "#3A2816",
    marginBottom: scale(4),
  },

  currentSubtitle: {
    fontSize: scale(13),
    color: "#9E8B7A",
    marginBottom: scale(12),
  },

  currentButton: {
    alignSelf: "flex-start",
    backgroundColor: "#8D7456",
    borderRadius: scale(8),
    paddingHorizontal: scale(14),
    paddingVertical: scale(8),
  },

  currentButtonText: {
    color: "#FFFFFF",
    fontSize: scale(13),
    fontWeight: "600",
  },

  currentRight: {
    justifyContent: "center",
    alignItems: "center",
  },

  bookCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: scale(18),
    padding: scale(14),
    marginBottom: scale(12),
    alignSelf: "stretch",
  },

  bookCover: {
    width: scale(56),
    height: scale(80),
    borderRadius: scale(10),
    marginRight: scale(12),
  },

  bookInfo: {
    flex: 1,
    justifyContent: "center",
  },

  bookTitle: {
    fontSize: scale(16),
    fontWeight: "700",
    color: "#3A2816",
    marginBottom: scale(4),
  },

  volumeBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#F2EAE0",
    borderRadius: 5,
    paddingHorizontal: scale(8),
    paddingVertical: scale(2),
    marginBottom: scale(4),
  },

  volumeBadgeText: {
    fontSize: scale(11),
    fontWeight: "600",
    color: "#3A2816",
  },

  bookArabic: {
    fontSize: scale(16),
    color: "#3A2816",
    marginBottom: scale(2),
  },

  bookCourse: {
    fontSize: scale(12),
    color: "#9E8B7A",
  },
  
  trainingButton: {
    backgroundColor: "#8D7456",
    paddingVertical: scale(12),
    paddingHorizontal: scale(16),
    borderRadius: scale(8),
    margin: scale(16),
    alignItems: "center",
  },

  trainingButtonText: {
    color: "#FFFFFF",
    fontSize: scale(16),
    fontWeight: "600",
  },
});
