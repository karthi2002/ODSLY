import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import successRateData from '../../json/successRateData';

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
  // Debugging check – ensure data is received correctly
  console.log('📊 Chart Data:', successRateData.chart);

  return (
    <View style={styles.container}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#11123f',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 10,
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
  },
  chartStyle: {
    borderRadius: 12,
  },
});

export default SuccessRateChart;
