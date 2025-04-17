import React from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import CustomHeader from "../layouts/CustomHeader";
import MessageCard from "../components/Card/MessageCard";
import Colors from "../utils/Colors";
import { olderMessages, unreadMessages } from "../json/NotificationData";

export default function InsightsScreen() {
  return (
    <View style={styles.container}>
      <CustomHeader title={"Notifications"} />

      <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false} >
        <Text style={styles.sectionTitle}>Unread</Text>
        {unreadMessages.map((item) => (
          <MessageCard key={item.id} message={item} style={{backgroundColor: '#3A3162'}} />
        ))}

        <Text style={styles.sectionTitle}>Older</Text>
        {olderMessages.map((item) => (
          <MessageCard key={item.id} message={item} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    paddingTop: 80,
    paddingHorizontal: 15,
  },
  sectionTitle: {
    color: Colors.secondary,
    fontSize: 18,
    fontWeight: "700",
    marginVertical: 10,
  },
});
