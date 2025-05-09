import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, View, Alert } from "react-native";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomHeader from "../../layouts/CustomHeader";
import NewPostCard from "../../components/Card/NewPostCard";
import Colors from "../../utils/Colors";
import { addPost } from "../../redux/posts/postsActions";

const CreatePostScreen = () => {
  const [postContent, setPostContent] = useState("");
  const [username, setUsername] = useState("");
  const [userImage, setUserImage] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const session = await AsyncStorage.getItem("userSession");
        if (session) {
          const user = JSON.parse(session);
          setUsername(user.username || "");
          setUserImage(user.image || "https://example.com/default-avatar.jpg");
        }
      } catch (error) {
        console.log("Error loading user session:", error);
      }
    };

    loadUserData();
  }, []);

  const handlePost = () => {
    if (!postContent.trim()) return;

    const postData = {
      username,
      userImage,
      text: postContent,
      hashtags: extractHashtags(postContent),
    };
    console.log("Sending postData:", postData);

    dispatch(addPost(postData));
    setPostContent("");
    Alert.alert("Posted", "Your post was created!");
  };

  const extractHashtags = (text) => {
    const tags = text.match(/#\w+/g);
    return tags ? tags.map((tag) => tag.slice(1)) : [];
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
          avatarUri={userImage || "https://example.com/default.jpg"}
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
