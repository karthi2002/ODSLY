import React from "react";
import { View, Text, StyleSheet } from "react-native";
import roiData from "../../json/ROIData.jsx";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "../../utils/Colors.jsx";

const ROIComponent = () => {
  return (
    <LinearGradient
      colors={["#624FBB", "#200F3B"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.container}
    >
      <Text style={styles.title}>{roiData.header}</Text>
      <View style={styles.row}>
        {roiData.categories.map((category, index) => (
          <View key={index} style={styles.column}>
            <Text style={styles.subTitle}>{category.title}</Text>
            {category.items.map((item, itemIndex) => (
              <Text key={itemIndex} style={styles.item}>
                {item.text} {item.emoji}
              </Text>
            ))}
          </View>
        ))}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.5)",
    marginVertical: 15,
  },
  title: {
    alignSelf: "flex-start",
    fontSize: 16,
    fontWeight: "600",
    color: Colors.secondary,
    marginBottom: 15,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  column: {
    flex: 1,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.secondary,
    marginBottom: 5,
  },
  item: {
    fontSize: 14,
    color: Colors.secondary,
    fontWeight: "400",
    marginVertical: 5,
  },
});

export default ROIComponent;
