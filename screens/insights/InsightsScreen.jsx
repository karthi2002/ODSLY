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
import { LinearGradient } from 'expo-linear-gradient';

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
          <LinearGradient
        colors={["#624FBB", "#200F3B"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradientContainer}
      >
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
      </LinearGradient>

      <LinearGradient
        colors={["#624FBB", "#200F3B"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradientContainer}
      >
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
      </LinearGradient>
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
    marginVertical: 15,
    gap: 15
  },
  gradientContainer: {
    borderRadius: 12,
    width: '40%',
    borderWidth: 0.5,
    borderColor: "rgba(255, 255, 255, 0.5)",
  },
  dropdown: {
    borderRadius: 12,
    height: 40, 
    paddingHorizontal: 10,
    backgroundColor: 'transparent', 
  },
  dropdownText: {
    color: Colors.secondary, 
    fontSize: 16,
    fontWeight: '500'
  },
});
