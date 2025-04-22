import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Header from "../../layouts/Header";
import { GradientText } from "../../components/Button/GradientText";
import Colors from "../../utils/Colors";
import FeedScreen from "./FeedScreen";
import YourPostScreen from "./YourPostScreen";

export default function CommunityScreen() {

  const [activeTab, setActiveTab] = useState("feed");

  return (
    <View style={styles.container}>
      <Header />

      <ScrollView
        style={styles.content}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <GradientText text="Community" style={{ fontSize: 20 }} />

        {/* Toggle Buttons */}
        <View style={styles.tabContainer}>
         
          {/* Feed Tab */}
          <TouchableOpacity
            style={[styles.tab, activeTab === "feed" && styles.activeTab]}
            onPress={() => setActiveTab("feed")}
          >
            {activeTab === "feed" ? (
              <GradientText text="Feed" style={styles.gradientText} />
            ) : (
              <Text style={styles.inactiveText}>Feed</Text>
            )}
          </TouchableOpacity>

          {/* Your Posts Tab */}
          <TouchableOpacity
            style={[styles.tab, activeTab === "posts" && styles.activeTab]}
            onPress={() => setActiveTab("posts")}
          >
            {activeTab === "posts" ? (
              <GradientText text="Your Posts" style={styles.gradientText} />
            ) : (
              <Text style={styles.inactiveText}>Your Posts</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View style={styles.contentBox}>
          {activeTab === "feed" ? (
            <FeedScreen />
          ) : (
            <YourPostScreen />
          )}
        </View>
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
  tabContainer: {
    flexDirection: "row",
    justifyContent: 'center',
    backgroundColor: "#1D1D3F",
    marginVertical: 15,
    borderRadius: 8,
  },
  tab: {
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  activeTab: {
    backgroundColor: Colors.secondary,
  },
  inactiveText: {
    color: Colors.secondary,
    fontSize: 16,
    fontWeight: "700",
    textAlign: 'center'
  },
  gradientText: {
    fontWeight: "700",
    fontSize: 16,
    width: '100%', 
    textAlign: 'center',
  },
  contentBox: {
    marginTop: 30,
  }
});
