import React from "react";
import { Text, StyleSheet } from "react-native";
import Colors from "../../utils/Colors"; 

const CountLabel = ({ label, count, style, containerStyle }) => {
  return (
    <Text style={[styles.label, style]}>
      {label.toUpperCase()} ({count})
    </Text>
  );
};

const styles = StyleSheet.create({
  label: {
    color: Colors.secondary,
    fontSize: 14,
    fontWeight: "600",
  },
});

export default CountLabel;
