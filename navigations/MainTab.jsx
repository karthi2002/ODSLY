import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../screens/HomeScreen';
// import LiveScreen from '../screens/LiveScreen';
// import InsightsScreen from '../screens/InsightsScreen';
// import CommunityScreen from '../screens/CommunityScreen';
// import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function MainTab() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: '#1a1a2e',
          borderTopWidth: 0,
          height: 60,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Home': iconName = 'home-outline'; break;
            case 'Live': iconName = 'tv-outline'; break;
            case 'Insights': iconName = 'bar-chart-outline'; break;
            case 'Community': iconName = 'people-outline'; break;
            case 'Profile': iconName = 'person-outline'; break;
          }

          return <Icon name={iconName} size={22} color={focused ? '#00f7ff' : '#aaa'} />;
        },
        tabBarShowLabel: false,
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      {/* <Tab.Screen name="Live" component={LiveScreen} />
      <Tab.Screen name="Insights" component={InsightsScreen} />
      <Tab.Screen name="Community" component={CommunityScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} /> */}
    </Tab.Navigator>
  );
}
