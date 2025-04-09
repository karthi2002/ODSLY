import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Logo from '../layouts/Logo';
import { useNavigation } from '@react-navigation/native';
import Banner from '../assets/images/banner.png'
import GradientButton from "../components/Button/GradientButton";
import Colors from '../utils/Colors';
export default function AuthScreen() {

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Logo />
      <Image source={Banner} style={styles.illustration} />
      <View style={styles.buttonContainer}>
        <GradientButton label="Sign Up" onPress={() => navigation.navigate('Signup')} arrowEnable={false} />
        <GradientButton label="Login" onPress={() => navigation.navigate('Login')} arrowEnable={false} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  illustration: {
    width: 300,
    height: 250,
    resizeMode: 'contain',
    marginTop: 80
  },
  buttonContainer: {
    marginTop: 40,
  }
});
