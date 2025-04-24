import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { G, Circle } from "react-native-svg";
import Colors from "../../utils/Colors";
import { LinearGradient } from "expo-linear-gradient";

export default function DonutChart() {
  const radius = 60;
  const strokeWidth = 20;
  const center = radius + strokeWidth;
  const circumference = 2 * Math.PI * radius;

  const win = 80;
  const lose = 50;
  const total = win + lose;
  const winStrokeDashoffset = circumference - (win / total) * circumference;

  return (
    <LinearGradient
      colors={["#624FBB", "#200F3B"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.container}
    >
      <Text style={styles.title}>🏆 Overall Win/Loss Record</Text>

      <View style={styles.chartContainer}>
        <Svg width={center * 2} height={center * 2}>
          <G rotation="-90" origin={`${center}, ${center}`}>
            {/* Background Circle */}
            <Circle
              cx={center}
              cy={center}
              r={radius}
              stroke="#FE9494"
              strokeWidth={strokeWidth}
              fill="none"
            />
            {/* Foreground Win Circle */}
            <Circle
              cx={center}
              cy={center}
              r={radius}
              stroke="#01B574"
              strokeWidth={strokeWidth}
              strokeDasharray={`${circumference}`}
              strokeDashoffset={winStrokeDashoffset}
              fill="none"
            />
          </G>
        </Svg>

        {/* Total number in center of donut */}
        <Text style={styles.totalText}>{total}</Text>
      </View>

      {/* Horizontal legend below the donut */}
      <View style={styles.legendRow}>
        <View style={styles.legendItem}>
          <View style={[styles.colorBox, { backgroundColor: "#01B574" }]} />
          <Text style={styles.legendText}>Win</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.colorBox, { backgroundColor: "#FE9494" }]} />
          <Text style={styles.legendText}>Lose</Text>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.5)",
    alignItems: "center",
    marginVertical: 15,
  },
  title: {
    alignSelf: "flex-start",
    fontSize: 16,
    fontWeight: "600",
    color: Colors.secondary,
    marginBottom: 10,
  },
  chartContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  totalText: {
    position: "absolute",
    fontSize: 20,
    fontWeight: "500",
    color: Colors.secondary,
  },
  legendRow: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "center",
    gap: 20,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  colorBox: {
    width: 15,
    height: 15,
    borderRadius: 10,
  },
  legendText: {
    color: Colors.secondary,
    fontSize: 16,
  },
});
