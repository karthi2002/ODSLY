import React, { useState, useEffect } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import Ionicons from "@expo/vector-icons/Ionicons";
import LogoImg from "../assets/icons/Logo.png";
import Colors from "../utils/Colors";
import { useGetProfileQuery } from "../redux/apis/profileApi";
import DefaultImage from '../assets/images/default-user-image.jpg';

let AsyncStorage;
try {
  AsyncStorage = require('@react-native-async-storage/async-storage').default;
} catch (error) {
  console.error('Header: Failed to import AsyncStorage:', error);
}

const fallbackImage = Image.resolveAssetSource(DefaultImage).uri;

const Header = () => {
  const navigation = useNavigation();
  const email = useSelector((state) => state.session.userSession?.email);
  const isValidEmail = email && typeof email === 'string' && email.includes('@');
  const [sessionLoaded, setSessionLoaded] = useState(false);

  // Check session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        if (!AsyncStorage) {
          console.warn('Header: AsyncStorage not available, skipping session check');
          setSessionLoaded(true);
          return;
        }
        const userSession = await AsyncStorage.getItem('userSession');
        console.log('Header: userSession from AsyncStorage:', userSession);
        console.log('Header: email from Redux:', email);
        console.log('Header: isValidEmail:', isValidEmail);
        setSessionLoaded(true);
      } catch (error) {
        console.error('Header: Error checking session:', error);
        setSessionLoaded(true); // Proceed to show fallback UI
      }
    };
    checkSession();
  }, [email, isValidEmail]);

  const { data: profile, isLoading, error } = useGetProfileQuery(email, {
    skip: !sessionLoaded || !isValidEmail,
  });

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={LogoImg} style={styles.logo} />
        <Text style={styles.logoText}>ODSLY</Text>
      </View>
      <View style={styles.iconsContainer}>
        <TouchableOpacity
          style={styles.icon}
          onPress={() => navigation.navigate('Notification')}
        >
          <Ionicons name="notifications" size={22} color={Colors.secondary} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.icon}
          onPress={() => navigation.navigate('Profile')}
        >
          {isLoading || error || !sessionLoaded || !isValidEmail || !profile?.image ? (
            <Ionicons name="person" size={22} color={Colors.secondary} />
          ) : (
            <Image
              source={{ uri: profile.image || fallbackImage }}
              style={styles.profileImage}
              onError={() => console.log("Profile image load error")}
            />
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
    fontSize: 36,
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