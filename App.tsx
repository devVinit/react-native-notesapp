import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableNativeFeedback, Platform, TextInput } from 'react-native';
import { AppLoading } from 'expo';
import { StatusBar } from 'expo-status-bar';
import {
  useFonts,
  Poppins_500Medium,
} from '@expo-google-fonts/poppins';
import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
import { enableScreens } from 'react-native-screens';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import HomeScreen from './screens/Home/HomeScreen';
import SearchScreen from './screens/Search/SearchScreen';
import NoteDetailsScreen from './screens/NoteDetails/NoteDetailsScreen';
import SecurityPinScreen from './screens/SecurityPin/SecurityPinScreen';
import { useSelector } from 'react-redux';

enableScreens();

function LoginStack() {
  const Login = createNativeStackNavigator();
  return (
    <Login.Navigator
      screenOptions={{
        gestureEnabled: true,
        headerShown: false
      }}
    >
      <Login.Screen
        name="SecurtyPinScreen"
        component={SecurityPinScreen}
      />
    </Login.Navigator>
  )
}

function AppStack() {
  const App = createNativeStackNavigator();
  return (
    <App.Navigator
      screenOptions={{
        gestureEnabled: true,
        headerShown: false
      }}
    >
      <App.Screen
        name="HomeScreen"
        component={HomeScreen}
      />

      <App.Screen
        name="SecurtyPinScreen"
        component={SecurityPinScreen}
      />

      <App.Screen
        name="SearchScreen"
        component={SearchScreen}
      />

      <App.Screen
        name="NoteDetailsScreen"
        component={NoteDetailsScreen}
      />
    </App.Navigator>
  )
}

export default function App() {

  const loginStatus = useSelector((state: any) => state.loginStatus);

  let fontLoaded = useFonts({
    Poppins_500Medium
  })

  if (!fontLoaded) {
    return <AppLoading />
  } else {
    return (
      <NavigationContainer>
        {
          loginStatus &&
          <AppStack />
        }
        {
          loginStatus === false &&
          <LoginStack />
        }
      </NavigationContainer>
    );
  }

}