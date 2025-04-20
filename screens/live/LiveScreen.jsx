import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Header from "../../layouts/Header";
import Colors from "../../utils/Colors";
import Feather from "@expo/vector-icons/Feather";
import { GradientText } from "../../components/Button/GradientText";
import { LinearGradient } from "expo-linear-gradient";
import { activeBets, liveWatchlist } from "../../json/data";
import BetCard from "../../components/Card/BetCard";
import { LineGradient } from "../../layouts/LineGradient";
import Icon from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import GradientButton from "../../components/Button/GradientButton";

export default function LiveScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView
        style={styles.content}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topSection}>
          <GradientText
            style={{ fontSize: 20 }}
            text="Placing & Tracking Bets"
          />

          <View style={styles.searchRow}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search Bets"
              placeholderTextColor={Colors.text}
            />
            <TouchableOpacity
              style={styles.filterButton}
              onPress={() =>
                navigation.navigate("LiveStack", { screen: "LiveFilter" })
              }
            >
              <LinearGradient
                colors={["#029EFE", "#6945E2", "#E9098E"]}
                style={styles.filterGradient}
              >
                <Feather name="filter" size={20} color={Colors.secondary} />
              </LinearGradient>
            </TouchableOpacity>
          </View>

          <GradientButton
            label="Sync Sportsbook Accounts"
            onPress={() => {}}
            arrowEnable={true}
          />
        </View>

        <View>
          <Text style={styles.sectionTitle}>Active Bets</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginRight: -15 }} >
            {Array.isArray(activeBets) &&
              activeBets.map((bet, index) => (
                <BetCard key={index} data={bet} type="active" />
              ))}
          </ScrollView>

          <LineGradient />

          <Text style={styles.sectionTitle}>Live Games</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginRight: -15 }} >
            {Array.isArray(liveWatchlist) &&
              liveWatchlist.map((bet, index) => (
                <BetCard key={index} data={bet} type="watchlist" />
              ))}
          </ScrollView>
        </View>
      </ScrollView>

      {/* Fixed Button for Adding New Bet */}
      <TouchableOpacity
        style={styles.fixedButton}
        onPress={() =>
          navigation.navigate("LiveStack", {
            screen: "LiveNewBet",
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
          <Text style={styles.fixedButtonText}>Add New Bets</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    paddingTop: 80,
    paddingHorizontal: 15,
  },
  topSection: {
    marginBottom: 30,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginBottom: 10,
    marginTop: 20,
  },
  searchInput: {
    flex: 1,
    backgroundColor: "#2A2A3E",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 25,
    color: Colors.secondary,
  },
  filterGradient: {
    padding: 10,
    borderRadius: 25,
  },
  syncText: {
    color: Colors.secondary,
    fontSize: 15,
    fontWeight: "700",
    marginRight: 8,
  },
  sectionTitle: {
    color: Colors.secondary,
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 20,
  },
  fixedButton: {
    position: "absolute",
    bottom: 15,
    right: -30,
    alignItems: "center",
    zIndex: 10,
  },
  fixedButtonGradient: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingVertical: 15,
    paddingHorizontal: 5,
    borderRadius: 30,
    alignItems: "center",
    width: "62%",
  },
  fixedButtonText: {
    color: Colors.secondary,
    fontSize: 16,
    fontWeight: "600",
    marginRight: 8,
  },
});
