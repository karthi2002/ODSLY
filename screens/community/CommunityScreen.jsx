import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Header from "../../layouts/Header";
import Icon from "react-native-vector-icons/AntDesign";
import { GradientText } from "../../components/Button/GradientText";
import Colors from "../../utils/Colors";
import FeedScreen from "./FeedScreen";
import YourPostScreen from "./YourPostScreen";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

export default function CommunityScreen() {
  const navigation = useNavigation(); 

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

{activeTab === "posts" && (
  <>
      {/* Fixed Button for Create new post */}
      <TouchableOpacity
        style={styles.fixedButton}
        onPress={() =>
          navigation.navigate("CommunityStack", {
            screen: "CreateNewPost",
          })
        }
      >
        <LinearGradient
          colors={["#029EFE", "#6945E2", "#E9098E"]}
          locations={[0, 0.37, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.fixedButtonGradient}
        >
          <Icon
            name="pluscircle"
            size={20}
            color={Colors.secondary}
            style={{ marginRight: 8 }}
          />
          <Text style={styles.fixedButtonText}>Create Post</Text>
        </LinearGradient>
      </TouchableOpacity>
      </>
      )}

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
    backgroundColor: "#624FBB90",
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
    margin: 5
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
    marginTop: 5,
  },
  fixedButton: {
    position: "absolute",
    bottom: 15,
    right: -30,
    alignItems: "center",
    zIndex: 10,
  },
  fixedButtonGradient: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingVertical: 15,
    paddingHorizontal: 5,
    borderRadius: 30,
    alignItems: "center",
    width: "60%",
  },
  fixedButtonText: {
    color: Colors.secondary,
    fontSize: 16,
    fontWeight: "600",
    marginRight: 8,
  },
});
