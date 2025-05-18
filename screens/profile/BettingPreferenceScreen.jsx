import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import Colors from "../../utils/Colors";
import CustomHeader from "../../layouts/CustomHeader";
import TextInputField from "../../components/Input/TextInputField";
import GradientButton from "../../components/Button/GradientButton";
import TagSelectorFlashList from "../../components/List/TagSelectorFlashList";
import DropdownField from "../../components/Input/DropdownField";
import { useGetProfileQuery, useUpdatePreferencesMutation } from "../../redux/apis/profileApi";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { clearSession } from '../../redux/session/sessionSlice';

const betTypes = [
  "Single Bet",
  "Accumulators",
  "Live Betting",
  "Odds Comparison",
];

const BettingPreferenceScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const email = useSelector((state) => state.session.userSession?.email);
  const isValidEmail = email && typeof email === 'string' && email.includes('@');
  const [sessionLoaded, setSessionLoaded] = useState(false);

  const { data: profile, isLoading: fetchLoading, error, refetch } = useGetProfileQuery(email, {
    skip: !sessionLoaded || !isValidEmail,
  });
  const [updatePreferences] = useUpdatePreferencesMutation();

  const [initialSports, setInitialSports] = useState([]);
  const [initialBet, setInitialBet] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedSports, setSelectedSports] = useState([]);
  const [selectedBet, setSelectedBet] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);

  // Check session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const userSession = await AsyncStorage.getItem('userSession');
        const authToken = await AsyncStorage.getItem('authToken');
        console.log('BettingPreferenceScreen: userSession from AsyncStorage:', userSession);
        console.log('BettingPreferenceScreen: authToken from AsyncStorage:', authToken);
        console.log('BettingPreferenceScreen: email from Redux:', email);
        console.log('BettingPreferenceScreen: isValidEmail:', isValidEmail);
        if (!userSession || !isValidEmail) {
          console.log('BettingPreferenceScreen: No valid session, redirecting to Login');
          await AsyncStorage.multiRemove(['userSession', 'authToken']);
          dispatch(clearSession());
          navigation.replace('AuthStack', { screen: 'Login' });
        } else {
          setSessionLoaded(true);
        }
      } catch (error) {
        console.error('BettingPreferenceScreen: Error checking session:', error);
        await AsyncStorage.multiRemove(['userSession', 'authToken']);
        dispatch(clearSession());
        navigation.replace('AuthStack', { screen: 'Login' });
      }
    };
    checkSession();
  }, [dispatch, navigation, email, isValidEmail]);

  // Update initial state when profile loads
  useEffect(() => {
    if (profile) {
      setInitialSports(profile.sports || []);
      setInitialBet(profile.bettingPreference || "");
      setSelectedSports(profile.sports || []);
      setSelectedBet(profile.bettingPreference || "");
    }
  }, [profile]);

  const hasChanges =
    JSON.stringify(initialSports.sort()) !== JSON.stringify(selectedSports.sort()) ||
    initialBet !== selectedBet;

  const handleSave = async () => {
    if (!hasChanges) {
      Alert.alert("No Changes", "No changes to save.");
      return;
    }
    if (!sessionLoaded || !isValidEmail) {
      console.log("Save changes skipped: invalid session");
      Alert.alert("Error", "Session expired. Please log in again.");
      return;
    }

    setSaveLoading(true);
    try {
      await updatePreferences({
        email,
        sports: selectedSports,
        bettingPreference: selectedBet,
      }).unwrap();
      setInitialSports([...selectedSports]);
      setInitialBet(selectedBet);
      Alert.alert("Success", "Preferences updated successfully!");
    } catch (err) {
      console.error("Update preferences error:", err);
      Alert.alert("Error", err.data?.message || "Failed to update preferences.");
    } finally {
      setSaveLoading(false);
    }
  };

  if (!sessionLoaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CustomHeader title="Betting Preferences" />
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
              {error.data?.message || error.message || "Failed to load preferences"}
            </Text>
            <TouchableOpacity onPress={() => refetch()}>
              <Text style={styles.retryText}>Retry</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Input Fields */}
        <View>
          <TextInputField
            label="Default Stake Amount"
            value={amount}
            setValue={setAmount}
            pattern="^[0-9]{3,15}$"
            errorMessage="Default amount must be 3-15 numbers"
            style={{
              backgroundColor: Colors.background,
              borderColor: Colors.secondary,
              color: Colors.secondary,
            }}
          />

          <DropdownField
            label="Preferred Bet Types"
            value={selectedBet}
            setValue={setSelectedBet}
            options={betTypes}
          />
        </View>

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
          title="Favourite Sports"
          column={3}
          gap={10}
          style={{ color: Colors.secondary }}
        />

        <GradientButton
          label="Save Changes"
          onPress={handleSave}
          arrowEnable={false}
          disabled={!hasChanges || saveLoading || fetchLoading || !sessionLoaded || !isValidEmail}
        />
      </ScrollView>
    </View>
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
  loadingText: {
    color: Colors.secondary,
    fontSize: 16,
    textAlign: "center",
    marginVertical: 10,
  },
  errorText: {
    color: Colors.error,
    fontSize: 16,
    textAlign: "center",
    marginVertical: 10,
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

export default BettingPreferenceScreen;