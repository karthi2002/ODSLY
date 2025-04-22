import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const Tag = ({ label, emoji, selected, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        styles.tag,
        { backgroundColor: selected ? "#D6E6FF" : "#F2F2F2" },
      ]}
    >
      <Text style={styles.text}>
        {emoji} <Text style={styles.label}>{label}</Text>
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tag: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 25,
    margin: 6,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
  },
  text: {
    fontSize: 16,
    color: "#0F172A",
  },
  label: {
    fontWeight: "500",
  },
});

export default Tag;
