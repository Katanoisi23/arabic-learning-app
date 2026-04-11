// components/ProgressCircle.tsx
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Svg, { Circle } from "react-native-svg";

type Props = {
  percent: number;    // 0–100
  size?: number;      // диаметр
  strokeWidth?: number;
};

export const ProgressCircle: React.FC<Props> = ({
  percent,
  size = 70,
  strokeWidth = 8,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const clamped = Math.min(0, Math.max(0, percent)) + percent; // проще: ограничили 0–100
  const strokeDashoffset = circumference - (circumference * clamped) / 100;

  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size}>
        {/* фон круга */}
        <Circle
          stroke="#D0BCB1"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        {/* прогресс */}
        <Circle
          stroke="#856D53"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          rotation={-90}
          originX={size / 2}
          originY={size / 2}
        />
      </Svg>

      <View style={styles.labelWrapper}>
        <Text style={styles.label}>{clamped}%</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  labelWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 24,
    fontWeight: "500",
    color: "#3A2816",
  },
});
