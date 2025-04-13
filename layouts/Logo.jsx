import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Colors from "../utils/Colors";
import LogoImg from '../assets/icons/Logo.png'

const Logo = () => {
  return (
    <View style={styles.logoContainer}>
      <Image source={LogoImg} style={styles.logo} />
      <Text style={styles.logoText}>ODSLY</Text>
    </View>
  );
};

const styles = StyleSheet.create({
     logoContainer: {
      display: "flex",
      flexDirection: "row",
      gap: 10,
      alignItems: "center",
    },
    logo: {
      width: 50,
      height: 50,
    },
    logoText: {
      color: Colors.secondary,
      fontSize: 42,
      fontWeight: "bold",
      // fontFamily: 'Snasm'
    }
  });

  
export default Logo;
