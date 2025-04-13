import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Logo from "./Logo"; 
import Colors from "../utils/Colors";

const Header = () => {
  return (
    <View style={styles.container}>
      <Logo />
      <View style={styles.iconsContainer}>
        <TouchableOpacity style={styles.icon}>
          <Ionicons name="notifications-circle-outline" size={30} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon}>
          <FontAwesome name="user-circle-o" size={26} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 60,
    backgroundColor: Colors.background,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 100, 
    elevation: 4,
    shadowColor: Colors.primary, 
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
  },
  iconsContainer: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 12,
  },
});

export default Header;
