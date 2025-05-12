import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Provider } from 'react-redux';
import store from './redux/store.js'; 
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
      setIsLoggedIn(!!userSession);
    }, 500);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Provider store={store}>
  <SafeAreaProvider>
    <StatusBar backgroundColor="#131417" barStyle="light-content" />
    <View style={styles.container}>
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
    </View>
  </SafeAreaProvider>
</Provider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#131417',
  },
});
