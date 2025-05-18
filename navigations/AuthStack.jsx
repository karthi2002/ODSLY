import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '../screens/authentication/SplashScreen.jsx';
import LoginScreen from '../screens/authentication/LoginScreen.jsx';
import SignupScreen from '../screens/authentication/SignupScreen.jsx';
import ForgotScreen from '../screens/authentication/ForgotScreen';
import ResetPasswordScreen from '../screens/authentication/ResetPasswordScreen';
import VerifyOTPScreen from '../screens/authentication/VerifyOTPScreen';
import ProfileSetupScreen from '../screens/authentication/ProfileSetupScreen.jsx';
import SuccessScreen from '../screens/authentication/SuccessScreen.jsx';
import WelcomeScreen from '../screens/authentication/WelcomeScreen.jsx';
import AuthScreen from '../screens/authentication/AuthScreen.jsx';


const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'none' }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Auth" component={AuthScreen} />
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Forgot" component={ForgotScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
      <Stack.Screen name="VerifyOTP" component={VerifyOTPScreen} />
      <Stack.Screen name="SetupProfile" component={ProfileSetupScreen} />
      <Stack.Screen name="Success" component={SuccessScreen} />
    </Stack.Navigator>
  );
}
