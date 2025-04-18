import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Colors from "../../utils/Colors";
import CustomHeader from "../../layouts/CustomHeader";
import GradientButton from "../../components/Button/GradientButton";
import GradientToggle from "../../components/Input/GradientToggle";
import GradientArrowButton from "../../components/Button/GradientArrowButton";

const PrivacyScreen = () => {
  const [selectedMethod, setSelectedMethod] = useState("Push");

  return (
    <View style={styles.container}>
      <CustomHeader title={"Notifications Settings"} />

      <ScrollView
        style={styles.content}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <GradientToggle
          label="2-Factor Authentication"
          style={{ backgroundColor: "#1E2A5C" }}
        />
        <GradientArrowButton label="Export Data" onPress={() => {}} />
        <GradientArrowButton
          label="Request account deletion"
          onPress={() => {}}
        />

        <GradientButton
          label="Save Changes"
          onPress={() => console.log("Save button pressed")}
          arrowEnable={false}
        />
      </ScrollView>
    </View>
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
});

export default PrivacyScreen;
