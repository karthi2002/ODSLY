import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { clearSession } from '../../redux/session/sessionSlice';
import Colors from "../../utils/Colors";
import { LineGradient } from "../../layouts/LineGradient";
import Tag from "../../components/List/Tag";
import UserPostCard from "../../components/Card/UserPostCard";
import { useGetPostsQuery, useLikePostMutation, useUnlikePostMutation } from "../../redux/apis/postsApi";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { debounce } from 'lodash';
import DefaultImage from '../../assets/images/default-user-image.jpg';
import { Image } from 'react-native';

const fallbackImage = Image.resolveAssetSource(DefaultImage).uri;

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
  const email = useSelector((state) => state.session.userSession?.email);
  const isValidEmail = email && typeof email === 'string' && email.includes('@');
  const [sessionLoaded, setSessionLoaded] = useState(false);
  const [tags, setTags] = useState(tagsData);
  const [refreshing, setRefreshing] = useState(false);
  const [likingPost, setLikingPost] = useState(null);
  const [lastFetch, setLastFetch] = useState(0);

  const { data: posts, isLoading, error, refetch } = useGetPostsQuery(undefined, {
    skip: !sessionLoaded,
  });
  const [likePost] = useLikePostMutation();
  const [unlikePost] = useUnlikePostMutation();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const userSession = await AsyncStorage.getItem('userSession');
        const authToken = await AsyncStorage.getItem('authToken');
        console.log('FeedScreen: userSession from AsyncStorage:', userSession);
        console.log('FeedScreen: authToken from AsyncStorage:', authToken);
        console.log('FeedScreen: email from Redux:', email);
        console.log('FeedScreen: isValidEmail:', isValidEmail);
        if (!userSession || !isValidEmail) {
          console.log('FeedScreen: No valid session, redirecting to Login');
          await AsyncStorage.multiRemove(['userSession', 'authToken']);
          dispatch(clearSession());
          navigation.replace('AuthStack', { screen: 'Login' });
        } else {
          setSessionLoaded(true);
        }
      } catch (error) {
        console.error('FeedScreen: Error checking session:', error);
        await AsyncStorage.multiRemove(['userSession', 'authToken']);
        dispatch(clearSession());
        navigation.replace('AuthStack', { screen: 'Login' });
      }
    };
    checkSession();
  }, [dispatch, navigation, email, isValidEmail]);

  const loadPosts = useCallback(async (force = false) => {
    const now = Date.now();
    if (!force && now - lastFetch < FETCH_COOLDOWN) {
      console.log('FeedScreen: Skipping fetch: within cooldown period');
      return;
    }
    try {
      await refetch();
      setLastFetch(now);
    } catch (err) {
      console.error("FeedScreen: Error loading posts:", err);
    }
  }, [refetch, lastFetch]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadPosts(true);
    setRefreshing(false);
  }, [loadPosts]);

  const handleRetry = useCallback(() => {
    loadPosts(true);
  }, [loadPosts]);

  useFocusEffect(
    useCallback(() => {
      if (sessionLoaded) {
        loadPosts();
      }
    }, [loadPosts, sessionLoaded])
  );

  const toggleTag = (index) => {
    const updatedTags = [...tags];
    updatedTags[index].selected = !updatedTags[index].selected;
    setTags(updatedTags);
  };

  const handleAvatarPress = useCallback((username) => {
    if (!username) {
      console.warn('FeedScreen: No username provided for profile navigation');
      return;
    }
    navigation.navigate('CommunityStack', {
      screen: 'PostProfile',
      params: { username },
    });
  }, [navigation]);

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
        console.error('FeedScreen: Like post error:', err.message, err.data);
      } finally {
        setLikingPost(null);
      }
    }, 500),
    [likePost, unlikePost, likingPost, sessionLoaded, isValidEmail]
  );

  const handleCommentPress = (post) => {
    if (!sessionLoaded || !isValidEmail) {
      console.log('FeedScreen: Invalid session, redirecting to Login');
      navigation.replace('AuthStack', { screen: 'Login' });
      return;
    }
    console.log(post);
    navigation.navigate("CommunityStack", {
      screen: "PostComment",
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
          {isLoading && !refreshing && <ActivityIndicator size="large" color={Colors.primary} style={styles.loader} />}
          {error && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>
                {error.status === 401
                  ? 'Please log in to view posts.'
                  : error.data?.message || 'Failed to load posts'}
              </Text>
              <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
                <Text style={styles.retryButtonText}>Retry</Text>
              </TouchableOpacity>
            </View>
          )}
          {!isLoading && !error && posts?.length > 0 ? (
            posts.map((post) => (
              <UserPostCard
                key={post._id}
                user={{
                  username: post.username,
                  avatar: post.userImage,
                }}
                content={post.text}
                hashtags={post.hashtags}
                timeAgo={post.uploadedAt ? dayjs(post.uploadedAt).fromNow() : "Unknown time"}
                likeCount={post.likeCount || 0}
                likedBy={post.likedBy || false}
                commentCount={post.commentCount || 0}
                onAvatarPress={() => handleAvatarPress(post.username)}
                onLikePress={() => handleLikePress(post._id, post.likedBy)}
                onCommentPress={() => handleCommentPress(post)}
                disabled={likingPost === post._id}
                disableComment={false}
                style={{ marginBottom: 15 }}
              />
            ))
          ) : (
            !isLoading && !error && <Text style={styles.noPostsText}>No posts available</Text>
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
    justifyContent: 'center',
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