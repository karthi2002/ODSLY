import React, { useEffect } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store.js';
import AuthStack from './navigations/AuthStack';
import MainTab from './navigations/MainTab';
import ProfileStack from './navigations/ProfileStack';
import NotificationScreen from './screens/NotificationScreen.jsx';
import LiveStack from './navigations/LiveStack.jsx';
import CommunityStack from './navigations/CommunityStack.jsx';
import { setSession } from './redux/session/sessionSlice';

const Stack = createNativeStackNavigator();

function AppContent() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => !!state.session.userSession);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const userSession = await AsyncStorage.getItem('userSession');
        const sessionData = userSession ? JSON.parse(userSession) : null;
        dispatch(setSession(sessionData));
        console.log('Initial isLoggedIn:', !!sessionData); // Debug
      } catch (err) {
        console.error('Error checking session:', err);
        dispatch(setSession(null));
      }
    };
    checkSession();
  }, [dispatch]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#131417' },
        }}
      >
        {isLoggedIn ? (
          <>
            <Stack.Screen
              name="MainTab"
              component={MainTab}
              options={{ animation: 'none' }}
            />
            <Stack.Screen name="ProfileStack" component={ProfileStack} />
            <Stack.Screen name="LiveStack" component={LiveStack} />
            <Stack.Screen name="CommunityStack" component={CommunityStack} />
            <Stack.Screen name="Notification" component={NotificationScreen} />
            <Stack.Screen name="AuthStack" component={AuthStack} />
          </>
        ) : (
          <Stack.Screen name="AuthStack" component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <StatusBar backgroundColor="#131417" barStyle="light-content" />
          <SafeAreaView style={styles.safeArea} edges={['top']}>
            <View style={styles.container}>
              <AppContent />
            </View>
          </SafeAreaView>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000A34',
  },
  container: {
    flex: 1,
    backgroundColor: '#131417',
  },
});