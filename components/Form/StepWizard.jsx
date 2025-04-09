import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Colors from '../../utils/Colors';

const StepWizard = ({
  steps = 3,
  currentStep = 1,
  activeColor = '#029EFE',
  inactiveColor = '#d4d0c5',
  stepHeight = 12,
  stepSpacing = 8,
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
            <View
              style={[
                styles.step,
                {
                  backgroundColor: isActive ? activeColor : inactiveColor,
                  height: stepHeight,
                  borderRadius: stepHeight / 2,
                },
              ]}
            />
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
  step: {
    width: '100%',
  },
  stepNumber: {
    position: 'absolute',
    top: 4,
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default StepWizard;
