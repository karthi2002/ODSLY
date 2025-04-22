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
import { otherPosts } from "../../json/PostData";
import { useNavigation } from "@react-navigation/native";

const tagsData = [
  { label: "#NBAWinners", emoji: "🏀", selected: false },
  { label: "#ParlayKings", emoji: "🔥", selected: false },
  { label: "#BigWins", emoji: "💰", selected: false },
  { label: "#UnderdogBets", emoji: "⚽", selected: false },
];

export default function FeedScreen() {

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

  const [tags, setTags] = useState(tagsData);

const toggleTag = (index) => {
  const updatedTags = [...tags];
  updatedTags[index].selected = !updatedTags[index].selected;
  setTags(updatedTags);
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
                onPress={() => toggleTag(index)}
              />
            ))}
          </View>
        </View>

        <LineGradient />

        <View>
          <Text style={styles.sectionTitle}>Trending Posts</Text>
          {otherPosts.map((post) => (
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
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "start",
  },
});
