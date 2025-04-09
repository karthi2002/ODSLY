import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; 
import Colors from '../../utils/Colors';

const StepWizard = ({
  steps = 3,
  currentStep = 1,
  activeColors = ['#029EFE', '#6945E2', '#E9098E'], 
  inactiveColor = Colors.LightGray,
  stepHeight = 8,
  stepSpacing = 12,
  showStepNumber = false,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      {Array.from({ length: steps }).map((_, index) => {
        const isActive = index < currentStep;

        return (
          <View
            key={index}
            style={[
              styles.stepWrapper,
              { marginRight: index !== steps - 1 ? stepSpacing : 0 },
            ]}
          >
            {isActive ? (
              <LinearGradient
                colors={activeColors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  height: stepHeight,
                  width: '100%',
                  borderRadius: stepHeight / 2,
                }}
              />
            ) : (
              <View
                style={{
                  height: stepHeight,
                  width: '100%',
                  borderRadius: stepHeight / 2,
                  backgroundColor: inactiveColor,
                }}
              />
            )}
            {showStepNumber && (
              <Text style={styles.stepNumber}>{index + 1}</Text>
            )}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  stepNumber: {
    position: 'absolute',
    top: 4,
    fontSize: 12,
    color: Colors.secondary,
    fontWeight: 'bold',
  },
});

export default StepWizard;
