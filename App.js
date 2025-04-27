import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

import AuthStack from './navigations/AuthStack';
import MainTab from './navigations/MainTab';
import ProfileStack from './navigations/ProfileStack';
import NotificationScreen from './screens/NotificationScreen.jsx';
import LiveStack from './navigations/LiveStack.jsx';
import CommunityStack from './navigations/CommunityStack.jsx';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  
  useEffect(() => {
    const intervalId = setInterval(async () => {
      const userSession = await AsyncStorage.getItem('userSession');
      if (userSession) {
        setIsLoggedIn(true); 
      } else {
        setIsLoggedIn(false); 
      }
    }, 500); 
  
    return () => clearInterval(intervalId);
  }, []);
  
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom', 'left', 'right']}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {isLoggedIn ? (
              <>
                <Stack.Screen name="MainTab" component={MainTab} />
                <Stack.Screen name="ProfileStack" component={ProfileStack} />
                <Stack.Screen name="LiveStack" component={LiveStack} />
                <Stack.Screen name="CommunityStack" component={CommunityStack} />
                <Stack.Screen name="Notification" component={NotificationScreen} />
              </>
            ) : (
              <Stack.Screen name="AuthStack" component={AuthStack} />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#131417',
  },
});
