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

export default function FeedScreen() {
  const handleAvatarPress = () => {
    console.log("Avatar clicked");
  };

  const handleLikePress = () => {
    console.log("Post liked/unliked");
  };

  const handleCommentPress = () => {
    console.log("Comment clicked");
  };


  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.content}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Recent Bets</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginRight: -15 }} >
            {recentBet.map((bet, index) => (
              <BetCard key={index} data={bet} type="recent" />
            ))}
          </ScrollView>
        </View>

        <LineGradient />

      </ScrollView>
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
