import React, { useEffect } from 'react';
import { View, Image, Text, StyleSheet} from 'react-native';
import Logo from '../assets/icons/Logo.png'
import Colors from '../utils/Colors';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Auth');
    }, 2000); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logo} />
      <Text style={styles.title}>ODSLY</Text>
      <Text style={styles.subtitle}>THE ULTIMATE BETTOR'S PLAYGROUND</Text>
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
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    color: Colors.secondary,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: Colors.secondary,
    fontWeight: 400,
    marginTop: 5,
  },
});
