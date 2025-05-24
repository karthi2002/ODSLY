import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { clearSession } from '../../redux/session/sessionSlice';
import Colors from '../../utils/Colors';
import CustomHeader from '../../layouts/CustomHeader';
import UserPostCard from '../../components/Card/UserPostCard';
import CountLabel from '../../components/Input/CountLabel';
import CommentCard from '../../components/Card/CommentCard';
import CommentInput from '../../components/Input/CommentInput';
import DeleteConfirmationModal from '../../components/Modal/DeleteConfirmationModal';
import {
  useGetProfileQuery,
} from '../../redux/apis/profileApi';
import {
  useGetUserPostsQuery,
  useGetCommentsQuery,
  useAddCommentMutation,
  useDeleteCommentMutation,
  useLikeCommentMutation,
  useUnlikeCommentMutation,
} from '../../redux/apis/postsApi';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { debounce } from 'lodash';
import DefaultImage from '../../assets/images/default-user-image.jpg';
import { Image } from 'react-native';

const fallbackImage = Image.resolveAssetSource(DefaultImage).uri;

dayjs.extend(relativeTime);

const PostCommentScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute();
  const { post } = route.params;
  const email = useSelector((state) => state.session.userSession?.email);
  const isValidEmail = email && typeof email === 'string' && email.includes('@');
  const [sessionLoaded, setSessionLoaded] = useState(false);
  const [commentCount, setCommentCount] = useState(post.commentCount || 0);
  const [showModal, setShowModal] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [likingComment, setLikingComment] = useState(null);

  const { data: profile, isLoading: profileLoading, error: profileError, refetch: refetchProfile } = useGetProfileQuery(email, {
    skip: !sessionLoaded || !isValidEmail,
  });
  const { data: userPosts, isLoading: userPostsLoading, error: userPostsError, refetch: refetchUserPosts } = useGetUserPostsQuery(email, {
    skip: !sessionLoaded || !isValidEmail,
  });
  const { data: commentsData, isLoading: commentsLoading, error: commentsError, refetch: refetchComments } = useGetCommentsQuery(post._id, {
    skip: !sessionLoaded || !isValidEmail,
  });
  const [addComment] = useAddCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();
  const [likeComment] = useLikeCommentMutation();
  const [unlikeComment] = useUnlikeCommentMutation();

  const currentUsername = profile?.username || '';
  const currentUserImage = profile?.image || fallbackImage;
  const currentUserId = profile?._id || '';

  console.log('PostCommentScreen: Profile state:', { username: currentUsername, userId: currentUserId, image: currentUserImage });

  const currentPost = userPosts?.find(p => p._id === post._id) || post;

  useEffect(() => {
    const checkSession = async () => {
      try {
        const userSession = await AsyncStorage.getItem('userSession');
        const authToken = await AsyncStorage.getItem('authToken');
        console.log('PostCommentScreen: userSession from AsyncStorage:', userSession);
        console.log('PostCommentScreen: authToken from AsyncStorage:', authToken);
        console.log('PostCommentScreen: email from Redux:', email);
        console.log('PostCommentScreen: isValidEmail:', isValidEmail);
        if (!userSession || !isValidEmail) {
          console.log('PostCommentScreen: No valid session, redirecting to Login');
          await AsyncStorage.multiRemove(['userSession', 'authToken']);
          dispatch(clearSession());
          navigation.replace('AuthStack', { screen: 'Login' });
        } else {
          setSessionLoaded(true);
        }
      } catch (error) {
        console.error('PostCommentScreen: Error checking session:', error);
        await AsyncStorage.multiRemove(['userSession', 'authToken']);
        dispatch(clearSession());
        navigation.replace('AuthStack', { screen: 'Login' });
      }
    };
    checkSession();
  }, [dispatch, navigation, email, isValidEmail]);

  useEffect(() => {
    console.log('Navigation listeners setup');
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('PostCommentScreen: Screen focused', { sessionLoaded, isValidEmail });
      if (sessionLoaded && isValidEmail) {
        console.log('PostCommentScreen: Refetching data');
        refetchProfile();
        refetchUserPosts();
        refetchComments();
      }
    });
    return unsubscribe;
  }, [navigation, sessionLoaded, isValidEmail, refetchProfile, refetchUserPosts, refetchComments]);

  useEffect(() => {
    if (sessionLoaded && isValidEmail) {
      console.log('PostCommentScreen: Initial data fetch');
      refetchProfile();
      refetchUserPosts();
      refetchComments();
    }
  }, [sessionLoaded, isValidEmail, refetchProfile, refetchUserPosts, refetchComments]);

  useEffect(() => {
    console.log('Comments data:', commentsData);
  }, [commentsData]);

  useEffect(() => {
    console.log('showModal changed:', { showModal, selectedCommentId, selectedPostId });
  }, [showModal, selectedCommentId, selectedPostId]);

  const handleAvatarPress = useCallback((username) => {
    if (!username) {
      console.warn('PostCommentScreen: No username provided for profile navigation');
      return;
    }
    navigation.navigate('CommunityStack', {
      screen: 'PostProfile',
      params: { username },
    });
  }, [navigation]);

  const handlePostComment = async (commentText) => {
    if (!sessionLoaded || !isValidEmail) {
      console.log('PostCommentScreen: Invalid session, redirecting to Login');
      navigation.replace('AuthStack', { screen: 'Login' });
      return;
    }
    if (!commentText.trim()) {
      setErrorMessage('Comment content is required');
      return;
    }
    try {
      setErrorMessage(null);
      const result = await addComment({ postId: post._id, content: commentText }).unwrap();
      setCommentCount(result.commentCount);
      refetchComments();
    } catch (err) {
      console.error('PostCommentScreen: Post comment error:', err);
      setErrorMessage(err.data?.error || 'Failed to post comment');
    }
  };

  const handleDeleteComment = async () => {
    if (!sessionLoaded || !isValidEmail) {
      console.log('PostCommentScreen: Invalid session, redirecting to Login');
      navigation.replace('AuthStack', { screen: 'Login' });
      return;
    }
    if (selectedCommentId) {
      try {
        setErrorMessage(null);
        const result = await deleteComment({ postId: post._id, commentId: selectedCommentId }).unwrap();
        setCommentCount(result.commentCount);
        refetchComments();
      } catch (err) {
        console.error('PostCommentScreen: Delete comment error:', err);
        setErrorMessage(err.data?.error || 'Failed to delete comment');
      }
      setShowModal(false);
      setSelectedCommentId(null);
    }
  };

  const handleLikeComment = useCallback(
    debounce(async (commentId, likedBy) => {
      if (likingComment || !sessionLoaded || !isValidEmail) return;
      setLikingComment(commentId);
      try {
        if (likedBy) {
          await unlikeComment({ postId: post._id, commentId }).unwrap();
        } else {
          try {
            await likeComment({ postId: post._id, commentId }).unwrap();
          } catch (likeErr) {
            if (
              likeErr.status === 400 &&
              likeErr.data?.error === 'Comment already liked'
            ) {
              await unlikeComment({ postId: post._id, commentId }).unwrap();
            } else {
              throw likeErr;
            }
          }
        }
      } catch (err) {
        console.error('PostCommentScreen: Like comment error:', err.message, err.data);
      } finally {
        setLikingComment(null);
      }
    }, 500),
    [likeComment, unlikeComment, likingComment, post._id, sessionLoaded, isValidEmail]
  );

  if (!sessionLoaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

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
              username: currentPost.username === currentUsername ? currentUsername : currentPost.username,
              avatar: currentPost.username === currentUsername ? currentUserImage : (currentPost.userImage || fallbackImage),
            }}
            content={currentPost.text}
            hashtags={currentPost.hashtags}
            timeAgo={currentPost.uploadedAt ? dayjs(currentPost.uploadedAt).fromNow() : 'Unknown time'}
            likeCount={currentPost.likes || 0}
            likedBy={currentPost.likedBy || false}
            commentCount={commentCount}
            onAvatarPress={() => handleAvatarPress(currentPost.username)}
            onLikePress={() => {}}
            onCommentPress={() => {}}
            showDelete={currentPost.username === currentUsername}
            onDeletePress={() => {
              setSelectedPostId(post._id);
              setSelectedCommentId(null);
              setShowModal(true);
            }}
            disableComment={true}
          />
        </View>
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <CountLabel label="comment" count={commentCount} style={styles.sectionTitle} />
          </View>
          {(profileLoading || userPostsLoading || commentsLoading) && (
            <ActivityIndicator size="large" color={Colors.primary} style={{ marginVertical: 10 }} />
          )}
          {(commentsError || profileError || userPostsError) && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>
                {commentsError?.data?.error || profileError?.data?.error || userPostsError?.data?.error || 'Error loading data'}
              </Text>
              <TouchableOpacity style={styles.retryButton} onPress={() => {
                refetchProfile();
                refetchUserPosts();
                refetchComments();
              }}>
                <Text style={styles.retryButtonText}>Retry</Text>
              </TouchableOpacity>
            </View>
          )}
          {errorMessage && (
            <Text style={styles.errorText}>{errorMessage}</Text>
          )}
          {!commentsLoading && !commentsError && commentsData?.comments?.length === 0 && (
            <Text style={styles.noCommentsText}>No comments yet</Text>
          )}
          <FlatList
            data={commentsData?.comments || []}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => {
              const isCurrentUser = item.userId === currentUserId;
              const displayUsername = isCurrentUser ? currentUsername : item.username;
              const displayAvatar = isCurrentUser ? currentUserImage : (item.userImage || fallbackImage);
              console.log('PostCommentScreen: Rendering comment:', {
                commentUsername: item.username,
                commentUserId: item.userId,
                isCurrentUser,
                displayUsername,
                displayAvatar,
              });
              console.log('Comment data:', { commentId: item._id, userId: item.userId, username: item.username });
              return (
                <CommentCard
                  avatar={displayAvatar}
                  name={displayUsername}
                  timeAgo={item.createdAt ? dayjs(item.createdAt).fromNow() : 'Unknown time'}
                  likes={item.likes || 0}
                  likedBy={item.likedBy || false}
                  textContent={item.content}
                  onLikePress={() => handleLikeComment(item._id, item.likedBy)}
                  onLongPress={() => {
                    console.log('Long press triggered for comment:', {
                      commentId: item._id,
                      isCurrentUser,
                      currentUserId,
                      commentUserId: item.userId,
                    });
                    if (isCurrentUser) {
                      setSelectedCommentId(item._id);
                      setSelectedPostId(null);
                      setShowModal(true);
                    } else {
                      console.log('Not current user, modal not shown');
                    }
                  }}
                  disabled={likingComment === item._id}
                />
              );
            }}
          />
        </View>
        <DeleteConfirmationModal
          isVisible={showModal}
          onCancel={() => {
            setShowModal(false);
            setSelectedCommentId(null);
            setSelectedPostId(null);
          }}
          onConfirm={selectedCommentId ? handleDeleteComment : () => console.log('Post deletion not implemented')}
          message={selectedCommentId ? 'Are you sure you want to delete this comment?' : 'Are you sure you want to delete this post?'}
        />
      </ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
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
    justifyContent: 'center',
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    color: Colors.secondary,
    fontSize: 18,
    fontWeight: '400',
    marginBottom: 20,
  },
  inputContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.primary,
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  errorContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  errorText: {
    color: Colors.error,
    textAlign: 'center',
    marginVertical: 10,
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
  noCommentsText: {
    color: Colors.secondary,
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default PostCommentScreen;