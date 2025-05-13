/**
 * FeedScreen.js
 * =============
 *
 * Screen for displaying trending hashtags and posts.
 * Supports pull-to-refresh, focus-based refresh, post liking, and navigation to comments and user profiles.
 *
 * ## Features:
 * - Displays trending hashtags as selectable tags.
 * - Fetches and displays trending posts from the Redux store.
 * - Pull-to-refresh and focus-based refresh (on screen focus) for new posts.
 * - Like/unlike functionality for posts with debounce and loading state.
 * - Navigates to comment screen and user profile from each post.
 * - Shows loading indicator, error messages, and retry button as needed.
 *
 * ## State:
 * - tags: Array of hashtag objects (label, emoji, selected).
 * - refreshing: Boolean for pull-to-refresh state.
 * - likingPost: Tracks post being liked/unliked to disable button during action.
 * - lastFetch: Timestamp of the last fetch to enforce a cooldown.
 *
 * ## Redux:
 * - Uses `useSelector` to get posts, loading, and error state from Redux.
 * - Uses `useDispatch` to trigger actions: `fetchPosts`, `likePost`, `unlikePost`.
 *
 * ## Effects:
 * - Uses `useFocusEffect` to load posts with a cooldown period.
 * - Cleans up any resources on unmount.
 *
 * ## Handlers:
 * - loadPosts: Loads posts from the API with caching.
 * - onRefresh: Pull-to-refresh handler.
 * - toggleTag: Toggles selection state for hashtags.
 * - handleAvatarPress: Navigates to user profile screen.
 * - handleLikePress: Likes or unlikes a post, with debounce and error handling.
 * - handleCommentPress: Navigates to comment screen for a post.
 * - handleRetry: Retries fetching posts on error.
 *
 * ## UI Structure:
 * - Trending Hashtags section (Tag components).
 * - Divider (LineGradient).
 * - Trending Posts section (UserPostCard components).
 * - Loading indicator, error messages, and retry button.
 *
 * ## Styling:
 * - Uses consistent padding, font weights, and color palette from `Colors`.
 *
 * ## Dependencies:
 * - React, React Native
 * - react-redux (for state management)
 * - react-navigation (for navigation)
 * - dayjs (for relative time display)
 * - lodash (for debounce)
 * - Custom components: Tag, UserPostCard, LineGradient
 *
 * ## Notes:
 * - Posts are refreshed with a cooldown to reduce API calls.
 * - Removed excessive debug logging to reduce terminal clutter.
 * - Handles edge cases: no posts, loading, and API errors.
 */

import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, RefreshControl, TouchableOpacity } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import Colors from "../../utils/Colors";
import { LineGradient } from "../../layouts/LineGradient";
import Tag from "../../components/List/Tag";
import UserPostCard from "../../components/Card/UserPostCard";
import { fetchPosts, likePost, unlikePost } from "../../redux/posts/postsActions";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { debounce } from 'lodash';

dayjs.extend(relativeTime);

const tagsData = [
  { label: "#NBAWinners", emoji: "🏀", selected: false },
  { label: "#ParlayKings", emoji: "🔥", selected: false },
  { label: "#BigWins", emoji: "💰", selected: false },
  { label: "#UnderdogBets", emoji: "⚽", selected: false },
];

const FETCH_COOLDOWN = 5 * 60 * 1000; // 5 minutes

export default function FeedScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [tags, setTags] = useState(tagsData);
  const [refreshing, setRefreshing] = useState(false);
  const [likingPost, setLikingPost] = useState(null);
  const [lastFetch, setLastFetch] = useState(0);
  const { posts, loading, error } = useSelector((state) => state.posts);

  const loadPosts = useCallback(async (force = false) => {
    const now = Date.now();
    if (!force && now - lastFetch < FETCH_COOLDOWN) {
      console.log('Skipping fetch: within cooldown period');
      return;
    }
    try {
      await dispatch(fetchPosts());
      setLastFetch(now);
    } catch (err) {
      console.error("Error loading posts:", err.message);
      dispatch({ type: "FETCH_POSTS_FAILURE", payload: err.message });
    }
  }, [dispatch, lastFetch]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadPosts(true); // Force fetch on pull-to-refresh
    setRefreshing(false);
  }, [loadPosts]);

  const handleRetry = useCallback(() => {
    loadPosts(true); // Force fetch on retry
  }, [loadPosts]);

  useFocusEffect(
    useCallback(() => {
      loadPosts();
    }, [loadPosts])
  );

  const toggleTag = (index) => {
    const updatedTags = [...tags];
    updatedTags[index].selected = !updatedTags[index].selected;
    setTags(updatedTags);
  };

  const handleAvatarPress = () => {
    navigation.navigate("CommunityStack", { screen: "PostProfile" });
  };

  const handleLikePress = useCallback(
    debounce(async (postId, likedBy) => {
      if (likingPost) return;
      setLikingPost(postId);
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
      } catch (err) {
        console.error('Like post error:', err.message, err.response?.data);
      } finally {
        setLikingPost(null);
      }
    }, 500),
    [dispatch, likingPost]
  );

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
          {error && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>Error: {error}</Text>
              <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
                <Text style={styles.retryButtonText}>Retry</Text>
              </TouchableOpacity>
            </View>
          )}
          {!loading && !error && posts.length > 0 ? (
            posts.map((post) => (
              <UserPostCard
                key={post._id}
                user={{
                  username: post.username,
                  avatar: post.userImage || `https://ui-avatars.com/api/?name=${post.username}`,
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
                disabled={likingPost === post._id}
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
    marginBottom: 0,
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
  errorContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
  retryButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  noPostsText: {
    color: Colors.secondary,
    textAlign: "center",
    marginVertical: 10,
  },
});