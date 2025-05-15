import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Provider } from 'react-redux';
import store from './redux/store.js'; 
import AuthStack from './navigations/AuthStack';
import MainTab from './navigations/MainTab';
import ProfileStack from './navigations/ProfileStack';
import NotificationScreen from './screens/NotificationScreen.jsx';
import LiveStack from './navigations/LiveStack.jsx';
import CommunityStack from './navigations/CommunityStack.jsx';
import { LogBox } from 'react-native';

LogBox.ignoreAllLogs(); // remove and proceed to develop next version -- madhankumar

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const userSession = await AsyncStorage.getItem('userSession');
      setIsLoggedIn(!!userSession);
    }, 500);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        {/* Set status bar color to match app theme */}
        <StatusBar backgroundColor="#131417" barStyle="light-content" />
        
        {/* Match SafeAreaView to status bar color */}
        <SafeAreaView style={styles.safeArea} edges={['top']}>
          <View style={styles.container}>
            <NavigationContainer>
              <Stack.Navigator
                screenOptions={{
                  headerShown: false,
                  contentStyle: { backgroundColor: '#131417' }, // Ensures screen background matches
                }}
              >
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
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000A34', // Matches header and status bar
  },
  container: {
    flex: 1,
    backgroundColor: '#131417',
  },
});
