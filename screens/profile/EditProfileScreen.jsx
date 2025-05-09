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
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Ionicons from "@expo/vector-icons/Ionicons";
import CustomHeader from "../../layouts/CustomHeader";
import TextInputField from "../../components/Input/TextInputField";
import GradientButton from "../../components/Button/GradientButton";
import Colors from "../../utils/Colors";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const { width, height } = Dimensions.get("window");

const EditProfileScreen = () => {
  const [username, setUsername] = useState(" ");
  const [email, setEmail] = useState(" ");
  const [userImage, setUserImage] = useState(null);
  const [originalUsername, setOriginalUsername] = useState("");
  const [originalImage, setOriginalImage] = useState(null);
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const session = await AsyncStorage.getItem("userSession");
        if (session) {
          const user = JSON.parse(session);
          setUsername(user.username || "");
          setEmail(user.email || "");
          setUserImage(user.image || null);
          setOriginalUsername(user.username || "");
          setOriginalImage(user.image || null);
        }
      } catch (error) {
        console.log("Error loading user session:", error);
      }
    };

    loadUserData();
  }, []);

  useEffect(() => {
    const hasChanges =
      username !== originalUsername || userImage !== originalImage;
    setIsChanged(hasChanges);
  }, [username, userImage]);

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled && result.assets?.[0]?.uri) {
      setUserImage(result.assets[0].uri);
    }
  };

  const handleSaveChanges = () => {
    console.log("Saving:", { username, email, userImage });
  };

  const GradientText = ({ text }) => (
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
          <View style={styles.profileContainer}>
            <TouchableOpacity
              onPress={handleImagePick}
              style={styles.imageWrapper}
            >
              {userImage ? (
                <Image
                  source={{ uri: userImage }}
                  style={styles.profileImage}
                />
              ) : (
                <Ionicons name="person" size={60} color={Colors.background} />
              )}
            </TouchableOpacity>
            <View style={styles.profileRight}>
              <Text style={styles.welcomeText}>
                Welcome, {username || "John Doe"}!
              </Text>
              <View style={styles.actionRow}>
                <TouchableOpacity onPress={handleImagePick}>
                  <GradientText text="Replace" />
                </TouchableOpacity>
                <Text style={styles.separator}>|</Text>
                <TouchableOpacity onPress={() => setUserImage(null)}>
                  <GradientText text="Delete" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <TextInputField
            label="Username"
            value={username}
            setValue={setUsername}
            pattern="^[a-zA-Z0-9_]{3,15}$"
            errorMessage=""
            style={{
              color: Colors.secondary,
              backgroundColor: Colors.background,
              borderColor: Colors.secondary,
            }}
          />

          <Text style={styles.subText}>
            Change username to check if it is available
          </Text>

          <TextInputField
            label="Email"
            value={email}
            setValue={setEmail}
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
            disabled={!isChanged}
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
});

export default EditProfileScreen;
