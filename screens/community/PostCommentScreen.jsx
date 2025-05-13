/**
 * PostCommentScreen.js
 * ====================
 *
 * Screen for viewing a single post and its comments, as well as posting, liking/unliking, and deleting comments.
 * Integrates with Redux for all post and comment actions.
 *
 * ## Features:
 * - Displays a single post (with up-to-date like and comment counts).
 * - Shows all comments for the post, with support for:
 *    - Liking/unliking comments (with error handling for duplicates and auth).
 *    - Long-press to delete a comment (with confirmation modal).
 *    - Posting new comments (with error handling).
 * - Updates global post/comment state after actions (fetches posts/userPosts after comment actions).
 * - Handles loading, error, and empty states for comments.
 * - Disables comment button on the post card (since you’re already on the comment screen).
 * - Keyboard-aware comment input at the bottom.
 * - Formats post and comment timestamps as relative time (e.g., "2 hours ago").
 *
 * ## State:
 * - commentCount: Local state for comment count (synced with actions).
 * - showModal: Controls visibility of the delete confirmation modal.
 * - selectedCommentId: Stores the comment selected for deletion.
 * - errorMessage: Displays any error messages related to comment/post actions.
 *
 * ## Redux:
 * - Uses `useSelector` to get comments, loading/error states, and current post from Redux.
 * - Uses `useDispatch` to trigger actions:
 *   - fetchComments, postComment, deleteComment
 *   - fetchPosts, fetchUserPosts (to update post state after comment actions)
 *   - likePost, unlikePost, likeComment, unlikeComment
 *
 * ## Navigation:
 * - Uses React Navigation for navigation and route params (`post`).
 * - Navigates to user profile on avatar press.
 *
 * ## UI Structure:
 * - CustomHeader at top.
 * - UserPostCard for the post (with like, delete, and disabled comment button).
 * - CountLabel for comment count.
 * - FlatList for comments (each as CommentCard, with like and long-press delete).
 * - DeleteConfirmationModal for comment deletion.
 * - CommentInput at the bottom, keyboard-aware.
 * - Loading, error, and empty state messages as appropriate.
 *
 * ## Styling:
 * - Uses consistent padding, color palette, and spacing from `Colors`.
 * - KeyboardAvoidingView for input field.
 *
 * ## Error Handling:
 * - Handles API/network errors for like, comment, and delete actions.
 * - Displays user-friendly error messages.
 * - Handles duplicate-like errors gracefully.
 *
 * ## Example Usage:
 *   navigation.navigate('PostComment', { post });
 *
 * ## Notes:
 * - All actions are dispatched asynchronously and update Redux/global state.
 * - The post card always reflects the latest like/comment counts.
 * - Comments are fetched on mount and after posting/deleting a comment.
 * - The comment input is always visible at the bottom.
 * - Timestamps use `dayjs.fromNow()` for relative time formatting.
 */

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import Colors from "../../utils/Colors";
import CustomHeader from "../../layouts/CustomHeader";
import UserPostCard from "../../components/Card/UserPostCard";
import CountLabel from "../../components/Input/CountLabel";
import CommentCard from "../../components/Card/CommentCard";
import CommentInput from "../../components/Input/CommentInput";
import DeleteConfirmationModal from "../../components/Modal/DeleteConfirmationModal";
import {
  fetchComments,
  postComment,
  deleteComment,
  fetchPosts,
  fetchUserPosts,
  likePost,
  unlikePost,
  likeComment,
  unlikeComment,
} from "../../redux/posts/postsActions";
import {
  fetchProfile,
} from "../../redux/profile/profileActions";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const PostCommentScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const { post } = route.params;
  const { comments, commentsLoading, commentsError, posts, userPosts } = useSelector((state) => state.posts);
  const [commentCount, setCommentCount] = useState(post.commentCount || 0);
  const [showModal, setShowModal] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
    
  
  useEffect(() => {
        dispatch(fetchProfile());
      }, [dispatch]);

  // Get username from profile state
  const username = useSelector((state) => state.profile.profile.username);


  // Find the post in Redux state to get updated likeCount and likedBy
  const currentPost = posts.find(p => p._id === post._id) || userPosts.find(p => p._id === post._id) || post;

  useEffect(() => {
    if (post._id) {
      dispatch(fetchComments(post._id));
    }
  }, [dispatch, post._id]);

  const handleAvatarPress = () => {
    navigation.navigate("CommunityStack", { screen: "PostProfile" });
  };

  const handleLikePress = async (commentId) => {
    try {
      setErrorMessage(null);
      if (commentId) {
        // Handle comment like/unlike
        const comment = comments.find(c => c._id === commentId);
        if (!comment) return;
        if (comment.likedBy) {
          await dispatch(unlikeComment(post._id, commentId));
        } else {
          try {
            await dispatch(likeComment(post._id, commentId));
          } catch (likeErr) {
            if (likeErr.response?.status === 400 && likeErr.response?.data?.error === "Comment already liked") {
              await dispatch(unlikeComment(post._id, commentId));
            } else {
              throw likeErr;
            }
          }
        }
      } else {
        // Handle post like/unlike
        if (currentPost.likedBy) {
          await dispatch(unlikePost(post._id));
        } else {
          try {
            await dispatch(likePost(post._id));
          } catch (likeErr) {
            if (likeErr.response?.status === 400 && likeErr.response?.data?.error === "Post already liked") {
              await dispatch(unlikePost(post._id));
            } else {
              throw likeErr;
            }
          }
        }
      }
    } catch (err) {
      console.error('Like error:', err.message);
      const message = err.response?.status === 401
        ? 'Please log in to like this content.'
        : err.response?.data?.error || 'Failed to update like';
      setErrorMessage(message);
    }
  };

  const handlePostComment = async (commentText) => {
    if (!commentText.trim()) return;
    try {
      setErrorMessage(null);
      await dispatch(postComment(post._id, commentText));
      setCommentCount((prev) => prev + 1);
      await dispatch(fetchPosts());
      await dispatch(fetchUserPosts());
    } catch (err) {
      console.error("Post comment error:", err.message);
      const message = err.response?.status === 500
        ? 'Server error: Unable to post comment. Please try again later.'
        : err.response?.data?.error || 'Failed to post comment';
      setErrorMessage(message);
    }
  };

  const handleDeleteComment = async () => {
    if (selectedCommentId) {
      try {
        setErrorMessage(null);
        await dispatch(deleteComment(post._id, selectedCommentId));
        setCommentCount((prev) => prev - 1);
        await dispatch(fetchPosts());
        await dispatch(fetchUserPosts());
      } catch (err) {
        console.error("Delete comment error:", err.message);
        const message = err.response?.status === 500
          ? 'Server error: Unable to delete comment. Please try again later.'
          : err.response?.data?.error || 'Failed to delete comment';
        setErrorMessage(message);
      }
      setShowModal(false);
      setSelectedCommentId(null);
    }
  };

  const handleDeletePress = () => {
    setShowModal(true);
  };

  return (
    <View style={styles.container}>
      <CustomHeader title="Post" />

      <ScrollView
        style={styles.content}
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <UserPostCard
            user={{
              username: currentPost.username,
              avatar: currentPost.userImage || "https://example.com/default-avatar.jpg",
            }}
            content={currentPost.text}
            hashtags={currentPost.hashtags}
            timeAgo={currentPost.uploadedAt ? dayjs(currentPost.uploadedAt).fromNow() : "Unknown time"}
            likeCount={currentPost.likeCount || 0}
            likedBy={currentPost.likedBy || false}
            commentCount={commentCount}
            onAvatarPress={handleAvatarPress}
            onLikePress={() => handleLikePress()}
            onCommentPress={() => {}}
            showDelete={currentPost.username === username}
            onDeletePress={handleDeletePress}
            disableComment={true} 
          />
        </View>

        <View style={styles.sectionContainer}>
          <CountLabel label="comment" count={commentCount} style={styles.sectionTitle} />
          {commentsLoading && (
            <ActivityIndicator size="large" color={Colors.primary} style={{ marginVertical: 10 }} />
          )}
          {commentsError && (
            <Text style={styles.errorText}>Error loading comments: {commentsError}</Text>
          )}
          {errorMessage && (
            <Text style={styles.errorText}>{errorMessage}</Text>
          )}
          {!commentsLoading && !commentsError && comments.length === 0 && (
            <Text style={styles.noCommentsText}>No comments yet</Text>
          )}
          <FlatList
            data={comments}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <TouchableOpacity
                activeOpacity={1}
                onLongPress={() => {
                  setSelectedCommentId(item._id);
                  setShowModal(true);
                }}
              >
                <CommentCard
                  avatar={item.userImage || `https://ui-avatars.com/api/?name=${item.username}`}
                  name={item.username}
                  timeAgo={item.uploadedAt ? dayjs(item.uploadedAt).fromNow() : "Unknown time"}
                  likes={item.likes || 0}
                  likedBy={item.likedBy || false}
                  textContent={item.content}
                  onLikePress={() => handleLikePress(item._id)}
                />
              </TouchableOpacity>
            )}
          />
        </View>

        <DeleteConfirmationModal
          isVisible={showModal}
          onCancel={() => {
            setShowModal(false);
            setSelectedCommentId(null);
          }}
          onConfirm={handleDeleteComment}
          message="Are you sure you want to delete this comment?"
        />
      </ScrollView>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={90}
        style={styles.inputContainer}
      >
        <CommentInput onPost={handlePostComment} />
      </KeyboardAvoidingView>
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
  sectionContainer: {
    marginTop: 30,
    flex: 1,
    backgroundColor: Colors.background,
  },
  sectionTitle: {
    color: Colors.secondary,
    fontSize: 18,
    fontWeight: "400",
    marginBottom: 20,
  },
  inputContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.primary,
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  errorText: {
    color: Colors.error,
    textAlign: "center",
    marginVertical: 10,
  },
  noCommentsText: {
    color: Colors.secondary,
    textAlign: "center",
    marginVertical: 10,
  },
});

export default PostCommentScreen;