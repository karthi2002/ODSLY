import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Colors from "../../utils/Colors";
import { LineGradient } from "../../layouts/LineGradient";
import { recentBet } from "../../json/RecentBetData";
import BetCard from "../../components/Card/BetCard";
import UserPostCard from "../../components/Card/UserPostCard";

export default function YourPostScreen() {


  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.content}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
      </ScrollView>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Recent Bets</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginRight: -15 }} >
          {recentBet.map((bet, index) => (
            <BetCard key={index} data={bet} type="recent" />
          ))}
        </ScrollView>
      </View>

      <LineGradient />

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Your Posts</Text>
        <ScrollView  showsVerticalScrollIndicator={false} style={{ marginRight: -15 }} ><UserPostCard
          user={{
            name: "Alex Johnson",
            avatar: "https://randomuser.me/api/portraits/men/32.jpg",
          }}
          content="Exploring the new React Native features today! 🔥 Can't wait to integrate them into my projects. #reactnative #devlife"
          hashtags={["#reactnative", "#devlife"]}
          timeAgo="2h ago"
          likeCount={10}
          commentCount={4}
          onAvatarPress={handleAvatarPress}
          onLikePress={handleLikePress}
          onCommentPress={handleCommentPress}
        />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  sectionTitle: {
    color: Colors.secondary,
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 20,
  },
});

