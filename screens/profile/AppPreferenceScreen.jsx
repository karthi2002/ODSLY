import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Colors from "../../utils/Colors";
import CustomHeader from "../../layouts/CustomHeader";
import GradientToggle from "../../components/Input/GradientToggle";
import DropdownField from "../../components/Input/DropdownField";
import { DisplaySettingsData, LanguagesData } from "../../json/AppPreferencesData";
import GradientButton from "../../components/Button/GradientButton";

const AppPreferenceScreen = () => {
  const navigation = useNavigation();

  const [displaySetting, setDisplaySetting] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");

  const languageOptions = LanguagesData.map(lang => `${lang.flag} ${lang.language}`);
  const displayOptions = DisplaySettingsData.map(item => item.label);

  const handleNavigate = (route) => {
    if (route === "AuthStack") {
      navigation.reset({
        index: 0,
        routes: [{ name: "AuthStack" }],
      });
    } else {
      navigation.navigate(route);
    }
  };

  return (
    <View style={styles.container}>
      <CustomHeader title={"App Preferences"} />

      <ScrollView
        style={styles.content}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
      
        <GradientToggle
          label="Dark Mode"
          initial={true}
          borderColor={Colors.secondary}
        />

        <DropdownField
          label="Display Setting"
          value={displaySetting}
          setValue={setDisplaySetting}
          options={displayOptions}
        />

        <DropdownField
          label="Language"
          value={selectedLanguage}
          setValue={setSelectedLanguage}
          options={languageOptions}
        />

        <GradientButton
          label="Save Changes"
          onPress={() => console.log('Save button pressed')}
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

export default AppPreferenceScreen;
