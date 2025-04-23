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
      <ScrollView style={{ flex: 1, backgroundColor: '#0b0b2a', padding: 16 }}>
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Insights</Text>

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
          <BettingBehavior />
          <AIrecommendationInsights />
          <CommunityComparisonComponent />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },
  content: {
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
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
