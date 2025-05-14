import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, View, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux"; 
import CustomHeader from "../../layouts/CustomHeader";
import NewPostCard from "../../components/Card/NewPostCard";
import Colors from "../../utils/Colors";
import { addPost } from "../../redux/posts/postsActions";
import { fetchProfile } from "../../redux/profile/profileActions";
import DefaultImage from '../../assets/images/default-user-image.jpg';

const CreatePostScreen = () => {
  const [postContent, setPostContent] = useState("");
  const dispatch = useDispatch();

  const { profile } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  const getAvatarUri = () => {
    return profile?.image || DefaultImage;
  };

  const handlePost = () => {
    if (!postContent.trim()) return;

    const postData = {
      username: profile?.username,
      userImage: getAvatarUri(),
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
          avatarUri={getAvatarUri()}
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
