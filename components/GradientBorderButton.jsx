import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons'; 

const GradientBorderButton = ({
  title,
  onPress,
  gradientColors = ['#029EFE', '#6945E2', '#E9098E'],
  backgroundColor = '#000A34', 
  textColor = '#FFFFFF', 
  iconName, 
  disabled = false,
  style,
}) => {
  return (
    <TouchableOpacity
      style={[styles.buttonContainer, style, disabled && styles.disabled]}
      onPress={onPress}
      disabled={disabled}
    >
      {/* Gradient Border */}
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientBorder}
      >
        {/* Inner Button */}
        <View style={[styles.innerButton, { backgroundColor }]}>
          <View style={styles.content}>
            {iconName && (
              <Ionicons
                name={iconName}
                size={20}
                color={textColor}
                style={styles.icon}
              />
            )}
            <Text style={[styles.text, { color: textColor }]}>
              {title}
            </Text>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradientBorder: {
    padding: 2, // Border thickness
    borderRadius: 8,
  },
  innerButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6, // Slightly smaller than gradientBorder
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  icon: {
    marginRight: 8, // Space between icon and text
  },
  disabled: {
    opacity: 0.6,
  },
});

export default GradientBorderButton;