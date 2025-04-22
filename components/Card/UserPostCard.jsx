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
      <FontAwesome name="heart" size={20} color={Colors.secondary} />
    );

  return (
    <LinearGradient
      colors={["#029EFE", "#6945E2", "#E9098E"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.cardOuter}
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
        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.action} onPress={toggleLike}>
            {renderHeartIcon()}
            <Text style={styles.actionText}>{likes}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.action} onPress={addComment}>
            <Feather name="message-circle" size={20} color={Colors.secondary} />
            <Text style={styles.actionText}>{comments}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  cardOuter: {
    borderRadius: 16,
    padding: 2,
    marginVertical: 10,
  },
  card: {
    backgroundColor: Colors.background,
    borderRadius: 14,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 999,
  },
  headerText: {
    flexDirection:"row",
    gap:200,
    marginLeft: 10,
  },
  username: {
    fontSize: 15,
    fontWeight: "600",
    color: Colors.secondary,
  },
  timeAgo: {
    fontSize: 12,
    color: Colors.text,
    marginTop: 2,
  },
  content: {
    color: Colors.secondary,
    fontSize: 16,
    marginBottom: 10,
    lineHeight: 22,
  },
  hashtagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 12,
  },
  hashtag: {
    color: Colors.secondary,
    fontWeight: "600",
    fontSize: 15,
    marginRight: 12,
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
  actionText: {
    color: Colors.secondary,
    fontSize: 15,
    fontWeight: "500",
  },
});

export default UserPostCard;
