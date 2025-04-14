import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "../../utils/Colors";

export default function MessageCard({ message, style }) {
  return (
    <LinearGradient
      colors={["#029EFE", "#6945E2", "#E9098E"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradientBorder}
    >
      <View  style={[styles.messageInner, style]}>
        <Text style={styles.messageText}>{message.text}</Text>
        <Text style={styles.messageTime}>{message.time}</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientBorder: {
    padding: 2,
    borderRadius: 10,
    marginVertical: 6,
  },
  messageInner: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: Colors.background,
    borderRadius: 10,
    padding: 14,
  },
  messageText: {
    flex: 1,
    color: Colors.secondary,
    fontSize: 14,
    fontWeight: "500",
  },
  messageTime: {
    color: Colors.text,
    fontSize: 12,
    textAlign: "right",
    marginTop: 6,
  },
});
