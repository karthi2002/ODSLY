import React from "react";
import { View,  StyleSheet, Text } from "react-native";
import Colors from "../utils/Colors";

const LineText = ({name}) => {
  return (
    <View style={styles.lineContainer}>
      <View style={styles.line} />
      <Text style={styles.betweenLineText}>{name}</Text>
      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  lineContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.LightGray,
    marginHorizontal: 10,
  },
  betweenLineText: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: 500,
  },
});

export default LineText;
