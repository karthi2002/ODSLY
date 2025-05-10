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
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from "../../utils/Colors";
import { LineGradient } from "../../layouts/LineGradient";
import { recentBet } from "../../json/RecentBetData";
import BetCard from "../../components/Card/BetCard";
import UserPostCard from "../../components/Card/UserPostCard";
import { fetchUserPosts } from "../../redux/posts/postsActions";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const CACHE_KEY = 'cached_user_posts';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds
const AUTO_REFRESH_INTERVAL = 5 * 60 * 1000; // 5 minutes

export default function YourPostScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const { userPosts, userPostsLoading, userPostsError } = useSelector((state) => state.posts);

  // Debugging: Log Redux state
  console.log('Redux userPosts state:', userPosts);

  // Load cached posts or fetch new ones
  const loadUserPosts = useCallback(async () => {
    try {
      const cachedData = await AsyncStorage.getItem(CACHE_KEY);
      console.log('Cached user posts:', cachedData);
      if (cachedData) {
        const { posts, timestamp } = JSON.parse(cachedData);
        const now = Date.now();
        if (now - timestamp < CACHE_DURATION) {
          console.log("Loading cached user posts...");
          dispatch({ type: "FETCH_USER_POSTS_SUCCESS", payload: posts });
          return;
        }
      }
      console.log("Fetching user posts...");
      await dispatch(fetchUserPosts());
    } catch (err) {
      console.error("Error loading user posts:", err);
      dispatch({ type: "FETCH_USER_POSTS_FAILURE", payload: err.message });
    }
  }, [dispatch]);

  // Handle pull-to-refresh
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    console.log("Pull-to-refresh triggered for user posts");
    await dispatch(fetchUserPosts());
    setRefreshing(false);
  }, [dispatch]);

  // Handle retry button
  const handleRetry = useCallback(async () => {
    console.log("Retrying fetch user posts...");
    await dispatch(fetchUserPosts());
  }, [dispatch]);

  // Handle login redirect
  const handleLogin = useCallback(() => {
    console.log("Redirecting to login...");
    navigation.navigate("AuthStack", { screen: "Login" }); // Adjust to your login screen
  }, [navigation]);

  // Initial load and auto-refresh timer
  useEffect(() => {
    loadUserPosts();

    // Set up auto-refresh timer
    const intervalId = setInterval(() => {
      console.log("Auto-refreshing user posts...");
      dispatch(fetchUserPosts());
    }, AUTO_REFRESH_INTERVAL);

    // Cleanup timer on unmount
    return () => clearInterval(intervalId);
  }, [dispatch, loadUserPosts]);

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
            userPosts.map((post) => {
              console.log('Rendering post:', post._id, 'Username:', post.username); // Debug log
              return (
                <UserPostCard
                  key={post._id}
                  user={{
                    username: post.username || 'Unknown User', // Fallback
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
                  showDelete={true}
                  style={{ marginBottom: 15 }}
                />
              );
            })
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