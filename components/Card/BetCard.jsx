import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Colors from "../../utils/Colors";
import Entypo from "@expo/vector-icons/Entypo";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";
import { GradientText } from "../Button/GradientText";
import { LineGradient } from "../../layouts/LineGradient";

const RowItem = ({ label, value, valueStyle }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <Text style={[styles.value, valueStyle]}>{value}</Text>
  </View>
);

const BetCard = ({ data, type }) => {
  const getStatusStyle = (status) => {
    return status === "Won" ? styles.statusWon : styles.statusLost;
  };

  const getStatusIcon = (status) => {
    return status === "Won" ? "trophy" : "";
  };

  const getHighlightStyle = (type) => {
    if (type === "success") return styles.highlightSuccess;
    if (type === "fail") return styles.highlightFail;
  };

  return (
    <LinearGradient
      colors={["#624FBB", "#200F3B"]}
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
          <RowItem
            label="Progress:"
            value={data.progress}
            valueStyle={styles.progressText}
          />
          <RowItem label="Game :" value={data.game} />
          <LineGradient style={{ marginVertical: 10 }} />
          <View style={styles.betActions}>
            <TouchableOpacity>
              <GradientText text="View Bet" style={{ fontSize: 16 }} />
            </TouchableOpacity>
            <Text style={styles.separator}>|</Text>
            <TouchableOpacity>
              <GradientText text="Watch Live" style={{ fontSize: 16 }} />
            </TouchableOpacity>
          </View>
        </>
      ) : type === "live" ? (
        <>
          <RowItem label="Teams:" value={data.teams} />
          <RowItem label="Score:" value={data.score} />
          <RowItem label="Bet:" value={data.bet} />
          <RowItem label="Status:" value={data.status} />
          <LineGradient style={{ marginVertical: 10 }} />
          <View style={styles.betActions}>
            <TouchableOpacity>
              <GradientText text="Watch Overlay" style={{ fontSize: 16 }} />
            </TouchableOpacity>
            <Text style={styles.separator}>|</Text>
            <TouchableOpacity>
              <GradientText text="View Stats" style={{ fontSize: 16 }} />
            </TouchableOpacity>
          </View>
        </>
      ) : type === "recent" ? (
        <>
          <LinearGradient
            colors={["#624FBB", "#200F3B"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.card}
          >

            <View style={styles.header}>
              <View style={styles.headerContainer}>
                <View style={[styles.statusTag, getStatusStyle(data.status)]}>
                  <FontAwesome
                    name={getStatusIcon(data.status)}
                    size={16}
                    color="#dca120"
                  />
                  <Text style={styles.statusText}>{data.status}</Text>
                </View>
                <Text style={styles.title}>{data.match}</Text>
              </View>
              <TouchableOpacity style={styles.icon} onPress={() => {}}>
                <Entypo name="share" size={16} color={Colors.secondary} />
              </TouchableOpacity>
            </View>

            <Text style={styles.labelType}>
              Bet Type: <Text style={styles.valueType}>{data.betType}</Text>
            </Text>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>
                Amount: <Text style={styles.value}>{data.amount}</Text>
              </Text>
              <Text style={styles.label}>
                Odds: <Text style={styles.value}>{data.odds}</Text>
              </Text>
              <Text style={styles.label}>
                Payout: <Text style={styles.value}>{data.payout}</Text>
              </Text>
            </View>

            <LineGradient  style={{ marginVertical: 10 }} />
            {data.highlights.map((item, index) => (
              <View key={index}>
                {item.type === "info" && (
                  <LineGradient style={{ marginVertical: 10 }} />
                )}
                
                <Text style={[styles.highlight, getHighlightStyle(item.type)]}>
                  {item.type === "success" && "✅ "}
                  {item.type === "fail" && "❌ "}
                  {item.type === "info" && "📣 "}
                  {item.message}
                </Text>
              </View>
            ))}
          </LinearGradient>
        </>
      ) : (
        // Upcoming
        <>
          <RowItem label="Match:" value={data.match} />
          <RowItem label="Bet:" value={data.bet} />
          <RowItem label="Odds:" value={data.odds} />
          <RowItem label="Time:" value={data.time} />
          <RowItem label="Countdown:" value={data.countdown} />
          <LineGradient style={{ marginVertical: 10 }} />
          <TouchableOpacity style={{ alignItems: "center" }}>
            <GradientText text="Edit Bet" style={{ fontSize: 16 }} />
          </TouchableOpacity>
        </>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  betCard: {
    backgroundColor: "#3A3162",
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.5)",
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
    width: "25%",
    fontSize: 14,
    fontWeight: "500",
  },
  labelType: {
    color: Colors.secondary,
    fontSize: 14,
    fontWeight: "500",
  },
  value: {
    width: "75%",
    color: Colors.secondary,
    flexShrink: 1,
    textAlign: "left",
    fontSize: 14,
    fontWeight: "600",
  },
  valueType: {
    color: Colors.secondary,
    flexShrink: 1,
    fontSize: 14,
    fontWeight: "600",
  },
  progressText: {
    color: Colors.success,
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
  icon: {
    width: 25,
    height: 25,
    borderRadius: 20,
    backgroundColor: "#313A5B",
    borderWidth: 0.5,
    borderColor: Colors.secondary,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  statusTag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
    marginBottom: 4,
  },
  statusWon: {
    backgroundColor: "#00C566",
  },
  statusLost: {
    backgroundColor: "#FF4D4F",
  },
  statusText: {
    color: Colors.secondary,
    fontWeight: "600",
    fontSize: 12,
  },
  title: {
    fontSize: 16,
    color: Colors.secondary,
    fontWeight: "600",
  },
  labelContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    gap: 25
  },
  highlight: {
    fontSize: 14,
    fontWeight: '600',
    paddingVertical: 4,
    color: Colors.secondary
  },
  highlightSuccess: {
    color: "#01B574",
  },
  highlightFail: {
    color: "#FE9494",
  },
});

export default BetCard;
