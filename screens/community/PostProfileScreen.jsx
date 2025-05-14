/**
 * PostProfileScreen.js
 * ====================
 *
 * Screen for viewing a user's profile and their posts in the social app.
 * Integrates with Redux for fetching profile data and user posts, and supports post interactions.
 *
 * ## Features:
 * - Displays user profile information (avatar, username, joined date as relative time) using ProfileDisplay.
 * - Fetches and displays the user's posts for a specific username from Redux (oneUserPosts).
 * - Supports liking/unliking posts with debounce and loading state.
 * - Allows deleting posts with a confirmation modal (for the authenticated user's own posts).
 * - Navigates to the comment screen for each post.
 * - Handles loading, error, and empty states for posts and profile.
 * - Uses relative time formatting for post timestamps and profile createdAt.
 *
 * ## State:
 * - likingPost: Tracks post being liked/unliked to disable button during action.
 * - deletingPost: Tracks post being deleted to disable button during action.
 * - showDeleteModal: Controls visibility of the delete confirmation modal.
 * - selectedPostId: Tracks the post selected for deletion.
 *
 * ## Redux:
 * - Uses `useSelector` to get oneUserPosts, oneProfileUser, loading, error states from Redux.
 * - Uses `useDispatch` to trigger actions: `fetchOneUserPosts`, `likePost`, `unlikePost`, `deletePost`, `fetchOneProfileUser`.
 *
 * ## Navigation:
 * - Uses React Navigation for navigating to PostComment screen.
 * - Expects `username` as a navigation parameter to fetch specific user data.
 *
 * ## UI Structure:
 * - CustomHeader at the top.
 * - ProfileDisplay for user information (avatar, username, joined date).
 * - LineGradient divider.
 * - Posts section with UserPostCard components.
 * - DeleteConfirmationModal for post deletion.
 * - Loading indicator, error messages, and empty state text.
 *
 * ## Styling:
 * - Uses consistent padding, font weights, and color palette from `Colors`.
 * - Error and empty state UI is clearly styled for user feedback.
 *
 * ## Dependencies:
 * - React, React Native
 * - react-redux (for state management)
 * - react-navigation (for navigation)
 * - dayjs (for relative time display)
 * - lodash (for debounce)
 * - Custom components: CustomHeader, ProfileDisplay, UserPostCard, LineGradient, DeleteConfirmationModal
 *
 * ## Example Usage:
 *   navigation.navigate('PostProfile', { username: 'Zack' });
 *
 * ## Notes:
 * - Fetches user posts and profile data for the specified username on mount.
 * - Delete button is shown only for the authenticated user's own posts.
 * - Handles edge cases: no posts, loading, and API errors (including auth errors).
 * - Uses oneUserPosts and oneProfileUser for fetching data for a specific user.
 */

import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import Colors from "../../utils/Colors";
import CustomHeader from "../../layouts/CustomHeader";
import ProfileDisplay from "../../components/Card/ProfileDisplay";
import { LineGradient } from "../../layouts/LineGradient";
import UserPostCard from "../../components/Card/UserPostCard";
import DeleteConfirmationModal from "../../components/Modal/DeleteConfirmationModal";
import {
  fetchOneUserPosts,
  likePost,
  unlikePost,
  deletePost,
} from "../../redux/posts/postsActions";
import { fetchOneProfileUser } from "../../redux/profile/profileActions";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { debounce } from "lodash";
import DefaultImage from '../../assets/images/default-user-image.jpg';
import { Image } from 'react-native';

const fallbackImage = Image.resolveAssetSource(DefaultImage).uri;

dayjs.extend(relativeTime);

const PostProfileScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { username } = route.params || {};
  const dispatch = useDispatch();
  const { oneUserPosts, oneUserPostsLoading, oneUserPostsError } = useSelector((state) => state.posts);
  const { oneProfileUser, oneProfileUserLoading, oneProfileUserError, profile } = useSelector((state) => state.profile);
  const [likingPost, setLikingPost] = useState(null);
  const [deletingPost, setDeletingPost] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);

  useEffect(() => {
    if (username) {
      dispatch(fetchOneProfileUser(username));
      dispatch(fetchOneUserPosts(username));
    }
  }, [dispatch, username]);

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

  const handleRetry = useCallback(() => {
    if (username) {
      dispatch(fetchOneUserPosts(username));
      dispatch(fetchOneProfileUser(username));
    }
  }, [dispatch, username]);

  const handleLogin = useCallback(() => {
    navigation.navigate("AuthStack", { screen: "Login" });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <CustomHeader title="Profile" />

      <ScrollView
        style={styles.content}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {oneProfileUserLoading && (
          <ActivityIndicator size="large" color={Colors.primary} style={styles.loader} />
        )}
        {oneProfileUserError && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>
              {oneProfileUserError.includes('401') || oneProfileUserError.includes('authentication token')
                ? 'Please log in to view this profile.'
                : oneProfileUserError.includes('404')
                ? `User ${username} not found.`
                : `Error: ${oneProfileUserError}`}
            </Text>
            {oneProfileUserError.includes('401') || oneProfileUserError.includes('authentication token') ? (
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
        {!oneProfileUserLoading && !oneProfileUserError && oneProfileUser && (
          <ProfileDisplay
            avatar={oneProfileUser.image || fallbackImage }
            name={oneProfileUser.username || "Unknown User"}
            joinedDate={oneProfileUser.createdAt || "Unknown"}
          />
        )}
        <LineGradient />
        <View>
          <Text style={styles.sectionTitle}>Posts</Text>
          {oneUserPostsLoading && (
            <ActivityIndicator size="large" color={Colors.primary} style={styles.loader} />
          )}
          {oneUserPostsError && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>
                {oneUserPostsError.includes('401') || oneUserPostsError.includes('authentication token')
                  ? 'Please log in to view posts.'
                  : oneUserPostsError.includes('404')
                  ? `No posts found for ${username}.`
                  : `Error: ${oneUserPostsError}`}
              </Text>
              {oneUserPostsError.includes('401') || oneUserPostsError.includes('authentication token') ? (
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
          {!oneUserPostsLoading && !oneUserPostsError && Array.isArray(oneUserPosts) && oneUserPosts.length > 0 ? (
            oneUserPosts.map((post) => (
              <UserPostCard
                key={post._id}
                user={{
                  username: post.username || "Unknown User",
                  avatar: post.userImage || `https://ui-avatars.com/api/?name=${post.username}`,
                }}
                content={post.text}
                hashtags={post.hashtags}
                timeAgo={post.uploadedAt ? dayjs(post.uploadedAt).fromNow() : "Unknown time"}
                likeCount={post.likeCount || 0}
                likedBy={post.likedBy || false}
                commentCount={post.commentCount || 0}
                onLikePress={() => handleLikePress(post._id, post.likedBy)}
                onDeletePress={() => handleDeletePress(post._id)}
                onCommentPress={() => handleCommentPress(post)}
                showDelete={profile?.username === post.username}
                disabled={likingPost === post._id || deletingPost === post._id}
                disableComment={false}
                style={{ marginBottom: 15 }}
              />
            ))
          ) : (
            !oneUserPostsLoading && !oneUserPostsError && (
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
  loader: {
    marginVertical: 20,
  },
  errorContainer: {
    alignItems: "center",
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
    color: "#fff",
    fontWeight: "600",
  },
  noPostsText: {
    color: Colors.secondary,
    textAlign: "center",
    marginVertical: 10,
  },
});

export default PostProfileScreen;