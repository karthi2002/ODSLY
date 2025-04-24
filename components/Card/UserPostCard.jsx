import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { FontAwesome, Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import Colors from "../../utils/Colors";

const UserPostCard = ({
  user,
  content,
  hashtags = [],
  timeAgo,
  likeCount = 0,
  commentCount = 0,
  onAvatarPress,
  onLikePress,
  onCommentPress,
  showDelete = false,
  onDeletePress,
  style
}) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(likeCount);
  const [comments, setComments] = useState(commentCount);

  const toggleLike = () => {
    const isNowLiked = !liked;
    setLiked(isNowLiked);
    setLikes((prev) => prev + (isNowLiked ? 1 : -1));
    onLikePress?.();
  };

  const addComment = () => {
    setComments((prev) => prev + 1);
    onCommentPress?.();
  };

  const renderHeartIcon = () =>
    liked ? (
      <MaskedView
        maskElement={<FontAwesome name="heart" size={20} color="black" />}
      >
        <LinearGradient
          colors={["#029EFE", "#6945E2", "#E9098E"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ width: 20, height: 20 }}
        />
      </MaskedView>
    ) : (
      <FontAwesome name="heart-o" size={20} color={Colors.secondary} />
    );

  return (
    <LinearGradient
      colors={["#029EFE", "#6945E2", "#E9098E"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.cardOuter, style]}
    >
      <View style={styles.card}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onAvatarPress}>
            <Image source={{ uri: user.avatar }} style={styles.avatar} />
          </TouchableOpacity>
          <View style={styles.headerText}>
            <Text style={styles.username}>{user.name}</Text>
            <Text style={styles.timeAgo}>{timeAgo}</Text>
          </View>
        </View>

        {/* Content */}
        <Text style={styles.content}>{content}</Text>

        {/* Hashtags */}
        <View style={styles.hashtagContainer}>
          {hashtags.map((tag, idx) => (
            <Text key={idx} style={styles.hashtag}>
              {tag}
            </Text>
          ))}
        </View>

        {/* Actions */}
        <View style={styles.actionContainer}>
          <View style={styles.actionsRow}>
            <TouchableOpacity style={styles.action} onPress={toggleLike}>
              {renderHeartIcon()}
              <Text style={styles.actionText}>{likes}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.action} onPress={addComment}>
              <FontAwesome
                name="comment-o"
                size={20}
                color={Colors.secondary}
              />
              <Text style={styles.actionText}>{comments}</Text>
            </TouchableOpacity>
          </View>

          {showDelete && (
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={onDeletePress}
            >
              <FontAwesome
                name="trash-o"
                size={20}
                color={Colors.secondary}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  cardOuter: {
    flex: 1,
    borderRadius: 16,
    padding: 2,
  },
  card: {
    backgroundColor: Colors.background,
    borderRadius: 14,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 12,
  },
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 50,
  },
  headerText: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  username: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.secondary,
  },
  timeAgo: {
    fontSize: 14,
    color: Colors.text,
    marginTop: 2,
  },
  content: {
    color: Colors.secondary,
    fontSize: 16,
    fontWeight: "400",
    marginBottom: 5,
    lineHeight: 22,
  },
  hashtagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 1,
    marginBottom: 12,
  },
  hashtag: {
    color: Colors.secondary,
    fontWeight: "600",
    fontSize: 16,
    marginRight: 12,
  },
  actionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  actionsRow: {
    flexDirection: "row",
    gap: 20,
  },
  action: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  deleteButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  actionText: {
    color: Colors.secondary,
    fontSize: 16,
    fontWeight: "500",
  },
});

export default UserPostCard;
