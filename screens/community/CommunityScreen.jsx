import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { clearSession } from '../../redux/session/sessionSlice';
import Header from "../../layouts/Header";
import Icon from "react-native-vector-icons/AntDesign";
import { GradientText } from "../../components/Button/GradientText";
import Colors from "../../utils/Colors";
import FeedScreen from "./FeedScreen";
import YourPostScreen from "./YourPostScreen";
import { LinearGradient } from "expo-linear-gradient";

export default function CommunityScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const email = useSelector((state) => state.session.userSession?.email);
  const isValidEmail = email && typeof email === 'string' && email.includes('@');
  const [sessionLoaded, setSessionLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState("feed");

  useEffect(() => {
    const checkSession = async () => {
      try {
        const userSession = await AsyncStorage.getItem('userSession');
        const authToken = await AsyncStorage.getItem('authToken');
        console.log('CommunityScreen: userSession from AsyncStorage:', userSession);
        console.log('CommunityScreen: authToken from AsyncStorage:', authToken);
        console.log('CommunityScreen: email from Redux:', email);
        console.log('CommunityScreen: isValidEmail:', isValidEmail);
        if (!userSession || !isValidEmail) {
          console.log('CommunityScreen: No valid session, redirecting to Login');
          await AsyncStorage.multiRemove(['userSession', 'authToken']);
          dispatch(clearSession());
          navigation.replace('AuthStack', { screen: 'Login' });
        } else {
          setSessionLoaded(true);
        }
      } catch (error) {
        console.error('CommunityScreen: Error checking session:', error);
        await AsyncStorage.multiRemove(['userSession', 'authToken']);
        dispatch(clearSession());
        navigation.replace('AuthStack', { screen: 'Login' });
      }
    };
    checkSession();
  }, [dispatch, navigation, email, isValidEmail]);

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
        <GradientText text="Community" style={{ fontSize: 20 }} />
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "feed" && styles.activeTab]}
            onPress={() => setActiveTab("feed")}
          >
            {activeTab === "feed" ? (
              <GradientText text="Feed" style={styles.gradientText} />
            ) : (
              <Text style={styles.inactiveText}>Feed</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === "posts" && styles.activeTab]}
            onPress={() => setActiveTab("posts")}
          >
            {activeTab === "posts" ? (
              <GradientText text="Your Posts" style={styles.gradientText} />
            ) : (
              <Text style={styles.inactiveText}>Your Posts</Text>
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.contentBox}>
          {activeTab === "feed" ? <FeedScreen /> : <YourPostScreen />}
        </View>
      </ScrollView>
      {activeTab === "posts" && (
        <TouchableOpacity
          style={styles.fixedButton}
          onPress={() =>
            navigation.navigate("CommunityStack", {
              screen: "CreateNewPost",
            })
          }
        >
          <LinearGradient
            colors={["#029EFE", "#6945E2", "#E9098E"]}
            locations={[0, 0.37, 1]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.fixedButtonGradient}
          >
            <Icon
              name="pluscircle"
              size={20}
              color={Colors.secondary}
              style={{ marginRight: 8 }}
            />
            <Text style={styles.fixedButtonText}>Create Post</Text>
          </LinearGradient>
        </TouchableOpacity>
      )}
    </View>
  );
}

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
  tabContainer: {
    flexDirection: "row",
    justifyContent: 'center',
    backgroundColor: "#624FBB90",
    marginVertical: 15,
    borderRadius: 8,
  },
  tab: {
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  activeTab: {
    backgroundColor: Colors.secondary,
    margin: 5,
  },
  inactiveText: {
    color: Colors.secondary,
    fontSize: 16,
    fontWeight: "700",
    textAlign: 'center',
  },
  gradientText: {
    fontWeight: "700",
    fontSize: 16,
    width: '100%',
    textAlign: 'center',
  },
  contentBox: {
    marginTop: 5,
  },
  fixedButton: {
    position: "absolute",
    bottom: 15,
    right: 15,
    alignItems: "center",
    zIndex: 10,
  },
  fixedButtonGradient: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignItems: "center",
    width: 150,
  },
  fixedButtonText: {
    color: Colors.secondary,
    fontSize: 16,
    fontWeight: "600",
  },
});