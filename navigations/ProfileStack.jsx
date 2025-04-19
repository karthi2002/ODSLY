import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import NotificationScreen from '../screens/NotificationScreen';
import EditProfileScreen from '../screens/profile/EditProfileScreen';
import PricingPageScreen from '../screens/profile/PricingPageScreen';
import SportsBookScreen from '../screens/profile/SportsBookScreen';
import BettingPreferenceScreen from '../screens/profile/BettingPreferenceScreen';
import NotificationSettingScreen from '../screens/profile/NotificationSettingScreen';
import PrivacyScreen from '../screens/profile/PrivacyScreen';
import AppPreferenceScreen from '../screens/profile/AppPreferenceScreen';

const Stack = createNativeStackNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Notification" component={NotificationScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="Upgrade" component={PricingPageScreen} />
      <Stack.Screen name="SportsbookAccount" component={SportsBookScreen} />
      <Stack.Screen name="BettingPreferences" component={BettingPreferenceScreen} />
      <Stack.Screen name="NotificationSetting" component={NotificationSettingScreen} />
      <Stack.Screen name="PrivacySecurity" component={PrivacyScreen} />
      <Stack.Screen name="AppPreferences" component={AppPreferenceScreen} />
    </Stack.Navigator>
  );
}
