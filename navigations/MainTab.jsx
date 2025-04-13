import React from 'react';
import { View, Text, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';  

import HomeScreen from '../screens/HomeScreen';
import LiveScreen from '../screens/LiveScreen';
import InsightsScreen from '../screens/InsightsScreen';
import CommunityScreen from '../screens/CommunityScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function MainTab() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: '#131417',
          borderTopWidth: 0,
          height: 60,
        },
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 4,
        },
        headerShown: false,
        tabBarIcon: ({ focused }) => {
          let iconName = '';
          let label = '';

          switch (route.name) {
            case 'Home':
              iconName = 'home-outline';
              label = 'Home';
              break;
            case 'Live':
              iconName = 'tv-outline';
              label = 'Live';
              break;
            case 'Insights':
              iconName = 'bar-chart-outline';
              label = 'Insights';
              break;
            case 'Community':
              iconName = 'people-outline';
              label = 'Community';
              break;
            case 'Profile':
              iconName = 'person-outline';
              label = 'Profile';
              break;
            default:
              break;
          }

          const gradientColors = focused
            ? ['#00f7ff', '#00ffae']
            : ['#aaa', '#aaa'];

          return (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              {Platform.OS === 'android' || Platform.OS === 'ios' ? (
                <LinearGradient
                  colors={gradientColors}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={{ padding: 6, borderRadius: 20 }}
                >
                  <Icon name={iconName} size={22} color="#fff" />
                </LinearGradient>
              ) : (
                <View
                  style={{
                    padding: 6,
                    borderRadius: 20,
                    backgroundColor: focused ? '#00f7ff' : '#aaa',
                  }}
                >
                  <Icon name={iconName} size={22} color="#fff" />
                </View>
              )}
              <Text
                style={{
                  color: focused ? '#00f7ff' : '#aaa',
                  fontSize: 11,
                  marginTop: 2,
                }}
              >
                {label}
              </Text>
            </View>
          );
        },
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
