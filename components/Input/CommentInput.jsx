import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../../utils/Colors';

const CommentInput = ({ onPost }) => {
  const [comment, setComment] = useState('');

  const handlePost = () => {
    if (comment.trim()) {
      onPost(comment.trim());
      setComment('');
    }
  };

  const hasText = comment.trim().length > 0;

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <TextInput
          value={comment}
          onChangeText={setComment}
          placeholder="Type your comment here..."
          placeholderTextColor={Colors.text}
          style={styles.input}
        />

        {hasText ? (
          <TouchableOpacity onPress={handlePost} style={styles.gradientWrapper}>
            <LinearGradient
              colors={['#029EFE', '#6945E2', '#E9098E']}
              locations={[0, 0.37, 1]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.postButton}
            >
              <Text style={styles.postText}>POST</Text>
            </LinearGradient>
          </TouchableOpacity>
        ) : (
          <View style={[styles.postButton, styles.disabledButton]}>
            <Text style={[styles.postText, { color: '#ccc' }]}>POST</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default CommentInput;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    borderTopWidth: 1,
    borderTopColor: Colors.primary,
    padding: 10,
  },
  inputWrapper: {
    flexDirection: 'row',
    backgroundColor: '#2a2a2a',
    borderRadius: 30,
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    color: Colors.secondary,
    fontSize: 14,
  },
  gradientWrapper: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  postButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  postText: {
    fontWeight: '600',
    color: Colors.secondary,
    fontSize: 14,
  },
  disabledButton: {
    backgroundColor: '#444',
    marginLeft: 6,
  },
});
