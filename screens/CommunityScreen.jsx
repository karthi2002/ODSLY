import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Header from "../layouts/Header";
import Colors from "../utils/Colors";

export default function CommunityScreen() {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <Text style={{ color: "#000", fontSize: 18 }}>Home Screen Content</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },
  content: {
    paddingTop: 60,
    paddingHorizontal: 20,
  },
});
