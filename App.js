import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AuthStack from './navigations/AuthStack';
import MainTab from './navigations/MainTab';
import NotificationScreen from './screens/NotificationScreen';
import EditProfileScreen from './screens/profile/EditProfileScreen';
import PricingPageScreen from './screens/profile/PricingPageScreen';
import BettingPreferenceScreen from './screens/profile/BettingPreferenceScreen';
import NotificationSettingScreen from './screens/profile/NotificationSettingScreen';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom', 'left', 'right']}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="AuthStack" component={AuthStack} />
            <Stack.Screen name="MainTab" component={MainTab} />
            <Stack.Screen name="Notification" component={NotificationScreen} />
            <Stack.Screen name="EditProfile" component={EditProfileScreen} />
            <Stack.Screen name="Upgrade" component={PricingPageScreen} />
            <Stack.Screen name="BettingPreferences" component={BettingPreferenceScreen} />
            <Stack.Screen name="NotificationSetting" component={NotificationSettingScreen} />

            

          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#131417'
  },
});
