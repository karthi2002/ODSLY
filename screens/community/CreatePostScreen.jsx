import React, { useState } from 'react';
import { View } from 'react-native';
import CustomHeader from '../../layouts/CustomHeader';
import NewPostCard from '../../components/Card/NewPostCard';

const CreatePostScreen = () => {
  const [postContent, setPostContent] = useState('');

  const handlePost = () => {
    console.log("Posting content:", postContent);
    // Clear or handle the post logic here
    setPostContent('');
  };

  const hasText = postContent.trim().length > 0;

  return (
    <View style={{ flex: 1, backgroundColor: '#000C2A', paddingTop: 60, paddingHorizontal: 16 }}>
      <CustomHeader
        title="Create Post"
        showPostButton={true}
        postButtonActive={hasText}
        onPostPress={handlePost}
      />

      <NewPostCard
        avatarUri="https://example.com/avatar.jpg"
        content={postContent}
        onChangeContent={setPostContent}
      />
    </View>
  );
};

export default CreatePostScreen;
