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
import { yourPosts } from "../../json/PostData";
import { useNavigation } from "@react-navigation/native";

export default function YourPostScreen() {

    const navigation = useNavigation();

  const handleAvatarPress = () => {
    navigation.navigate("CommunityStack", { screen: "PostProfile" })
  };

  const handleLikePress = () => {
    console.log("Post liked/unliked");
  };

  const handleCommentPress = () => {
    navigation.navigate("CommunityStack", { screen: "PostComment" })
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

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Your Posts</Text>
        {yourPosts.map((post) => (
        <UserPostCard
          key={post.id}
          user={post.user}
          content={post.content}
          hashtags={post.hashtags}
          timeAgo={post.timeAgo}
          likeCount={post.likeCount}
          commentCount={post.commentCount}
          onAvatarPress={handleAvatarPress}
          onLikePress={handleLikePress}
          onCommentPress={handleCommentPress}
          showDelete={true} 
          style={{marginBottom: 15}}
        />
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
  sectionTitle: {
    color: Colors.secondary,
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 20,
  },
});

