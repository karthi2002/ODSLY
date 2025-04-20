import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, CheckBox } from 'react-native';

const FiltersScreen = ({ navigation }) => {
  const [sportsbookFilters, setSportsbookFilters] = useState({
    fanDuel: false,
    drafting: false,
    bet365: false,
    metMgm: false,
    fanatics: false,
    espnBet: false,
    caesarsSportsbook: false,
    hardRockBet: false,
  });

  const [dfsFilters, setDfsFilters] = useState({
    prizePicks: false,
    underdog: false,
    sleeper: false,
    chalkboard: false,
    dabble: false,
  });

  const handleClear = () => {
    setSportsbookFilters({
      fanDuel: false,
      drafting: false,
      bet365: false,
      metMgm: false,
      fanatics: false,
      espnBet: false,
      caesarsSportsbook: false,
      hardRockBet: false,
    });
    setDfsFilters({
      prizePicks: false,
      underdog: false,
      sleeper: false,
      chalkboard: false,
      dabble: false,
    });
  };

  const handleApply = () => {
    // Handle apply logic here
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>←</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Filters</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sportsbook Account</Text>
        {Object.keys(sportsbookFilters).map((key) => (
          <View key={key} style={styles.checkboxContainer}>
            <CheckBox
              value={sportsbookFilters[key]}
              onValueChange={(value) => setSportsbookFilters({ ...sportsbookFilters, [key]: value })}
              tintColors={{ true: '#a3bffa', false: '#a3bffa' }}
            />
            <Text style={styles.checkboxLabel}>{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>DFS</Text>
        {Object.keys(dfsFilters).map((key) => (
          <View key={key} style={styles.checkboxContainer}>
            <CheckBox
              value={dfsFilters[key]}
              onValueChange={(value) => setDfsFilters({ ...dfsFilters, [key]: value })}
              tintColors={{ true: '#a3bffa', false: '#a3bffa' }}
            />
            <Text style={styles.checkboxLabel}>{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}</Text>
          </View>
        ))}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.clearButton]} onPress={handleClear}>
          <Text style={styles.buttonText}>Clear</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.applyButton]} onPress={handleApply}>
          <Text style={styles.buttonText}>Apply</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1f3c',
    padding: 20,
  },
  back: {
    marginBottom: 20,
  },
  backText: {
    fontSize: 24,
    color: '#fff',
  },
  title: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#a3bffa',
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkboxLabel: {
    color: '#fff',
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: '48%',
    alignItems: 'center',
  },
  clearButton: {
    backgroundColor: '#00ccff',
  },
  applyButton: {
    backgroundColor: '#ff00ff',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default FiltersScreen;