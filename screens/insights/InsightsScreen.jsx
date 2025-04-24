import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import Header from "../../layouts/Header";
import WinLossRecord from './WinLossRecord';
import ROIComponent from './ROI';
import BettingBehavior from './BettingBehavior';
import SuccessRateChart from './SuccessRateChart';
import Colors from '../../utils/Colors';
import AIrecommendationInsights from './AIrecommendationInsights';
import CommunityComparisonComponent from './CommunityComparisonComponent';
import { GradientText } from '../../components/Button/GradientText';
import { LineGradient } from '../../layouts/LineGradient';

const timeOptions = [
  { label: 'All Time', value: 'all_time' },
  { label: 'Last 30 Days', value: 'last_30_days' },
  { label: 'Last 7 Days', value: 'last_7_days' },
];

const sportOptions = [
  { label: 'All Sports', value: 'all_sports' },
  { label: 'NBA', value: 'nba' },
  { label: 'NFL', value: 'nfl' },
  { label: 'MLB', value: 'mlb' },
];

export default function InsightsScreen() {
  const [selectedTime, setSelectedTime] = useState('all_time');
  const [selectedSport, setSelectedSport] = useState('all_sports');

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView style={styles.content}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}>

         <GradientText text="Insights" style={{ fontSize: 20 }} />

          <View style={styles.pickerContainer}>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.dropdownText}
              selectedTextStyle={styles.dropdownText}
              data={timeOptions}
              maxHeight={150}
              labelField="label"
              valueField="value"
              placeholder="Select Time"
              value={selectedTime}
              onChange={item => setSelectedTime(item.value)}
            />

            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.dropdownText}
              selectedTextStyle={styles.dropdownText}
              data={sportOptions}
              maxHeight={150}
              labelField="label"
              valueField="value"
              placeholder="Select Sport"
              value={selectedSport}
              onChange={item => setSelectedSport(item.value)}
            />
          </View>

          <WinLossRecord />
          <ROIComponent />
          <SuccessRateChart />
          <LineGradient />
          <BettingBehavior />
          <LineGradient />
          <AIrecommendationInsights />
          <LineGradient />
          <CommunityComparisonComponent />
          
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    paddingTop: 80,
    paddingHorizontal: 15,
  },
  sectionTitle: {
    color: Colors.secondary,
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 20,
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dropdown: {
    flex: 1,
    height: 45,
    borderRadius: 8,
    backgroundColor: '#2A2650',
    paddingHorizontal: 10,
    marginHorizontal: 5,
  },
  dropdownText: {
    color: '#fff',
    fontSize: 14,
  },
});
