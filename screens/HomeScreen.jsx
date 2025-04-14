import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import Header from "../layouts/Header";
import Colors from "../utils/Colors";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.welcomeText}>Welcome back, <Text style={styles.username}>Zack!</Text></Text>

        <View style={styles.statsGrid}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Total Bets Today</Text>
            <Text style={styles.statValue}>4 <Text style={styles.statChange}>+55%</Text></Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Win Rate (Last 7 days)</Text>
            <Text style={styles.statValue}>69% <Text style={styles.statChange}>+55%</Text></Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Parlays in Progress</Text>
            <Text style={styles.statValue}>2 <Text style={styles.statChangeRed}>-12%</Text></Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Weekly ROI</Text>
            <Text style={styles.statValue}>+ $142.50 <Text style={styles.statChange}>+55%</Text></Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Active Bets</Text>
        <View style={styles.betCard}>
          <Text style={styles.betDetail}><Text style={styles.betLabel}>Type:</Text> 3-Leg Parlay</Text>
          <Text style={styles.betDetail}><Text style={styles.betLabel}>Teams:</Text> Eagles -6.5, Knicks ML, Warriors Over 215.5</Text>
          <Text style={styles.betDetail}><Text style={styles.betLabel}>Odds:</Text> +550</Text>
          <Text style={styles.betDetail}><Text style={styles.betLabel}>Wager:</Text> $25</Text>
          <Text style={styles.betDetail}><Text style={styles.betLabel}>Status:</Text> 2 out of 3 legs hit</Text>
          <Text style={styles.betDetail}><Text style={styles.betLabel}>Progress:</Text> <Text style={styles.progressText}>67%</Text></Text>
          <Text style={styles.betDetail}><Text style={styles.betLabel}>Game:</Text> Warriors game at Halftime</Text>

          <View style={styles.betActions}>
            <TouchableOpacity><Text style={styles.viewBet}>View Bet</Text></TouchableOpacity>
            <TouchableOpacity><Text style={styles.watchLive}>Watch Live</Text></TouchableOpacity>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Live Game Watchlist</Text>
        <View style={styles.betCard}>
          <Text style={styles.betDetail}><Text style={styles.betLabel}>Teams:</Text> Lakers VS Suns</Text>
          <Text style={styles.betDetail}><Text style={styles.betLabel}>Score:</Text> 78-72 (Q3, 3:34 left)</Text>
          <Text style={styles.betDetail}><Text style={styles.betLabel}>Bet:</Text> Over 223.5 – Current Total: 150</Text>
          <Text style={styles.betDetail}><Text style={styles.betLabel}>Status:</Text> On Pace</Text>

          <View style={styles.betActions}>
            <TouchableOpacity><Text style={styles.watchLive}>Watch Overlay</Text></TouchableOpacity>
            <TouchableOpacity><Text style={styles.viewBet}>View Stats</Text></TouchableOpacity>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Betting Insights</Text>
        <View style={styles.betCard}>
          <Text style={styles.betDetail}>📊 You’ve hit <Text style={styles.progressText}>72%</Text> of your NBA props this season.</Text>
          <Text style={styles.betDetail}>💰 Your best ROI is on MLB underdog picks (<Text style={styles.progressText}>+23%</Text>).</Text>
          <Text style={styles.betDetail}>📉 Your average parlay win is <Text style={styles.progressText}>$185.22</Text>.</Text>
          <Text style={styles.betDetail}>📅 Saturday bets perform <Text style={styles.progressText}>20%</Text> better than weekday bets.</Text>
          <Text style={styles.betDetail}>⚠️ You <Text style={{color: '#ff5555'}}>lose more often</Text> betting over/unders – consider skipping them.</Text>

          <TouchableOpacity style={styles.viewMoreButton}><Text style={styles.viewMoreText}>View More</Text></TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Community Highlights</Text>
        <View style={styles.betCard}>
          <Text style={styles.betDetail}>@sportswiz just hit a +900 parlay on NBA!</Text>
          <Text style={styles.betDetail}>Tonight’s most picked team: Kansas Jayhawks</Text>
          <Text style={styles.betDetail}>Top bettor of the week: @LockKing (12–2 record)</Text>
          <Text style={styles.betDetail}>Trending bet: Under 45.5 in Jets vs. Bills</Text>
        </View>

        <Text style={styles.sectionTitle}>Subscription</Text>
        <View style={styles.betCard}>
          <Text style={styles.betDetail}><Text style={styles.betLabel}>Plan:</Text> Premium (Active)</Text>
          <Text style={styles.betDetail}><Text style={styles.betLabel}>Next Billing:</Text> May 1st, 2025</Text>
          <Text style={styles.betDetail}><Text style={styles.betLabel}>Perks:</Text> AI insights, overlays, multi-sportsbook sync</Text>

          <View style={styles.betActions}>
            <TouchableOpacity><Text style={styles.viewBet}>Manage Plan</Text></TouchableOpacity>
            <TouchableOpacity><Text style={styles.watchLive}>Refer & Earn</Text></TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000A34',
  },
  content: {
    paddingTop: 80,
    paddingHorizontal: 16,
  },
  welcomeText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
  username: {
    color: '#ff4ecf',
    fontWeight: 'bold',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: 26,
  },
  statBox: {
    width: '48%',
    backgroundColor: '#3A3162',
    padding: 12,
    borderRadius: 40,
    marginBottom: 12,
  },
  statLabel: {
    color: '#aaa',
    fontSize: 13,
  },
  statValue: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  statChange: {
    color: '#50fa7b',
    fontSize: 12,
  },
  statChangeRed: {
    color: '#ff5555',
    fontSize: 12,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  betCard: {
    backgroundColor: '#2C2C54',
    padding: 14,
    borderRadius: 12,
    marginBottom: 30,
  },
  betDetail: {
    color: '#eee',
    fontSize: 14,
    marginBottom: 4,
  },
  betLabel: {
    fontWeight: 'bold',
    color: '#ccc',
  },
  progressText: {
    color: '#50fa7b',
    fontWeight: 'bold',
  },
  betActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  viewBet: {
    color: '#ff4ecf',
    fontWeight: '600',
  },
  watchLive: {
    color: '#8be9fd',
    fontWeight: '600',
  },
  viewMoreButton: {
    marginTop: 16,
    backgroundColor: 'linear-gradient(to right, #00d4ff, #ff4ecf)',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  viewMoreText: {
    color: '#fff',
    fontWeight: '600',
  },
});