import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Ionicons from "@expo/vector-icons/Ionicons";
import LogoImg from "../assets/icons/Logo.png";
import Colors from "../utils/Colors";
import { useSelector, useDispatch } from "react-redux";
import { fetchProfile } from "../redux/profile/profileActions";

const Header = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  
  const { profile } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

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
          {profile.image ? (
            <Image source={{ uri: profile.image }} style={styles.profileImage} />
          ) : (
            <Ionicons name="person" size={22} color={Colors.secondary} />
          )}
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
    height: 65,
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
    marginBottom: 10,
  },
  logoContainer: {
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
    fontSize: 30,
    fontWeight: "bold",
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
    borderColor: Colors.secondary,
    alignItems: "center",
    justifyContent: "center",
    overflow: 'hidden',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

export default Header;
