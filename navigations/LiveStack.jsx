import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FiltersScreen from '../screens/live/FiltersScreen';
import CreateBetScreen from '../screens/live/CreateBetScreen';

const Stack = createNativeStackNavigator();

export default function LiveStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LiveFilter" component={FiltersScreen} />
      <Stack.Screen name="LiveNewBet" component={CreateBetScreen} />

    </Stack.Navigator>
  );
}
