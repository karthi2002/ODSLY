import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Ionicons from "@expo/vector-icons/Ionicons";
import LogoImg from "../assets/icons/Logo.png";
import Colors from "../utils/Colors";

const Header = () => {
  
  const navigation = useNavigation();
  
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={LogoImg} style={styles.logo} />
        <Text style={styles.logoText}>ODSLY</Text>
      </View>
      <View style={styles.iconsContainer}>
        <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('Notification')}>
          <Ionicons name="notifications" size={22} color={Colors.secondary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('Profile')}>
          <Ionicons name="person" size={22} color={Colors.secondary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: 60,
    backgroundColor: Colors.background,
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 100,
    elevation: 4,
    shadowColor: Colors.secondary,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
  },
  logoContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  logo: {
    width: 35,
    height: 35,
  },
  logoText: {
    color: Colors.secondary,
    fontSize: 36,
    fontWeight: "bold",
    // fontFamily: 'Snasm'
  },
  iconsContainer: {
    flexDirection: 'row',
    gap: 10, 
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#313A5B',
    borderWidth: 0.5,
    borderColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Header;
