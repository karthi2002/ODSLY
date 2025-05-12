/**
 * UserPostCard Component
 * ======================
 * 
 * A stylized card component for displaying a user's post, including avatar, username, post content, hashtags,
 * and interactive actions (like, comment, delete). Designed for use in social feed interfaces in React Native apps.
 * 
 * ## Props:
 * - user: { avatar: string, username: string }
 *      The user object containing avatar URL and username.
 * - content: string
 *      The main text content of the post.
 * - hashtags: string[] (optional)
 *      Array of hashtags to display below the content.
 * - timeAgo: string
 *      Human-readable time since the post was made (e.g., "2h ago").
 * - likeCount: number (optional, default: 0)
 *      Number of likes on the post.
 * - likedBy: boolean (optional, default: false)
 *      Whether the current user has liked this post.
 * - commentCount: number (optional, default: 0)
 *      Number of comments on the post.
 * - onAvatarPress: function
 *      Callback when the user's avatar is pressed.
 * - onLikePress: function
 *      Callback when the like button is pressed.
 * - onCommentPress: function
 *      Callback when the comment button is pressed.
 * - showDelete: boolean (optional, default: false)
 *      Whether to show the delete button (e.g., for the post owner).
 * - onDeletePress: function
 *      Callback when the delete button is pressed.
 * - disableComment: boolean (optional, default: false)
 *      Disables the comment button when true.
 * - style: object (optional)
 *      Additional styles for the card's outer container.
 * 
 * ## Features:
 * - Gradient border using `expo-linear-gradient`.
 * - User avatar and username, with time-ago display.
 * - Post content and hashtags.
 * - Like and comment actions, with icon feedback and counts.
 * - Like button shows a filled gradient heart if liked, outlined if not.
 * - Comment button can be disabled.
 * - Optional delete button for post owners.
 * - Responsive and accessible touchable elements.
 * 
 * ## Usage Example:
 * 
 * <UserPostCard
 *   user={{ avatar: 'https://...', username: 'JohnDoe' }}
 *   content="This is a sample post!"
 *   hashtags={['#reactnative', '#coding']}
 *   timeAgo="2h ago"
 *   likeCount={12}
 *   likedBy={true}
 *   commentCount={3}
 *   onAvatarPress={() => {}}
 *   onLikePress={() => {}}
 *   onCommentPress={() => {}}
 *   showDelete={true}
 *   onDeletePress={() => {}}
 *   disableComment={false}
 * />
 * 
 * ## Styling:
 * - Uses a combination of gradient backgrounds and custom color palette (imported from `../../utils/Colors`).
 * - All styles are defined in the `styles` object using `StyleSheet.create`.
 * 
 * ## Dependencies:
 * - react-native
 * - @expo/vector-icons (FontAwesome)
 * - expo-linear-gradient
 * - @react-native-masked-view/masked-view
 * 
 * ## Notes:
 * - The component includes a debug log for the `user` prop.
 * - Handles missing props gracefully with defaults.
 * 
 * ## File Structure:
 * - Imports
 * - Component definition
 *   - Helper: renderHeartIcon
 *   - Render: gradient border, header, content, hashtags, actions
 * - Styles
 * - Export
 */


import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import Colors from "../../utils/Colors";

const UserPostCard = ({
  user,
  content,
  hashtags = [],
  timeAgo,
  likeCount = 0,
  likedBy = false,
  commentCount = 0,
  onAvatarPress,
  onLikePress,
  onCommentPress,
  showDelete = false,
  onDeletePress,
  disableComment = false,
  style,
}) => {
  // Remove hashtags from content
  const cleanedContent = content.replace(
    new RegExp(`(?:\\s|^)#(${hashtags.join("|")})(?=\\s|$)`, "gi"),
    ""
  ).trim();

  const renderHeartIcon = () =>
    likedBy ? (
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
            <Text style={styles.username}>{user.username || 'Unknown User'}</Text>
            <Text style={styles.timeAgo}>{timeAgo}</Text>
          </View>
        </View>

        {/* Cleaned Content */}
        <Text style={styles.content}>{cleanedContent}</Text>

        {/* Hashtag Section */}
        <View style={styles.hashtagContainer}>
          {hashtags.map((tag, idx) => (
            <Text key={idx} style={styles.hashtag}>
              #{tag}
            </Text>
          ))}
        </View>

        {/* Actions */}
        <View style={styles.actionContainer}>
          <View style={styles.actionsRow}>
            <TouchableOpacity style={styles.action} onPress={onLikePress}>
              {renderHeartIcon()}
              <Text style={styles.actionText}>{likeCount}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.action, disableComment && styles.disabled]}
              onPress={onCommentPress}
              disabled={disableComment}
            >
              <FontAwesome
                name="comment-o"
                size={20}
                color={disableComment ? Colors.gray : Colors.secondary}
              />
              <Text style={[styles.actionText, disableComment && styles.disabledText]}>
                {commentCount}
              </Text>
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
  disabled: {
    opacity: 0.5,
  },
  disabledText: {
    color: Colors.gray,
  },
});

export default UserPostCard;
