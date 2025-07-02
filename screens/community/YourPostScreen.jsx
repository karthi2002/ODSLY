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
 * - Supports pull-to-refresh and focus-based refresh (on screen focus) for user's posts.
 * - Like/unlike functionality for each post with debounce and loading state.
 * - Delete functionality for user's own posts with confirmation modal.
 * - Delete button shown for user's own posts (showDelete).
 * - Navigates to comment screen and user profile from each post.
 * - Handles loading, error, and empty states for user posts.
 * - Provides retry and login actions on error, with clear user feedback.
 *
 * ## State:
 * - refreshing: Boolean for pull-to-refresh state.
 * - likingPost: Tracks post being liked/unliked to disable button during action.
 * - deletingPost: Tracks post being deleted to disable button during action.
 * - showDeleteModal: Controls visibility of the delete confirmation modal.
 * - selectedPostId: Tracks the post selected for deletion.
 * - lastFetch: Timestamp of the last fetch to enforce a cooldown.
 *
 * ## Redux:
 * - Uses `useSelector` to get userPosts, loading, and error state from Redux.
 * - Uses `useDispatch` to trigger actions: `fetchUserPosts`, `likePost`, `unlikePost`, `deletePost`.
 *
 * ## Effects:
 * - Uses `useFocusEffect` to load user posts with a cooldown period.
 * - Cleans up any resources on unmount.
 *
 * ## Handlers:
 * - loadUserPosts: Loads user posts from the API with caching.
 * - onRefresh: Pull-to-refresh handler.
 * - handleRetry: Retry fetching user posts after error.
 * - handleLogin: Navigates to login screen if authentication error occurs.
 * - handleAvatarPress: Navigates to user profile screen.
 * - handleLikePress: Likes or unlikes a post with debounce and error handling.
 * - handleDeletePress: Shows the delete confirmation modal.
 * - handleConfirmDelete: Deletes a post after confirmation.
 * - handleCommentPress: Navigates to comment screen for a post.
 *
 * ## UI Structure:
 * - Recent Bets section (BetCard components in horizontal ScrollView).
 * - Divider (LineGradient).
 * - Your Posts section (UserPostCard components).
 * - DeleteConfirmationModal for post deletion.
 * - Loading indicator, error messages, and retry/login buttons.
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
 * - lodash (for debounce)
 * - Custom components: BetCard, UserPostCard, LineGradient, DeleteConfirmationModal
 *
 * ## Example Usage:
 *   <YourPostScreen />
 *
 * ## Notes:
 * - Posts are refreshed with a cooldown to reduce API calls.
 * - Removed excessive debug logging to reduce terminal clutter.
 * - Handles edge cases: no posts, loading, and API errors (including auth errors).
 * - Only the user's own posts are shown and managed here.
 */

import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import Colors from "../../utils/Colors";
import { LineGradient } from "../../layouts/LineGradient";
import { recentBet } from "../../json/RecentBetData";
import BetCard from "../../components/Card/BetCard";
import UserPostCard from "../../components/Card/UserPostCard";
import DeleteConfirmationModal from "../../components/Modal/DeleteConfirmationModal";
import { fetchUserPosts, likePost, unlikePost, deletePost } from "../../redux/posts/postsActions";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { debounce } from 'lodash';
import DefaultImage from '../../assets/images/default-user-image.jpg';
import { Image } from "react-native";

const fallbackImage = Image.resolveAssetSource(DefaultImage).uri;

dayjs.extend(relativeTime);

const FETCH_COOLDOWN = 5 * 60 * 1000; // 5 minutes

export default function YourPostScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const [likingPost, setLikingPost] = useState(null);
  const [deletingPost, setDeletingPost] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [lastFetch, setLastFetch] = useState(0);
  const { userPosts, userPostsLoading, userPostsError } = useSelector((state) => state.posts);

  const loadUserPosts = useCallback(async (force = false) => {
    const now = Date.now();
    if (!force && now - lastFetch < FETCH_COOLDOWN) {
      return;
    }
    try {
      await dispatch(fetchUserPosts());
      setLastFetch(now);
    } catch (err) {
      console.error("Error loading user posts:", err.message);
    }
  }, [dispatch, lastFetch]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadUserPosts(true); // Force fetch on pull-to-refresh
    setRefreshing(false);
  }, [loadUserPosts]);

  const handleRetry = useCallback(() => {
    loadUserPosts(true); // Force fetch on retry
  }, [loadUserPosts]);

  const handleLogin = useCallback(() => {
    navigation.navigate("AuthStack", { screen: "Login" });
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      loadUserPosts();
    }, [loadUserPosts])
  );

  const handleAvatarPress = useCallback((username) => {
      if (!username) {
        console.warn('No username provided for profile navigation');
        return;
      }
      navigation.navigate('CommunityStack', {
        screen: 'PostProfile',
        params: { username },
      });
    }, [navigation]);

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

  const handleDeletePress = useCallback((postId) => {
    setSelectedPostId(postId);
    setShowDeleteModal(true);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (selectedPostId && !deletingPost) {
      setDeletingPost(selectedPostId);
      try {
        await dispatch(deletePost(selectedPostId));
      } catch (err) {
        console.error('Delete post error:', err.message, err.response?.data);
      } finally {
        setDeletingPost(null);
        setShowDeleteModal(false);
        setSelectedPostId(null);
      }
    }
  }, [dispatch, selectedPostId, deletingPost]);

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
              {userPostsError.includes('401') || userPostsError.includes('authentication token') ? (
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
                  avatar: post.userImage || fallbackImage,
                }}
                content={post.text}
                hashtags={post.hashtags}
                timeAgo={post.uploadedAt ? dayjs(post.uploadedAt).fromNow() : "Unknown time"}
                likeCount={post.likeCount || 0}
                likedBy={post.likedBy || false}
                commentCount={post.commentCount || 0}
                onAvatarPress={() => handleAvatarPress(post.username)}
                onLikePress={() => handleLikePress(post._id, post.likedBy)}
                onDeletePress={() => handleDeletePress(post._id)}
                onCommentPress={() => handleCommentPress(post)}
                showDelete={true}
                disabled={likingPost === post._id || deletingPost === post._id}
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

      <DeleteConfirmationModal
        isVisible={showDeleteModal}
        onCancel={() => {
          setShowDeleteModal(false);
          setSelectedPostId(null);
        }}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this post?"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    paddingTop: 10,
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