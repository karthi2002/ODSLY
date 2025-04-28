import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
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
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen() {

  const [username, setUsername] = useState('');

  useEffect(() => {
    const loadUserSession = async () => {
      try {
        const userSession = await AsyncStorage.getItem('userSession');
        if (userSession !== null) {
          const user = JSON.parse(userSession);
          setUsername(user.username); 
        }
      } catch (error) {
        console.log('Error loading user session:', error);
      }
    };

    loadUserSession();
  }, []);

  return (
    <View style={styles.container}>
      <Header />

      <ScrollView
        style={styles.content}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <GradientText text={`Welcome back, ${username}!`} style={{ fontSize: 20 }} />

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
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginRight: -15 }} >
            {activeBets.map((bet, index) => (
              <BetCard key={index} data={bet} type="active" />
            ))}
          </ScrollView>
        </View>

        <LineGradient />

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Live Game Watchlist</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginRight: -15 }} >
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
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginRight: -15 }} >
            {upcomingBets.map((bet, index) => (
              <BetCard key={index} data={bet} type={"upcoming"}/>
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
});

