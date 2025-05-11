/**
 * FeedScreen.js
 * =============
 *
 * displaying trending hashtags and posts.
 * Supports pull-to-refresh, auto-refresh, post liking, and navigation to comments and user profiles.
 *
 * ## Features:
 * - Displays trending hashtags as selectable tags.
 * - Fetches and displays trending posts from the Redux store.
 * - Pull-to-refresh and auto-refresh (every 5 minutes) for new posts.
 * - Like/unlike functionality for posts, with error handling for already-liked posts.
 * - Navigates to comment screen and user profile from each post.
 * - Shows loading indicator and error messages as needed.
 *
 * ## State:
 * - tags: Array of hashtag objects (label, emoji, selected).
 * - refreshing: Boolean for pull-to-refresh state.
 *
 * ## Redux:
 * - Uses `useSelector` to get posts, loading, and error state from Redux.
 * - Uses `useDispatch` to trigger actions: `fetchPosts`, `likePost`, `unlikePost`.
 *
 * ## Effects:
 * - On mount, loads posts and sets up an interval for auto-refresh.
 * - Cleans up interval on unmount.
 *
 * ## Handlers:
 * - loadPosts: Loads posts from the API.
 * - onRefresh: Pull-to-refresh handler.
 * - toggleTag: Toggles selection state for hashtags.
 * - handleAvatarPress: Navigates to user profile screen.
 * - handleLikePress: Likes or unlikes a post, with duplicate-like error handling.
 * - handleCommentPress: Navigates to comment screen for a post.
 *
 * ## UI Structure:
 * - Trending Hashtags section (Tag components).
 * - Divider (LineGradient).
 * - Trending Posts section (UserPostCard components).
 * - Loading indicator and error/no-posts messages.
 *
 * ## Styling:
 * - Uses consistent padding, font weights, and color palette from `Colors`.
 *
 * ## Dependencies:
 * - React, React Native
 * - react-redux (for state management)
 * - react-navigation (for navigation)
 * - dayjs (for relative time display)
 * - Custom components: Tag, UserPostCard, LineGradient
 *
 * ## Example Usage:
 *   <FeedScreen />
 *
 * ## Notes:
 * - Posts are auto-refreshed every 5 minutes.
 * - All navigation is handled via React Navigation's `useNavigation`.
 * - Handles edge cases: no posts, loading, and API errors.
 */


import React, { useEffect, useState, useCallback } from "react";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, RefreshControl } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import Colors from "../../utils/Colors";
import { LineGradient } from "../../layouts/LineGradient";
import Tag from "../../components/List/Tag";
import UserPostCard from "../../components/Card/UserPostCard";
import { fetchPosts, likePost, unlikePost } from "../../redux/posts/postsActions";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const tagsData = [
  { label: "#NBAWinners", emoji: "🏀", selected: false },
  { label: "#ParlayKings", emoji: "🔥", selected: false },
  { label: "#BigWins", emoji: "💰", selected: false },
  { label: "#UnderdogBets", emoji: "⚽", selected: false },
];

const AUTO_REFRESH_INTERVAL = 5 * 60 * 1000; // 5 minutes

export default function FeedScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [tags, setTags] = useState(tagsData);
  const [refreshing, setRefreshing] = useState(false);
  const { posts, loading, error } = useSelector((state) => state.posts);

  const loadPosts = useCallback(async () => {
    try {
      await dispatch(fetchPosts());
    } catch (err) {
      console.error("Error loading posts:", err);
      dispatch({ type: "FETCH_POSTS_FAILURE", payload: err.message });
    }
  }, [dispatch]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    console.log("Pull-to-refresh triggered");
    await dispatch(fetchPosts());
    setRefreshing(false);
  }, [dispatch]);

  useEffect(() => {
    loadPosts();

    const intervalId = setInterval(() => {
      console.log("Auto-refreshing posts...");
      dispatch(fetchPosts());
    }, AUTO_REFRESH_INTERVAL);

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

  const handleLikePress = async (postId, likedBy) => {
    try {
      if (likedBy) {
        await dispatch(unlikePost(postId));
      } else {
        try {
          await dispatch(likePost(postId));
        } catch (likeErr) {
          if (likeErr.response?.status === 400 && likeErr.response?.data?.error === "Post already liked") {
            await dispatch(unlikePost(postId));
          } else {
            throw likeErr;
          }
        }
      }
      console.log(`Post ${likedBy ? 'unliked' : 'liked'}: ${postId}`);
    } catch (err) {
      console.error('Like post error:', err.message, err.response?.data);
    }
  };

  const handleCommentPress = (post) => {
    navigation.navigate("CommunityStack", {
      screen: "PostComment",
      params: { post },
    });
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
                likedBy={post.likedBy || false}
                commentCount={post.commentCount || 0}
                onAvatarPress={handleAvatarPress}
                onLikePress={() => handleLikePress(post._id, post.likedBy)}
                onCommentPress={() => handleCommentPress(post)}
                disableComment={false}
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