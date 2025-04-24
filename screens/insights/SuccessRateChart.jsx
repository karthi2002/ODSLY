import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import successRateData from '../../json/successRateData';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../../utils/Colors';

const screenWidth = Dimensions.get('window').width;

const chartConfig = {
  backgroundColor: 'transparent',
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: () => Colors.secondary,
  yAxisInterval: 20,
  barPercentage: 0.8,
  propsForBackgroundLines: {
    stroke: Colors.text, 
    strokeDasharray: '',
  },
  propsForLabels: {
    fontSize: 12, 
  },
};

const SuccessRateChart = () => {
  return (
    <LinearGradient
      colors={["#624FBB", "#200F3B"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }} 
      style={styles.container}
    >
      <Text style={styles.title}>🔍 Success Rate on Bet Types</Text>
      <BarChart
        data={successRateData.chart}
        width={screenWidth - 64}
        height={250}
        chartConfig={chartConfig}
        verticalLabelRotation={0}
        fromZero
        showValuesOnTopOfBars={true}
        withInnerLines={true}
        withHorizontalLabels={true}
        style={styles.chartStyle}
        withCustomBarColorFromData={true}
        flatColor={true}
        segments={5} 
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
