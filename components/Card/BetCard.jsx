import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Colors from '../../utils/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { GradientText } from "../Button/GradientText";
import { LineGradient } from "../../layouts/LineGradient";

const RowItem = ({ label, value, valueStyle }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <Text style={[styles.value, valueStyle]}>{value}</Text>
  </View>
);

const BetCard = ({ data, type }) => {
  return (
    <LinearGradient
      colors={['#624FBB', '#200F3B']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.betCard}
    >
      {type === "active" ? (
        <>
          <RowItem label="Type:" value={data.type} />
          <RowItem label="Teams:" value={data.teams} />
          <RowItem label="Odds:" value={data.odds} />
          <RowItem label="Wager:" value={data.wager} />
          <RowItem label="Status:" value={data.status} />
          <RowItem label="Progress:" value={data.progress} valueStyle={styles.progressText} />
          <RowItem label="Game :" value={data.game} />
          <LineGradient style={{ marginVertical: 10 }} />
          <View style={styles.betActions}>
            <TouchableOpacity><GradientText text="View Bet" style={{ fontSize: 16 }} /></TouchableOpacity>
            <Text style={styles.separator}>|</Text>
            <TouchableOpacity><GradientText text="Watch Live" style={{ fontSize: 16 }} /></TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <RowItem label="Teams:" value={data.teams} />
          <RowItem label="Score:" value={data.score} />
          <RowItem label="Bet:" value={data.bet} />
          <RowItem label="Status:" value={data.status} />
          <LineGradient style={{ marginVertical: 10 }} />
          <View style={styles.betActions}>
            <TouchableOpacity><GradientText text="Watch Overlay" style={{ fontSize: 16 }} /></TouchableOpacity>
            <Text style={styles.separator}>|</Text>
            <TouchableOpacity><GradientText text="View Stats" style={{ fontSize: 16 }} /></TouchableOpacity>
          </View>
        </>
      )}
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
    width: '25%',
    fontSize: 14,
    fontWeight: "500",
  },
  value: {
    width: '75%',
    color: Colors.secondary,
    flexShrink: 1,
    textAlign: "left",
    fontSize: 14,
    fontWeight: "600",
  },
  progressText: {
    color: Colors.success
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

export default BetCard;
