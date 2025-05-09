import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Colors from "../../utils/Colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import StepWizard from "../../components/Form/StepWizard";
import ProfileUploader from "../../components/Form/ProfileUploader";
import TagSelectorFlashList from "../../components/List/TagSelectorFlashList";
import OptionsFlatList from "../../components/List/OptionsFlatList";
import LoadingDots from "../../components/Loader/LoadingDots";
import GradientButton from "../../components/Button/GradientButton";
import Logo from "../../layouts/Logo";
import Copyright from "../../layouts/Copyright";
import axios from 'axios';
import { BACKEND_URL } from "../../config/url";

const steps = ["Profile", "Sports", "Betting", "Finish"];

const ProfileSetupScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { email } = route.params;
  const [stepIndex, setStepIndex] = useState(0);
  const [profile, setProfile] = useState({ username: "", image: null });
  const [selectedSports, setSelectedSports] = useState([]);
  const [preferences, setPreferences] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isUsernameValid, setIsUsernameValid] = useState(false);

  const handleNext = () => {
    if (stepIndex === 0 && !isUsernameValid) {
      Alert.alert('Error', 'Please enter a valid and available username.');
      return;
    }
    setStepIndex((prevIndex) => prevIndex + 1);
  };

  useEffect(() => {
    if (stepIndex === 3) {
      const saveProfile = async () => {
        try {
          const profileData = {
            email,
            username: profile.username,
            sports: selectedSports,
            image: profile.image,
            bettingPreference: preferences,
          };
          setLoading(true);
          const response = await axios.post(`${BACKEND_URL}/api/v1/saveProfile`, profileData);

          if (response.status === 200) {
            setTimeout(() => {
              navigation.navigate("Success", { data: response.data });
            }, 2000);
          } else {
            throw new Error("Failed to save profile");
          }
        } catch (error) {
          console.error("Failed to save profile:", error);
          Alert.alert("Error", error.response?.data?.message || "Something went wrong while saving your profile.");
        } finally {
          setLoading(false);
        }
      };
      saveProfile();
    }
  }, [stepIndex, email, profile.username, selectedSports, preferences, navigation]);

  const renderStepContent = () => {
    switch (stepIndex) {
      case 0:
        return (
          <ProfileUploader
            username={profile.username}
            setUsername={(u) => setProfile({ ...profile, username: u })}
            imageUri={profile.image}
            setImageUri={(img) => setProfile({ ...profile, image: img })}
            setIsUsernameValid={setIsUsernameValid}
          />
        );
      case 1:
        return (
          <TagSelectorFlashList
            data={[
              "Cricket 🏏",
              "Soccer ⚽",
              "Badminton 🏸",
              "Judo 🥋",
              "Basketball 🏀",
              "Golf ⛳",
              "Tennis 🎾",
              "Baseball ⚾",
              "Rugby 🏉",
              "Hockey 🏒",
            ]}
            selectedTags={selectedSports}
            setSelectedTags={setSelectedSports}
            title={"Select your favourite Sports"}
            column={2}
            gap={10}
          />
        );
      case 2:
        return (
          <OptionsFlatList
            data={["Single Bet", "Accumulators", "Live Betting", "Odds Comparison"]}
            selectedItem={preferences}
            onSelect={setPreferences}
          />
        );
      case 3:
        return loading ? <LoadingDots text="Creating your Profile.." /> : null;
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
          <View style={styles.container}>
            <Logo />

            <View style={styles.containerBox}>
              <Text style={styles.heading}>Set up your Profile</Text>
              <Text style={styles.subText}>You will be able to change it any time</Text>

              <StepWizard currentStep={stepIndex} totalSteps={steps.length} />

              <View style={styles.contentBox}>{renderStepContent()}</View>

              {stepIndex < steps.length - 1 && !loading && (
                <View style={{ marginTop: 20 }}>
                  <GradientButton
                    label="Next"
                    onPress={handleNext}
                    arrowEnable={true}
                    disabled={stepIndex === 0 && !isUsernameValid}
                  />
                </View>
              )}
            </View>

            <Copyright />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 30,
  },
  containerBox: {
    backgroundColor: Colors.secondary,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 30,
    marginTop: 30,
    width: "90%",
    alignItems: "center",
    flexGrow: 1,
  },
  heading: {
    fontSize: 26,
    fontWeight: "bold",
    color: Colors.background,
    marginBottom: 5,
  },
  subText: {
    fontSize: 16,
    color: Colors.text,
    marginBottom: 20,
  },
  contentBox: {
    backgroundColor: Colors.secondary,
    width: "100%",
    marginTop: 10,
    alignItems: "center",
    flex: 1,
  },
});

export default ProfileSetupScreen;