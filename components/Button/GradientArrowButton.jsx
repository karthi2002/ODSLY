import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons'; 
import Colors from '../../utils/Colors'; 

const GradientArrowButton = ({ label, onPress, style }) => {
  return (
    <LinearGradient
      colors={["#029EFE", "#6945E2", "#E9098E"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.gradientBorder, style]}
    >
      <TouchableOpacity onPress={onPress} style={styles.innerBox}>
        <Text style={styles.label}>{label}</Text>
        <Ionicons name="chevron-forward" size={20} color="white" />
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientBorder: {
    padding: 2,
    borderRadius: 12,
    width: '100%',
    marginVertical: 10,
  },
  innerBox: {
    backgroundColor: "#1E2A5C",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    color: Colors.secondary,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default GradientArrowButton;
