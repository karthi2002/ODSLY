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

const betTypes = ["Single", "Multiple", "System", "Live", "Specials"];

const BettingPrefereceScreen = () => {
  const [amount, setAmount] = useState(" ");
  const [selectedSports, setSelectedSports] = useState([]);
  const [selectedBet, setSelectedBet] = useState("");

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
            "Judo 🥋",
            "Badminton 🏸",
            "Golf ⛳",
            "Tennis 🎾",
            "Baseball ⚾",
            "Rugby 🏉",
            "Hockey 🏒",
            "Basketball 🏀",
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
          onPress={() => handleNavigate(item.route)}
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
  subText: {
    fontSize: 12,
    color: Colors.secondary,
    marginBottom: 25,
  },
});

export default BettingPrefereceScreen;
