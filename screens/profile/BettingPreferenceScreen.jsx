import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Colors from "../../utils/Colors";
import CustomHeader from "../../layouts/CustomHeader";
import TextInputField from "../../components/Input/TextInputField";
import GradientButton from "../../components/Button/GradientButton";
import TagSelectorFlashList from "../../components/List/TagSelectorFlashList";
import DropdownField from "../../components/Input/DropdownField";
import { useDispatch, useSelector } from "react-redux";
import { updateUserPreferences } from "../../redux/profile/profileActions";

const betTypes = [
  "Single Bet",
  "Accumulators",
  "Live Betting",
  "Odds Comparison",
];

const BettingPrefereceScreen = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.profile);

  const [initialSports, setInitialSports] = useState(profile?.sports || []);
  const [initialBet, setInitialBet] = useState(
    profile?.bettingPreference || ""
  );

  const [amount, setAmount] = useState(" ");
  const [selectedSports, setSelectedSports] = useState(profile?.sports || []);
  const [selectedBet, setSelectedBet] = useState(
    profile?.bettingPreference || ""
  );

  const hasChanges =
    JSON.stringify(initialSports.sort()) !==
      JSON.stringify(selectedSports.sort()) || initialBet !== selectedBet;

  const handleSave = async () => {
    if (!hasChanges) return;
    await dispatch(
      updateUserPreferences(profile.email, selectedSports, selectedBet)
    );
    setInitialSports([...selectedSports]);
    setInitialBet(selectedBet);
  };

  return (
    <View style={styles.container}>
      <CustomHeader title={"Betting Preferences"} />

      <ScrollView
        style={styles.content}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Input Fields */}
        <View>
          <TextInputField
            label="Default stake Amount"
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
          title={"Favourite Sports"}
          column={3}
          gap={10}
          style={{ color: Colors.secondary }}
        />

        <GradientButton
          label="Save Changes"
          onPress={handleSave}
          arrowEnable={false}
          disabled={!hasChanges}
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
  subText: {
    fontSize: 12,
    color: Colors.secondary,
    marginBottom: 25,
  },
});

export default BettingPrefereceScreen;
