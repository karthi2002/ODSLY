import React, { useState } from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import DropdownField from "../../components/Input/DropdownField";
import DollarInputField from "../../components/Input/DollarInputField";
import Colors from "../../utils/Colors";
import CustomHeader from "../../layouts/CustomHeader";
import GradientButton from "../../components/Button/GradientButton";

export default function CreateBetScreen() {
  const [selectedAccount, setSelectedAccount] = useState("");
  const [selectedEvent, setSelectedEvent] = useState("");
  const [selectedBetType, setSelectedBetType] = useState("");

  const [odd, setOdd] = useState("");
  const [wager, setWager] = useState("");
  const [payout, setPayout] = useState("");

  return (
    <View style={styles.container}>
      <CustomHeader title={"Create Bet"} />

      <ScrollView
        style={styles.content}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <DropdownField
          label="Sportsbook Account"
          value={selectedAccount}
          setValue={setSelectedAccount}
          options={["Account 1", "Account 2", "Account 3"]}
        />

        <DropdownField
          label="Event"
          value={selectedEvent}
          setValue={setSelectedEvent}
          options={["Event A", "Event B", "Event C"]}
        />

        <DropdownField
          label="Bet type"
          value={selectedBetType}
          setValue={setSelectedBetType}
          options={["Single", "Multiple", "System", "Live", "Specials"]}
        />

        <DollarInputField
          label="Odd"
          value={odd}
          setValue={setOdd}
          placeholder="Enter Amount"
          pattern="^\d+(\.\d{1,2})?$"
          errorMessage="Enter a valid amount"
        />

        <DollarInputField
          label="Wager"
          value={wager}
          setValue={setWager}
          placeholder="Enter Amount"
          pattern="^\d+(\.\d{1,2})?$"
          errorMessage="Enter a valid amount"
        />

        <DollarInputField
          label="Payout"
          value={payout}
          setValue={setPayout}
          placeholder="Enter Amount"
          pattern="^\d+(\.\d{1,2})?$"
          errorMessage="Enter a valid amount"
        />

<GradientButton
          label="Create Bet"
          onPress={() => {}}
          arrowEnable={false}
        />
      </ScrollView>
    </View>
  );
}

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
