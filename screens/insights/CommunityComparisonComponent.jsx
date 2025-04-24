import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { communityComparisonData } from "../../json/communityComparisonData";
import Colors from "../../utils/Colors";
import { LinearGradient } from "expo-linear-gradient";

const CommunityComparisonComponent = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Compare with Community</Text>
      {communityComparisonData.map((insight, index) => (
        <LinearGradient
          key={index}
          colors={["#624FBB", "#200F3B"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.insightCard}
        >
          <View >
            <Text style={styles.title}>{insight.titlehead}</Text>
          </View>
        </LinearGradient>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    color: Colors.secondary,
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 20,
  },
  insightCard: {
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.5)",
    borderWidth: 2,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.secondary,
  },
});

export default CommunityComparisonComponent;
