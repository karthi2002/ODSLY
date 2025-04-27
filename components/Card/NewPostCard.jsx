import React from 'react';
import { View, TextInput, StyleSheet, Image } from 'react-native';
import Colors from '../../utils/Colors';

const NewPostCard = ({ avatarUri, content, onChangeContent }) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: avatarUri }}
        style={styles.avatar}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Write about your victory..."
        placeholderTextColor="#888"
        multiline
        value={content}
        onChangeText={onChangeContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: Colors.background,
    borderRadius: 10,
    minHeight: 120,
    alignItems: 'flex-start',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginTop: 4,
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    color: Colors.secondary,
    fontSize: 16,
    paddingTop: 6,
  },
});

export default NewPostCard;
