import React from 'react';
import { View } from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome6 } from '@expo/vector-icons';

const GradientIcon = ({ name, size, gradientColors }) => {
  return (
    <MaskedView
      maskElement={
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <FontAwesome6 name={name} size={size} color="black" />
        </View>
      }
    >
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ width: size, height: size }}
      />
    </MaskedView>
  );
};

export default GradientIcon;
