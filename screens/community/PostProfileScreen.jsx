import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import Colors from "../../utils/Colors";
import CustomHeader from "../../layouts/CustomHeader";
import ProfileDisplay from "../../components/Card/ProfileDisplay";
import { LineGradient } from "../../layouts/LineGradient";
import UserPostCard from "../../components/Card/UserPostCard";
import { otherPosts } from "../../json/PostData";
import { useNavigation } from "@react-navigation/native";

const PostProfileScreen = () => {
  const navigation = useNavigation(); 

  const handleAvatarPress = () => {
    navigation.navigate("CommunityStack", { screen: "PostProfile" });
  };

  const handleLikePress = () => {
    console.log("Post liked/unliked");
  };

  const handleCommentPress = () => {
    navigation.navigate("CommunityStack", { screen: "PostComment" });
  };

  return (
    <View style={styles.container}>
      <CustomHeader title={"Post"} />

      <ScrollView
        style={styles.content}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <ProfileDisplay
          avatar="https://your-server.com/images/user123.jpg"
          name="Kat Williams"
          joinedDate="Nov 2024"
        />
        <LineGradient />
        <View>
        <Text style={styles.sectionTitle}>Posts</Text>
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
              style={{marginBottom: 15}}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

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
});

export default PostProfileScreen;
