import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import Colors from "../../utils/Colors";

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
      <TouchableOpacity onPress={onLikePress} style={styles.likeContainer}>
      <AntDesign name="like2" size={18} color={Colors.text} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    padding: 5,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 8,
    gap: 5
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 10
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 15,
    alignSelf: 'start'
  },
  textWrapper: {
    flex: 1,
  },
  name: {
    color: Colors.secondary,
    fontSize: 14,
    fontWeight: "600",
  },
  textSection: {
    marginTop: 2,
  },
  textMessage: {
    color: Colors.secondary,
    fontSize: 14,
    fontWeight:'300',
    lineHeight: 18,
  },
  commentMeta: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  metaText: {
    color: Colors.text,
    fontSize: 12,
  },
  likeContainer: {
    alignSelf: 'start',
    marginTop: 5
  }
});

export default CommentCard;
