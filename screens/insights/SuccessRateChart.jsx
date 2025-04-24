import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import successRateData from '../../json/successRateData';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../../utils/Colors';

const screenWidth = Dimensions.get('window').width;

const chartConfig = {
  backgroundGradientFrom: '#1c1c5e',
  backgroundGradientTo: '#1c1c5e',
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: () => '#fff',
  barPercentage: 0.6,
  fillShadowGradient: '#8E2DE2',
  fillShadowGradientOpacity: 1,
  propsForBackgroundLines: {
    stroke: '#444',
  },
};

const SuccessRateChart = () => {

  console.log('📊 Chart Data:', successRateData.chart);

  return (
    <LinearGradient
          colors={["#624FBB", "#200F3B"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }} style={styles.container}>
      <Text style={styles.title}>{successRateData.title}</Text>
      <BarChart
        data={successRateData.chart}
        width={screenWidth - 64}
        height={220}
        chartConfig={chartConfig}
        verticalLabelRotation={0}
        fromZero
        showValuesOnTopOfBars
        style={styles.chartStyle}
      />
    </LinearGradient>
  );
};

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
    marginBottom: 15,
  },
  chartStyle: {
    borderRadius: 12,
  },
});

export default SuccessRateChart;
