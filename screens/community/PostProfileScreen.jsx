import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { clearSession } from '../../redux/session/sessionSlice';
import Colors from "../../utils/Colors";
import CustomHeader from "../../layouts/CustomHeader";
import ProfileDisplay from "../../components/Card/ProfileDisplay";
import { LineGradient } from "../../layouts/LineGradient";
import UserPostCard from "../../components/Card/UserPostCard";
import DeleteConfirmationModal from "../../components/Modal/DeleteConfirmationModal";
import {
  useGetOneProfileUserQuery,
  useGetProfileQuery,
} from "../../redux/apis/profileApi";
import {
  useOneUserPostsQuery,
  useLikePostMutation,
  useUnlikePostMutation,
  useDeletePostMutation,
} from "../../redux/apis/postsApi";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { debounce } from "lodash";
import DefaultImage from '../../assets/images/default-user-image.jpg';
import { Image } from 'react-native';

const fallbackImage = Image.resolveAssetSource(DefaultImage).uri;

dayjs.extend(relativeTime);

const PostProfileScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute();
  const { username } = route.params || {};
  const email = useSelector((state) => state.session.userSession?.email);
  const isValidEmail = email && typeof email === 'string' && email.includes('@');
  const [sessionLoaded, setSessionLoaded] = useState(false);
  const [likingPost, setLikingPost] = useState(null);
  const [deletingPost, setDeletingPost] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);

  const { data: currentProfile, isLoading: profileLoading, error: profileError, refetch: refetchProfile } = useGetProfileQuery(email, {
    skip: !sessionLoaded || !isValidEmail,
  });
  const {
    data: oneProfileUser,
    isLoading: oneProfileUserLoading,
    error: oneProfileUserError,
    refetch: refetchOneProfile,
  } = useGetOneProfileUserQuery(username, { skip: !sessionLoaded || !username });
  const {
    data: oneUserPosts,
    isLoading: oneUserPostsLoading,
    error: oneUserPostsError,
    refetch: refetchOneUserPosts,
  } = useOneUserPostsQuery(username, { skip: !sessionLoaded || !username });
  const [likePost] = useLikePostMutation();
  const [unlikePost] = useUnlikePostMutation();
  const [deletePost] = useDeletePostMutation();

  // Log route.params, oneProfileUser, and errors
  useEffect(() => {
    console.log('PostProfileScreen: route.params:', route.params);
    console.log('PostProfileScreen: username:', username);
    console.log('PostProfileScreen: sessionLoaded:', sessionLoaded);
    if (oneProfileUser) {
      console.log('PostProfileScreen: oneProfileUser:', {
        createdAt: oneProfileUser.createdAt, // Fix: Log createdAt correctly
        username: oneProfileUser.username,
        email: oneProfileUser.email,
      });
    }
    if (oneProfileUserError) {
      console.log('PostProfileScreen: oneProfileUserError:', oneProfileUserError);
    }
  }, [route.params, username, sessionLoaded, oneProfileUser, oneProfileUserError]);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const userSession = await AsyncStorage.getItem('userSession');
        const authToken = await AsyncStorage.getItem('authToken');
        console.log('PostProfileScreen: userSession from AsyncStorage:', userSession);
        console.log('PostProfileScreen: authToken from AsyncStorage:', authToken);
        console.log('PostProfileScreen: email from Redux:', email);
        console.log('PostProfileScreen: isValidEmail:', isValidEmail);
        if (!userSession || !isValidEmail) {
          console.log('PostProfileScreen: No valid session, redirecting to Login');
          await AsyncStorage.multiRemove(['userSession', 'authToken']);
          dispatch(clearSession());
          navigation.replace('AuthStack', { screen: 'Login' });
        } else {
          setSessionLoaded(true);
        }
      } catch (error) {
        console.error('PostProfileScreen: Error checking session:', error);
        await AsyncStorage.multiRemove(['userSession', 'authToken']);
        dispatch(clearSession());
        navigation.replace('AuthStack', { screen: 'Login' });
      }
    };
    checkSession();
  }, [dispatch, navigation, email, isValidEmail]);

  const handleLikePress = useCallback(
    debounce(async (postId, likedBy) => {
      if (likingPost || !sessionLoaded || !isValidEmail) return;
      setLikingPost(postId);
      try {
        if (likedBy) {
          await unlikePost(postId).unwrap();
        } else {
          try {
            await likePost(postId).unwrap();
          } catch (likeErr) {
            if (
              likeErr.status === 400 &&
              likeErr.data?.error === "Post already liked"
            ) {
              await unlikePost(postId).unwrap();
            } else {
              throw likeErr;
            }
          }
        }
      } catch (err) {
        console.error('PostProfileScreen: Like post error:', err.message, err.data);
      } finally {
        setLikingPost(null);
      }
    }, 500),
    [likePost, unlikePost, likingPost, sessionLoaded, isValidEmail]
  );

