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
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

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
          <GradientText style={styles.gradientTitle} text="Placing & Tracking Bets" />

          <View style={styles.searchRow}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search Bets"
              placeholderTextColor="#aaa"
            />
            <TouchableOpacity style={styles.filterButton}>
              <LinearGradient
                colors={["#4FACFE", "#E84DFF"]}
                style={styles.filterGradient}
              >
                <Feather name="filter" size={20} color="#fff" />
              </LinearGradient>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.syncButton}>
            <LinearGradient
              colors={["#4FACFE", "#E84DFF"]}
              style={styles.syncGradient}
            >
              <Text style={styles.syncText}>Sync Sportsbook Accounts</Text>
              <Feather name="arrow-right" size={16} color="#fff" />
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <View>
          <Text style={styles.sectionTitle}>Active Bets</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {Array.isArray(activeBets) &&
              activeBets.map((bet, index) => (
                <BetCard key={index} data={bet} type="active" />
              ))}
          </ScrollView>

          <LineGradient />

          <Text style={styles.sectionTitle}>Live Games</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
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
        onPress={() => navigation.navigate("CreateBet")}
      >
        <LinearGradient
          colors={["#4FACFE", "#E84DFF"]}
          style={styles.fixedButtonGradient}
        >
          <Text style={styles.fixedButtonText}>
            <Icon name="pluscircle" size={18} color="#fff" style={{ marginRight: 8 }} />  
            Add New Bets
          </Text>
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
  gradientTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 0,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
    marginTop: 20,
  },
  searchInput: {
    flex: 1,
    backgroundColor: "#2A2A3E",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 25,
    color: "#fff",
  },
  filterButton: {
    marginLeft: 10,
  },
  filterGradient: {
    padding: 10,
    borderRadius: 25,
  },
  syncButton: {
    alignSelf: "stretch",
  },
  syncGradient: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 5,
  },
  syncText: {
    color: "#fff",
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
    bottom: 30, 
    left: 180,  
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
    width: '62%', 
  },
  fixedButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    marginRight: 8,
  },
});
