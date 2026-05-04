import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  Modal,
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { DICT_PAIRS } from "../../data/dictionary";
import { useProgress } from "../../context/ProgressContext";

const { width } = Dimensions.get("window");
const scale = (size: number) => (width / 375) * size;

export default function TrainingScreen() {
  const router = useRouter();
  const { completedLessons } = useProgress();
  const WORDS = DICT_PAIRS.filter(word => completedLessons.map(Number).includes(Number(word.lessonId)));

  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState(0);
  const [learning, setLearning] = useState(0);

  // Settings state
  const [isSettingsVisible, setSettingsVisible] = useState(false);
  const [showTranslationFirst, setShowTranslationFirst] = useState(false);
  const [removeLearned, setRemoveLearned] = useState(false);

  const current = WORDS[index];

  const next = () => {
    setIndex((prev) => (prev + 1) % WORDS.length);
    setFlipped(false);
  };

  const handleKnow = () => {
    setKnown((k) => k + 1);
    next();
  };

  const handleLearning = () => {
    setLearning((l) => l + 1);
    next();
  };

  const resetTraining = () => {
    setIndex(0);
    setKnown(0);
    setLearning(0);
    setFlipped(false);
    setSettingsVisible(false);
  };

  const frontText = current ? (showTranslationFirst ? current.meaning : current.singular) : "";
  const backText = current ? (showTranslationFirst ? current.singular : current.meaning) : "";
  
  const frontSize = showTranslationFirst ? scale(24) : scale(36);
  const backSize = showTranslationFirst ? scale(36) : scale(24);
  const activeSize = flipped ? backSize : frontSize;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconButton} onPress={() => {
            if (router.canGoBack()) {
              router.back();
            } else {
              router.replace("/");
            }
          }}>
            <Ionicons name="chevron-back" size={scale(24)} color="#8D7456" />
          </TouchableOpacity>
          
          <View style={styles.headerCenter}>
            <Text style={styles.title}>Тренировка</Text>
            {WORDS.length > 0 && <Text style={styles.subtitle}>{index + 1}/{WORDS.length}</Text>}
          </View>
          
          <TouchableOpacity style={styles.iconButton} onPress={() => setSettingsVisible(true)}>
            <Ionicons name="settings-outline" size={scale(20)} color="#8D7456" />
          </TouchableOpacity>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statText}>Знаю: {known}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statText}>Ещё изучаю: {learning}</Text>
          </View>
        </View>

        {/* Card */}
        {WORDS.length === 0 ? (
          <View style={[styles.card, { padding: scale(20) }]}>
            <Text style={[styles.cardText, { fontSize: scale(18), textAlign: 'center', color: '#8D7456' }]}>
              Пройдите хотя бы один урок, чтобы начать тренировку слов
            </Text>
          </View>
        ) : (
          <TouchableOpacity style={styles.card} onPress={() => setFlipped((f) => !f)} activeOpacity={0.9}>
            <Text style={[styles.cardText, { fontSize: activeSize }]}>
              {flipped ? backText : frontText}
            </Text>
            {!flipped && <Text style={styles.flipHint}>Нажмите чтобы перевернуть</Text>}
          </TouchableOpacity>
        )}

        {/* Action Buttons */}
        <View style={styles.actions}>
          <TouchableOpacity style={[styles.btnLearning, WORDS.length === 0 && { opacity: 0.5 }]} onPress={handleLearning} disabled={WORDS.length === 0}>
            <Text style={styles.btnTextLearning}>Ещё изучаю</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.btnReset} onPress={resetTraining}>
            <Ionicons name="sync" size={scale(24)} color="#8D7456" />
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.btnKnow, WORDS.length === 0 && { opacity: 0.5 }]} onPress={handleKnow} disabled={WORDS.length === 0}>
            <Text style={styles.btnTextKnow}>Знаю</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Settings Modal */}
      <Modal 
        visible={isSettingsVisible} 
        transparent 
        animationType="slide"
        statusBarTranslucent={true}
        onRequestClose={() => setSettingsVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPressOut={() => setSettingsVisible(false)}
        >
          <TouchableOpacity activeOpacity={1} style={styles.modalContent}>
            <Text style={styles.modalTitle}>Параметры</Text>
            
            <View style={styles.settingGroup}>
              <Text style={styles.settingLabel}>Тип карточек:</Text>
              <View style={styles.cardTypeRow}>
                <TouchableOpacity 
                  style={[styles.cardTypeBtn, !showTranslationFirst && styles.cardTypeBtnActive]}
                  onPress={() => setShowTranslationFirst(false)}
                >
                  <Text style={[styles.cardTypeBtnText, !showTranslationFirst && styles.cardTypeBtnTextActive]}>
                    Слово{"\n"}Перевод
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.cardTypeBtn, showTranslationFirst && styles.cardTypeBtnActive]}
                  onPress={() => setShowTranslationFirst(true)}
                >
                  <Text style={[styles.cardTypeBtnText, showTranslationFirst && styles.cardTypeBtnTextActive]}>
                    Перевод{"\n"}Слово
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.switchRow}>
              <Text style={[styles.settingLabel, { flex: 1, marginRight: scale(16) }]}>Убрать изученное из избранного</Text>
              <Switch 
                value={removeLearned}
                onValueChange={setRemoveLearned}
                trackColor={{ false: "#D9CFC4", true: "#8D7456" }}
                thumbColor="#FFFFFF"
                style={{ transform: [{ scale: 1.2 }] }}
              />
            </View>

            <TouchableOpacity style={styles.btnStartOver} onPress={resetTraining}>
              <Text style={styles.btnTextKnow}>Начать заново</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5F0E8",
  },
  container: {
    flex: 1,
    backgroundColor: "#F5F0E8",
    paddingHorizontal: scale(16),
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 50,
    paddingBottom: scale(16),
    borderBottomWidth: scale(1),
    borderBottomColor: "#EAE1D6",
    marginBottom: scale(16),
  },
  iconButton: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    backgroundColor: "#EAE1D6",
    alignItems: "center",
    justifyContent: "center",
  },
  headerCenter: {
    alignItems: "center",
  },
  title: {
    fontSize: scale(16),
    fontWeight: "700",
    color: "#3A2816",
  },
  subtitle: {
    fontSize: scale(13),
    color: "#9E8B7A",
    marginTop: scale(2),
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: scale(16),
  },
  statCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: scale(8),
    paddingVertical: scale(12),
    alignItems: "center",
    marginHorizontal: scale(4),
  },
  statText: {
    fontSize: scale(14),
    fontWeight: "600",
    color: "#3A2816",
  },
  card: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: scale(16),
    justifyContent: "center",
    alignItems: "center",
    padding: scale(24),
    marginBottom: scale(24),
  },
  cardText: {
    color: "#3A2816",
    textAlign: "center",
    fontWeight: "500",
  },
  flipHint: {
    position: "absolute",
    bottom: scale(24),
    fontSize: scale(13),
    color: "#3A2816",
    fontWeight: "600",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: scale(32),
  },
  btnLearning: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderWidth: scale(1),
    borderColor: "#8D7456",
    borderRadius: scale(12),
    paddingVertical: scale(14),
    alignItems: "center",
    marginRight: scale(12),
  },
  btnTextLearning: {
    color: "#8D7456",
    fontSize: scale(14),
    fontWeight: "600",
  },
  btnReset: {
    width: scale(48),
    height: scale(48),
    borderRadius: scale(24),
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  btnKnow: {
    flex: 1,
    backgroundColor: "#8D7456",
    borderRadius: scale(12),
    paddingVertical: scale(14),
    alignItems: "center",
    marginLeft: scale(12),
  },
  btnTextKnow: {
    color: "#FFFFFF",
    fontSize: scale(14),
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#F5F0E8",
    borderTopLeftRadius: scale(24),
    borderTopRightRadius: scale(24),
    padding: scale(24),
    paddingBottom: scale(40),
  },
  modalTitle: {
    fontSize: scale(16),
    fontWeight: "700",
    color: "#3A2816",
    textAlign: "center",
    marginBottom: scale(24),
  },
  settingGroup: {
    marginBottom: scale(24),
  },
  settingLabel: {
    fontSize: scale(14),
    color: "#3A2816",
    marginBottom: scale(12),
    fontWeight: "500",
  },
  cardTypeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardTypeBtn: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderWidth: scale(1),
    borderColor: "#EAE1D6",
    borderRadius: scale(12),
    paddingVertical: scale(16),
    alignItems: "center",
    marginHorizontal: scale(4),
  },
  cardTypeBtnActive: {
    borderColor: "#8D7456",
  },
  cardTypeBtnText: {
    color: "#9E8B7A",
    fontSize: scale(13),
    textAlign: "center",
    fontWeight: "600",
  },
  cardTypeBtnTextActive: {
    color: "#8D7456",
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: scale(32),
  },
  btnStartOver: {
    backgroundColor: "#8D7456",
    borderRadius: scale(12),
    paddingVertical: scale(16),
    alignItems: "center",
  },
});
