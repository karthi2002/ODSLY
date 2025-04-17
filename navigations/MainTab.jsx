import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import { Text, View, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";

import HomeScreen from "../screens/home/HomeScreen";
import LiveScreen from "../screens/live/LiveScreen";
import InsightsScreen from "../screens/insights/InsightsScreen";
import CommunityScreen from "../screens/community/CommunityScreen";
import Colors from "../utils/Colors";
import ProfileScreen from "../screens/profile/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function MainTab() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: "#131417",
          height: 80,
        },
        tabBarIcon: ({ focused }) => {
          let iconName;
          let label;

          switch (route.name) {
            case "Home":
              iconName = "home-outline";
              label = "Home";
              break;
            case "Live":
              iconName = "tv-outline";
              label = "Live";
              break;
            case "Insights":
              iconName = "bar-chart-outline";
              label = "Insights";
              break;
            case "Community":
              iconName = "people-outline";
              label = "Community";
              break;
            case "Profile":
              iconName = "person-outline";
              label = "Profile";
              break;
          }

          const gradientColors = ["#029EFE", "#6945E2", "#E9098E"];

          return (
            <View
              style={{
                alignItems: "center",
                justifyContent: "flex-start",
                width: 70,
                paddingTop: focused ? 10 : 14,
              }}
            >
              {/* Top Gradient Border */}
              {focused && (
                <LinearGradient
                  colors={gradientColors}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{
                    height: 3,
                    width: "100%",
                    borderRadius: 2,
                    marginBottom: 6,
                  }}
                />
              )}

              {/* Gradient Icon */}
              {focused ? (
                <MaskedView
                  maskElement={
                    <Icon
                      name={iconName}
                      size={26}
                      color="black"
                      style={{ backgroundColor: "transparent" }}
                    />
                  }
                >
                  <LinearGradient
                    colors={gradientColors}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{ height: 26, width: 26 }}
                  />
                </MaskedView>
              ) : (
                <Icon name={iconName} size={26} color={Colors.text} />
              )}

              {/* Gradient Text */}
              {focused ? (
                <MaskedView
                  maskElement={
                    <Text
                      numberOfLines={1}
                      style={{
                        fontSize: 11,
                        marginTop: 2,
                        textAlign: "center",
                        width: "100%",
                        color: "black",
                        backgroundColor: "transparent",
                      }}
                    >
                      {label}
                    </Text>
                  }
                >
                  <LinearGradient
                    colors={gradientColors}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{ height: 14, width: 70 }}
                  />
                </MaskedView>
              ) : (
                <Text
                  numberOfLines={1}
                  style={{
                    color: Colors.text,
                    fontSize: 11,
                    marginTop: 2,
                    textAlign: "center",
                    width: "100%",
                  }}
                >
                  {label}
                </Text>
              )}
            </View>
          );
        },
        tabBarShowLabel: false,
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Live" component={LiveScreen} />
      <Tab.Screen name="Insights" component={InsightsScreen} />
      <Tab.Screen name="Community" component={CommunityScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
