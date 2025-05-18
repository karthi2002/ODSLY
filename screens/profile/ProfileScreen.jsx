import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from 'react-redux';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Ionicons } from "@expo/vector-icons";
import { LineGradient } from "../../layouts/LineGradient";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "../../utils/Colors";
import Header from "../../layouts/Header";
import { profileData } from "../../json/ProfileData";
import GradientButton from "../../components/Button/GradientButton";
import { useGetProfileQuery } from "../../redux/apis/profileApi";
import { clearSession } from '../../redux/session/sessionSlice';
import DefaultImage from '../../assets/images/default-user-image.jpg';

const fallbackImage = Image.resolveAssetSource(DefaultImage).uri;

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const email = useSelector((state) => state.session.userSession?.email);
  const isValidEmail = email && typeof email === 'string' && email.includes('@');
  const [sessionLoaded, setSessionLoaded] = useState(false);

  // Check session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const userSession = await AsyncStorage.getItem('userSession');
        const authToken = await AsyncStorage.getItem('authToken');
        console.log('ProfileScreen: userSession from AsyncStorage:', userSession);
        console.log('ProfileScreen: authToken from AsyncStorage:', authToken);
        console.log('ProfileScreen: email from Redux:', email);
        console.log('ProfileScreen: isValidEmail:', isValidEmail);
        if (!userSession || !isValidEmail) {
          console.log('ProfileScreen: No valid session, redirecting to Login');
          await AsyncStorage.multiRemove(['userSession', 'authToken']);
          dispatch(clearSession());
          navigation.replace('AuthStack', { screen: 'Login' });
        } else {
          setSessionLoaded(true);
        }
      } catch (error) {
        console.error('ProfileScreen: Error checking session:', error);
        await AsyncStorage.multiRemove(['userSession', 'authToken']);
        dispatch(clearSession());
        navigation.replace('AuthStack', { screen: 'Login' });
      }
    };
    checkSession();
  }, [dispatch, navigation, email, isValidEmail]);

  const { data: profile, isLoading, error, refetch } = useGetProfileQuery(email, {
    skip: !sessionLoaded || !isValidEmail,
  });

  const handleNavigate = async (route) => {
    if (route === "AuthStack") {
      console.log('ProfileScreen: Logging out, clearing session');
      await AsyncStorage.multiRemove(['userSession', 'authToken']);
      dispatch(clearSession());
      navigation.replace("AuthStack", { screen: 'Login' });
    } else {
      navigation.navigate("ProfileStack", { screen: route });
    }
  };

  const renderItem = ({ item }) => (
    <LinearGradient
      colors={["#624FBB", "#200F3B"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.item}
    >
      <View style={styles.itemLeft}>
        <Ionicons
          name={item.icon}
          style={styles.icon}
          size={20}
          color={Colors.secondary}
        />
        <Text style={styles.itemText}>{item.label}</Text>
      </View>
      <GradientButton
        label=""
        onPress={() => handleNavigate(item.route)}
        arrowEnable={true}
        style={{ width: 40, gap: 7, paddingVertical: 5 }}
      />
    </LinearGradient>
  );

  if (!sessionLoaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView
        style={styles.content}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Card */}
        <LinearGradient
          colors={["#624FBB", "#200F3B"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.profileCard}
        >
          <View style={styles.imageSection}>
            <Image
              source={{ uri: profile?.image || fallbackImage }}
              style={styles.avatar}
              onError={() => console.log("Profile image load error")}
            />
            <View>
              <Text style={styles.name}>
                {isLoading ? "Loading..." : profile?.username || "User"}
              </Text>
              <Text style={styles.email}>
                {isLoading ? "Loading..." : profile?.email || "N/A"}
              </Text>
            </View>
          </View>
          <LineGradient style={{ marginVertical: 18 }} />
          <TouchableOpacity
            style={styles.upgradeBtn}
            onPress={() =>
              handleNavigate(profileData.profileCard.upgrade.route)
            }
          >
            <Text style={styles.upgradeText}>
              {profileData.profileCard.upgrade.label}
            </Text>
            <AntDesign name="rightcircle" size={24} color="#ffcc00" />
          </TouchableOpacity>
        </LinearGradient>

        {/* Error Message */}
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>
              {error.data?.message || error.message || "Failed to load profile"}
            </Text>
            <TouchableOpacity onPress={() => refetch()}>
              <Text style={styles.retryText}>Retry</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* List Items */}
        <FlatList
          data={profileData.profileNavigation}
          keyExtractor={(item) => item.label}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
  },
  content: {
    paddingTop: 80,
    paddingHorizontal: 15,
  },
  profileCard: {
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  imageSection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  avatar: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    color: Colors.secondary,
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  email: {
    color: Colors.secondary,
    fontSize: 16,
    fontWeight: "600",
  },
  upgradeBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  upgradeText: {
    color: "#FFCC00",
    fontSize: 18,
    fontWeight: "600",
  },
  list: {
    paddingTop: 10,
  },
  item: {
    paddingVertical: 2,
    paddingLeft: 15,
    borderRadius: 10,
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  icon: {
    borderRadius: 50,
    padding: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.5)",
    backgroundColor: "#3A3162",
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemText: {
    color: Colors.secondary,
    marginLeft: 10,
    fontSize: 18,
    fontWeight: "500",
  },
  errorText: {
    color: Colors.error,
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
  },
  errorContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  retryText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: '600',
    marginTop: 5,
  },
});

export default ProfileScreen;