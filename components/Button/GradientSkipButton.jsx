import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import Colors from '../../utils/Colors';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const { width } = Dimensions.get('window');

const GradientText = ({ text, style }) => (
  <MaskedView
    maskElement={
      <View style={styles.maskContainer}>
        <Text style={[styles.text, style]}>{text}</Text>
      </View>
    }
  >
    <LinearGradient
      colors={['#029EFE', '#6945E2', '#E9098E']}
      locations={[0, 0.37, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.gradientFill}
    >
      <Text style={[styles.text, style, { opacity: 0 }]}>{text}</Text>
    </LinearGradient>
  </MaskedView>
);

const GradientSkipButton = ({ label = 'Skip', onPress, style }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[styles.touchable, style]}
    >
      <View style={styles.container}>
        {/* Gradient Text */}
        <GradientText text={label} />

        {/* Gradient Square with White Arrow */}
        <LinearGradient
          colors={['#029EFE', '#6945E2', '#E9098E']}
          locations={[0, 0.37, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.arrowSquare}
        >
          <FontAwesome6
            name="arrow-right-long"
            size={14}
            color="#FFFFFF" // White arrow
          />
        </LinearGradient>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchable: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    marginVertical: 10,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  maskContainer: {
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  gradientFill: {
    flex: 1,
  },
  text: {
    color: '#FFFFFF', // Fallback color, masked by gradient
    fontSize: 16,
    fontWeight: '500',
    backgroundColor: 'transparent',
  },
  arrowSquare: {
    width: 24, // Square size
    height: 24,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primary,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
});

export default GradientSkipButton;