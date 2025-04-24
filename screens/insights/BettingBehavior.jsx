import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import Colors from "../../utils/Colors.jsx";
import { LinearGradient } from "expo-linear-gradient";

const BettingBehaviorComponent = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>📊 Betting Behavior</Text>

      <View style={styles.fullWidthWrapper}>
        <InsightCard title="Average Stake Per Bet:" content="$75💰" fullWidth />
      </View>

      <View style={styles.grid}>
        <InsightCard
          title="Most Bet-On Team"
          content="Los Angeles Lakers"
          icon="✨"
        />
        <InsightCard
          title="Most Bet-On Player"
          content="Patrick Mahomes"
          icon="🔥"
        />
        <InsightCard
          title="Bet Win Day"
          content="12.03.25"
          icon="(65% win rate)"
          color="#01B574"
        />
        <InsightCard
          title="Worst Win Day"
          content="12.03.25"
          icon="(23% lost rate)"
          color="#FE9494"
        />
        <InsightCard
          title="Best Bet Type"
          content="MLB Over/Under"
          icon="(82%)"
          color="#01B574"
        />
        <InsightCard
          title="Worst Bet Type"
          content="4+ Leg Parlays"
          icon="(20%)"
          color="#FE9494"
        />
      </View>
    </View>
  );
};

const InsightCard = ({ title, content, icon, color, fullWidth }) => {
  return (
    <LinearGradient
      colors={["#624FBB", "#200F3B"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={[
        styles.card,
        fullWidth ? styles.fullWidthCard : null,
        { backgroundColor: color || "#2D2F41" },
      ]}
    >
      <View style={fullWidth ? styles.fullWidthContent : null}>
        <Text style={styles.cardTitle}>{title}</Text>
        <View style={styles.cardHeader}>
          <Text style={styles.cardText}>{content}</Text>
          {icon && (
            <Text style={[styles.cardText, (color = { color })]}>{icon}</Text>
          )}
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignSelf: "flex-start",
    color: Colors.secondary,
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 20,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  fullWidthContent: {
    flexDirection: "row",
    gap: 4,
  },
  card: {
    width: "49%",
    marginBottom: 15,
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderWidth: 0.5,
    borderColor: "rgba(255, 255, 255, 0.5)",
    borderRadius: 50,
  },
  fullWidthCard: {
    width: "100%",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    marginBottom: 6,
  },
  cardTitle: {
    fontSize: 14,
    color: Colors.LightGray,
    fontWeight: "400",
  },
  cardText: {
    fontSize: 14,
    color: Colors.secondary,
    fontWeight: "500",
  },
});

export default BettingBehaviorComponent;
