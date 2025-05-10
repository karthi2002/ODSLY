import { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
} from "react-native";
import Colors from "../../utils/Colors";
import CustomHeader from "../../layouts/CustomHeader";
import GradientToggle from "../../components/Input/GradientToggle";
import DropdownField from "../../components/Input/DropdownField";
import { DisplaySettingsData, LanguagesData } from "../../json/AppPreferencesData";
import GradientButton from "../../components/Button/GradientButton";
import AsyncStorage from "@react-native-async-storage/async-storage";


const AppPreferenceScreen = () => {
  
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [displaySetting, setDisplaySetting] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");

  const languageOptions = LanguagesData.map(lang => `${lang.flag} ${lang.language}`);
  const displayOptions = DisplaySettingsData.map(item => item.label);

  useEffect(() => {
    const loadDarkModePreference = async () => {
      try {
        const savedMode = await AsyncStorage.getItem("darkMode");
        if (savedMode !== null) {
          setIsDarkMode(JSON.parse(savedMode)); 
        }
      } catch (error) {
        console.error("Failed to load dark mode preference", error);
      }
    };

    loadDarkModePreference();
  }, []);

  const handleDarkModeToggle = async (value) => {
    setIsDarkMode(value);
    try {
      await AsyncStorage.setItem("darkMode", JSON.stringify(value)); 
    } catch (error) {
      console.error("Failed to save dark mode preference", error);
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
          initial={isDarkMode}
          onToggle={handleDarkModeToggle} 
          borderColor={Colors.secondary}
          style={{ borderWidth: 1 }}
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
