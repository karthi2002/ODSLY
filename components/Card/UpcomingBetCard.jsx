import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Colors from '../../utils/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { GradientText } from "../Button/GradientText";
import { LineGradient } from "../../layouts/LineGradient";

const RowItem = ({ label, value }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const UpcomingBetCard = ({ data }) => {
  return (
    <LinearGradient
      colors={['#2E2A63', '#140F38']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.betCard}
    >
      <RowItem label="Teams:" value={data.teams} />
      <RowItem label="Odds:" value={data.odds} />
      <RowItem label="Wager:" value={data.wager} />
      <RowItem label="Scheduled:" value={data.scheduled} />
      <RowItem label="Bet Type:" value={data.type} />

      <LineGradient style={{ marginVertical: 10 }} />

      <View style={styles.betActions}>
        <TouchableOpacity><GradientText text="Edit Bet" style={{ fontSize: 16 }} /></TouchableOpacity>
        <Text style={styles.separator}>|</Text>
        <TouchableOpacity><GradientText text="Cancel Bet" style={{ fontSize: 16 }} /></TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  betCard: {
    backgroundColor: "#3A3162",
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 15,
    padding: 16,
    marginRight: 12,
    width: 300,
  },
  row: {
    flexDirection: "row",
    justifyContent: "start",
    marginBottom: 4,
  },
  label: {
    color: Colors.secondary,
    width: '30%',
    fontSize: 14,
    fontWeight: "500",
  },
  value: {
    width: '70%',
    color: Colors.secondary,
    flexShrink: 1,
    textAlign: "left",
    fontSize: 14,
    fontWeight: "600",
  },
  betActions: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
  },
  separator: {
    color: "#DD2EFF",
    marginHorizontal: 6,
  },
});

export default UpcomingBetCard;
