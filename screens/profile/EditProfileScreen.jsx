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
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import CustomHeader from "../../layouts/CustomHeader";
import TextInputField from "../../components/Input/TextInputField";
import GradientButton from "../../components/Button/GradientButton";
import Colors from "../../utils/Colors";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import {
  useGetProfileQuery,
  useModifyUsernameMutation,
  useModifyImageMutation,
  useDeleteImageMutation,
} from "../../redux/apis/profileApi";
import { useGetUserPostsQuery } from "../../redux/apis/postsApi";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import { BACKEND_URL } from "../../config/url";
import { clearSession } from '../../redux/session/sessionSlice';
import DefaultImage from '../../assets/images/default-user-image.jpg';

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dmpx9rrm4/image/upload";
const CLOUDINARY_UPLOAD_PRESET = "odsly_profile";

const fallbackImage = Image.resolveAssetSource(DefaultImage).uri;

const EditProfileScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const email = useSelector((state) => state.session.userSession?.email);
  const isValidEmail = email && typeof email === 'string' && email.includes('@');
  const [sessionLoaded, setSessionLoaded] = useState(false);

  const { data: profile, isLoading: fetchLoading, error, refetch } = useGetProfileQuery(email, {
    skip: !sessionLoaded || !isValidEmail,
  });
  const [modifyUsername] = useModifyUsernameMutation();
  const [modifyImage] = useModifyImageMutation();
  const [deleteImage] = useDeleteImageMutation();
  const { refetch: refetchUserPosts } = useGetUserPostsQuery(email, {
    skip: !sessionLoaded || !isValidEmail,
  });

  const [username, setUsername] = useState("");
  const [userImage, setUserImage] = useState(null);
  const [originalUsername, setOriginalUsername] = useState("");
  const [originalImage, setOriginalImage] = useState(null);
  const [isChanged, setIsChanged] = useState(false);
  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [loading, setLoading] = useState(false);

  // Check session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const userSession = await AsyncStorage.getItem('userSession');
        const authToken = await AsyncStorage.getItem('authToken');
        console.log('EditProfileScreen: userSession from AsyncStorage:', userSession);
        console.log('EditProfileScreen: authToken from AsyncStorage:', authToken);
        console.log('EditProfileScreen: email from Redux:', email);
        console.log('EditProfileScreen: isValidEmail:', isValidEmail);
        if (!userSession || !isValidEmail) {
          console.log('EditProfileScreen: No valid session, redirecting to Login');
          await AsyncStorage.multiRemove(['userSession', 'authToken']);
          dispatch(clearSession());
          navigation.replace('AuthStack', { screen: 'Login' });
        } else {
          setSessionLoaded(true);
        }
      } catch (error) {
        console.error('EditProfileScreen: Error checking session:', error);
        await AsyncStorage.multiRemove(['userSession', 'authToken']);
        dispatch(clearSession());
        navigation.replace('AuthStack', { screen: 'Login' });
      }
    };
    checkSession();
  }, [dispatch, navigation, email, isValidEmail]);

  useEffect(() => {
    if (profile) {
      setUsername(profile.username || "");
      setUserImage(profile.image || fallbackImage);
      setOriginalUsername(profile.username || "");
      setOriginalImage(profile.image || fallbackImage);
      setIsUsernameValid(true); // Initial username is valid
      console.log("EditProfileScreen: Set userImage:", profile.image || fallbackImage);
    }
  }, [profile]);

  useEffect(() => {
    const hasChanges = username !== originalUsername;
    setIsChanged(hasChanges && isUsernameValid);
  }, [username, originalUsername, isUsernameValid]);

  const validateUsername = (name) => {
    return name && name.length >= 3 && name.match(/^[a-zA-Z0-9_]{3,15}$/);
  };

  const getUsernameMessage = () => {
    if (!sessionLoaded || !isValidEmail) return "";
    if (username === originalUsername) return "";
    if (username && !validateUsername(username)) return "Username must be 3-15 characters (letters, numbers, underscores)";
    return "Username format is valid";
  };

  const handleImagePick = async () => {
    if (loading || fetchLoading || !sessionLoaded || !isValidEmail) {
      console.log("Image pick skipped: loading, fetchLoading, or invalid session");
      return;
    }

    try {
      console.log("Requesting media library permissions...");
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      console.log("Permission result:", permissionResult);

      if (!permissionResult.granted) {
        Alert.alert(
          "Permission Denied",
          "Permission to access photo library is required to select an image.",
          [
            { text: "OK" },
            { text: "Open Settings", onPress: () => Linking.openSettings() },
          ]
        );
        return;
      }

      console.log("Launching image library...");
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'images',
        quality: 0.5,
        allowsEditing: false,
      });
      console.log("ImagePicker result:", result);

      if (!result.canceled && result.assets?.length > 0 && result.assets[0]?.uri) {
        console.log("Selected image URI:", result.assets[0].uri);
        setLoading(true);
        try {
          const imageUrl = await uploadImageToCloudinary(result.assets[0].uri);
          console.log("Cloudinary upload success:", imageUrl);
          await modifyImage({ email, image: imageUrl }).unwrap();
          setUserImage(imageUrl);
          setOriginalImage(imageUrl);
          await AsyncStorage.removeItem('cached_user_posts');
          refetchUserPosts();
          console.log('Refreshed user posts after image update:', imageUrl);
          Alert.alert("Success", "Profile picture updated successfully!");
        } catch (error) {
          setUserImage(originalImage);
          console.error('Image update error:', error.message, error.response?.data);
          Alert.alert("Error", "Failed to update profile picture.");
        } finally {
          setLoading(false);
        }
      } else {
        console.log("Image picker canceled or no URI found:", result);
      }
    } catch (error) {
      console.error("Image picker error:", error.message);
      Alert.alert("Error", "Failed to open image picker.");
    }
  };

  const handleDeleteImage = async () => {
    if (loading || fetchLoading || !sessionLoaded || !isValidEmail) {
      console.log("Image deletion skipped: loading, fetchLoading, or invalid session");
      return;
    }

    setLoading(true);
    try {
      await deleteImage(email).unwrap();
      setUserImage(fallbackImage);
      setOriginalImage(fallbackImage);
      await AsyncStorage.removeItem('cached_user_posts');
      refetchUserPosts();
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
    if (!sessionLoaded || !isValidEmail) {
      console.log("Save changes skipped: invalid session");
      Alert.alert("Error", "Session expired. Please log in again.");
      return;
    }

    if (!isUsernameValid) {
      Alert.alert("Error", "Please choose a valid username.");
      return;
    }

    if (!isChanged) {
      Alert.alert("No Changes", "No changes to save.");
      return;
    }

    setLoading(true);
    try {
      if (username !== originalUsername && username) {
        await modifyUsername({ email, username }).unwrap();
        setOriginalUsername(username);
        await AsyncStorage.removeItem('cached_user_posts');
        refetchUserPosts();
        console.log('Refreshed user posts after username update');
      }
      setIsChanged(false);
      Alert.alert("Success", "Profile updated successfully!");
    } catch (err) {
      console.error("Save changes error:", err);
      Alert.alert("Error", err.data?.message || "Failed to save changes. Username may already be taken.");
    } finally {
      setLoading(false);
    }
  };

  const GradientText = ({ text, onPress }) => (
    <TouchableOpacity onPress={onPress} disabled={loading || fetchLoading || !sessionLoaded || !isValidEmail}>
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

  if (!sessionLoaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

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
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>
                {error.data?.message || error.message || "Failed to load profile. Please try again."}
              </Text>
              <TouchableOpacity onPress={() => refetch()}>
                <Text style={styles.retryText}>Retry</Text>
              </TouchableOpacity>
            </View>
          )}
          <View style={styles.profileContainer}>
            <TouchableOpacity
              onPress={handleImagePick}
              style={styles.imageWrapper}
              disabled={loading || fetchLoading || !sessionLoaded || !isValidEmail}
            >
              {userImage && userImage !== fallbackImage ? (
                <Image
                  source={{ uri: userImage }}
                  style={styles.profileImage}
                  onError={(e) => {
                    console.log("Profile image load error:", e.nativeEvent.error);
                    setUserImage(fallbackImage);
                  }}
                />
              ) : (
                <Image
                  source={{ uri: fallbackImage }}
                  style={styles.profileImage}
                />
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
              setIsUsernameValid(false);
              if (typingTimeout) clearTimeout(typingTimeout);
              const timeout = setTimeout(() => {
                if (validateUsername(val)) {
                  setIsUsernameValid(true);
                }
              }, 500);
              setTypingTimeout(timeout);
            }}
            pattern="^[a-zA-Z0-9_]{3,15}$"
            errorMessage={getUsernameMessage()}
            isValid={isUsernameValid}
            style={{
              color: Colors.secondary,
              backgroundColor: Colors.background,
              borderColor: Colors.secondary,
            }}
          />

          <Text style={styles.subText}>
            Change username (availability checked on save)
          </Text>

          <TextInputField
            label="Email"
            value={profile?.email || ""}
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
            disabled={!isChanged || loading || fetchLoading || !sessionLoaded || !isValidEmail}
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
    justifyContent: 'center',
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
  errorContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  retryText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: '600',
    marginTop: 5,
  },
});

export default EditProfileScreen;