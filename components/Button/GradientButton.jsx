import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../../utils/Colors';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const { width } = Dimensions.get('window');

const GradientButton = ({ label, onPress, arrowEnable }) => {

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <LinearGradient
        colors={['#029EFE', '#6945E2', '#E9098E']}
        locations={[0, 0.37, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.button}
      >
        <View style={styles.container}>
            <Text style={styles.text}>{label}</Text>
            {arrowEnable && ( <FontAwesome6 name="arrow-right-long" size={18} color={Colors.secondary} /> )}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  button: {
    width: width - 100,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    shadowColor: Colors.primary,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 3,
    marginVertical: 10
  },
  text: {
    color: Colors.secondary,
    fontSize: 16,
    fontWeight: '500',
  },
});

export default GradientButton;
