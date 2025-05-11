/**
 * YourPostScreen.js
 * =================
 *
 * Screen for viewing and managing the current user's posts in the social app.
 * Also displays a horizontal list of recent bets and provides full post interaction.
 *
 * ## Features:
 * - Displays a horizontally scrollable "Recent Bets" section at the top.
 * - Fetches and displays the user's posts from Redux (userPosts).
 * - Supports pull-to-refresh and auto-refresh (every 5 minutes) for user's posts.
 * - Like/unlike functionality for each post, with duplicate-like error handling.
 * - Delete button shown for user's own posts (showDelete).
 * - Navigates to comment screen and user profile from each post.
 * - Handles loading, error, and empty states for user posts.
 * - Provides retry and login actions on error, with clear user feedback.
 *
 * ## State:
 * - refreshing: Boolean for pull-to-refresh state.
 *
 * ## Redux:
 * - Uses `useSelector` to get userPosts, loading, and error state from Redux.
 * - Uses `useDispatch` to trigger actions: `fetchUserPosts`, `likePost`, `unlikePost`.
 *
 * ## Effects:
 * - On mount, loads user posts and sets up an interval for auto-refresh.
 * - Cleans up interval on unmount.
 *
 * ## Handlers:
 * - onRefresh: Pull-to-refresh handler.
 * - handleRetry: Retry fetching user posts after error.
 * - handleLogin: Navigates to login screen if authentication error occurs.
 * - handleAvatarPress: Navigates to user profile screen.
 * - handleLikePress: Likes or unlikes a post, with duplicate-like error handling.
 * - handleCommentPress: Navigates to comment screen for a post.
 *
 * ## UI Structure:
 * - Recent Bets section (BetCard components in horizontal ScrollView).
 * - Divider (LineGradient).
 * - Your Posts section (UserPostCard components).
 * - Loading indicator and error/no-posts messages.
 * - Retry and login buttons if error occurs.
 *
 * ## Styling:
 * - Uses consistent padding, font weights, and color palette from `Colors`.
 * - Error and retry/login UI is clearly styled for user feedback.
 *
 * ## Dependencies:
 * - React, React Native
 * - react-redux (for state management)
 * - react-navigation (for navigation)
 * - dayjs (for relative time display)
 * - Custom components: BetCard, UserPostCard, LineGradient
 *
 * ## Example Usage:
 *   <YourPostScreen />
 *
 * ## Notes:
 * - Posts are auto-refreshed every 5 minutes.
 * - All navigation is handled via React Navigation's `useNavigation`.
 * - Handles edge cases: no posts, loading, and API errors (including auth errors).
 * - Only the user's own posts are shown and managed here.
 */


import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import Colors from "../../utils/Colors";
import { LineGradient } from "../../layouts/LineGradient";
import { recentBet } from "../../json/RecentBetData";
import BetCard from "../../components/Card/BetCard";
import UserPostCard from "../../components/Card/UserPostCard";
import { fetchUserPosts, likePost, unlikePost } from "../../redux/posts/postsActions";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export default function YourPostScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const { userPosts, userPostsLoading, userPostsError } = useSelector((state) => state.posts);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    console.log("Pull-to-refresh triggered for user posts");
    await dispatch(fetchUserPosts());
    setRefreshing(false);
  }, [dispatch]);

  const handleRetry = useCallback(async () => {
    console.log("Retrying fetch user posts...");
    await dispatch(fetchUserPosts());
  }, [dispatch]);

  const handleLogin = useCallback(() => {
    console.log("Redirecting to login...");
    navigation.navigate("AuthStack", { screen: "Login" });
  }, [navigation]);

  useEffect(() => {
    dispatch(fetchUserPosts());

    const intervalId = setInterval(() => {
      console.log("Auto-refreshing user posts...");
      dispatch(fetchUserPosts());
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(intervalId);
  }, [dispatch]);

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
          <Text style={styles.sectionTitle}>Recent Bets</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginRight: -15 }}>
            {recentBet.map((bet, index) => (
              <BetCard key={index} data={bet} type="recent" />
            ))}
          </ScrollView>
        </View>

        <LineGradient />

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Your Posts</Text>
          {userPostsLoading && !refreshing && (
            <ActivityIndicator size="large" color={Colors.primary} style={styles.loader} />
          )}
          {userPostsError && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>
                {userPostsError.includes('401') || userPostsError.includes('authentication token')
                  ? 'Please log in to view your posts.'
                  : userPostsError.includes('404')
                  ? 'Posts not found (404). Please try again.'
                  : `Error: ${userPostsError}`}
              </Text>
              {(userPostsError.includes('401') || userPostsError.includes('authentication token')) ? (
                <TouchableOpacity style={styles.retryButton} onPress={handleLogin}>
                  <Text style={styles.retryButtonText}>Log In</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
                  <Text style={styles.retryButtonText}>Retry</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
          {!userPostsLoading && !userPostsError && Array.isArray(userPosts) && userPosts.length > 0 ? (
            userPosts.map((post) => (
              <UserPostCard
                key={post._id}
                user={{
                  username: post.username || 'Unknown User',
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
                showDelete={true}
                disableComment={false}
                style={{ marginBottom: 15 }}
              />
            ))
          ) : (
            !userPostsLoading && !userPostsError && (
              <Text style={styles.noPostsText}>No posts available</Text>
            )
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