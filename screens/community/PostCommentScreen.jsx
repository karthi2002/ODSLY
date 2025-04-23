import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import Colors from "../../utils/Colors";
import CustomHeader from "../../layouts/CustomHeader";
import UserPostCard from "../../components/Card/UserPostCard";
import { SinglePost } from "../../json/PostData";
import CountLabel from "../../components/Input/CountLabel";
import CommentCard from "../../components/Card/CommentCard";
import CommentsData from "../../json/CommentsData";
import CommentInput from "../../components/Input/CommentInput";
import DeleteConfirmationModal from "../../components/Modal/DeleteConfirmationModal";

const PostCommentScreen = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState(null);

  const handleAvatarPress = () => {
    navigation.navigate("CommunityStack", { screen: "PostProfile" });
  };

  const handleLikePress = () => {
    console.log("Post liked/unliked");
  };

  const handleCommentPress = () => {
    navigation.navigate("CommunityStack", { screen: "PostComment" });
  };

  const handlePostComment = (comment) => {
    console.log("Posted comment:", comment);
  };

  const handleDeletePress = () => {
    setShowModal(true);
  };

  return (
    <View style={styles.container}>
      <CustomHeader title={"Post"} />

      <ScrollView
        style={styles.content}
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        <View>
          {SinglePost.map((post) => (
            <UserPostCard
              key={post.id}
              user={post.user}
              content={post.content}
              hashtags={post.hashtags}
              timeAgo={post.timeAgo}
              likeCount={post.likeCount}
              commentCount={post.commentCount}
              onAvatarPress={handleAvatarPress}
              onLikePress={handleLikePress}
              onCommentPress={handleCommentPress}
              showDelete={true}
              onDeletePress={handleDeletePress}
            />
          ))}
        </View>

        <View style={styles.sectionContainer}>
          <CountLabel label="comment" count={45} style={styles.sectionTitle} />
          <FlatList
            data={CommentsData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                activeOpacity={1}
                onLongPress={() => {
                  setSelectedCommentId(item.id);
                  setShowModal(true);
                }}
              >
                <CommentCard
                  avatar={item.avatar}
                  name={item.name}
                  timeAgo={item.timeAgo}
                  likes={item.likes}
                  textContent={item.textContent}
                  onLikePress={() => handleLikePress(item.id)}
                />
              </TouchableOpacity>
            )}
          />
        </View>

        <DeleteConfirmationModal
          isVisible={showModal}
          onCancel={() => setShowModal(false)}
          onConfirm={() => {
            console.log("Deleted comment with ID:", selectedCommentId);
            setShowModal(false);
          }}
          message="Are you sure you want to delete this comment?"
        />
      </ScrollView>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
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
  },
  content: {
    paddingTop: 80,
    paddingHorizontal: 15,
  },
  sectionContainer: {
    marginTop: 50,
    flex: 1,
    backgroundColor: Colors.background,
  },
  sectionTitle: {
    color: Colors.secondary,
    fontSize: 18,
    fontWeight: "400",
    marginBottom: 20,
  },
  inputContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.primary,
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
});

export default PostCommentScreen;
