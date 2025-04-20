import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const CreateBet = () => {
  const [sportsbookAccount, setSportsbookAccount] = useState('');
  const [event, setEvent] = useState('');
  const [betType, setBetType] = useState('');
  const [odds, setOdds] = useState('');
  const [wager, setWager] = useState('');
  const [payout, setPayout] = useState('');

  const handleCreateBet = () => {

    console.log({
      sportsbookAccount,
      event,
      betType,
      odds,
      wager,
      payout,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create Bet</Text>
      <TextInput
        style={styles.input}
        placeholder="Sportsbook Account"
        value={sportsbookAccount}
        onChangeText={setSportsbookAccount}
      />
      <TextInput
        style={styles.input}
        placeholder="Event"
        value={event}
        onChangeText={setEvent}
      />
      <TextInput
        style={styles.input}
        placeholder="Bet Type"
        value={betType}
        onChangeText={setBetType}
      />
      <TextInput
        style={styles.input}
        placeholder="Odds"
        value={odds}
        onChangeText={setOdds}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Wager"
        value={wager}
        onChangeText={setWager}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Payout"
        value={payout}
        onChangeText={setPayout}
        keyboardType="numeric"
      />
      <Button title="Create Bet" onPress={handleCreateBet} color="#00C4FF" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A2A44',
    padding: 20,
  },
  header: {
    fontSize: 24,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: '#FFFFFF',
  },
});

export default CreateBet;