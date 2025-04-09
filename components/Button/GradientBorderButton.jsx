import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import { Dimensions } from 'react-native';
const { width } = Dimensions.get('window');



const GradientBorderButton = ({
  title,
  onPress,
  showBorderGradient,
  borderGradientColors = ['#029EFE', '#6945E2', '#E9098E'],
  borderColor,
  backgroundColor,
  paddingVertical,
  textColor,
  showTextGradient,
  textGradientColors = ['#029EFE', '#E9098E'],
  disabled = false,
  style,
}) => {
  const borderContent = (
    <View style={[styles.innerButton, { backgroundColor, paddingVertical }]}>
      <View style={styles.content}>
        
        {showTextGradient ? (
          <MaskedView
            maskElement={
              <Text style={[styles.text, { color: 'black' }]}>{title}</Text>
            }
          >
            <LinearGradient
              colors={textGradientColors}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={[styles.text, { opacity: 0 }]}>{title}</Text>
            </LinearGradient>
          </MaskedView>
        ) : (
          <Text style={[styles.text, { color: textColor }]}>{title}</Text>
        )}
      </View>
    </View>
  );

  return (
    <TouchableOpacity
      style={[styles.buttonContainer, style, disabled && styles.disabled]}
      onPress={onPress}
      disabled={disabled}
    >
      {showBorderGradient ? (
        <LinearGradient
          colors={borderGradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientBorder}
        >
          {borderContent}
        </LinearGradient>
      ) : (
        <View
          style={[
            styles.gradientBorder,
            { borderColor: borderColor, borderWidth: 2 },
          ]}
        >
          {borderContent}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: width - 100,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  gradientBorder: {
    width: '100%',
    padding: 2,
    borderRadius: 8,
  },
  innerButton: {
    width: '100%',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
  },
  disabled: {
    opacity: 0.6,
  },
});

export default GradientBorderButton;
