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
import Tag from "../../components/List/Tag";
import UserPostCard from "../../components/Card/UserPostCard";


const tagsData = [
  { label: "#NBAWinners", emoji: "🏀", selected: true },
  { label: "#ParlayKings", emoji: "🔥", selected: false },
  { label: "#BigWins", emoji: "💰", selected: false },
  { label: "#UnderdogBets", emoji: "⚽", selected: true },
];

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
              <Text style={styles.sectionTitle}>Trending Hashtags</Text>
              <View style={styles.container}>
                {tagsData.map((tag, index) => (
                  <Tag
                    key={index}
                    label={tag.label}
                    emoji={tag.emoji}
                    selected={tag.selected}
                  />
                ))}
            </View>
            </View>
            <LineGradient />

            <View>
            <Text style={styles.sectionTitle}>Trending Posts</Text>
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
