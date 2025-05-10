import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Ionicons from "@expo/vector-icons/Ionicons";
import CustomHeader from "../../layouts/CustomHeader";
import TextInputField from "../../components/Input/TextInputField";
import GradientButton from "../../components/Button/GradientButton";
import Colors from "../../utils/Colors";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProfile,
  modifyUserImage,
  modifyUserUsername,
  deleteUserImage,
} from "../../redux/profile/profileActions";
import { fetchUserPosts } from "../../redux/posts/postsActions";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import { BACKEND_URL } from "../../config/url";

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dmpx9rrm4/image/upload";
const CLOUDINARY_UPLOAD_PRESET = "odsly_profile";

const EditProfileScreen = () => {
  const dispatch = useDispatch();
  const { profile, error, loading: fetchLoading } = useSelector((state) => state.profile);

  const [username, setUsername] = useState("");
  const [userImage, setUserImage] = useState(null);
  const [originalUsername, setOriginalUsername] = useState("");
  const [originalImage, setOriginalImage] = useState(null);
  const [isChanged, setIsChanged] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState(null);
  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setUsername(profile.username || "");
      setUserImage(profile.image || null);
      setOriginalUsername(profile.username || "");
      setOriginalImage(profile.image || null);
      checkUsernameAvailability(profile.username || "");
      console.log("EditProfileScreen: Set userImage:", profile.image || null);
    }
  }, [profile]);

  const getUsernameMessage = () => {
    if (username === originalUsername) return "";
    if (usernameAvailable === true) return "Username is available";
    if (usernameAvailable === false) return "Username is already taken";
    return "";
  };

  useEffect(() => {
    const hasChanges = username !== originalUsername;
    setIsChanged(hasChanges && isUsernameValid);
  }, [username, originalUsername, isUsernameValid]);

  const checkUsernameAvailability = async (name) => {
    if (!name || name.length < 3 || !name.match(/^[a-zA-Z0-9_]{3,15}$/)) {
      setUsernameAvailable(null);
      setIsUsernameValid(false);
      return;
    }
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/check-user`, {
        username: name,
      });
      const available = !response.data.exists;
      setUsernameAvailable(available);
      setIsUsernameValid(available);
    } catch (err) {
      console.error("Username check error:", err);
      setUsernameAvailable(null);
      setIsUsernameValid(false);
      Alert.alert("Error", "Failed to check username availability.");
    }
  };

  const handleImagePick = async () => {
    if (loading || fetchLoading) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled && result.assets?.[0]?.uri) {
      setLoading(true);
      try {
        const imageUrl = await uploadImageToCloudinary(result.assets[0].uri);
        await dispatch(modifyUserImage(profile.email, imageUrl));
        setUserImage(imageUrl);
        setOriginalImage(imageUrl);
        // Clear cache and refresh posts
        await AsyncStorage.removeItem('cached_user_posts');
        await dispatch(fetchUserPosts());
        console.log('Refreshed user posts after image update:', imageUrl);
        Alert.alert("Success", "Profile picture updated successfully!");
      } catch (error) {
        setUserImage(originalImage);
        console.error('Image update error:', error);
        Alert.alert("Error", "Failed to update profile picture.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDeleteImage = async () => {
    if (loading || fetchLoading) return;

    setLoading(true);
    try {
      await dispatch(deleteUserImage(profile.email));
      setUserImage(null);
      setOriginalImage(null);
      // Clear cache and refresh posts
      await AsyncStorage.removeItem('cached_user_posts');
      await dispatch(fetchUserPosts());
      console.log('Refreshed user posts after image deletion');
      Alert.alert("Success", "Profile picture removed successfully!");
    } catch (error) {
      setUserImage(originalImage);
      console.error('Image deletion error:', error);
      Alert.alert("Error", "Failed to remove profile picture.");
    } finally {
      setLoading(false);
    }
  };

  const uploadImageToCloudinary = async (uri) => {
    try {
      const uriParts = uri.split(".");
      const fileType = uriParts[uriParts.length - 1];

      const formData = new FormData();
      formData.append("file", {
        uri,
        type: `image/${fileType}`,
        name: `upload.${fileType}`,
      });
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

      const response = await axios.post(CLOUDINARY_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        return response.data.secure_url;
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      console.error("Image upload error:", error);
      throw error;
    }
  };

  const handleSaveChanges = async () => {
    if (!isUsernameValid) {
      Alert.alert("Error", "Please choose a valid and available username.");
      return;
    }

    if (!isChanged) {
      Alert.alert("No Changes", "No changes to save.");
      return;
    }

    setLoading(true);
    try {
      if (username !== originalUsername && username) {
        await dispatch(modifyUserUsername(profile.email, username));
        setOriginalUsername(username);
        // Clear cache and refresh posts
        await AsyncStorage.removeItem('cached_user_posts');
        await dispatch(fetchUserPosts());
        console.log('Refreshed user posts after username update');
      }
      setIsChanged(false);
      Alert.alert("Success", "Profile updated successfully!");
    } catch (err) {
      console.error("Save changes error:", err);
      Alert.alert("Error", "Failed to save changes.");
    } finally {
      setLoading(false);
    }
  };

  const GradientText = ({ text, onPress }) => (
    <TouchableOpacity onPress={onPress} disabled={loading || fetchLoading}>
      <MaskedView
        maskElement={
          <View style={styles.maskContainer}>
            <Text style={styles.actionText}>{text}</Text>
          </View>
        }
      >
        <LinearGradient
          colors={["#029EFE", "#6945E2", "#E9098E"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text style={[styles.actionText, { opacity: 0 }]}>{text}</Text>
        </LinearGradient>
      </MaskedView>
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        <CustomHeader title="Edit Profile" />
        <ScrollView
          style={styles.content}
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          {fetchLoading && (
            <ActivityIndicator size="large" color={Colors.secondary} style={{ marginVertical: 10 }} />
          )}
          {error && (
            <Text style={styles.errorText}>
              {error.includes("JSON Parse error")
                ? "Failed to load profile: Invalid session data. Please log in again."
                : `Error: ${error}`}
            </Text>
          )}
          <View style={styles.profileContainer}>
            <TouchableOpacity
              onPress={handleImagePick}
              style={styles.imageWrapper}
              disabled={loading || fetchLoading}
            >
              {userImage ? (
                <Image
                  source={{ uri: userImage }}
                  style={styles.profileImage}
                  onError={(e) => console.log("Profile image load error:", e.nativeEvent.error)}
                />
              ) : (
                <Ionicons name="person" size={60} color={Colors.background} />
              )}
            </TouchableOpacity>
            <View style={styles.profileRight}>
              <Text style={styles.welcomeText}>
                Welcome, {username || "User"}!
              </Text>
              <View style={styles.actionRow}>
                <GradientText text="Replace" onPress={handleImagePick} />
                <Text style={styles.separator}>|</Text>
                <GradientText text="Delete" onPress={handleDeleteImage} />
              </View>
            </View>
          </View>

          <TextInputField
            label="Username"
            value={username}
            setValue={(val) => {
              setUsername(val);
              setUsernameAvailable(null);
              setIsUsernameValid(false);
              if (typingTimeout) clearTimeout(typingTimeout);
              const timeout = setTimeout(() => {
                checkUsernameAvailability(val);
              }, 500);
              setTypingTimeout(timeout);
            }}
            pattern="^[a-zA-Z0-9_]{3,15}$"
            errorMessage={
              username && !username.match(/^[a-zA-Z0-9_]{3,15}$/)
                ? "Username must be 3-15 characters (letters, numbers, underscores)"
                : null
            }
            isValid={usernameAvailable === true}
            style={{
              color: Colors.secondary,
              backgroundColor: Colors.background,
              borderColor: Colors.secondary,
            }}
          />

          {username.length >= 3 && (
            <Text
              style={{
                fontSize: 12,
                color:
                  usernameAvailable === false
                    ? Colors.error
                    : usernameAvailable === true
                    ? Colors.success
                    : Colors.secondary,
                marginBottom: 5,
              }}
            >
              {getUsernameMessage()}
            </Text>
          )}

          <Text style={styles.subText}>
            Change username to check if it is available
          </Text>

          <TextInputField
            label="Email"
            value={profile.email || ""}
            setValue={() => {}}
            pattern="^([^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+)$"
            errorMessage=""
            editable={false}
            style={{
              color: Colors.secondary,
              backgroundColor: Colors.background,
              borderColor: Colors.secondary,
            }}
          />

          <GradientButton
            label="Save Changes"
            onPress={handleSaveChanges}
            disabled={!isChanged || loading || fetchLoading}
          />
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
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
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 30,
    marginBottom: 30,
  },
  imageWrapper: {
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: Colors.secondary,
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
  },
  profileRight: {
    flexDirection: "column",
    gap: 1,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.secondary,
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    gap: 20,
  },
  actionText: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.primary,
  },
  separator: {
    marginHorizontal: 8,
    fontSize: 14,
    color: Colors.secondary,
  },
  subText: {
    fontSize: 12,
    color: Colors.secondary,
    marginBottom: 20,
  },
  maskContainer: {
    backgroundColor: "transparent",
    alignItems: "center",
  },
  errorText: {
    color: Colors.error,
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
  },
});

export default EditProfileScreen;