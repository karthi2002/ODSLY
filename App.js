import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import AuthStack from './navigations/AuthStack';
import MainTab from './navigations/MainTab';
import ProfileStack from './navigations/ProfileStack';
import NotificationScreen from './screens/NotificationScreen.jsx'
import LiveStack from './navigations/LiveStack.jsx';



const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom', 'left', 'right']}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Auth" component={AuthStack} />
            <Stack.Screen name="MainTab" component={MainTab} />
            <Stack.Screen name="ProfileStack" component={ProfileStack} />
            <Stack.Screen name="LiveStack" component={LiveStack} />
            <Stack.Screen name="Notification" component={NotificationScreen} />
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
