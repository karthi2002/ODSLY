import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Header from "../../layouts/Header";
import Colors from "../../utils/Colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import { GradientText } from "../../components/Button/GradientText";
import { LinearGradient } from "expo-linear-gradient";
import RadioButton from "../../styles/RadioButton";
import {
  statsData,
  activeBets,
  liveWatchlist,
  BettingInsights,
  CommunityHighlights,
  activeSubscriptions,
  upcomingBets,
} from "../../json/data";
import BetCard from "../../components/Card/BetCard";
import GradientButton from "../../components/Button/GradientButton";
import { SubscriptionCard } from "../../components/Card/SubscriptionCard";
import { LineGradient } from "../../layouts/LineGradient";
import { useGetProfileQuery } from "../../redux/apis/profileApi";
import { clearSession } from '../../redux/session/sessionSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {
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
        console.log('HomeScreen: userSession from AsyncStorage:', userSession);
        console.log('HomeScreen: authToken from AsyncStorage:', authToken);
        console.log('HomeScreen: email from Redux:', email);
        console.log('HomeScreen: isValidEmail:', isValidEmail);
        if (!userSession || !isValidEmail) {
          console.log('HomeScreen: No valid session, redirecting to Login');
          await AsyncStorage.multiRemove(['userSession', 'authToken']);
          dispatch(clearSession());
          navigation.replace('AuthStack', { screen: 'Login' });
        } else {
          setSessionLoaded(true);
        }
      } catch (error) {
        console.error('HomeScreen: Error checking session:', error);
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
        <GradientText
          text={`Welcome back, ${profile?.username || "User"}!`}
          style={{ fontSize: 20 }}
        />
        {isLoading && (
          <Text style={styles.loadingText}>Loading profile...</Text>
        )}
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>
              {error.data?.message || error.data?.error || error.message || "Failed to load profile"}
            </Text>
            <TouchableOpacity onPress={() => refetch()}>
              <Text style={styles.retryText}>Retry</Text>
            </TouchableOpacity>
          </View>
        )}
        {!isLoading && !error && !profile && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>No profile data available</Text>
            <TouchableOpacity onPress={() => refetch()}>
              <Text style={styles.retryText}>Retry</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.statsGrid}>
          {statsData.map((item, index) => (
            <LinearGradient
              colors={["#624FBB", "#200F3B"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.statBoxContainer}
              key={index}
            >
              <RadioButton />
              <View style={styles.statBox}>
                <Text style={styles.statLabel}>{item.label}</Text>
                <View style={styles.statValueContainer}>
                  <Text style={styles.statValueText}>{item.value}</Text>
                  <Text
                    style={
                      item.changeType === "positive"
                        ? styles.statChange
                        : styles.statChangeRed
                    }
                  >
                    {item.change}
                  </Text>
                </View>
              </View>
            </LinearGradient>
          ))}
        </View>

        <LineGradient />

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Active Bets</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginRight: -15 }}>
            {activeBets.map((bet, index) => (
              <BetCard key={index} data={bet} type="active" />
            ))}
          </ScrollView>
        </View>

        <LineGradient />

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Live Game Watchlist</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginRight: -15 }}>
            {liveWatchlist.map((bet, index) => (
              <BetCard key={index} data={bet} type="live" />
            ))}
          </ScrollView>
        </View>

        <LineGradient />

        <View style={styles.inSightContainer}>
          <Text style={styles.sectionTitle}>Betting Insights</Text>
          {BettingInsights.map((item, index) => (
            <LinearGradient
              key={index}
              colors={["#029EFE", "#6945E2", "#E9098E"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradientBorder}
            >
              <View style={styles.innerCard}>
                <Text style={styles.betDetail}>
                  {item.icon} {item.text}
                  <Text style={styles.highlightText}>{item.highlight}</Text>
                  {item.suffix}
                </Text>
              </View>
            </LinearGradient>
          ))}
          <GradientButton
            label="View More"
            onPress={() => {}}
            arrowEnable={false}
          />
        </View>

        <LineGradient />

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Upcoming Bets</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginRight: -15 }}>
            {upcomingBets.map((bet, index) => (
              <BetCard key={index} data={bet} type="upcoming" />
            ))}
          </ScrollView>
        </View>

        <LineGradient />

        <View>
          <Text style={styles.sectionTitle}>Community Highlights</Text>
          <View style={styles.betCard}>
            {CommunityHighlights.map((item) => (
              <LinearGradient
                colors={["#624FBB", "#200F3B"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                key={item.id}
                style={styles.betDetailContainer}
              >
                <Text style={styles.textBet}>{item.text}</Text>
                <AntDesign
                  name="rightcircle"
                  size={24}
                  color={Colors.secondary}
                />
              </LinearGradient>
            ))}
          </View>
        </View>

        <LineGradient />

        <View>
          <Text style={styles.sectionTitle}>Subscription</Text>
          {activeSubscriptions.map((plan) => (
            <SubscriptionCard key={plan.id} plan={plan} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
  },
  sectionContainer: {
    backgroundColor: Colors.background,
    marginTop: 20,
    marginBottom: 10,
  },
  content: {
    paddingTop: 80,
    paddingHorizontal: 15,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 15,
    marginTop: 20,
  },
  statBoxContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    width: "49%",
    backgroundColor: "#3A3162",
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.5)",
    paddingVertical: 8,
    paddingHorizontal: 5,
    borderRadius: 50,
  },
  statBox: {
    flex: 1,
  },
  statLabel: {
    color: Colors.secondary,
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 2,
  },
  statValueContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statValueText: {
    color: Colors.secondary,
    fontSize: 14,
    fontWeight: "600",
  },
  statChange: {
    color: Colors.success,
    fontSize: 14,
    fontWeight: "600",
  },
  statChangeRed: {
    color: Colors.error,
    fontSize: 14,
    fontWeight: "600",
  },
  sectionTitle: {
    color: Colors.secondary,
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 20,
  },
  gradientBorder: {
    padding: 2,
    borderRadius: 10,
    marginVertical: 8,
  },
  innerCard: {
    backgroundColor: Colors.background,
    borderRadius: 8,
    padding: 14,
  },
  betDetail: {
    fontSize: 16,
    color: Colors.secondary,
    fontWeight: "500",
  },
  highlightText: {
    color: Colors.success,
    fontWeight: "600",
  },
  betCard: {
    display: "flex",
    flexDirection: "column",
    rowGap: 10,
  },
  betDetailContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#3A3162",
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 8,
    padding: 14,
  },
  textBet: {
    flex: 1,
    fontSize: 16,
    color: Colors.secondary,
    fontWeight: "500",
  },
  loadingText: {
    color: Colors.secondary,
    fontSize: 16,
    textAlign: "center",
    marginVertical: 10,
  },
  errorText: {
    color: Colors.error,
    fontSize: 16,
    textAlign: "center",
    marginVertical: 10,
  },
  errorContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  retryText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: '600',
    marginTop: 5,
  },
});