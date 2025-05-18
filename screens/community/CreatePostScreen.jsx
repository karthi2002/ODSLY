import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { clearSession } from '../../redux/session/sessionSlice';
import { useCreatePostMutation } from '../../redux/apis/postsApi';
import Colors from '../../utils/Colors';
import { LinearGradient } from 'expo-linear-gradient';

export default function CreatePostScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const email = useSelector((state) => state.session.userSession?.email);
  const isValidEmail = email && typeof email === 'string' && email.includes('@');
  const [sessionLoaded, setSessionLoaded] = useState(false);
  const [text, setText] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [createPost, { isLoading, error }] = useCreatePostMutation();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const userSession = await AsyncStorage.getItem('userSession');
        const authToken = await AsyncStorage.getItem('authToken');
        console.log('CreatePostScreen: userSession from AsyncStorage:', userSession);
        console.log('CreatePostScreen: authToken from AsyncStorage:', authToken);
        console.log('CreatePostScreen: email from Redux:', email);
        console.log('CreatePostScreen: isValidEmail:', isValidEmail);
        if (!userSession || !isValidEmail) {
          console.log('CreatePostScreen: No valid session, redirecting to Login');
          await AsyncStorage.multiRemove(['userSession', 'authToken']);
          dispatch(clearSession());
          navigation.replace('AuthStack', { screen: 'Login' });
        } else {
          setSessionLoaded(true);
        }
      } catch (error) {
        console.error('CreatePostScreen: Error checking session:', error);
        await AsyncStorage.multiRemove(['userSession', 'authToken']);
        dispatch(clearSession());
        navigation.replace('AuthStack', { screen: 'Login' });
      }
    };
    checkSession();
  }, [dispatch, navigation, email, isValidEmail]);

  const handleSubmit = useCallback(async () => {
    if (!sessionLoaded || !isValidEmail) {
      console.log('CreatePostScreen: Invalid session, redirecting to Login');
      navigation.replace('AuthStack', { screen: 'Login' });
      return;
    }
    if (!text.trim()) {
      alert('Post content is required');
      return;
    }
    try {
      const hashtagArray = hashtags
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag);
      await createPost({ text, hashtags: hashtagArray }).unwrap();
      navigation.goBack();
    } catch (err) {
      console.error('CreatePostScreen: Error creating post:', err);
      alert('Failed to create post: ' + (err.data?.error || 'Unknown error'));
    }
  }, [text, hashtags, createPost, navigation, sessionLoaded, isValidEmail]);

  if (!sessionLoaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        value={text}
        onChangeText={setText}
        placeholder="What's on your mind?"
        placeholderTextColor={Colors.secondary + '80'}
        multiline
      />
      <TextInput
        style={styles.hashtagInput}
        value={hashtags}
        onChangeText={setHashtags}
        placeholder="Hashtags (comma-separated)"
        placeholderTextColor={Colors.secondary + '80'}
      />
      {error && (
        <Text style={styles.errorText}>
          {error.data?.error || 'Failed to create post'}
        </Text>
      )}
      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSubmit}
        disabled={isLoading || !sessionLoaded || !isValidEmail}
      >
        <LinearGradient
          colors={['#029EFE', '#6945E2', '#E9098E']}
          locations={[0, 0.37, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        >
          {isLoading ? (
            <ActivityIndicator color={Colors.secondary} />
          ) : (
            <Text style={styles.submitButtonText}>Create Post</Text>
          )}
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 15,
    justifyContent: 'center',
  },
  textInput: {
    backgroundColor: '#1A1C1E',
    color: Colors.secondary,
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: 15,
  },
  hashtagInput: {
    backgroundColor: '#1A1C1E',
    color: Colors.secondary,
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 15,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  submitButton: {
    alignItems: 'center',
  },
  gradient: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignItems: 'center',
    width: '60%',
  },
  submitButtonText: {
    color: Colors.secondary,
    fontSize: 16,
    fontWeight: '600',
  },
});