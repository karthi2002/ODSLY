import React, { useEffect, useState, useCallback } from "react";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, RefreshControl } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from "../../utils/Colors";
import { LineGradient } from "../../layouts/LineGradient";
import Tag from "../../components/List/Tag";
import UserPostCard from "../../components/Card/UserPostCard";
import { fetchPosts } from "../../redux/posts/postsActions";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const tagsData = [
  { label: "#NBAWinners", emoji: "🏀", selected: false },
  { label: "#ParlayKings", emoji: "🔥", selected: false },
  { label: "#BigWins", emoji: "💰", selected: false },
  { label: "#UnderdogBets", emoji: "⚽", selected: false },
];

const CACHE_KEY = 'cached_posts';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds
const AUTO_REFRESH_INTERVAL = 5 * 60 * 1000; // 5 minutes

export default function FeedScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [tags, setTags] = useState(tagsData);
  const [refreshing, setRefreshing] = useState(false);
  const { posts, loading, error } = useSelector((state) => state.posts);

  // Load cached posts or fetch new ones
  const loadPosts = useCallback(async () => {
    try {
      const cachedData = await AsyncStorage.getItem(CACHE_KEY);
      if (cachedData) {
        const { posts, timestamp } = JSON.parse(cachedData);
        const now = Date.now();
        if (now - timestamp < CACHE_DURATION) {
          console.log("Loading cached posts...");
          dispatch({ type: "FETCH_POSTS_SUCCESS", payload: posts });
          return;
        }
      }
      // Cache is stale or missing, fetch new posts
      console.log("Fetching posts...");
      await dispatch(fetchPosts());
    } catch (err) {
      console.error("Error loading posts:", err);
      dispatch({ type: "FETCH_POSTS_FAILURE", payload: err.message });
    }
  }, [dispatch]);

  // Handle pull-to-refresh
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    console.log("Pull-to-refresh triggered");
    await dispatch(fetchPosts());
    setRefreshing(false);
  }, [dispatch]);

  // Initial load and auto-refresh timer
  useEffect(() => {
    loadPosts();

    // Set up auto-refresh timer
    const intervalId = setInterval(() => {
      console.log("Auto-refreshing posts...");
      dispatch(fetchPosts());
    }, AUTO_REFRESH_INTERVAL);

    // Cleanup timer on unmount
    return () => clearInterval(intervalId);
  }, [dispatch, loadPosts]);

  const toggleTag = (index) => {
    const updatedTags = [...tags];
    updatedTags[index].selected = !updatedTags[index].selected;
    setTags(updatedTags);
  };

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
      <ScrollView
        style={styles.content}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.primary} />
        }
      >
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Trending Hashtags</Text>
          <View style={styles.tagContainer}>
            {tags.map((tag, index) => (
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
          {loading && !refreshing && <ActivityIndicator size="large" color={Colors.primary} style={styles.loader} />}
          {error && <Text style={styles.errorText}>Error: {error}</Text>}
          {!loading && !error && posts.length > 0 ? (
            posts.map((post) => (
              <UserPostCard
                key={post._id}
                user={{
                  username: post.username,
                  avatar: post.userImage || "https://example.com/default-avatar.jpg",
                }}
                content={post.text}
                hashtags={post.hashtags}
                timeAgo={post.uploadedAt ? dayjs(post.uploadedAt).fromNow() : "Unknown time"}
                likeCount={post.likeCount || 0}
                commentCount={post.commentCount || 0}
                onAvatarPress={handleAvatarPress}
                onLikePress={handleLikePress}
                onCommentPress={handleCommentPress}
                style={{ marginBottom: 15 }}
              />
            ))
          ) : (
            !loading && <Text style={styles.noPostsText}>No posts available</Text>
          )}
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
    paddingTop: 20,
    paddingHorizontal: 15,
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: Colors.secondary,
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 20,
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  loader: {
    marginVertical: 20,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginVertical: 10,
  },
  noPostsText: {
    color: Colors.secondary,
    textAlign: "center",
    marginVertical: 10,
  },
});