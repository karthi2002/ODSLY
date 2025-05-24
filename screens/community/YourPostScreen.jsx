import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { clearSession } from '../../redux/session/sessionSlice';
import Colors from "../../utils/Colors";
import { LineGradient } from '../../layouts/LineGradient';
import { recentBet } from '../../json/RecentBetData';
import BetCard from '../../components/Card/BetCard';
import UserPostCard from '../../components/Card/UserPostCard';
import DeleteConfirmationModal from '../../components/Modal/DeleteConfirmationModal';
import {
  useGetUserPostsQuery,
  useLikePostMutation,
  useUnlikePostMutation,
  useDeletePostMutation,
} from '../../redux/apis/postsApi';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { debounce } from 'lodash';
import DefaultImage from '../../assets/images/default-user-image.jpg';
import { Image } from 'react-native';

const fallbackImage = Image.resolveAssetSource(DefaultImage).uri;

dayjs.extend(relativeTime);

const FETCH_COOLDOWN = 5 * 60 * 1000; // 5 minutes

export default function YourPostScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const email = useSelector((state) => state.session.userSession?.email);
  const isValidEmail = email && typeof email === 'string' && email.includes('@');
  const [sessionLoaded, setSessionLoaded] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [likingPost, setLikingPost] = useState(null);
  const [deletingPost, setDeletingPost] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [lastFetch, setLastFetch] = useState(0);

  const { data: userPosts, isLoading: userPostsLoading, error: userPostsError, refetch } = useGetUserPostsQuery(email, {
    skip: !sessionLoaded || !isValidEmail,
  });
  const [likePost] = useLikePostMutation();
  const [unlikePost] = useUnlikePostMutation();
  const [deletePost] = useDeletePostMutation();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const userSession = await AsyncStorage.getItem('userSession');
        const authToken = await AsyncStorage.getItem('authToken');
        console.log('YourPostScreen: userSession from AsyncStorage:', userSession);
        console.log('YourPostScreen: authToken from AsyncStorage:', authToken);
        console.log('YourPostScreen: email from Redux:', email);
        console.log('YourPostScreen: isValidEmail:', isValidEmail);
        if (!userSession || !isValidEmail) {
          console.log('YourPostScreen: No valid session, redirecting to Login');
          await AsyncStorage.multiRemove(['userSession', 'authToken']);
          dispatch(clearSession());
          navigation.replace('AuthStack', { screen: 'Login' });
        } else {
          setSessionLoaded(true);
        }
      } catch (error) {
        console.error('YourPostScreen: Error checking session:', error);
        await AsyncStorage.multiRemove(['userSession', 'authToken']);
        dispatch(clearSession());
        navigation.replace('AuthStack', { screen: 'Login' });
      }
    };
    checkSession();
  }, [dispatch, navigation, email, isValidEmail]);

  const loadUserPosts = useCallback(async (force = false) => {
    const now = Date.now();
    if (!force && now - lastFetch < FETCH_COOLDOWN) {
      console.log('YourPostScreen: Skipping fetch: within cooldown period');
      return;
    }
    try {
      await refetch();
      setLastFetch(now);
    } catch (err) {
      console.error('YourPostScreen: Error loading user posts:', err);
    }
  }, [refetch, lastFetch]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadUserPosts(true);
    setRefreshing(false);
  }, [loadUserPosts]);

  const handleRetry = useCallback(() => {
    loadUserPosts(true);
  }, [loadUserPosts]);

  const handleLogin = useCallback(async () => {
    try {
      await AsyncStorage.multiRemove(['userSession', 'authToken']);
      dispatch(clearSession());
      navigation.replace('AuthStack', { screen: 'Login' });
    } catch (err) {
      console.error('YourPostScreen: Error clearing session:', err);
    }
  }, [navigation, dispatch]);

  useFocusEffect(
    useCallback(() => {
      if (sessionLoaded && isValidEmail) {
        loadUserPosts();
      }
    }, [loadUserPosts, sessionLoaded, isValidEmail])
  );

  const handleAvatarPress = useCallback((username) => {
    if (!username) {
      console.warn('YourPostScreen: No username provided for profile navigation');
      return;
    }
    navigation.navigate('CommunityStack', {
      screen: 'PostProfile',
      params: { username },
    });
  }, [navigation]);

  const handleLikePress = useCallback(
    debounce(
      async (postId, likedBy) => {
        console.log('FeedScreen: handleLikePress:', {
          postId,
          likedBy,
          sessionLoaded,
          isValidEmail,
        });
        if (likingPost || !sessionLoaded || !isValidEmail) {
          console.log('FeedScreen: Like press skipped:', {
            likingPost,
            sessionLoaded,
            isValidEmail,
          });
          return;
        }
        setLikingPost(postId);
        try {
          if (likedBy) {
            console.log('FeedScreen: Unliking post:', postId);
            await unlikePost(postId).unwrap();
          } else {
            console.log('FeedScreen: Liking post:', postId);
            try {
              await likePost(postId).unwrap();
            } catch (likeErr) {
              if (likeErr.status === 400 && likeErr.data?.error === 'Post already liked') {
                console.log('FeedScreen: Post already liked, unliking:', postId);
                await unlikePost(postId).unwrap();
              } else {
                throw likeErr;
              }
            }
          }
        } catch (err) {
          console.error('FeedScreen: Like post error:', err.message, err.data);
        } finally {
          setLikingPost(null);
        }
      },
      500
    ),
    [likePost, unlikePost, likingPost, sessionLoaded, isValidEmail]
  );

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
        console.error('YourPostScreen: Delete post error:', err.message, err.data);
      } finally {
        setDeletingPost(null);
        setShowDeleteModal(false);
        setSelectedPostId(null);
      }
    }
  }, [deletePost, selectedPostId, deletingPost]);

  const handleCommentPress = (post) => {
    if (!sessionLoaded || !isValidEmail) {
      console.log('YourPostScreen: Invalid session, redirecting to Login');
      navigation.replace('AuthStack', { screen: 'Login' });
      return;
    }
    navigation.navigate('CommunityStack', {
      screen: 'PostComment',
      params: { post },
    });
  };

  if (!sessionLoaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

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
                {userPostsError.status === 401
                  ? 'Please log in to view your posts.'
                  : userPostsError.status === 404
                  ? 'No posts found.'
                  : `Error: ${userPostsError.data?.message || 'Failed to load posts'}`}
              </Text>
              {userPostsError.status === 401 ? (
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
                timeAgo={post.uploadedAt ? dayjs(post.uploadedAt).fromNow() : 'Unknown time'}
                likeCount={post.likes || 0}
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
    justifyContent: 'center',
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