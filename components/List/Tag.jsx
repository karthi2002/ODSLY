import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Tag = ({ label, emoji, selected }) => {
  return (
    <View
      style={[
        styles.tag,
        { backgroundColor: selected ? "#D6E6FF" : "#F2F2F2" }, // you can adjust this
      ]}
    >
      <Text style={styles.text}>
        {emoji} <Text style={{ fontWeight: "600" }}>{label}</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 25,
    margin: 6,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
  },
  text: {
    fontSize: 14,
    color: "#0F172A", // dark navy
  },
});

export default Tag;
