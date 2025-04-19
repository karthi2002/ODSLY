import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AntDesign from '@expo/vector-icons/AntDesign';
import { Ionicons } from "@expo/vector-icons";
import { LineGradient } from "../../layouts/LineGradient";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "../../utils/Colors";
import Header from "../../layouts/Header";
import { profileData } from "../../json/ProfileData";
import GradientButton from "../../components/Button/GradientButton";

const ProfileScreen = () => {
  const navigation = useNavigation();

  const handleNavigate = (route) => {
    if (route === "AuthStack") {
      navigation.reset({
        index: 0,
        routes: [{ name: "AuthStack" }],
      });
    } else {
      navigation.navigate("ProfileStack", { screen: route });
    }
  };

  const renderItem = ({ item }) => (
    <LinearGradient
      colors={["#624FBB", "#200F3B"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.item}
      onPress={() => handleNavigate(item.route)}
    >
      <View style={styles.itemLeft}>
        <Ionicons
          name={item.icon}
          style={styles.icon}
          size={20}
          color={Colors.secondary}
        />
        <Text style={styles.itemText}>{item.label}</Text>
      </View>
      <GradientButton
        label=""
        onPress={() => handleNavigate(item.route)}
        arrowEnable={true}
        style={{ width: 40, gap: 7, paddingVertical: 5 }}
      />
    </LinearGradient>
  );

  return (
    <View style={styles.container}>
      <Header />

      <ScrollView
        style={styles.content}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Card */}
        <LinearGradient
          colors={["#624FBB", "#200F3B"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.profileCard}
        >
        <View style={styles.imageSection}>
          <Image
            source={{ uri: profileData.profileCard.avatarUrl }}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.name}>{profileData.profileCard.name}</Text>
            <Text style={styles.email}>{profileData.profileCard.email}</Text>
          </View>
          </View>
          <LineGradient />
          <TouchableOpacity
            style={styles.upgradeBtn}
            onPress={() =>
              handleNavigate(profileData.profileCard.upgrade.route)
            }
          >
            <Text style={styles.upgradeText}>
              {profileData.profileCard.upgrade.label}
            </Text>
            <AntDesign name="rightcircle" size={24} color="#ffcc00"/>
          </TouchableOpacity>
        </LinearGradient>

        {/* List Items */}
        <FlatList
          data={profileData.profileNavigation}
          keyExtractor={(item) => item.label}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    paddingTop: 80,
    paddingHorizontal: 15,
  },
  profileCard: {
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  imageSection: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  name: {
    color: Colors.secondary,
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4
  },
  email: {
    color: Colors.secondary,
    fontSize: 16,
    fontWeight: "600",
  },
  upgradeBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  upgradeText: {
    color: "#FFCC00",
    fontSize: 18,
    fontWeight: "600",
  },
  list: {
    paddingTop: 10,
  },
  item: {
    paddingVertical: 2,
    paddingLeft: 15,
    borderRadius: 10,
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  icon: {
    borderWidth: 1,
    borderRadius: 50,
    padding: 8,
    borderColor: "rgba(255, 255, 255, 0.5)",
    backgroundColor: "#3A3162",
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemText: {
    color: Colors.secondary,
    marginLeft: 10,
    fontSize: 18,
    fontWeight: "500",
  },
});

export default ProfileScreen;
