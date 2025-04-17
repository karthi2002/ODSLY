import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Header from "../layouts/Header";
import Colors from "../utils/Colors";
import EditProfile from "./profile/EditProfile";
import CustomHeader from "../layouts/CustomHeader";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <CustomHeader title={"Edit Profile"} />
      <EditProfile />
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
