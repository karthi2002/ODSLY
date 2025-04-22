import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Colors from "../../utils/Colors";
import Tag from "../../components/List/Tag";
import LinearGradient from "react-native-linear-gradient";
import { LineGradient } from "../../layouts/LineGradient";
import UserPostCard from "../../components/Card/UserPostCard";

const tagsData = [
  { label: "#NBAWinners", emoji: "🏀", selected: false },
  { label: "#ParlayKings", emoji: "🔥", selected: false },
  { label: "#BigWins", emoji: "💰", selected: false },
  { label: "#UnderdogBets", emoji: "⚽", selected: false },
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
      <View style={styles.container}>
      <Text style={styles.sectionTitle}>Trending Hashtags</Text>
      <View style={styles.TagContainer}>
      {tagsData.map((tag, index) => (
        <Tag
          key={index}
          label={tag.label}
          emoji={tag.emoji}
          selected={tag.selected}
        />
      ))}
      </View>
      <LineGradient/>
      <Text style={styles.sectionTitle}>Trending Posts</Text>
      <View style={styles.postContainer}>
      <UserPostCard
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
      </View>

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
  content: {
    paddingTop: 80,
    paddingHorizontal: 15,
  },
  sectionTitle: {
    color: Colors.secondary,
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 20,
  },
  TagContainer:{
    flexDirection: "column",
    padding: 30,
  },
});
