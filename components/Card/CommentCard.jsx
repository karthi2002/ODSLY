import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../../utils/Colors"; // Adjust the path if needed

const CommentCard = ({ 
  avatar, 
  name, 
  timeAgo, 
  likes = 0, 
  textContent = "", 
  onLikePress 
}) => {
  return (
    <View style={styles.container}>
      {/* Left content */}
      <View style={styles.left}>
        <Image source={{ uri: avatar }} style={styles.avatar} />
        <View style={styles.textWrapper}>
          <Text style={styles.name}>{name}</Text>
          <View style={styles.textSection}>
            <Text style={styles.textMessage}>{textContent}</Text>
          </View>
          <View style={styles.commentMeta}>
            <Text style={styles.metaText}>{timeAgo} • {likes} Likes</Text>
          </View>
        </View>
      </View>

      {/* Right like button */}
      <TouchableOpacity onPress={onLikePress}>
        <FontAwesome name="thumbs-up" size={16} color="#888" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundColor,
    padding: 10,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 6,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 10,
  },
  textWrapper: {
    flex: 1,
  },
  name: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
  },
  textSection: {
    marginTop: 2,
  },
  textMessage: {
    color: "white",
    fontSize: 13,
    lineHeight: 18,
  },
  commentMeta: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  metaText: {
    color: "#999",
    fontSize: 12,
  },
});

export default CommentCard;
