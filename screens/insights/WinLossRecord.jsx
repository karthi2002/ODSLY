import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { G, Circle } from 'react-native-svg';

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
    <View style={styles.container}>
      <Text style={styles.title}>🏆 Overall Win/Loss Record</Text>
      
      <View style={styles.chartContainer}>
        <Svg width={center * 2} height={center * 2}>
          <G rotation="-90" origin={`${center}, ${center}`}>
            {/* Background Circle */}
            <Circle
              cx={center}
              cy={center}
              r={radius}
              stroke="#FF6E40"
              strokeWidth={strokeWidth}
              fill="none"
            />
            {/* Foreground Win Circle */}
            <Circle
              cx={center}
              cy={center}
              r={radius}
              stroke="#00C853"
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
          <View style={[styles.colorBox, { backgroundColor: '#00C853' }]} />
          <Text style={styles.legendText}>Win: {win}</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.colorBox, { backgroundColor: '#FF6E40' }]} />
          <Text style={styles.legendText}>Lose: {lose}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1E1B3A',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 20,
  },
  chartContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  totalText: {
    position: 'absolute',
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFF',
  },
  legendRow: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'center',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  colorBox: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 8,
  },
  legendText: {
    color: '#FFF',
    fontSize: 16,
  },
});
