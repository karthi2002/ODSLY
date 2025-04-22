import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PostCommentScreen from '../screens/community/PostCommentScreen';
import PostProfileScreen from '../screens/community/PostProfileScreen';

const Stack = createNativeStackNavigator();

export default function CommunityStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      
      <Stack.Screen name="PostComment" component={PostCommentScreen} />
      <Stack.Screen name="PostProfile" component={PostProfileScreen} />

    </Stack.Navigator>
  );
}