const handleCommentPress = useCallback((post) => {
  if (!sessionLoaded || !isValidEmail) {
    console.log('PostProfileScreen: Invalid session, redirecting to Login');
    navigation.replace('AuthStack', { screen: 'Login' });
    return;
  }
  if (!post || !post._id) {
    console.warn('PostProfileScreen: Invalid post object for comment navigation', post);
    return;
  }
  navigation.navigate("CommunityStack", {
    screen: "PostComment",
    params: { post },
  });
}, [navigation, sessionLoaded, isValidEmail]);

  const handleDeletePress = useCallback((postId) => {
    setSelectedPostId(postId);
    setShowDeleteModal(true);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (selectedPostId && !deletingPost) {
      setDeletingPost(selectedPostId);
      try {
        await deletePost(selectedPostId).unwrap();
      } catch (err) {
        console.error('PostProfileScreen: Delete post error:', err.message, err.data);
      } finally {
        setDeletingPost(null);
        setShowDeleteModal(false);
        setSelectedPostId(null);
      }
    }
  }, [deletePost, selectedPostId, deletingPost]);

  const handleRetry = useCallback(() => {
    refetchProfile();
    refetchOneProfile();
    refetchOneUserPosts();
  }, [refetchProfile, refetchOneProfile, refetchOneUserPosts]);

  const handleLogin = useCallback(() => {
    navigation.replace("AuthStack", { screen: "Login" });
  }, [navigation]);

  if (!sessionLoaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CustomHeader title="Profile" />
      <ScrollView
        style={styles.content}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {(oneProfileUserLoading || profileLoading) && (
          <ActivityIndicator size="large" color={Colors.primary} style={styles.loader} />
        )}
        {(oneProfileUserError || profileError) && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>
              {oneProfileUserError?.status === 401 || profileError?.status === 401
                ? 'Please log in to view this profile.'
                : oneProfileUserError?.status === 404
                ? `User ${username} not found.`
                : `Error: ${oneProfileUserError?.data?.message || profileError?.data?.message || 'Failed to load profile'}`}
            </Text>
            {oneProfileUserError?.status === 401 || profileError?.status === 401 ? (
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
        {oneProfileUser && (
          <ProfileDisplay
            avatar={oneProfileUser.image || fallbackImage }
            name={oneProfileUser.username || "Unknown User"}
            joinedDate={oneProfileUser.createdAt || "Unknown"}
          />
        )}
        <LineGradient />
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Posts</Text>
          {oneUserPostsLoading && (
            <ActivityIndicator size="large" color={Colors.primary} style={styles.loader} />
          )}
          {oneUserPostsError && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>
                {oneUserPostsError.status === 401
                  ? 'Please log in to view posts.'
                  : oneUserPostsError.status === 404
                  ? 'No posts found.'
                  : `Error: ${oneUserPostsError.data?.message || 'Failed to load posts'}`}
              </Text>
              <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
                <Text style={styles.retryButtonText}>Retry</Text>
              </TouchableOpacity>
            </View>
          )}
          {!oneUserPostsLoading && !oneUserPostsError && Array.isArray(oneUserPosts) && oneUserPosts.length > 0 ? (
            oneUserPosts.map((post) => (
              <UserPostCard
                key={post._id}
                user={{
                  username: post.username || 'Unknown User',
                  avatar: post.userImage || fallbackImage,
                }}
                content={post.text}
                hashtags={post.hashtags || []}
                timeAgo={post.uploadedAt ? dayjs(post.uploadedAt).fromNow() : 'Unknown time'}
                likeCount={post.likes || 0}
                likedBy={post.likedBy || false}
                commentCount={post.commentCount || 0}
                onAvatarPress={() => {}}
                onLikePress={() => handleLikePress(post._id, post.likedBy)}
                onCommentPress={() => handleCommentPress(post)}
                showDelete={currentProfile?.username === post.username}
                onDeletePress={() => handleDeletePress(post._id)}
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
    justifyContent: 'center',
  },
  content: {
    paddingTop: 80,
    paddingHorizontal: 15,
  },
  sectionContainer: {
    marginTop: 20,
  },
  sectionTitle: {
    color: Colors.secondary,
    fontSize: 18,
    fontWeight: '700',
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
    color: 'red',
    textAlign: 'center',
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
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default PostProfileScreen;