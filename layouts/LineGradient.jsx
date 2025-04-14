import { LinearGradient } from 'expo-linear-gradient';
import { View, StyleSheet } from 'react-native';

export const LineGradient = ({style}) => {
  return (
    <LinearGradient
      colors={['rgba(224,225,226,0)', 'rgba(224,225,226,1)', 'rgba(224,225,226,0.16)']}
      locations={[0, 0.5, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={[styles.gradient, style]}
    />
  );
};

const styles = StyleSheet.create({
  gradient: {
    height: 2,
    width: '100%',
    borderRadius: 12,
    marginVertical: 25
  },
});
