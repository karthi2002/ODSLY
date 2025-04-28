import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import CustomHeader from "../../layouts/CustomHeader";
import NewPostCard from "../../components/Card/NewPostCard";
import Colors from "../../utils/Colors";

const CreatePostScreen = () => {
  const [postContent, setPostContent] = useState("");

  const handlePost = () => {
    console.log("Posting content:", postContent);
    setPostContent("");
  };

  const hasText = postContent.trim().length > 0;

  return (
    <View style={styles.container}>
      <CustomHeader
        title="Create Post"
        showPostButton={true}
        postButtonActive={hasText}
        onPostPress={handlePost}
      />
      <ScrollView
        style={styles.content}
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        <NewPostCard
          avatarUri="https://example.com/avatar.jpg"
          content={postContent}
          onChangeContent={setPostContent}
        />
      </ScrollView>
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
});

export default CreatePostScreen;
