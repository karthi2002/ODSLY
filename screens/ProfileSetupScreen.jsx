import React, { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import Colors from "../utils/Colors";

import StepWizard from "../components/Form/StepWizard";
import ProfileUploader from "../components/Form/ProfileUploader";
import TagSelectorFlashList from "../components/List/TagSelectorFlashList";
import OptionsFlatList from "../components/List/OptionsFlatList";
import LoadingDots from "../components/Loader/LoadingDots";
import GradientButton from "../components/Button/GradientButton";
import Logo from "../layouts/Logo";
import Copyright from "../layouts/Copyright";

const steps = ["Profile", "Sports", "Betting", "Finish"];

const ProfileSetupScreen = () => {
  const [stepIndex, setStepIndex] = useState(0);
  const [profile, setProfile] = useState({ username: "", image: null });
  const [selectedSports, setSelectedSports] = useState([]);
  const [preferences, setPreferences] = useState([]);

  const handleNext = () => {
    if (stepIndex < steps.length - 1) {
      setStepIndex(stepIndex + 1);
    } else {
      Alert.alert("Profile setup complete!");
    }
  };

  const renderStepContent = () => {
    switch (stepIndex) {
      case 0:
        return (
          <ProfileUploader
            username={profile.username}
            setUsername={(u) => setProfile({ ...profile, username: u })}
            imageUri={profile.image}
            setImageUri={(img) => setProfile({ ...profile, image: img })}
          />
        );
      case 1:
        return (
          <TagSelectorFlashList
            tags={["Football", "Tennis", "Basketball", "Cricket"]}
            selectedTags={selectedSports}
            setSelectedTags={setSelectedSports}
          />
        );
      case 2:
        return (
          <OptionsFlatList
            data={[
              "Single Bet",
              "Accumulators",
              "Live Betting",
              "Odds Comparison",
            ]}
            selectedItems={preferences}
            onSelect={setPreferences}
          />
        );
      case 3:
        return <LoadingDots text="Creating your Profile.." />;
    }
  };

  return (
    <View style={styles.container}>
      <Logo />

      <View style={styles.containerBox}>
        <Text style={styles.heading}>Set up your Profile</Text>
        <Text style={styles.subText}>
          You will be able to change it any time
        </Text>

        <StepWizard currentStep={stepIndex} totalSteps={steps.length} />

        <View style={styles.contentBox}>{renderStepContent()}</View>

        {stepIndex < steps.length - 1 && (
          <View style={{ marginTop: 20 }}>
            <GradientButton
              label="Next"
              onPress={handleNext}
              arrowEnable={true}
            />
          </View>
        )}
      </View>
      <Copyright />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 50,
  },
  containerBox: {
    backgroundColor: Colors.secondary,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 30,
    marginTop: 30,
    width: "85%",
    alignItems: "center",
    flex: 1,
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
