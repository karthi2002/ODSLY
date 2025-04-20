import React from 'react';
import { Text, View } from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';

export const GradientText = ({ text = '', style }) => {
  const fontSize = style?.fontSize || 32;
  const calculatedWidth = Math.max(text.length * fontSize * 0.6, 100); // Ensure minimum width

  return (
    <MaskedView
      maskElement={
        <View style={{ backgroundColor: 'transparent' }}>
          <Text
            style={[
              {
                fontSize,
                fontWeight: 'bold',
                textAlign: 'start',
              },
              style,
            ]}
          >
            {text}
          </Text>
        </View>
      }
    >
      <LinearGradient
        colors={['#029EFE', '#6945E2', '#E9098E']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
          height: fontSize + 5,
          width: calculatedWidth,
        }}
      />
    </MaskedView>
  );
};
