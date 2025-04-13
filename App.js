import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from './navigations/AuthStack';
import MainTab from './navigations/MainTab';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>

        {/* Auth Flow */}
        <Stack.Screen name="AuthStack" component={AuthStack} />

        {/* Main App after login */}
        <Stack.Screen name="MainTab" component={MainTab} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
